import AvatarButton from "@/components/AvatarButton";
import VideoCallModal from "@/components/VideoCallModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { rtdbListen } from "@/hooks/useFirebaseRTDB";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Bell,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Home,
  List,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Send,
  Star,
  TrendingUp,
  User,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { loadLocalProfile } from "../hooks/useLocalProfile";
import { useNotifications } from "../hooks/useNotifications";
import { type FirestoreDoubt, useMyDoubts } from "../lib/useFirestoreDoubts";
import { getRating, submitRating } from "../lib/useFirestoreRatings";

// ── Sidebar navigation items ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Plus, label: "Ask Doubt", id: "ask", href: "/submit" },
  { icon: List, label: "My Doubts", id: "doubts" },
  { icon: MessageSquare, label: "AI Chat", id: "chat", href: "/chat" },
  { icon: Bookmark, label: "Bookmarks", id: "bookmarks" },
  { icon: User, label: "Profile", id: "profile", href: "/profile/student" },
];

// ── Types ────────────────────────────────────────────────────────────────────
type NotifItem = {
  id: number;
  icon: string;
  type: string;
  relatedId: number | string | null;
  text: string;
  time: string;
  read: boolean;
};

type AiMessage = { role: "user" | "ai"; text: string };

type LiveClass = {
  id: string;
  title: string;
  subject: string;
  hostName: string;
  viewerCount: number;
  active: boolean;
};

// ── Confidence ring SVG ───────────────────────────────────────────────────────
function ConfidenceRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#a78bfa" : "#f59e0b";
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg
        width="96"
        height="96"
        className="absolute inset-0 -rotate-90"
        role="img"
        aria-label="Confidence score ring"
      >
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="rgba(129,115,220,0.2)"
          strokeWidth="8"
        />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 1s ease",
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      <div className="font-display font-bold text-foreground text-xl">
        {score}
      </div>
    </div>
  );
}

// ── Inline AI chat box ────────────────────────────────────────────────────────
const AI_GREET: AiMessage = {
  role: "ai",
  text: "Hi! I'm your AI Study Assistant. Ask me anything about your subjects 📚",
};

const AI_RESPONSES = [
  "Great question! Let me break that down for you step by step.",
  "Here's what you need to know about this topic:",
  "That's a common doubt — you're not alone! The key concept here is...",
  "I've found a quick explanation for you. Would you like more detail?",
  "Let me simplify this for you!",
];

function AiChatBox({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [messages, setMessages] = useState<AiMessage[]>([AI_GREET]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message or typing change
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  function sendMessage() {
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { role: "user", text: txt }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply =
        AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    }, 1200);
  }

  return (
    <div
      className="glass-card rounded-2xl border-[rgba(129,115,220,0.35)] flex flex-col h-80"
      data-ocid="student.ai_chat.panel"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(129,115,220,0.2)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-foreground text-sm">
            AI Study Assistant
          </span>
        </div>
        <button
          type="button"
          className="text-xs text-primary hover:underline"
          onClick={() => navigate({ to: "/chat" })}
          data-ocid="student.ai_chat.open_button"
        >
          Open full chat →
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin"
      >
        {messages.slice(-5).map((msg, msgIdx) => (
          <div
            key={`${msg.role}-${msgIdx}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm"
                  : "bg-[rgba(40,35,80,0.7)] text-foreground/90 border border-[rgba(129,115,220,0.25)] rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-[rgba(40,35,80,0.7)] border border-[rgba(129,115,220,0.25)] rounded-2xl rounded-bl-sm px-4 py-2">
              <div className="flex gap-1 items-center h-4">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-3 py-2 border-t border-[rgba(129,115,220,0.2)]">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            className="flex-1 h-8 text-xs bg-[rgba(15,14,35,0.6)] border-[rgba(129,115,220,0.3)] text-foreground placeholder:text-muted-foreground focus:border-primary rounded-full px-3"
            placeholder="Ask anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-ocid="student.ai_chat.input"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center hover:shadow-lg transition-all flex-shrink-0"
            aria-label="Send message"
            data-ocid="student.ai_chat.submit_button"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Doubt card ────────────────────────────────────────────────────────────────
function FirestoreDoubtStudentCard({
  doubt,
  index,
  expanded,
  onToggle,
  studentId,
}: {
  doubt: FirestoreDoubt;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  studentId: string;
}) {
  const [localRating, setLocalRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    if (doubt.status === "answered" && !ratingSubmitted) {
      getRating(doubt.id, studentId).then((r) => {
        if (r !== null) {
          setLocalRating(r);
          setRatingSubmitted(true);
        }
      });
    }
  }, [doubt.id, doubt.status, studentId, ratingSubmitted]);

  async function handleRate(stars: number) {
    if (ratingSubmitted) return;
    setLocalRating(stars);
    setRatingSubmitted(true);
    try {
      await submitRating(
        doubt.id,
        doubt.userId,
        doubt.teacherName ?? "Teacher",
        studentId,
        stars,
      );
    } catch {
      /* ignore */
    }
  }

  const isAnswered = doubt.status === "answered";

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        isAnswered
          ? "border-emerald-500/30 bg-[rgba(16,185,129,0.05)]"
          : "border-amber-500/30 bg-[rgba(245,158,11,0.04)]"
      }`}
      data-ocid={`student.item.${index + 1}`}
    >
      <button
        type="button"
        className="flex items-start justify-between gap-3 w-full text-left p-4"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[rgba(129,115,220,0.2)] text-primary">
              {doubt.subject}
            </span>
            {isAnswered ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> Answered
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> Pending
              </span>
            )}
          </div>
          <div className="font-semibold text-foreground text-sm truncate">
            {doubt.question}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {doubt.createdAt
              ? new Date(doubt.createdAt).toLocaleDateString()
              : ""}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-white/10 animate-fade-in">
          {isAnswered && doubt.answer ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-emerald-400 mb-1">
                ✅ Teacher's Answer
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/25 rounded-lg p-3">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {doubt.answer}
                </p>
                {doubt.teacherName && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    — {doubt.teacherName}
                    {doubt.answeredAt
                      ? `, ${new Date(doubt.answeredAt).toLocaleString()}`
                      : ""}
                  </p>
                )}
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {ratingSubmitted ? "Your rating:" : "Rate this answer:"}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRate(star)}
                      disabled={ratingSubmitted}
                      className={`text-lg transition-colors ${
                        star <= (localRating ?? 0)
                          ? "text-yellow-400"
                          : "text-white/20 hover:text-yellow-300"
                      } ${ratingSubmitted ? "cursor-default" : "cursor-pointer"}`}
                      data-ocid={`student.rating.${index + 1}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {ratingSubmitted && (
                  <p className="text-xs text-emerald-500 mt-1">
                    Thanks for your feedback!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <Clock className="w-4 h-4" />
              <span>Waiting for a teacher to answer</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Active Live Classes ───────────────────────────────────────────────────────
function ActiveLiveClasses({
  navigate,
}: { navigate: ReturnType<typeof useNavigate> }) {
  const [classes, setClasses] = useState<LiveClass[]>([]);

  useEffect(() => {
    const unsub = rtdbListen("liveClasses", (val) => {
      const raw = val as Record<string, Omit<LiveClass, "id">> | null;
      if (!raw) {
        setClasses([]);
        return;
      }
      setClasses(
        Object.entries(raw)
          .filter(([, c]) => c.active)
          .map(([id, c]) => ({ ...c, id })),
      );
    });
    return unsub;
  }, []);

  if (classes.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-sm font-bold text-foreground">Live Now</span>
      </div>
      {classes.map((c, i) => (
        <div
          key={c.id}
          className="flex items-center justify-between p-3 rounded-xl bg-[rgba(239,68,68,0.08)] border border-red-500/20"
          data-ocid={`liveclass.item.${i + 1}`}
        >
          <div>
            <div className="font-semibold text-sm text-foreground">
              {c.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {c.subject} · {c.hostName} · {c.viewerCount ?? 0} watching
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-bold transition-all"
            onClick={() =>
              navigate({ to: `/live/${c.id}`, search: { role: "viewer" } })
            }
            data-ocid={`liveclass.primary_button.${i + 1}`}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  onNav,
  navigate,
  collapsed,
  onClose,
}: {
  active: string;
  onNav: (id: string) => void;
  navigate: ReturnType<typeof useNavigate>;
  collapsed: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          role="presentation"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out
          ${collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
          w-64 glass-nav border-r border-[rgba(129,115,220,0.25)]
        `}
        data-ocid="student.sidebar"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[rgba(129,115,220,0.2)]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-primary">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-foreground text-lg">
            AskSpark
          </span>
          <button
            type="button"
            className="ml-auto text-muted-foreground hover:text-foreground lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav
          className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
          data-ocid="student.nav"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.href) navigate({ to: item.href });
                else onNav(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-gradient-to-r from-violet-600/30 to-indigo-600/20 text-foreground border border-primary/30 shadow-[0_0_12px_rgba(139,80,230,0.2)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-[rgba(129,115,220,0.12)] hover:border hover:border-[rgba(129,115,220,0.15)]"
              }`}
              data-ocid={`student.nav.${item.id}`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${
                  active === item.id ? "text-primary" : ""
                }`}
              />
              {item.label}
              {active === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[rgba(129,115,220,0.2)]">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            data-ocid="student.logout_button"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const navigate = useNavigate();
  const localProfile = loadLocalProfile();
  const userId = localProfile?.userId ?? "";
  const displayName = localProfile?.displayName ?? "Student";

  const realDoubts = useMyDoubts(userId);

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [expandedDoubt, setExpandedDoubt] = useState<number | string | null>(
    null,
  );
  const [videoCallDoubt, setVideoCallDoubt] = useState<number | string | null>(
    null,
  );
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Notifications
  const {
    notifications: rtdbNotifs,
    unreadCount,
    markRead: markReadRTDB,
    markAllRead: markAllReadRTDB,
  } = useNotifications(userId);

  const answeredDoubts = realDoubts.filter((d) => d.status === "answered");
  const pendingDoubts = realDoubts.filter((d) => d.status !== "answered");
  const confidenceScore = Math.min(realDoubts.length * 15, 100);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleNotifClick(n: NotifItem) {
    markReadRTDB(String(n.id));
    setNotifOpen(false);
    if (n.type === "doubt_reply" || n.type === "doubt_answered") {
      setActiveSection("doubts");
    } else if (n.type === "message") {
      navigate({ to: "/chat" });
    }
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Stat cards data
  const statCards = [
    {
      label: "Doubts Asked",
      value: realDoubts.length,
      icon: MessageSquare,
      color: "from-violet-600 to-indigo-600",
      glow: "rgba(139,80,230,0.35)",
      textColor: "text-violet-400",
      ocid: "student.stat.doubts_asked",
    },
    {
      label: "Answered",
      value: answeredDoubts.length,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.35)",
      textColor: "text-emerald-400",
      ocid: "student.stat.answered",
    },
    {
      label: "Pending",
      value: pendingDoubts.length,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.35)",
      textColor: "text-amber-400",
      ocid: "student.stat.pending",
    },
    {
      label: "Bookmarks",
      value: 0,
      icon: Bookmark,
      color: "from-sky-500 to-blue-600",
      glow: "rgba(14,165,233,0.35)",
      textColor: "text-sky-400",
      ocid: "student.stat.bookmarks",
    },
  ];

  if (isLoading) {
    return (
      <div className="dashboard-gradient min-h-screen flex">
        <div className="w-64 hidden lg:block" />
        <div className="flex-1 p-6 space-y-6">
          <Skeleton className="w-56 h-8 rounded-lg bg-white/5" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl glass-card p-5 space-y-3">
                <Skeleton className="w-8 h-8 rounded-lg bg-white/5" />
                <Skeleton className="w-12 h-7 rounded bg-white/5" />
                <Skeleton className="w-20 h-3 rounded bg-white/5" />
              </div>
            ))}
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl glass-card p-5 space-y-3">
              <Skeleton className="w-32 h-5 rounded bg-white/5" />
              <Skeleton className="w-3/4 h-4 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-gradient min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        active={activeSection}
        onNav={setActiveSection}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarCollapsed(true)}
      />

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 glass-nav"
          data-ocid="student.topbar"
        >
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              type="button"
              className="lg:hidden w-9 h-9 rounded-xl bg-[rgba(129,115,220,0.15)] border border-[rgba(129,115,220,0.25)] flex items-center justify-center text-foreground hover:bg-[rgba(129,115,220,0.25)] transition-colors"
              onClick={() => setSidebarCollapsed(false)}
              aria-label="Open menu"
              data-ocid="student.menu_button"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="hidden sm:block">
              <div className="text-xs text-muted-foreground">{dateStr}</div>
              <div className="font-display font-bold text-foreground text-sm">
                {greeting}, {displayName} 👋
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                className="relative w-9 h-9 rounded-xl bg-[rgba(129,115,220,0.12)] border border-[rgba(129,115,220,0.2)] flex items-center justify-center hover:bg-[rgba(129,115,220,0.22)] transition-colors"
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
                data-ocid="student.open_modal_button"
              >
                <Bell className="w-4 h-4 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div
                  className="absolute top-full mt-2 right-0 w-80 glass-card rounded-2xl shadow-xl border-[rgba(129,115,220,0.35)] overflow-hidden z-50"
                  data-ocid="student.popover"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(129,115,220,0.2)]">
                    <span className="font-display font-bold text-sm text-foreground">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={markAllReadRTDB}
                        data-ocid="student.secondary_button"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  {(rtdbNotifs as unknown as NotifItem[]).map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-[rgba(129,115,220,0.1)] transition-colors border-b border-[rgba(129,115,220,0.1)] last:border-0 ${n.read ? "opacity-60" : ""}`}
                      onClick={() => handleNotifClick(n)}
                    >
                      <span className="text-lg flex-shrink-0 mt-0.5">
                        {n.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground">{n.text}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {n.time}
                        </div>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </button>
                  ))}
                  {rtdbNotifs.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No notifications yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ask Doubt CTA */}
            <Button
              size="sm"
              className="rounded-xl gradient-primary text-white border-0 glow-button text-xs font-bold h-9 px-4"
              onClick={() => navigate({ to: "/submit" })}
              data-ocid="student.primary_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Ask Doubt
            </Button>

            {/* Avatar */}
            <AvatarButton
              imageUrl={localProfile?.profileImageUrl}
              name={displayName}
            />
          </div>
        </header>

        {/* Scrollable page */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {/* ── Welcome Banner ── */}
          <div
            className="glass-card rounded-2xl p-5 border-[rgba(129,115,220,0.35)] relative overflow-hidden"
            data-ocid="student.welcome.section"
          >
            {/* Glow blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back,{" "}
                <span className="text-gradient">{displayName}</span>!
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Ready to spark your curiosity today? You have{" "}
                <span className="text-amber-400 font-semibold">
                  {pendingDoubts.length} pending doubt
                  {pendingDoubts.length !== 1 ? "s" : ""}
                </span>{" "}
                awaiting answers.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Button
                  className="rounded-xl gradient-primary text-white border-0 glow-button text-sm font-bold"
                  onClick={() => navigate({ to: "/submit" })}
                  data-ocid="student.ask_doubt.button"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Ask a Doubt
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-[rgba(129,115,220,0.4)] text-foreground hover:bg-[rgba(129,115,220,0.12)] text-sm"
                  onClick={() => navigate({ to: "/chat" })}
                  data-ocid="student.ai_chat_cta.button"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5 text-primary" /> AI
                  Chat
                </Button>
              </div>
            </div>
          </div>

          {/* ── Stats Cards ── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            data-ocid="student.stats.section"
          >
            {statCards.map((card) => (
              <div
                key={card.label}
                className="glass-card rounded-2xl p-4 sm:p-5 border-[rgba(129,115,220,0.25)] hover-lift"
                style={{ boxShadow: `0 4px 24px ${card.glow}30` }}
                data-ocid={card.ocid}
              >
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}
                  style={{ boxShadow: `0 4px 16px ${card.glow}` }}
                >
                  <card.icon className="w-4 h-4 text-white" />
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-display font-bold ${card.textColor}`}
                >
                  {card.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Main grid: Doubts + Chat ── */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Recent Doubts — 3/5 cols */}
            <div className="xl:col-span-3 space-y-4" id="doubts-section">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" /> Recent Doubts
                </h2>
                <Button
                  size="sm"
                  className="rounded-xl gradient-primary text-white border-0 text-xs font-bold h-8 px-3"
                  onClick={() => navigate({ to: "/submit" })}
                  data-ocid="student.new_doubt.button"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
              </div>

              <div className="space-y-2" data-ocid="student.list">
                {realDoubts.length === 0 ? (
                  <div
                    className="text-center py-12 glass-card rounded-2xl border-[rgba(129,115,220,0.25)]"
                    data-ocid="student.empty_state"
                  >
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 text-primary/30" />
                    <p className="font-medium text-foreground">No doubts yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ask your first doubt to get started!
                    </p>
                    <Button
                      size="sm"
                      className="mt-4 rounded-xl gradient-primary text-white border-0"
                      onClick={() => navigate({ to: "/submit" })}
                      data-ocid="student.primary_button"
                    >
                      Ask a Doubt
                    </Button>
                  </div>
                ) : (
                  realDoubts
                    .slice(0, 8)
                    .map((doubt, i) => (
                      <FirestoreDoubtStudentCard
                        key={doubt.id}
                        doubt={doubt}
                        index={i}
                        expanded={expandedDoubt === doubt.id}
                        onToggle={() =>
                          setExpandedDoubt(
                            expandedDoubt === doubt.id ? null : doubt.id,
                          )
                        }
                        studentId={userId}
                      />
                    ))
                )}
              </div>
            </div>

            {/* Right column — Confidence + AI Chat */}
            <div className="xl:col-span-2 space-y-4">
              {/* Confidence Score */}
              <div
                className="glass-card rounded-2xl p-5 border-[rgba(129,115,220,0.35)] text-center relative overflow-hidden"
                data-ocid="student.confidence.card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/10 pointer-events-none" />
                <h3 className="font-display font-bold text-foreground text-sm mb-3 relative">
                  Confidence Score
                </h3>
                <div className="flex justify-center relative">
                  <ConfidenceRing score={confidenceScore} />
                </div>
                <div className="mt-3 text-xs text-muted-foreground relative">
                  {confidenceScore < 30
                    ? "🌱 Keep asking to grow!"
                    : confidenceScore < 60
                      ? "📈 You're building momentum!"
                      : "🔥 Excellent confidence!"}
                </div>
                <div className="mt-2 relative">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    +{Math.max(confidenceScore, 5)} pts total
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: MessageSquare,
                    label: "Ask a Doubt",
                    href: "/submit",
                    color: "from-violet-600 to-indigo-600",
                    glow: "rgba(139,80,230,0.4)",
                    ocid: "student.quick_ask.button",
                  },
                  {
                    icon: Video,
                    label: "Join Live",
                    action: () => navigate({ to: "/dashboard/student" }),
                    color: "from-rose-600 to-pink-600",
                    glow: "rgba(239,68,68,0.4)",
                    ocid: "student.quick_live.button",
                  },
                  {
                    icon: Search,
                    label: "Search",
                    href: "/learning",
                    color: "from-sky-600 to-blue-600",
                    glow: "rgba(14,165,233,0.4)",
                    ocid: "student.quick_search.button",
                  },
                  {
                    icon: Zap,
                    label: "AI Chat",
                    href: "/chat",
                    color: "from-emerald-600 to-teal-600",
                    glow: "rgba(16,185,129,0.4)",
                    ocid: "student.quick_chat.button",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.href ? navigate({ to: item.href }) : item.action?.()
                    }
                    className="action-card glass-card rounded-xl p-3 border-[rgba(129,115,220,0.25)] flex flex-col items-center gap-2 text-center"
                    style={{ boxShadow: `0 4px 16px ${item.glow}20` }}
                    data-ocid={item.ocid}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}
                      style={{ boxShadow: `0 4px 16px ${item.glow}` }}
                    >
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Live Classes */}
              <ActiveLiveClasses navigate={navigate} />
            </div>
          </div>

          {/* ── AI Study Assistant ── */}
          <AiChatBox navigate={navigate} />

          {/* ── Video Solutions ── */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" /> Video Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Algebra Basics Explained",
                  subject: "Mathematics",
                  thumb: "🧮",
                  color: "from-violet-600/20 to-indigo-600/20",
                },
                {
                  title: "Newton's Laws of Motion",
                  subject: "Physics",
                  thumb: "⚡",
                  color: "from-sky-600/20 to-blue-600/20",
                },
                {
                  title: "Python for Beginners",
                  subject: "Computer Science",
                  thumb: "💻",
                  color: "from-emerald-600/20 to-teal-600/20",
                },
              ].map((v, idx) => (
                <div
                  key={v.title}
                  className="action-card glass-card rounded-xl border-[rgba(129,115,220,0.25)] overflow-hidden"
                  data-ocid={`student.video.card.${idx + 1}`}
                >
                  <div
                    className={`aspect-video bg-gradient-to-br ${v.color} flex items-center justify-center text-5xl`}
                  >
                    {v.thumb}
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                      {v.subject}
                    </span>
                    <div className="font-bold text-foreground text-sm mt-2">
                      {v.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground py-4">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </main>
      </div>

      {/* Video call modal */}
      {videoCallDoubt !== null &&
        (() => {
          const d = realDoubts.find(
            (x) => String(x.id) === String(videoCallDoubt),
          );
          return (
            <VideoCallModal
              open={videoCallDoubt !== null}
              onClose={() => setVideoCallDoubt(null)}
              studentName={(d?.question ?? "").slice(0, 20) || "Student"}
              isTeacher={false}
            />
          );
        })()}
    </div>
  );
}
