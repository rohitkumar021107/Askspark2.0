import { u as useNavigate, j as jsxRuntimeExports, m as motion, V as Video } from "./index-CiicjzrK.js";
import { D as DoubtSearch } from "./DoubtSearch-DuAc40jF.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CKDsVIvG.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { C as Calendar } from "./calendar-DX2QbqvM.js";
import { C as Clock } from "./clock-DKrs62zG.js";
import { U as User } from "./user-BMsLaia6.js";
import "./input-D9SZkx1r.js";
import "./utils-C0ugf0YY.js";
import "./search-I-QYT-Ec.js";
import "./chevron-up-gQIqj1MH.js";
import "./index-BUlsMpCV.js";
import "./index-BjI1O3hJ.js";
import "./index-C7zsWbmt.js";
import "./index-UGGF_iej.js";
const LIVE_CLASSES = [
  {
    id: 1,
    title: "Integration by Parts",
    subject: "Mathematics",
    date: "Today",
    time: "5:00 PM",
    teacher: "Mr. Sharma",
    badge: "Starting Soon",
    badgeColor: "bg-red-100 text-red-700"
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    date: "Tomorrow",
    time: "4:00 PM",
    teacher: "Ms. Gupta",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 3,
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    date: "Wed, 28 Mar",
    time: "6:00 PM",
    teacher: "Dr. Patel",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 4,
    title: "Data Structures: Trees",
    subject: "Computer Science",
    date: "Thu, 29 Mar",
    time: "7:00 PM",
    teacher: "Mr. Verma",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 5,
    title: "Cell Biology & Genetics",
    subject: "Biology",
    date: "Fri, 30 Mar",
    time: "5:30 PM",
    teacher: "Ms. Rao",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700"
  }
];
const RECORDED = [
  {
    id: 1,
    title: "Calculus: Limits & Derivatives",
    subject: "Mathematics",
    youtubeId: "WUvTyaaNkzM",
    desc: "Complete introduction to limits and derivative rules with examples."
  },
  {
    id: 2,
    title: "Thermodynamics Fundamentals",
    subject: "Physics",
    youtubeId: "4i1MUWJoI0U",
    desc: "Laws of thermodynamics explained with real-world applications."
  },
  {
    id: 3,
    title: "Periodic Table & Elements",
    subject: "Chemistry",
    youtubeId: "0RRVV4Diomg",
    desc: "Understanding the periodic table structure and element properties."
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    youtubeId: "rL8X2mlNHPM",
    desc: "Big O notation and algorithm complexity explained simply."
  },
  {
    id: 5,
    title: "Human Body Systems",
    subject: "Biology",
    youtubeId: "Ae4MadKPJC0",
    desc: "Overview of major human body systems and how they interact."
  }
];
const SUBJECT_COLORS = {
  Mathematics: "bg-blue-100 text-blue-700",
  Physics: "bg-orange-100 text-orange-700",
  Chemistry: "bg-green-100 text-green-700",
  "Computer Science": "bg-purple-100 text-purple-700",
  Biology: "bg-pink-100 text-pink-700"
};
function LecturesPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6",
          onClick: () => navigate({ to: "/learning" }),
          "data-ocid": "lectures.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Learning Hub"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
        "🎓 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Lectures" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Attend live sessions or watch recorded videos at your pace." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "live", "data-ocid": "lectures.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-8 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "live", "data-ocid": "lectures.live.tab", children: "🔴 Live Classes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "recorded", "data-ocid": "lectures.recorded.tab", children: "📹 Recorded Lectures" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "live", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: LIVE_CLASSES.map((cls, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08 },
          className: "glass-card warm-shadow rounded-2xl p-5 border border-white/40",
          "data-ocid": `lectures.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs font-semibold ${cls.badgeColor} border-0`,
                  children: cls.badge
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs ${SUBJECT_COLORS[cls.subject] ?? ""} border-0`,
                  children: cls.subject
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-amber-100 text-amber-700 border-0 mb-2", children: "Sample" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-3", children: cls.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cls.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 ml-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cls.time })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cls.teacher })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white border-0 hover:opacity-90 font-medium",
                "data-ocid": `lectures.join.button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "mr-1.5 w-3 h-3" }),
                  " Join Class"
                ]
              }
            )
          ]
        },
        cls.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "recorded", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoubtSearch, { lecturesOnly: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: RECORDED.map((vid, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.08 },
            className: "glass-card warm-shadow rounded-2xl overflow-hidden border border-white/40",
            "data-ocid": `lectures.recorded.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: `https://www.youtube.com/embed/${vid.youtubeId}`,
                  title: vid.title,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true,
                  className: "w-full h-full",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs ${SUBJECT_COLORS[vid.subject] ?? ""} border-0`,
                      children: vid.subject
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-amber-100 text-amber-700 border-0", children: "Sample" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: vid.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: vid.desc })
              ] })
            ]
          },
          vid.id
        )) })
      ] })
    ] }) }),
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
  LecturesPage as default
};
