import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type FirestoreDoubt,
  answerDoubt as firestoreAnswerDoubt,
  submitDoubt as firestoreSubmitDoubt,
  useAllDoubts as useFirestoreAllDoubts,
  useMyDoubts,
} from "../lib/useFirestoreDoubts";
import type { AppRole, Doubt, UserProfile } from "../types/appTypes";
import {
  type LocalProfile,
  getOrCreateUserId,
  loadLocalProfile,
  saveLocalProfile,
} from "./useLocalProfile";

/** Returns the user profile from localStorage — no auth required */
export function useUserProfile() {
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const profile = loadLocalProfile();
      if (!profile) return null;
      return {
        displayName: profile.displayName,
        doubtsSubmitted: BigInt(0),
        role: profile.role,
      } as UserProfile;
    },
    staleTime: 30_000,
  });
}

/** Returns the full local profile (includes userType, class, branch) */
export function useLocalFullProfile(): LocalProfile | null {
  return loadLocalProfile();
}

export function useCallerDoubts(): {
  data: FirestoreDoubt[];
  isLoading: boolean;
} {
  const userId = getOrCreateUserId();
  const doubts = useMyDoubts(userId);
  return { data: doubts, isLoading: false };
}

export function useConfidenceScore() {
  return useQuery<bigint>({
    queryKey: ["confidenceScore"],
    queryFn: async () => {
      const stored = JSON.parse(
        localStorage.getItem("askspark_doubts") || "[]",
      ) as { userId?: string }[];
      const userId = getOrCreateUserId();
      const count = stored.filter((d) => d.userId === userId).length;
      const score = Math.min(count * 10, 100);
      return BigInt(score);
    },
    staleTime: 30_000,
  });
}

export function useAllDoubts(): { data: FirestoreDoubt[]; isLoading: boolean } {
  const doubts = useFirestoreAllDoubts();
  return { data: doubts, isLoading: false };
}

export function useUnansweredDoubts() {
  return useQuery<Doubt[]>({
    queryKey: ["unansweredDoubts"],
    queryFn: async () => {
      const stored = JSON.parse(
        localStorage.getItem("askspark_doubts") || "[]",
      ) as Doubt[];
      return stored.filter((d) => !d.isAnswered);
    },
    staleTime: 15_000,
    refetchInterval: 15_000,
  });
}

export function useNotificationCount() {
  return useQuery<bigint>({
    queryKey: ["notificationCount"],
    queryFn: async () => {
      const stored = JSON.parse(
        localStorage.getItem("askspark_doubts") || "[]",
      ) as { isAnswered?: boolean }[];
      const unanswered = stored.filter((d) => !d.isAnswered).length;
      return BigInt(unanswered);
    },
    staleTime: 20_000,
    refetchInterval: 20_000,
  });
}

interface DoubtInput {
  text: string;
  isAnonymous: boolean;
  /** The selected class or branch (e.g. "10th", "CSE") */
  branch: string;
  /** Subject within that class/branch */
  subject: string;
}

export function useSubmitDoubt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: DoubtInput) => {
      const userId = getOrCreateUserId();
      const profile = loadLocalProfile();
      const studentName = profile?.displayName ?? "Anonymous";

      console.log("[useSubmitDoubt] Starting submission", {
        branch: input.branch,
        subject: input.subject,
        isAnonymous: input.isAnonymous,
        userId,
      });

      try {
        // Primary path — Firestore
        await firestoreSubmitDoubt({
          question: input.text,
          subject: input.subject,
          class: input.branch,
          studentName: input.isAnonymous ? "Anonymous" : studentName,
          userId,
          isAnonymous: input.isAnonymous,
        });
        console.log("[useSubmitDoubt] Firestore submission complete");
      } catch (firestoreErr) {
        console.error(
          "[useSubmitDoubt] Firestore failed, using localStorage fallback:",
          firestoreErr,
        );
        // Fallback to localStorage so the user's doubt isn't lost
        const stored = JSON.parse(
          localStorage.getItem("askspark_doubts") || "[]",
        );
        stored.unshift({
          id: `local_${Date.now()}`,
          text: input.text,
          title: input.text,
          question: input.text,
          subject: input.subject,
          class: input.branch,
          branch: input.branch,
          isAnonymous: input.isAnonymous,
          userId,
          timestamp: Date.now(),
          createdAt: Date.now(),
          status: "pending",
          studentName: input.isAnonymous ? "Anonymous" : studentName,
        });
        localStorage.setItem(
          "askspark_doubts",
          JSON.stringify(stored.slice(0, 100)),
        );
        // Re-throw so the caller can show a warning (saved offline)
        throw new Error("saved_offline");
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerDoubts"] });
      qc.invalidateQueries({ queryKey: ["confidenceScore"] });
      qc.invalidateQueries({ queryKey: ["allDoubts"] });
      qc.invalidateQueries({ queryKey: ["unansweredDoubts"] });
      qc.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });
}

export function useAnswerDoubt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      doubtId,
      response,
      teacherName,
      studentUserId,
    }: {
      doubtId: string;
      response: string;
      teacherName?: string;
      studentUserId?: string;
    }) => {
      try {
        await firestoreAnswerDoubt(
          doubtId,
          response,
          teacherName ?? "Teacher",
          studentUserId,
        );
      } catch (err) {
        console.error("answerDoubt failed:", err);
        throw err;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allDoubts"] });
      qc.invalidateQueries({ queryKey: ["unansweredDoubts"] });
      qc.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });
}

/** Saves profile to localStorage — no auth required */
export function useSubmitProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      displayName,
      role,
      userType,
      userClass,
      userBranch,
    }: {
      displayName: string;
      role: AppRole;
      userType?: string;
      userClass?: string;
      userBranch?: string;
    }) => {
      saveLocalProfile({ displayName, role, userType, userClass, userBranch });
      return { displayName, role };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
