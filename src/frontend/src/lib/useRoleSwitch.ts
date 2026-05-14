import { doc, getDoc, setDoc } from "firebase/firestore";
import { loadLocalProfile, saveLocalProfile } from "../hooks/useLocalProfile";
import { AppRole } from "../types/appTypes";
import { db } from "./firebase";
import { saveUserToFirestore } from "./useFirestoreUsers";

/**
 * Checks if the user has already been a teacher before.
 */
export async function isTeacherInitialized(userId: string): Promise<boolean> {
  const profile = loadLocalProfile();
  if (profile?.isTeacherInitialized) return true;

  try {
    const snap = await getDoc(doc(db, "users", userId));
    if (snap.exists()) {
      return snap.data()?.isTeacherInitialized === true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/**
 * Fetch the user's saved teacher code from Firestore.
 */
export async function getTeacherCodeFromFirestore(
  userId: string,
): Promise<string | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId));
    if (snap.exists()) {
      return (snap.data()?.teacherCode as string) ?? null;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Save or update the user's personal teacher code in Firestore.
 */
export async function saveTeacherCode(
  userId: string,
  code: string,
): Promise<void> {
  // Use setDoc with merge so it works even if the document doesn't exist yet
  await setDoc(
    doc(db, "users", userId),
    {
      teacherCode: code,
      isTeacherInitialized: true,
    },
    { merge: true },
  );

  // Cache locally for fast offline fallback
  try {
    const profile = loadLocalProfile();
    if (profile) {
      saveLocalProfile({ ...profile, isTeacherInitialized: true });
    }
    localStorage.setItem("askspark_teacher_code_hash", btoa(code));
  } catch {
    /* ignore */
  }
}

/**
 * Validate a code the user typed against their saved code in Firestore.
 * Falls back to localStorage cached hash if Firestore is unavailable.
 */
export async function validateTeacherCode(
  userId: string,
  enteredCode: string,
): Promise<boolean> {
  // Try Firestore first (authoritative)
  const saved = await getTeacherCodeFromFirestore(userId);
  if (saved !== null) {
    return saved === enteredCode.trim();
  }
  // Fallback: check local hash
  const localHash = localStorage.getItem("askspark_teacher_code_hash");
  if (localHash) {
    try {
      return atob(localHash) === enteredCode.trim();
    } catch {
      /* ignore */
    }
  }
  return false;
}

/**
 * Verify a teacher code — alias for validateTeacherCode.
 * Used when changing the code from the Profile page.
 */
export async function verifyTeacherCode(
  userId: string,
  enteredCode: string,
): Promise<boolean> {
  return validateTeacherCode(userId, enteredCode);
}

export async function switchRole(
  userId: string,
  newRole: "student" | "teacher",
  teacherCode?: string,
): Promise<{ success: boolean; error?: string }> {
  if (newRole === "teacher" && teacherCode !== undefined) {
    const valid = await validateTeacherCode(userId, teacherCode);
    if (!valid) {
      return {
        success: false,
        error: "Incorrect teacher code. Please try again.",
      };
    }
  }

  const profile = loadLocalProfile();
  if (!profile) {
    return { success: false, error: "No profile found." };
  }

  const appRole = newRole === "teacher" ? AppRole.teacher : AppRole.student;
  const isFirstTimeTeacher =
    newRole === "teacher" && !profile.isTeacherInitialized;

  const updatedProfile = {
    ...profile,
    role: appRole,
    ...(isFirstTimeTeacher ? { isTeacherInitialized: true } : {}),
  };

  saveLocalProfile(updatedProfile);
  localStorage.setItem("askspark_role", newRole);

  try {
    await Promise.race([
      saveUserToFirestore(
        userId,
        profile.displayName,
        newRole,
        isFirstTimeTeacher,
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000),
      ),
    ]);
  } catch {
    /* best-effort */
  }

  return { success: true };
}

export async function fetchRoleFromFirestore(
  userId: string,
): Promise<string | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId));
    if (snap.exists()) {
      const data = snap.data();
      return (data?.role as string) ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
