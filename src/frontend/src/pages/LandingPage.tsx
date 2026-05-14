import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Brain,
  ChevronRight,
  GraduationCap,
  LogIn,
  Menu,
  MessageCircle,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AskSparkLogo from "../components/AskSparkLogo";
import { loadLocalProfile, saveLocalProfile } from "../hooks/useLocalProfile";
import { useUserProfile } from "../hooks/useQueries";
import { saveUserToFirestore } from "../lib/useFirestoreUsers";
import { AppRole } from "../types/appTypes";

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/", isRouter: true },
  { label: "Ask Doubt", href: "/submit", isRouter: true },
  { label: "Dashboard", href: "/dashboard", isRouter: true },
  { label: "Login", href: "/onboarding", isRouter: true },
  { label: "Sign Up", href: "/onboarding", isRouter: true },
];

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState<"teacher" | "student" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTeacher = () => {
    if (loading) return;
    setLoading("teacher");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.teacher };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "teacher");
      localStorage.setItem(
        "askspark_role_skip_sync_until",
        String(Date.now() + 15000),
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher",
      );
      navigate({ to: "/dashboard/teacher" });
    } else {
      navigate({ to: "/onboarding", search: { role: "teacher" } });
    }
  };

  const handleStudent = () => {
    if (loading) return;
    setLoading("student");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.student };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "student");
      navigate({ to: "/dashboard/student" });
    } else {
      navigate({ to: "/onboarding", search: { role: "student" } });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center flex-shrink-0"
          data-ocid="nav.logo"
        >
          <AskSparkLogo
            variant="horizontal"
            height={52}
            className="hidden md:block"
          />
          <AskSparkLogo variant="icon" height={44} className="md:hidden" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                navigate({ to: link.href as "/" });
              }}
              className="hover:text-primary transition-colors duration-150 cursor-pointer"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/40 text-primary hover:bg-primary/10 font-medium px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]"
            onClick={handleTeacher}
            disabled={loading === "teacher"}
            data-ocid="nav.teacher_button"
          >
            {loading === "teacher" ? "..." : "Join as Teacher"}
          </Button>
          <Button
            size="sm"
            className="rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 transition-all duration-150 hover:scale-[1.02] glow-button"
            onClick={handleStudent}
            disabled={loading === "student"}
            data-ocid="nav.student_button"
          >
            {loading === "student" ? "..." : "I am a Student"}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-muted/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-primary/20 px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigate({ to: link.href as "/" });
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-primary/20 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/40 text-primary w-full py-2.5"
              onClick={() => {
                setMobileOpen(false);
                handleTeacher();
              }}
              data-ocid="nav.teacher_button"
            >
              Join as Teacher
            </Button>
            <Button
              size="sm"
              className="rounded-full gradient-primary text-white border-0 w-full py-2.5 glow-button"
              onClick={() => {
                setMobileOpen(false);
                handleStudent();
              }}
              data-ocid="nav.student_button"
            >
              I am a Student
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Student Illustration ──────────────────────────────────────────────────────

const HERO_BADGES = [
  {
    label: "AI Answer",
    gradient: "from-blue-500 to-blue-600",
    delay: "0s",
    position: "-top-4 left-2",
  },
  {
    label: "24/7 Help",
    gradient: "from-purple-500 to-purple-700",
    delay: "0.5s",
    position: "-top-4 right-2",
  },
  {
    label: "Ask Freely",
    gradient: "from-indigo-500 to-violet-600",
    delay: "1s",
    position: "-bottom-4 left-1/2 -translate-x-1/2",
  },
];

function StudentIllustration() {
  return (
    <div className="relative w-56 h-56 mx-auto">
      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute inset-4 rounded-full bg-purple-500/15 blur-2xl" />
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          width="170"
          height="190"
          viewBox="0 0 170 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Student asking questions illustration"
          role="img"
        >
          <defs>
            <linearGradient id="stu-body" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="45%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="stu-head" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="stu-book-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="stu-book-r" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="stu-bubble" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(19,18,45,0.95)" />
              <stop offset="100%" stopColor="rgba(30,27,75,0.92)" />
            </linearGradient>
            <linearGradient id="stu-bubble-text" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <radialGradient id="stu-glow" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <filter
              id="stu-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor="#6366F1" floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="stu-bubble-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodColor="#6366F1"
                floodOpacity="0.5"
              />
            </filter>
          </defs>
          <ellipse cx="85" cy="115" rx="65" ry="72" fill="url(#stu-glow)" />
          <rect
            x="55"
            y="100"
            width="60"
            height="72"
            rx="12"
            fill="url(#stu-body)"
            filter="url(#stu-shadow)"
          />
          <circle
            cx="85"
            cy="72"
            r="27"
            fill="url(#stu-head)"
            filter="url(#stu-shadow)"
          />
          <ellipse
            cx="77"
            cy="62"
            rx="7"
            ry="9"
            fill="white"
            opacity="0.18"
            transform="rotate(-15 77 62)"
          />
          <circle cx="77" cy="71" r="3.5" fill="white" opacity="0.92" />
          <circle cx="93" cy="71" r="3.5" fill="white" opacity="0.92" />
          <circle cx="78" cy="71.5" r="1.5" fill="#4338CA" opacity="0.85" />
          <circle cx="94" cy="71.5" r="1.5" fill="#4338CA" opacity="0.85" />
          <path
            d="M77 80 Q85 87 93 80"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="28"
            y="105"
            width="30"
            height="10"
            rx="5"
            fill="url(#stu-body)"
            opacity="0.75"
          />
          <rect
            x="112"
            y="105"
            width="30"
            height="10"
            rx="5"
            fill="url(#stu-body)"
            opacity="0.75"
          />
          <rect
            x="24"
            y="110"
            width="38"
            height="26"
            rx="5"
            fill="#3730A3"
            opacity="0.9"
          />
          <rect
            x="25"
            y="112"
            width="17"
            height="22"
            rx="3"
            fill="url(#stu-book-l)"
            opacity="0.95"
          />
          <rect
            x="43"
            y="112"
            width="17"
            height="22"
            rx="3"
            fill="url(#stu-book-r)"
            opacity="0.95"
          />
          <line
            x1="42"
            y1="112"
            x2="42"
            y2="134"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="28"
            y1="118"
            x2="38"
            y2="118"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <line
            x1="28"
            y1="122"
            x2="38"
            y2="122"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <line
            x1="28"
            y1="126"
            x2="36"
            y2="126"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <line
            x1="45"
            y1="118"
            x2="57"
            y2="118"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <line
            x1="45"
            y1="122"
            x2="57"
            y2="122"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <line
            x1="45"
            y1="126"
            x2="55"
            y2="126"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <rect
            x="96"
            y="18"
            width="66"
            height="42"
            rx="12"
            fill="url(#stu-bubble)"
            filter="url(#stu-bubble-shadow)"
          />
          <rect
            x="96.5"
            y="18.5"
            width="65"
            height="41"
            rx="11.5"
            fill="none"
            stroke="url(#stu-bubble-text)"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <polygon points="104,60 116,60 110,70" fill="url(#stu-bubble)" />
          <text
            x="129"
            y="36"
            textAnchor="middle"
            fontSize="11"
            fill="url(#stu-bubble-text)"
            fontWeight="800"
          >
            How?
          </text>
          <text
            x="129"
            y="52"
            textAnchor="middle"
            fontSize="11"
            fill="url(#stu-bubble-text)"
            fontWeight="700"
          >
            Why?
          </text>
          <path
            d="M56 47 L57.5 50.5 L61 52 L57.5 53.5 L56 57 L54.5 53.5 L51 52 L54.5 50.5 Z"
            fill="#FCD34D"
            opacity="0.9"
          />
          <path
            d="M114 40 L114.9 42.2 L117 43 L114.9 43.8 L114 46 L113.1 43.8 L111 43 L113.1 42.2 Z"
            fill="#C4B5FD"
            opacity="0.9"
          />
          <path
            d="M152 58 L152.7 59.8 L154.5 60.5 L152.7 61.2 L152 63 L151.3 61.2 L149.5 60.5 L151.3 59.8 Z"
            fill="#93C5FD"
            opacity="0.8"
          />
          <path
            d="M15 78 L16.2 81 L19 82 L16.2 83 L15 86 L13.8 83 L11 82 L13.8 81 Z"
            fill="#818CF8"
            opacity="0.75"
          />
        </svg>
      </div>
      {HERO_BADGES.map((badge) => (
        <div
          key={badge.label}
          className={`absolute ${badge.position} badge-float`}
          style={{ animationDelay: badge.delay }}
        >
          <div
            className={`bg-gradient-to-r ${badge.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`}
            style={{
              boxShadow:
                "0 2px 14px rgba(99,102,241,0.6), 0 1px 3px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            {badge.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────────

const HOW_CARDS = [
  {
    icon: MessageCircle,
    iconGrad: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.45)",
    title: "Ask Your Doubt",
    desc: "Submit any doubt anonymously, any time. Text or image — no judgment, no fear.",
    badge: "Step 1",
  },
  {
    icon: Brain,
    iconGrad: "from-purple-500 to-indigo-500",
    glow: "rgba(168,85,247,0.45)",
    title: "Get AI Answer",
    desc: "Get instant AI-powered answers in seconds. Smart, accurate, and always available.",
    badge: "Step 2",
  },
  {
    icon: GraduationCap,
    iconGrad: "from-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.45)",
    title: "Teacher Support",
    desc: "Real teachers review and answer complex doubts with detailed explanations.",
    badge: "Step 3",
  },
];

const ABOUT_CARDS = [
  {
    icon: AlertTriangle,
    iconGrad: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.4)",
    title: "The Problem",
    bullets: [
      "Students fear asking doubts in class",
      "Questions go unanswered, confidence drops",
    ],
  },
  {
    icon: Shield,
    iconGrad: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.4)",
    title: "Our Solution",
    bullets: [
      "Ask anonymously — no fear, no judgment",
      "Safe, supportive learning environment",
    ],
  },
  {
    icon: Sparkles,
    iconGrad: "from-purple-500 to-violet-600",
    glow: "rgba(139,92,246,0.4)",
    title: "AskSpark Platform",
    bullets: [
      "AI + real teachers always available",
      "Fast, reliable answers 24/7",
    ],
  },
];

const FEATURE_CARDS = [
  {
    icon: MessageCircle,
    iconGrad: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.4)",
    title: "Ask Any Question",
    desc: "No question is too small. Ask anonymously or with your name — get answers fast.",
  },
  {
    icon: Users,
    iconGrad: "from-purple-500 to-indigo-500",
    glow: "rgba(168,85,247,0.4)",
    title: "Learn Together",
    desc: "Join a community of students. Share knowledge, solve problems together.",
  },
  {
    icon: TrendingUp,
    iconGrad: "from-indigo-500 to-blue-600",
    glow: "rgba(99,102,241,0.4)",
    title: "Track Your Progress",
    desc: "Watch your confidence score and XP grow with every question answered.",
  },
  {
    icon: Star,
    iconGrad: "from-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.4)",
    title: "Build Confidence",
    desc: "From nervous to confident — AskSpark turns doubts into your biggest strengths.",
  },
];

const HOW_STEPS = [
  {
    icon: LogIn,
    title: "Sign In or Stay Anonymous",
    subtitle: "Your choice — no pressure",
  },
  {
    icon: Send,
    title: "Submit Your Doubt",
    subtitle: "Text or image — any format",
  },
  {
    icon: Zap,
    title: "AI Processes & Organizes",
    subtitle: "Smart categorization instantly",
  },
  {
    icon: GraduationCap,
    title: "Teacher Answers",
    subtitle: "Text or video explanation",
  },
  {
    icon: Trophy,
    title: "Gain Confidence",
    subtitle: "XP points + confidence score",
  },
];

const TEAM = [
  {
    name: "Rohit Kumar",
    role: "Founder",
    emoji: "🚀",
    grad: "from-blue-500 to-indigo-600",
  },
  {
    name: "P. Rohit",
    role: "Developer",
    emoji: "💻",
    grad: "from-indigo-500 to-purple-600",
  },
  {
    name: "Nehal",
    role: "Designer",
    emoji: "🎨",
    grad: "from-purple-500 to-pink-500",
  },
  {
    name: "K. Hemanth",
    role: "Backend Developer",
    emoji: "⚙️",
    grad: "from-violet-500 to-blue-600",
  },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const { data: profile } = useUserProfile();
  const [ctaLoading, setCtaLoading] = useState<"doubt" | "teacher" | null>(
    null,
  );
  const featuresRef = useRef<HTMLElement>(null);

  const handleJoinAsTeacher = () => {
    if (ctaLoading) return;
    setCtaLoading("teacher");
    const localProfile = loadLocalProfile();
    if (localProfile) {
      const updated = { ...localProfile, role: AppRole.teacher };
      saveLocalProfile(updated);
      localStorage.setItem("askspark_role", "teacher");
      localStorage.setItem(
        "askspark_role_skip_sync_until",
        String(Date.now() + 15000),
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher",
      );
      navigate({ to: "/dashboard/teacher" });
    } else {
      navigate({ to: "/onboarding", search: { role: "teacher" } });
    }
  };

  const handleAskDoubt = () => {
    if (ctaLoading) return;
    setCtaLoading("doubt");
    navigate({ to: "/submit" });
  };

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="gradient-hero min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 overflow-hidden relative">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-1.5 glass-card border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 neon-border">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Education Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-tight tracking-tight text-foreground max-w-lg mb-4">
              Learn Better. <span className="text-gradient">Ask Smarter.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
              Get instant answers from AI or Teachers. Any doubt. Any time.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 mb-2"
              data-ocid="hero.cta_row"
            >
              <Button
                size="lg"
                className="rounded-xl gradient-primary text-white font-semibold px-7 py-3 shadow-primary border-0 hover:opacity-90 transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto min-w-[160px] glow-button"
                onClick={handleAskDoubt}
                disabled={ctaLoading === "doubt"}
                data-ocid="hero.ask_doubt"
              >
                {ctaLoading === "doubt" ? "Loading..." : "Ask a Doubt"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 border-primary/40 text-primary hover:bg-primary/10 font-semibold px-7 py-3 transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto min-w-[160px]"
                onClick={handleExplore}
                data-ocid="hero.explore"
              >
                Explore
              </Button>
            </div>

            {profile && (
              <div
                className="flex items-center gap-3 p-3 rounded-xl glass-card border-primary/25 warm-shadow mt-6"
                data-ocid="hero.welcome_panel"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {profile.role === AppRole.teacher ? "T" : "S"}
                </div>
                <div className="flex-1 text-sm min-w-0">
                  <span className="font-semibold text-foreground">
                    Welcome back!
                  </span>
                  <span className="text-muted-foreground ml-1 text-xs">
                    You’re signed in as{" "}
                    {profile.role === AppRole.teacher
                      ? "a teacher"
                      : "a student"}
                    .
                  </span>
                </div>
                <Button
                  size="sm"
                  className="rounded-full gradient-primary text-white border-0 font-semibold flex-shrink-0"
                  onClick={() =>
                    navigate({
                      to:
                        profile.role === AppRole.teacher
                          ? "/dashboard/teacher"
                          : "/dashboard/student",
                    })
                  }
                  data-ocid="hero.dashboard_button"
                >
                  Dashboard <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Right — illustration card */}
          <div className="flex justify-center items-center">
            <div className="glass-card rounded-2xl p-6 warm-shadow-xl w-full max-w-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-purple-600/8 rounded-2xl pointer-events-none" />
              <div className="flex items-center justify-center py-4 relative z-10">
                <StudentIllustration />
              </div>
              <div className="mt-4 px-2 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    Confidence Score
                  </span>
                  <span className="text-sm font-bold text-primary">85%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-primary/10 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
                    style={{
                      width: "85%",
                      boxShadow: "0 0 8px rgba(139,80,230,0.6)",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Keep asking to grow your score!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW ASKSPARK WORKS ──────────────────────────────────────────────── */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.003 265) 0%, oklch(0.10 0.012 275) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Simple 3-Step Process
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto">
              How <span className="text-gradient">AskSpark</span> Works
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              From doubt to confidence in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_CARDS.map((card) => (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-7 hover-lift neon-border group cursor-default relative overflow-hidden"
                data-ocid={`how.${card.badge.toLowerCase().replace(" ", "_")}_card`}
              >
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${card.glow}, transparent)`,
                  }}
                />
                <div className="inline-flex items-center gap-1 bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-2.5 py-1 rounded-full mb-5">
                  {card.badge}
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                  style={{
                    boxShadow: `0 8px 24px ${card.glow}, 0 0 12px ${card.glow}`,
                  }}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASKSPARK ────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.012 275) 0%, oklch(0.12 0.015 290) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              About the Platform
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Why <span className="text-gradient">AskSpark</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ABOUT_CARDS.map((card) => (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-6 hover-lift neon-border cursor-default group relative overflow-hidden"
              >
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-25 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${card.glow}, transparent)`,
                  }}
                />
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                  style={{ boxShadow: `0 4px 16px ${card.glow}` }}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60 mt-2 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section
        id="features-grid"
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.015 290) 0%, oklch(0.10 0.012 275) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Platform Features
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need to{" "}
              <span className="text-gradient">Learn Confidently</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-6 hover-lift neon-border cursor-default group relative overflow-hidden"
              >
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${card.glow}, transparent)`,
                  }}
                />
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                  style={{ boxShadow: `0 4px 16px ${card.glow}` }}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS STEPS ──────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.012 275) 0%, oklch(0.09 0.008 270) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              5 Steps to <span className="text-gradient">Confidence</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-start justify-between gap-2">
            {HOW_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-2 flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-2xl glass-card warm-shadow flex items-center justify-center neon-border">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center shadow-primary">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-1 leading-tight px-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="flex-shrink-0 mt-5">
                    <ChevronRight className="w-5 h-5 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="lg:hidden flex flex-col items-center gap-3">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center w-full max-w-xs"
              >
                <div className="glass-card rounded-2xl p-5 w-full warm-shadow neon-border flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center neon-border">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="py-2">
                    <ArrowDown className="w-4 h-4 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ───────────────────────────────────────────────────────── */}
      <section
        id="our-story"
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.09 0.008 270) 0%, oklch(0.11 0.015 285) 50%, oklch(0.09 0.008 270) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <span>💡</span> Our Origin
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-3">
            Our Story
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-12">
            How AskSpark Started
          </p>

          <div className="glass-card warm-shadow rounded-3xl p-8 sm:p-12 text-left space-y-6 neon-border">
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">💡</span>
              <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                AskSpark started as a simple college project by a group of
                first-year{" "}
                <strong>Electrical and Electronics Engineering (EEE)</strong>{" "}
                students.
              </p>
            </div>
            <hr className="border-primary/20" />
            <div className="text-center space-y-3">
              <p className="text-muted-foreground text-base leading-relaxed">
                During our classes, we noticed a common problem — many students
                had doubts but hesitated to ask them. Fear of judgment, lack of
                confidence, and limited interaction often stopped learning.
              </p>
              <p className="text-foreground font-semibold text-base sm:text-lg">
                We realized that{" "}
                <span className="text-gradient">
                  learning is not just about studying — it’s about asking
                  questions freely.
                </span>
              </p>
              <p className="text-muted-foreground text-base">
                So, we decided to build AskSpark.
              </p>
            </div>
            <hr className="border-primary/20" />
            <div className="text-center space-y-4">
              <p className="text-primary text-sm font-bold uppercase tracking-widest">
                A platform where students can:
              </p>
              <ul className="flex flex-col items-center gap-3">
                {[
                  { icon: "🙋", text: "Ask doubts without fear" },
                  { icon: "👩‍🏫", text: "Get real help from teachers" },
                  { icon: "📈", text: "Build confidence step by step" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-base font-semibold text-foreground"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <strong>{item.text}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-primary/20" />
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">📈</span>
              <p className="text-muted-foreground text-base leading-relaxed">
                What began as a small idea in our first year has now grown into
                a mission:
              </p>
              <p className="text-base sm:text-lg font-bold">
                <strong className="text-gradient">
                  To make learning fearless and accessible for everyone.
                </strong>
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-4xl">🎓</span>
            <p className="font-display text-2xl sm:text-3xl font-bold text-gradient leading-snug">
              We are not just building a platform.
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-gradient leading-snug">
              We are building confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────────── */}
      <section
        id="team"
        className="py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.09 0.008 270) 0%, oklch(0.10 0.012 275) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              The Team
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Meet <span className="text-gradient">Team Spark</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="glass-card rounded-2xl p-6 text-center hover-lift neon-border group"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.grad} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                  style={{ boxShadow: "0 4px 20px rgba(139,80,230,0.4)" }}
                >
                  {member.emoji}
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-primary font-semibold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 gradient-bg">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden warm-shadow-xl neon-border">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/80 via-purple-800/80 to-violet-900/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="relative px-8 py-14 text-center">
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
                Start Your Learning Journey Today
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto text-base">
                Join thousands of students building real confidence with
                AskSpark
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-indigo-700 font-semibold px-8 py-3 hover:bg-white/90 transition-all duration-150 hover:scale-[1.02] border-0 shadow-lg min-w-[160px] w-full sm:w-auto"
                  onClick={handleAskDoubt}
                  data-ocid="cta.ask_doubt"
                >
                  Ask a Doubt <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 transition-all duration-150 hover:scale-[1.02] min-w-[160px] w-full sm:w-auto"
                  onClick={handleJoinAsTeacher}
                  data-ocid="cta.teacher_button"
                >
                  Join as Teacher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background:
            "linear-gradient(180deg, oklch(0.07 0.003 265) 0%, oklch(0.06 0.003 265) 100%)",
          borderTop: "1px solid rgba(139,125,230,0.2)",
        }}
        className="py-16 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <AskSparkLogo variant="icon" height={32} />
              <span className="font-display text-lg font-bold text-foreground">
                AskSpark
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The AI-powered confidence-building platform for students. Ask
              freely, learn boldly.
            </p>
          </div>
          <div>
            <div className="font-display font-bold text-foreground/70 mb-4 text-sm uppercase tracking-wider">
              Platform
            </div>
            <div className="space-y-2">
              {["Features", "How It Works", "For Students", "For Teachers"].map(
                (l) => (
                  <div
                    key={l}
                    className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors"
                  >
                    {l}
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-foreground/70 mb-4 text-sm uppercase tracking-wider">
              Contact
            </div>
            <div className="space-y-2 text-muted-foreground text-sm">
              <div>📧 hello@askspark.app</div>
              <div>🌐 English · हिंदी · తెలుగు</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-primary/15 text-center text-muted-foreground text-sm">
          © {year} AskSpark · Team Spark. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
