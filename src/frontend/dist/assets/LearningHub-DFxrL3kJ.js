import { u as useNavigate, j as jsxRuntimeExports, m as motion } from "./index-CiicjzrK.js";
import { D as DoubtSearch } from "./DoubtSearch-DuAc40jF.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { B as BookOpen } from "./book-open-Bmv8GHoc.js";
import { P as PenLine } from "./pen-line-C2iuSrkv.js";
import { M as MessageSquare } from "./message-square-BVVl9NSs.js";
import "./badge-Ncr4NsWM.js";
import "./utils-C0ugf0YY.js";
import "./input-D9SZkx1r.js";
import "./search-I-QYT-Ec.js";
import "./chevron-up-gQIqj1MH.js";
const HUB_CARDS = [
  {
    emoji: "🎓",
    icon: BookOpen,
    title: "Lectures",
    desc: "Live classes & recorded videos",
    to: "/learning/lectures",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-200/60",
    badge: "Live & Recorded",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    emoji: "📝",
    icon: PenLine,
    title: "Practice (DPP)",
    desc: "Daily practice problems by subject",
    to: "/learning/practice",
    color: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-200/60",
    badge: "MCQs + Solutions",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    emoji: "💬",
    icon: MessageSquare,
    title: "24/7 Support",
    desc: "Chat, FAQ, and help form",
    to: "/learning/support",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-200/60",
    badge: "Always Open",
    badgeColor: "bg-green-100 text-green-700"
  }
];
function LearningHub() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-hero py-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8",
          onClick: () => navigate({ to: "/dashboard/student" }),
          "data-ocid": "learning.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-white/70 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full warm-shadow mb-5", children: "🚀 Your Learning Space" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4", children: [
              "Learning ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Hub" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-lg", children: "Everything you need to learn — Lectures · Practice · Support" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoubtSearch, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-4xl mx-auto px-4 sm:px-6 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-6", children: HUB_CARDS.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: i * 0.1 },
          whileHover: { y: -4 },
          onClick: () => navigate({
            to: card.to
          }),
          className: `glass-card warm-shadow rounded-2xl p-7 text-left w-full group cursor-pointer border bg-gradient-to-br ${card.color} ${card.border} hover:shadow-lg transition-all`,
          "data-ocid": `learning.${i === 0 ? "lectures" : i === 1 ? "practice" : "support"}.card`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: card.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${card.badgeColor}`,
                children: card.badge
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: card.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 inline-flex items-center text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all", children: "Explore →" })
          ]
        },
        card.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5 },
          className: "mt-10 glass-card rounded-2xl p-5 border border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50",
          "data-ocid": "learning.panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 font-semibold", children: "💡 Pro tip:" }),
            " ",
            "Start with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Practice (DPP)" }),
            " to test your knowledge, then watch ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Lecture videos" }),
            " for any topics you found tricky, and use ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Support" }),
            " if you're stuck!"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-dashed border-primary/20 bg-primary/5 rounded-xl p-3 text-xs text-muted-foreground text-center", children: "📢 Sponsored · Reach AskSpark's learning community · sponsor@askspark.app" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-center py-8 text-xs text-muted-foreground border-t border-border/40", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with ❤️ using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline hover:text-primary",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  LearningHub as default
};
