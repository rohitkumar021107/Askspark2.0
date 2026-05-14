import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Doubt {
    id: string;
    text: string;
    isAnonymous: boolean;
    studentSubmitter?: Principal;
    timestamp: Time;
    image?: ExternalBlob;
    isAnswered: boolean;
    teacherResponse?: string;
}
export type Time = bigint;
export interface DoubtSubmission {
    text: string;
    isAnonymous: boolean;
    image?: ExternalBlob;
}
export interface UserProfile {
    displayName: string;
    doubtsSubmitted: bigint;
    role?: AppRole;
}
export enum AppRole {
    teacher = "teacher",
    student = "student"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    answerDoubt(doubtId: string, response: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllDoubts(): Promise<Array<Doubt>>;
    getAllUserProfiles(): Promise<Array<UserProfile>>;
    getCallerConfidenceScore(): Promise<bigint>;
    getCallerDoubts(): Promise<Array<Doubt>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDoubt(id: string): Promise<Doubt>;
    getProfileByPrincipal(user: Principal): Promise<UserProfile | null>;
    getStudentConfidenceScore(user: Principal): Promise<bigint>;
    getTeacherNotificationCount(): Promise<bigint>;
    getUnansweredDoubts(): Promise<Array<Doubt>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(_profile: UserProfile): Promise<void>;
    submitDoubt(submission: DoubtSubmission): Promise<string>;
    submitUserProfile(displayName: string, role: AppRole): Promise<void>;
}
