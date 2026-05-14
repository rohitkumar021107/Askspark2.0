import { H as query, I as collection, J as db, K as where, a7 as getDocs, r as reactExports, M as onSnapshot, R as addDoc, T as Timestamp } from "./index-CiicjzrK.js";
async function submitRating(doubtId, teacherId, teacherName, studentId, rating) {
  try {
    await addDoc(collection(db, "ratings"), {
      doubtId,
      teacherId,
      teacherName,
      studentId,
      rating,
      createdAt: Timestamp.now()
    });
  } catch {
  }
}
function useTeacherRating(teacherName) {
  const [result, setResult] = reactExports.useState({ average: 0, count: 0 });
  reactExports.useEffect(() => {
    if (!teacherName) return;
    let unsub = null;
    try {
      const q = query(
        collection(db, "ratings"),
        where("teacherName", "==", teacherName)
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const ratings = snap.docs.map((d) => Number(d.data().rating ?? 0));
          const count = ratings.length;
          const average = count > 0 ? ratings.reduce((a, b) => a + b, 0) / count : 0;
          setResult({ average, count });
        },
        () => setResult({ average: 0, count: 0 })
      );
    } catch {
    }
    return () => {
      unsub == null ? void 0 : unsub();
    };
  }, [teacherName]);
  return result;
}
async function getRating(doubtId, studentId) {
  try {
    const q = query(
      collection(db, "ratings"),
      where("doubtId", "==", doubtId),
      where("studentId", "==", studentId)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return Number(snap.docs[0].data().rating ?? null);
  } catch {
    return null;
  }
}
export {
  getRating as g,
  submitRating as s,
  useTeacherRating as u
};
