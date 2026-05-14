import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { fetchRoleFromFirestore } from "../lib/useRoleSwitch";
import { AppRole } from "../types/appTypes";
import { loadLocalProfile, saveLocalProfile } from "./useLocalProfile";

export function useRoleSync() {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = loadLocalProfile();
    if (!profile?.userId) return;

    // If the role was just set locally (e.g. via "Join as Teacher" button),
    // skip the Firebase sync for a short window to prevent stale data overwriting it.
    const skipUntilStr = localStorage.getItem("askspark_role_skip_sync_until");
    if (skipUntilStr && Date.now() < Number.parseInt(skipUntilStr, 10)) return;

    fetchRoleFromFirestore(profile.userId)
      .then((firebaseRole) => {
        if (!firebaseRole) return;
        const localRole = profile.role as string;
        if (firebaseRole !== localRole) {
          const appRole =
            firebaseRole === "teacher" ? AppRole.teacher : AppRole.student;
          saveLocalProfile({ ...profile, role: appRole });
          localStorage.setItem("askspark_role", firebaseRole);
          // Navigate to correct dashboard if on a dashboard path
          const currentPath = window.location.pathname;
          if (currentPath.startsWith("/dashboard")) {
            navigate({
              to:
                firebaseRole === "teacher"
                  ? "/dashboard/teacher"
                  : "/dashboard/student",
            });
          }
        }
      })
      .catch(() => {
        /* silent fail — localStorage is source of truth if Firebase unreachable */
      });
  }, [navigate]);
}
