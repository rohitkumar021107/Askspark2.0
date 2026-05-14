import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { rtdbPush } from "../hooks/useFirebaseRTDB";
import { db } from "./firebase";

export interface FirestoreDoubt {
  id: string;
  question: string;
  subject: string;
  studentName: string;
  userId: string;
  isAnonymous: boolean;
  status: "pending" | "answered";
  answer?: string;
  teacherName?: string;
  createdAt: number;
  answeredAt?: number;
}

function fromStorage(): FirestoreDoubt[] {
  try {
    const raw = JSON.parse(localStorage.getItem("askspark_doubts") || "[]");
    return (raw as Array<Record<string, unknown>>).map((d) => ({
      id: String(d.id ?? ""),
      question: String(d.title ?? d.text ?? d.question ?? ""),
      subject: String(d.subject ?? ""),
      studentName: String(d.studentName ?? "Anonymous"),
      userId: String(d.userId ?? ""),
      isAnonymous: Boolean(d.isAnonymous ?? true),
      status: (d.status as "pending" | "answered") ?? "pending",
      answer: d.answer ? String(d.answer) : undefined,
      teacherName: d.teacherName ? String(d.teacherName) : undefined,
      createdAt: Number(d.timestamp ?? d.createdAt ?? Date.now()),
      answeredAt: d.answeredAt ? Number(d.answeredAt) : undefined,
    }));
  } catch {
    return [];
  }
}

export function useMyDoubts(userId: string): FirestoreDoubt[] {
  const [doubts, setDoubts] = useState<FirestoreDoubt[]>([]);

  useEffect(() => {
    if (!userId) return;
    let unsubscribe: (() => void) | null = null;
    try {
      const q = query(
        collection(db, "doubts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      );
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const data: FirestoreDoubt[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<
              FirestoreDoubt,
              "id" | "createdAt" | "answeredAt"
            >),
            createdAt:
              d.data().createdAt instanceof Timestamp
                ? d.data().createdAt.toMillis()
                : Number(d.data().createdAt ?? Date.now()),
            answeredAt:
              d.data().answeredAt instanceof Timestamp
                ? d.data().answeredAt.toMillis()
                : d.data().answeredAt
                  ? Number(d.data().answeredAt)
                  : undefined,
          }));
          setDoubts(data);
        },
        () => {
          // Fallback to localStorage on error
          setDoubts(fromStorage().filter((d) => d.userId === userId));
        },
      );
    } catch {
      setDoubts(fromStorage().filter((d) => d.userId === userId));
    }
    return () => {
      unsubscribe?.();
    };
  }, [userId]);

  return doubts;
}

export function useAllDoubts(): FirestoreDoubt[] {
  const [doubts, setDoubts] = useState<FirestoreDoubt[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    try {
      const q = query(collection(db, "doubts"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const data: FirestoreDoubt[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<
              FirestoreDoubt,
              "id" | "createdAt" | "answeredAt"
            >),
            createdAt:
              d.data().createdAt instanceof Timestamp
                ? d.data().createdAt.toMillis()
                : Number(d.data().createdAt ?? Date.now()),
            answeredAt:
              d.data().answeredAt instanceof Timestamp
                ? d.data().answeredAt.toMillis()
                : d.data().answeredAt
                  ? Number(d.data().answeredAt)
                  : undefined,
          }));
          setDoubts(data);
        },
        () => {
          setDoubts(fromStorage());
        },
      );
    } catch {
      setDoubts(fromStorage());
    }
    return () => {
      unsubscribe?.();
    };
  }, []);

  return doubts;
}

export async function submitDoubt(data: {
  question: string;
  subject: string;
  class: string;
  studentName: string;
  userId: string;
  isAnonymous: boolean;
}): Promise<void> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), 8000),
  );

  console.log("[submitDoubt] Attempting Firestore write:", {
    question: data.question.slice(0, 60),
    subject: data.subject,
    class: data.class,
    userId: data.userId,
    isAnonymous: data.isAnonymous,
  });

  // Let errors propagate — caller decides on fallback
  const ref = await Promise.race([
    addDoc(collection(db, "doubts"), {
      question: data.question,
      subject: data.subject,
      class: data.class,
      studentName: data.studentName,
      userId: data.userId,
      isAnonymous: data.isAnonymous,
      status: "pending",
      createdAt: Timestamp.now(),
    }),
    timeout,
  ]);

  console.log("[submitDoubt] Firestore write succeeded, docId:", ref.id);
}

export async function answerDoubt(
  id: string,
  answer: string,
  teacherName: string,
  studentUserId?: string,
): Promise<void> {
  try {
    await updateDoc(doc(db, "doubts", id), {
      answer,
      teacherName,
      answeredAt: Timestamp.now(),
      status: "answered",
    });
    // Notify student via RTDB
    if (studentUserId) {
      try {
        rtdbPush(`notifications/${studentUserId}`, {
          type: "doubt_answered",
          message: "Your doubt has been answered!",
          navigateTo: "/dashboard/student",
          read: false,
          createdAt: Date.now(),
        });
      } catch {
        /* ignore notification failure */
      }
    }
  } catch {
    // Fallback: update in localStorage
    try {
      const stored: Array<Record<string, unknown>> = JSON.parse(
        localStorage.getItem("askspark_doubts") || "[]",
      );
      const updated = stored.map((d) =>
        d.id === id
          ? {
              ...d,
              answer,
              teacherName,
              answeredAt: Date.now(),
              status: "answered",
            }
          : d,
      );
      localStorage.setItem("askspark_doubts", JSON.stringify(updated));
    } catch {
      /* ignore */
    }
  }
}
