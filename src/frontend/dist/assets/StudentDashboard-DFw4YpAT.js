import { c as createLucideIcon, j as jsxRuntimeExports, u as useNavigate, l as loadLocalProfile, r as reactExports, V as Video, f as rtdbListen } from "./index-CiicjzrK.js";
import { A as AvatarButton, V as VideoCallModal, L as LogOut } from "./VideoCallModal-SOfFU6_f.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { c as cn } from "./utils-C0ugf0YY.js";
import { u as useNotifications, B as Bell } from "./useNotifications-DtVnhzgN.js";
import { u as useMyDoubts } from "./useFirestoreDoubts-CPACqU8A.js";
import { g as getRating, s as submitRating } from "./useFirestoreRatings-DaeseLrE.js";
import { M as MessageSquare } from "./message-square-BVVl9NSs.js";
import { C as CircleCheck } from "./circle-check-Dos6jNK6.js";
import { C as Clock } from "./clock-DKrs62zG.js";
import { M as Menu } from "./menu-BRbSQqMd.js";
import { P as Plus } from "./plus-Dd62hBQ1.js";
import { S as Search } from "./search-I-QYT-Ec.js";
import { Z as Zap } from "./zap-BeqXzABK.js";
import { S as Star } from "./star-CdBg9GkG.js";
import { X } from "./x-Sd9Di6ji.js";
import { H as House } from "./house-Cq-rS24c.js";
import { U as User } from "./user-BMsLaia6.js";
import { C as ChevronUp } from "./chevron-up-gQIqj1MH.js";
import { C as ChevronDown } from "./chevron-down-DQR61kK2.js";
import { S as Send } from "./send-adheBpJl.js";
import "./dialog-DaVgRmoe.js";
import "./index-BUlsMpCV.js";
import "./Combination-BPR_6sdE.js";
import "./index-C7zsWbmt.js";
import "./index-UGGF_iej.js";
import "./mic-BzIhrvTG.js";
import "./monitor-BQbe68LJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const NAV_ITEMS = [
  { icon: House, label: "Dashboard", id: "dashboard" },
  { icon: Plus, label: "Ask Doubt", id: "ask", href: "/submit" },
  { icon: List, label: "My Doubts", id: "doubts" },
  { icon: MessageSquare, label: "AI Chat", id: "chat", href: "/chat" },
  { icon: Bookmark, label: "Bookmarks", id: "bookmarks" },
  { icon: User, label: "Profile", id: "profile", href: "/profile/student" }
];
function ConfidenceRing({ score }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = score / 100 * circ;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#a78bfa" : "#f59e0b";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "96",
        height: "96",
        className: "absolute inset-0 -rotate-90",
        role: "img",
        "aria-label": "Confidence score ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r,
              fill: "none",
              stroke: "rgba(129,115,220,0.2)",
              strokeWidth: "8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r,
              fill: "none",
              stroke: color,
              strokeWidth: "8",
              strokeDasharray: `${dash} ${circ}`,
              strokeLinecap: "round",
              style: {
                transition: "stroke-dasharray 1s ease",
                filter: `drop-shadow(0 0 8px ${color})`
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground text-xl", children: score })
  ] });
}
const AI_GREET = {
  role: "ai",
  text: "Hi! I'm your AI Study Assistant. Ask me anything about your subjects 📚"
};
const AI_RESPONSES = [
  "Great question! Let me break that down for you step by step.",
  "Here's what you need to know about this topic:",
  "That's a common doubt — you're not alone! The key concept here is...",
  "I've found a quick explanation for you. Would you like more detail?",
  "Let me simplify this for you!"
];
function AiChatBox({ navigate }) {
  const [messages, setMessages] = reactExports.useState([AI_GREET]);
  const [input, setInput] = reactExports.useState("");
  const [typing, setTyping] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
      const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    }, 1200);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-2xl border-[rgba(129,115,220,0.35)] flex flex-col h-80",
      "data-ocid": "student.ai_chat.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-[rgba(129,115,220,0.2)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: "AI Study Assistant" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline",
              onClick: () => navigate({ to: "/chat" }),
              "data-ocid": "student.ai_chat.open_button",
              children: "Open full chat →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: scrollRef,
            className: "flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin",
            children: [
              messages.slice(-5).map((msg, msgIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm" : "bg-[rgba(40,35,80,0.7)] text-foreground/90 border border-[rgba(129,115,220,0.25)] rounded-bl-sm"}`,
                      children: msg.text
                    }
                  )
                },
                `${msg.role}-${msgIdx}`
              )),
              typing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[rgba(40,35,80,0.7)] border border-[rgba(129,115,220,0.25)] rounded-2xl rounded-bl-sm px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-center h-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "0ms" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "150ms" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "300ms" }
                  }
                )
              ] }) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-t border-[rgba(129,115,220,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            className: "flex gap-2",
            onSubmit: (e) => {
              e.preventDefault();
              sendMessage();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "flex-1 h-8 text-xs bg-[rgba(15,14,35,0.6)] border-[rgba(129,115,220,0.3)] text-foreground placeholder:text-muted-foreground focus:border-primary rounded-full px-3",
                  placeholder: "Ask anything…",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  "data-ocid": "student.ai_chat.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center hover:shadow-lg transition-all flex-shrink-0",
                  "aria-label": "Send message",
                  "data-ocid": "student.ai_chat.submit_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 text-white" })
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function FirestoreDoubtStudentCard({
  doubt,
  index,
  expanded,
  onToggle,
  studentId
}) {
  const [localRating, setLocalRating] = reactExports.useState(null);
  const [ratingSubmitted, setRatingSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (doubt.status === "answered" && !ratingSubmitted) {
      getRating(doubt.id, studentId).then((r) => {
        if (r !== null) {
          setLocalRating(r);
          setRatingSubmitted(true);
        }
      });
    }
  }, [doubt.id, doubt.status, studentId, ratingSubmitted]);
  async function handleRate(stars) {
    if (ratingSubmitted) return;
    setLocalRating(stars);
    setRatingSubmitted(true);
    try {
      await submitRating(
        doubt.id,
        doubt.userId,
        doubt.teacherName ?? "Teacher",
        studentId,
        stars
      );
    } catch {
    }
  }
  const isAnswered = doubt.status === "answered";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border transition-all duration-200 overflow-hidden ${isAnswered ? "border-emerald-500/30 bg-[rgba(16,185,129,0.05)]" : "border-amber-500/30 bg-[rgba(245,158,11,0.04)]"}`,
      "data-ocid": `student.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-start justify-between gap-3 w-full text-left p-4",
            onClick: onToggle,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[rgba(129,115,220,0.2)] text-primary", children: doubt.subject }),
                  isAnswered ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
                    " Answered"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                    " Pending"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm truncate", children: doubt.question }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: doubt.createdAt ? new Date(doubt.createdAt).toLocaleDateString() : "" })
              ] }),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-1 border-t border-white/10 animate-fade-in", children: isAnswered && doubt.answer ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-emerald-400 mb-1", children: "✅ Teacher's Answer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-900/20 border border-emerald-500/25 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: doubt.answer }),
            doubt.teacherName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
              "— ",
              doubt.teacherName,
              doubt.answeredAt ? `, ${new Date(doubt.answeredAt).toLocaleString()}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: ratingSubmitted ? "Your rating:" : "Rate this answer:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleRate(star),
                disabled: ratingSubmitted,
                className: `text-lg transition-colors ${star <= (localRating ?? 0) ? "text-yellow-400" : "text-white/20 hover:text-yellow-300"} ${ratingSubmitted ? "cursor-default" : "cursor-pointer"}`,
                "data-ocid": `student.rating.${index + 1}`,
                children: "★"
              },
              star
            )) }),
            ratingSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-500 mt-1", children: "Thanks for your feedback!" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Waiting for a teacher to answer" })
        ] }) })
      ]
    }
  );
}
function ActiveLiveClasses({
  navigate
}) {
  const [classes, setClasses] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const unsub = rtdbListen("liveClasses", (val) => {
      const raw = val;
      if (!raw) {
        setClasses([]);
        return;
      }
      setClasses(
        Object.entries(raw).filter(([, c]) => c.active).map(([id, c]) => ({ ...c, id }))
      );
    });
    return unsub;
  }, []);
  if (classes.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: "Live Now" })
    ] }),
    classes.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between p-3 rounded-xl bg-[rgba(239,68,68,0.08)] border border-red-500/20",
        "data-ocid": `liveclass.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              c.subject,
              " · ",
              c.hostName,
              " · ",
              c.viewerCount ?? 0,
              " watching"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-bold transition-all",
              onClick: () => navigate({ to: `/live/${c.id}`, search: { role: "viewer" } }),
              "data-ocid": `liveclass.primary_button.${i + 1}`,
              children: "Join"
            }
          )
        ]
      },
      c.id
    ))
  ] });
}
function Sidebar({
  active,
  onNav,
  navigate,
  collapsed,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
        onClick: onClose,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        role: "presentation"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out
          ${collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
          w-64 glass-nav border-r border-[rgba(129,115,220,0.25)]
        `,
        "data-ocid": "student.sidebar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-5 border-b border-[rgba(129,115,220,0.2)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg", children: "AskSpark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "ml-auto text-muted-foreground hover:text-foreground lg:hidden",
                onClick: onClose,
                "aria-label": "Close sidebar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "nav",
            {
              className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto",
              "data-ocid": "student.nav",
              children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (item.href) navigate({ to: item.href });
                    else onNav(item.id);
                    onClose();
                  },
                  className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active === item.id ? "bg-gradient-to-r from-violet-600/30 to-indigo-600/20 text-foreground border border-primary/30 shadow-[0_0_12px_rgba(139,80,230,0.2)]" : "text-muted-foreground hover:text-foreground hover:bg-[rgba(129,115,220,0.12)] hover:border hover:border-[rgba(129,115,220,0.15)]"}`,
                  "data-ocid": `student.nav.${item.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      item.icon,
                      {
                        className: `w-4 h-4 flex-shrink-0 ${active === item.id ? "text-primary" : ""}`
                      }
                    ),
                    item.label,
                    active === item.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-primary" })
                  ]
                },
                item.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 border-t border-[rgba(129,115,220,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200",
              "data-ocid": "student.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 flex-shrink-0" }),
                "Logout"
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function StudentDashboard() {
  const navigate = useNavigate();
  const localProfile = loadLocalProfile();
  const userId = (localProfile == null ? void 0 : localProfile.userId) ?? "";
  const displayName = (localProfile == null ? void 0 : localProfile.displayName) ?? "Student";
  const realDoubts = useMyDoubts(userId);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [activeSection, setActiveSection] = reactExports.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = reactExports.useState(true);
  const [expandedDoubt, setExpandedDoubt] = reactExports.useState(
    null
  );
  const [videoCallDoubt, setVideoCallDoubt] = reactExports.useState(
    null
  );
  const [notifOpen, setNotifOpen] = reactExports.useState(false);
  const notifRef = reactExports.useRef(null);
  const {
    notifications: rtdbNotifs,
    unreadCount,
    markRead: markReadRTDB,
    markAllRead: markAllReadRTDB
  } = useNotifications(userId);
  const answeredDoubts = realDoubts.filter((d) => d.status === "answered");
  const pendingDoubts = realDoubts.filter((d) => d.status !== "answered");
  const confidenceScore = Math.min(realDoubts.length * 15, 100);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  function handleNotifClick(n) {
    markReadRTDB(String(n.id));
    setNotifOpen(false);
    if (n.type === "doubt_reply" || n.type === "doubt_answered") {
      setActiveSection("doubts");
    } else if (n.type === "message") {
      navigate({ to: "/chat" });
    }
  }
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const statCards = [
    {
      label: "Doubts Asked",
      value: realDoubts.length,
      icon: MessageSquare,
      color: "from-violet-600 to-indigo-600",
      glow: "rgba(139,80,230,0.35)",
      textColor: "text-violet-400",
      ocid: "student.stat.doubts_asked"
    },
    {
      label: "Answered",
      value: answeredDoubts.length,
      icon: CircleCheck,
      color: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.35)",
      textColor: "text-emerald-400",
      ocid: "student.stat.answered"
    },
    {
      label: "Pending",
      value: pendingDoubts.length,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.35)",
      textColor: "text-amber-400",
      ocid: "student.stat.pending"
    },
    {
      label: "Bookmarks",
      value: 0,
      icon: Bookmark,
      color: "from-sky-500 to-blue-600",
      glow: "rgba(14,165,233,0.35)",
      textColor: "text-sky-400",
      ocid: "student.stat.bookmarks"
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-gradient min-h-screen flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 hidden lg:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-56 h-8 rounded-lg bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-lg bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-7 rounded bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-3 rounded bg-white/5" })
        ] }, i)) }),
        [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-32 h-5 rounded bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-3/4 h-4 rounded bg-white/5" })
        ] }, i))
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-gradient min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sidebar,
      {
        active: activeSection,
        onNav: setActiveSection,
        navigate,
        collapsed: sidebarCollapsed,
        onClose: () => setSidebarCollapsed(true)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-64 flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "header",
        {
          className: "sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 glass-nav",
          "data-ocid": "student.topbar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "lg:hidden w-9 h-9 rounded-xl bg-[rgba(129,115,220,0.15)] border border-[rgba(129,115,220,0.25)] flex items-center justify-center text-foreground hover:bg-[rgba(129,115,220,0.25)] transition-colors",
                  onClick: () => setSidebarCollapsed(false),
                  "aria-label": "Open menu",
                  "data-ocid": "student.menu_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: dateStr }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-foreground text-sm", children: [
                  greeting,
                  ", ",
                  displayName,
                  " 👋"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: notifRef, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "relative w-9 h-9 rounded-xl bg-[rgba(129,115,220,0.12)] border border-[rgba(129,115,220,0.2)] flex items-center justify-center hover:bg-[rgba(129,115,220,0.22)] transition-colors",
                    onClick: () => setNotifOpen((o) => !o),
                    "aria-label": "Notifications",
                    "data-ocid": "student.open_modal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-foreground" }),
                      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5", children: unreadCount })
                    ]
                  }
                ),
                notifOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute top-full mt-2 right-0 w-80 glass-card rounded-2xl shadow-xl border-[rgba(129,115,220,0.35)] overflow-hidden z-50",
                    "data-ocid": "student.popover",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-[rgba(129,115,220,0.2)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "Notifications" }),
                        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-xs text-primary hover:underline",
                            onClick: markAllReadRTDB,
                            "data-ocid": "student.secondary_button",
                            children: "Mark all read"
                          }
                        )
                      ] }),
                      rtdbNotifs.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-[rgba(129,115,220,0.1)] transition-colors border-b border-[rgba(129,115,220,0.1)] last:border-0 ${n.read ? "opacity-60" : ""}`,
                          onClick: () => handleNotifClick(n),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg flex-shrink-0 mt-0.5", children: n.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: n.text }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: n.time })
                            ] }),
                            !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" })
                          ]
                        },
                        n.id
                      )),
                      rtdbNotifs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-sm text-muted-foreground", children: "No notifications yet" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "rounded-xl gradient-primary text-white border-0 glow-button text-xs font-bold h-9 px-4",
                  onClick: () => navigate({ to: "/submit" }),
                  "data-ocid": "student.primary_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
                    " Ask Doubt"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarButton,
                {
                  imageUrl: localProfile == null ? void 0 : localProfile.profileImageUrl,
                  name: displayName
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card rounded-2xl p-5 border-[rgba(129,115,220,0.35)] relative overflow-hidden",
            "data-ocid": "student.welcome.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: [
                  "Welcome back,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: displayName }),
                  "!"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm", children: [
                  "Ready to spark your curiosity today? You have",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-semibold", children: [
                    pendingDoubts.length,
                    " pending doubt",
                    pendingDoubts.length !== 1 ? "s" : ""
                  ] }),
                  " ",
                  "awaiting answers."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "rounded-xl gradient-primary text-white border-0 glow-button text-sm font-bold",
                      onClick: () => navigate({ to: "/submit" }),
                      "data-ocid": "student.ask_doubt.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                        " Ask a Doubt"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "rounded-xl border-[rgba(129,115,220,0.4)] text-foreground hover:bg-[rgba(129,115,220,0.12)] text-sm",
                      onClick: () => navigate({ to: "/chat" }),
                      "data-ocid": "student.ai_chat_cta.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-1.5 text-primary" }),
                        " AI Chat"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
            "data-ocid": "student.stats.section",
            children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card rounded-2xl p-4 sm:p-5 border-[rgba(129,115,220,0.25)] hover-lift",
                style: { boxShadow: `0 4px 24px ${card.glow}30` },
                "data-ocid": card.ocid,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`,
                      style: { boxShadow: `0 4px 16px ${card.glow}` },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-4 h-4 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `text-2xl sm:text-3xl font-display font-bold ${card.textColor}`,
                      children: card.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1 font-medium", children: card.label })
                ]
              },
              card.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-3 space-y-4", id: "doubts-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-5 h-5 text-primary" }),
                " Recent Doubts"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "rounded-xl gradient-primary text-white border-0 text-xs font-bold h-8 px-3",
                  onClick: () => navigate({ to: "/submit" }),
                  "data-ocid": "student.new_doubt.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                    " New"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "student.list", children: realDoubts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 glass-card rounded-2xl border-[rgba(129,115,220,0.25)]",
                "data-ocid": "student.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 mx-auto mb-3 text-primary/30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No doubts yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Ask your first doubt to get started!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "mt-4 rounded-xl gradient-primary text-white border-0",
                      onClick: () => navigate({ to: "/submit" }),
                      "data-ocid": "student.primary_button",
                      children: "Ask a Doubt"
                    }
                  )
                ]
              }
            ) : realDoubts.slice(0, 8).map((doubt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FirestoreDoubtStudentCard,
              {
                doubt,
                index: i,
                expanded: expandedDoubt === doubt.id,
                onToggle: () => setExpandedDoubt(
                  expandedDoubt === doubt.id ? null : doubt.id
                ),
                studentId: userId
              },
              doubt.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card rounded-2xl p-5 border-[rgba(129,115,220,0.35)] text-center relative overflow-hidden",
                "data-ocid": "student.confidence.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mb-3 relative", children: "Confidence Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceRing, { score: confidenceScore }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-muted-foreground relative", children: confidenceScore < 30 ? "🌱 Keep asking to grow!" : confidenceScore < 60 ? "📈 You're building momentum!" : "🔥 Excellent confidence!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary", children: [
                    "+",
                    Math.max(confidenceScore, 5),
                    " pts total"
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              {
                icon: MessageSquare,
                label: "Ask a Doubt",
                href: "/submit",
                color: "from-violet-600 to-indigo-600",
                glow: "rgba(139,80,230,0.4)",
                ocid: "student.quick_ask.button"
              },
              {
                icon: Video,
                label: "Join Live",
                action: () => navigate({ to: "/dashboard/student" }),
                color: "from-rose-600 to-pink-600",
                glow: "rgba(239,68,68,0.4)",
                ocid: "student.quick_live.button"
              },
              {
                icon: Search,
                label: "Search",
                href: "/learning",
                color: "from-sky-600 to-blue-600",
                glow: "rgba(14,165,233,0.4)",
                ocid: "student.quick_search.button"
              },
              {
                icon: Zap,
                label: "AI Chat",
                href: "/chat",
                color: "from-emerald-600 to-teal-600",
                glow: "rgba(16,185,129,0.4)",
                ocid: "student.quick_chat.button"
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return item.href ? navigate({ to: item.href }) : (_a = item.action) == null ? void 0 : _a.call(item);
                },
                className: "action-card glass-card rounded-xl p-3 border-[rgba(129,115,220,0.25)] flex flex-col items-center gap-2 text-center",
                style: { boxShadow: `0 4px 16px ${item.glow}20` },
                "data-ocid": item.ocid,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`,
                      style: { boxShadow: `0 4px 16px ${item.glow}` },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground/80", children: item.label })
                ]
              },
              item.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveLiveClasses, { navigate })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AiChatBox, { navigate }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400" }),
            " Video Solutions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            {
              title: "Algebra Basics Explained",
              subject: "Mathematics",
              thumb: "🧮",
              color: "from-violet-600/20 to-indigo-600/20"
            },
            {
              title: "Newton's Laws of Motion",
              subject: "Physics",
              thumb: "⚡",
              color: "from-sky-600/20 to-blue-600/20"
            },
            {
              title: "Python for Beginners",
              subject: "Computer Science",
              thumb: "💻",
              color: "from-emerald-600/20 to-teal-600/20"
            }
          ].map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "action-card glass-card rounded-xl border-[rgba(129,115,220,0.25)] overflow-hidden",
              "data-ocid": `student.video.card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `aspect-video bg-gradient-to-br ${v.color} flex items-center justify-center text-5xl`,
                    children: v.thumb
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary", children: v.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-sm mt-2", children: v.title })
                ] })
              ]
            },
            v.title
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground py-4", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with ❤️ using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noreferrer",
              className: "underline hover:text-foreground transition-colors",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    ] }),
    videoCallDoubt !== null && (() => {
      const d = realDoubts.find(
        (x) => String(x.id) === String(videoCallDoubt)
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoCallModal,
        {
          open: videoCallDoubt !== null,
          onClose: () => setVideoCallDoubt(null),
          studentName: ((d == null ? void 0 : d.question) ?? "").slice(0, 20) || "Student",
          isTeacher: false
        }
      );
    })()
  ] });
}
export {
  StudentDashboard as default
};
