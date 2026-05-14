import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface FirestoreUser {
  id: string;
  name: string;
  role: string;
  updatedAt?: number;
}

export async function saveUserToFirestore(
  userId: string,
  name: string,
  role: string,
  setTeacherInitialized?: boolean,
): Promise<void> {
  try {
    const data: Record<string, unknown> = {
      name,
      role,
      updatedAt: Timestamp.now(),
    };
    if (setTeacherInitialized) {
      data.isTeacherInitialized = true;
    }
    await setDoc(doc(db, "users", userId), data, { merge: true });
  } catch {
    /* silent fail — localStorage is primary */
  }
}

export async function getAllStudents(): Promise<FirestoreUser[]> {
  try {
    const q = query(collection(db, "users"), where("role", "==", "student"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      name: String(d.data().name ?? ""),
      role: String(d.data().role ?? "student"),
    }));
  } catch {
    return [];
  }
}
