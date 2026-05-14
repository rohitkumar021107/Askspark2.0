import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import CallManager from "./components/CallManager";
import PageSkeleton from "./components/PageSkeleton";
import { loadLocalProfile } from "./hooks/useLocalProfile";
import { useRoleSync } from "./hooks/useRoleSync";
import { AppRole } from "./types/appTypes";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const SubmitDoubt = lazy(() => import("./pages/SubmitDoubt"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const WeeklyTest = lazy(() => import("./pages/WeeklyTest"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LearningHub = lazy(() => import("./pages/LearningHub"));
const LecturesPage = lazy(() => import("./pages/LecturesPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const VideoCallPage = lazy(() => import("./pages/VideoCallPage"));
const LiveClassPage = lazy(() => import("./pages/LiveClassPage"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

function RoleSyncManager() {
  useRoleSync();
  return null;
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <RoleSyncManager />
      <CallManager />
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  validateSearch: (search: Record<string, unknown>): { role?: string } => {
    const role = search.role as string | undefined;
    return role ? { role } : {};
  },
  component: OnboardingPage,
});
const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: SubmitDoubt,
});
const studentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/student",
  component: StudentDashboard,
});
const teacherDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/teacher",
  component: TeacherDashboard,
});
// /dashboard redirect — sends user to role-specific dashboard
const dashboardRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: () => {
    const profile = loadLocalProfile();
    // Also check the direct askspark_role key as a fallback
    const directRole = localStorage.getItem("askspark_role");
    const isTeacher =
      profile?.role === AppRole.teacher ||
      directRole === AppRole.teacher ||
      directRole === "teacher";
    throw redirect({
      to: isTeacher ? "/dashboard/teacher" : "/dashboard/student",
    });
  },
  component: () => null,
});
const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpCenter,
});
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatRoom,
});
const weeklyTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/weekly-test",
  component: WeeklyTest,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogList,
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPost,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});
const learningHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning",
  component: LearningHub,
});
const lecturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning/lectures",
  component: LecturesPage,
});
const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning/practice",
  component: PracticePage,
});
const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning/support",
  component: SupportPage,
});

const videoCallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/call/$callId",
  validateSearch: (
    search: Record<string, unknown>,
  ): { role?: string; callType?: string } => ({
    role: (search.role as string) ?? undefined,
    callType: (search.callType as string) ?? undefined,
  }),
  component: VideoCallPage,
});

const liveClassRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$classId",
  component: LiveClassPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});

// Short URL aliases
const blogHesitateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/why-students-hesitate",
  beforeLoad: () => {
    throw redirect({
      to: "/blog/$slug",
      params: { slug: "why-students-hesitate-to-ask-questions" },
    });
  },
  component: () => null,
});

const blogAnonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/benefits-anonymous-doubt",
  beforeLoad: () => {
    throw redirect({
      to: "/blog/$slug",
      params: { slug: "benefits-of-anonymous-doubt-platforms" },
    });
  },
  component: () => null,
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  submitRoute,
  studentDashboardRoute,
  teacherDashboardRoute,
  dashboardRedirectRoute,
  helpRoute,
  chatRoute,
  weeklyTestRoute,
  blogRoute,
  blogHesitateRoute,
  blogAnonRoute,
  blogPostRoute,
  profileRoute,
  learningHubRoute,
  lecturesRoute,
  practiceRoute,
  supportRoute,
  videoCallRoute,
  liveClassRoute,
  adminRoute,
  catchAllRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
