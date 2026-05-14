import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { useUserProfile } from "../hooks/useQueries";
import { AppRole } from "../types/appTypes";

export default function RoleGuard({
  children,
  role,
}: { children: ReactNode; role: AppRole }) {
  const { data: profile, isLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && profile !== undefined) {
      if (!profile) {
        navigate({ to: "/onboarding" });
      } else if (profile.role !== role) {
        if (profile.role === AppRole.teacher) {
          navigate({ to: "/dashboard/teacher" });
        } else {
          navigate({ to: "/dashboard/student" });
        }
      }
    }
  }, [isLoading, profile, role, navigate]);

  if (isLoading || !profile || profile.role !== role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
