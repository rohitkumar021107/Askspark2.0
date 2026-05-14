/**
 * Local type definitions for AskSpark app.
 * These mirror the backend Motoko types but are defined locally
 * since the app uses Firebase as its primary data store.
 */

export enum AppRole {
  student = "student",
  teacher = "teacher",
}

export interface Doubt {
  id: string;
  text: string;
  isAnonymous: boolean;
  timestamp: bigint;
  isAnswered: boolean;
  teacherResponse?: string | null;
  studentSubmitter?: string | null;
  subject?: string;
  studentName?: string;
  userId?: string;
}

export interface UserProfile {
  displayName: string;
  doubtsSubmitted: bigint;
  role: AppRole;
}
