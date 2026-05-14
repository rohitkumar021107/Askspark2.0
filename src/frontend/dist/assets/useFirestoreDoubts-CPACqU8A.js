import { r as reactExports, H as query, I as collection, J as db, K as where, L as orderBy, M as onSnapshot, T as Timestamp, N as updateDoc, O as doc, Q as rtdbPush, R as addDoc } from "./index-CiicjzrK.js";
function fromStorage() {
  try {
    const raw = JSON.parse(localStorage.getItem("askspark_doubts") || "[]");
    return raw.map((d) => ({
      id: String(d.id ?? ""),
      question: String(d.title ?? d.text ?? d.question ?? ""),
      subject: String(d.subject ?? ""),
      studentName: String(d.studentName ?? "Anonymous"),
      userId: String(d.userId ?? ""),
      isAnonymous: Boolean(d.isAnonymous ?? true),
      status: d.status ?? "pending",
      answer: d.answer ? String(d.answer) : void 0,
      teacherName: d.teacherName ? String(d.teacherName) : void 0,
      createdAt: Number(d.timestamp ?? d.createdAt ?? Date.now()),
      answeredAt: d.answeredAt ? Number(d.answeredAt) : void 0
    }));
  } catch {
    return [];
  }
}
function useMyDoubts(userId) {
  const [doubts, setDoubts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!userId) return;
    let unsubscribe = null;
    try {
      const q = query(
        collection(db, "doubts"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const data = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toMillis() : Number(d.data().createdAt ?? Date.now()),
            answeredAt: d.data().answeredAt instanceof Timestamp ? d.data().answeredAt.toMillis() : d.data().answeredAt ? Number(d.data().answeredAt) : void 0
          }));
          setDoubts(data);
        },
        () => {
          setDoubts(fromStorage().filter((d) => d.userId === userId));
        }
      );
    } catch {
      setDoubts(fromStorage().filter((d) => d.userId === userId));
    }
    return () => {
      unsubscribe == null ? void 0 : unsubscribe();
    };
  }, [userId]);
  return doubts;
}
function useAllDoubts() {
  const [doubts, setDoubts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let unsubscribe = null;
    try {
      const q = query(collection(db, "doubts"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          const data = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toMillis() : Number(d.data().createdAt ?? Date.now()),
            answeredAt: d.data().answeredAt instanceof Timestamp ? d.data().answeredAt.toMillis() : d.data().answeredAt ? Number(d.data().answeredAt) : void 0
          }));
          setDoubts(data);
        },
        () => {
          setDoubts(fromStorage());
        }
      );
    } catch {
      setDoubts(fromStorage());
    }
    return () => {
      unsubscribe == null ? void 0 : unsubscribe();
    };
  }, []);
  return doubts;
}
async function submitDoubt(data) {
  const timeout = new Promise(
    (_, reject) => setTimeout(() => reject(new Error("Request timed out")), 8e3)
  );
  console.log("[submitDoubt] Attempting Firestore write:", {
    question: data.question.slice(0, 60),
    subject: data.subject,
    class: data.class,
    userId: data.userId,
    isAnonymous: data.isAnonymous
  });
  const ref = await Promise.race([
    addDoc(collection(db, "doubts"), {
      question: data.question,
      subject: data.subject,
      class: data.class,
      studentName: data.studentName,
      userId: data.userId,
      isAnonymous: data.isAnonymous,
      status: "pending",
      createdAt: Timestamp.now()
    }),
    timeout
  ]);
  console.log("[submitDoubt] Firestore write succeeded, docId:", ref.id);
}
async function answerDoubt(id, answer, teacherName, studentUserId) {
  try {
    await updateDoc(doc(db, "doubts", id), {
      answer,
      teacherName,
      answeredAt: Timestamp.now(),
      status: "answered"
    });
    if (studentUserId) {
      try {
        rtdbPush(`notifications/${studentUserId}`, {
          type: "doubt_answered",
          message: "Your doubt has been answered!",
          navigateTo: "/dashboard/student",
          read: false,
          createdAt: Date.now()
        });
      } catch {
      }
    }
  } catch {
    try {
      const stored = JSON.parse(
        localStorage.getItem("askspark_doubts") || "[]"
      );
      const updated = stored.map(
        (d) => d.id === id ? {
          ...d,
          answer,
          teacherName,
          answeredAt: Date.now(),
          status: "answered"
        } : d
      );
      localStorage.setItem("askspark_doubts", JSON.stringify(updated));
    } catch {
    }
  }
}
export {
  useAllDoubts as a,
  answerDoubt as b,
  submitDoubt as s,
  useMyDoubts as u
};
