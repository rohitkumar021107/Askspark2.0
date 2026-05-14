import type { ReactNode } from "react";

/**
 * AuthGuard — authentication is no longer required.
 * Profile is stored in localStorage. This component is a passthrough.
 */
export default function AuthGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
