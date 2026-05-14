import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export interface FirestoreRating {
  id?: string;
  teacherId: string;
  teacherName: string;
  doubtId: string;
  studentId: string;
  rating: number;
  createdAt: number;
}

export async function submitRating(
  doubtId: string,
  teacherId: string,
  teacherName: string,
  studentId: string,
  rating: number,
): Promise<void> {
  try {
    await addDoc(collection(db, "ratings"), {
      doubtId,
      teacherId,
      teacherName,
      studentId,
      rating,
      createdAt: Timestamp.now(),
    });
  } catch {
    /* silent fail */
  }
}

export function useTeacherRating(teacherName: string): {
  average: number;
  count: number;
} {
  const [result, setResult] = useState({ average: 0, count: 0 });

  useEffect(() => {
    if (!teacherName) return;
    let unsub: (() => void) | null = null;
    try {
      const q = query(
        collection(db, "ratings"),
        where("teacherName", "==", teacherName),
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const ratings = snap.docs.map((d) => Number(d.data().rating ?? 0));
          const count = ratings.length;
          const average =
            count > 0 ? ratings.reduce((a, b) => a + b, 0) / count : 0;
          setResult({ average, count });
        },
        () => setResult({ average: 0, count: 0 }),
      );
    } catch {
      /* ignore */
    }
    return () => {
      unsub?.();
    };
  }, [teacherName]);

  return result;
}

export async function getRating(
  doubtId: string,
  studentId: string,
): Promise<number | null> {
  try {
    const q = query(
      collection(db, "ratings"),
      where("doubtId", "==", doubtId),
      where("studentId", "==", studentId),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return Number(snap.docs[0].data().rating ?? null);
  } catch {
    return null;
  }
}
