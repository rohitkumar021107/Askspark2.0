/**
 * useLocalProfile - manages user profile entirely in localStorage.
 * No authentication required. A unique userId is generated once and persisted.
 */

import type { AppRole } from "../types/appTypes";

const USER_ID_KEY = "askspark_userId";
const PROFILE_KEY = "askspark_profile";

export interface LocalProfile {
  userId: string;
  displayName: string;
  role: AppRole;
  userType?: string;
  userClass?: string;
  userBranch?: string;
  profileImageUrl?: string;
  interests?: string[];
  isTeacherInitialized?: boolean;
}

/** Returns existing userId or generates a new one */
export function getOrCreateUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function saveLocalProfile(
  profile: Omit<LocalProfile, "userId">,
): LocalProfile {
  const userId = getOrCreateUserId();
  const full: LocalProfile = { userId, ...profile };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(full));
  return full;
}

export function loadLocalProfile(): LocalProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalProfile;
  } catch {
    return null;
  }
}

export function clearLocalProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
}
