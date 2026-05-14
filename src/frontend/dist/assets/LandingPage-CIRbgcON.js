import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as AppRole, l as loadLocalProfile, s as saveLocalProfile, a as saveUserToFirestore } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { A as AskSparkLogo } from "./AskSparkLogo--OCsylaZ.js";
import { u as useUserProfile } from "./useQueries-vOipBcgE.js";
import { S as Sparkles } from "./sparkles-CCW2A6A2.js";
import { A as ArrowRight } from "./arrow-right-BKmUScdq.js";
import { M as MessageCircle } from "./message-circle-nHju7Woe.js";
import { G as GraduationCap } from "./graduation-cap-BHG3WFRQ.js";
import { S as Shield } from "./shield-BXPWLYjV.js";
import { U as Users } from "./users-BBY2vuqG.js";
import { T as TrendingUp } from "./trending-up-ei6Zm_la.js";
import { S as Star } from "./star-CdBg9GkG.js";
import { S as Send } from "./send-adheBpJl.js";
import { Z as Zap } from "./zap-BeqXzABK.js";
import { T as Trophy } from "./trophy-BAW9KDeo.js";
import { X } from "./x-Sd9Di6ji.js";
import { M as Menu } from "./menu-BRbSQqMd.js";
import "./utils-C0ugf0YY.js";
import "./useFirestoreDoubts-CPACqU8A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const NAV_LINKS = [
  { label: "Home", href: "/", isRouter: true },
  { label: "Ask Doubt", href: "/submit", isRouter: true },
  { label: "Dashboard", href: "/dashboard", isRouter: true },
  { label: "Login", href: "/onboarding", isRouter: true },
  { label: "Sign Up", href: "/onboarding", isRouter: true }
];
function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
        String(Date.now() + 15e3)
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/",
              className: "flex items-center flex-shrink-0",
              "data-ocid": "nav.logo",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AskSparkLogo,
                  {
                    variant: "horizontal",
                    height: 52,
                    className: "hidden md:block"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 44, className: "md:hidden" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground", children: NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: link.href,
              onClick: (e) => {
                e.preventDefault();
                navigate({ to: link.href });
              },
              className: "hover:text-primary transition-colors duration-150 cursor-pointer",
              "data-ocid": "nav.link",
              children: link.label
            },
            link.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/40 text-primary hover:bg-primary/10 font-medium px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]",
                onClick: handleTeacher,
                disabled: loading === "teacher",
                "data-ocid": "nav.teacher_button",
                children: loading === "teacher" ? "..." : "Join as Teacher"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 transition-all duration-150 hover:scale-[1.02] glow-button",
                onClick: handleStudent,
                disabled: loading === "student",
                "data-ocid": "nav.student_button",
                children: loading === "student" ? "..." : "I am a Student"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "p-2 rounded-xl hover:bg-muted/40 transition-colors",
              onClick: () => setMobileOpen(!mobileOpen),
              "aria-label": "Toggle menu",
              "data-ocid": "nav.toggle",
              children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5 text-foreground" })
            }
          ) })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden glass-nav border-t border-primary/20 px-4 py-4 flex flex-col gap-1 animate-fade-in", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: link.href,
              className: "text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors",
              onClick: (e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigate({ to: link.href });
              },
              children: link.label
            },
            link.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-3 border-t border-primary/20 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/40 text-primary w-full py-2.5",
                onClick: () => {
                  setMobileOpen(false);
                  handleTeacher();
                },
                "data-ocid": "nav.teacher_button",
                children: "Join as Teacher"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white border-0 w-full py-2.5 glow-button",
                onClick: () => {
                  setMobileOpen(false);
                  handleStudent();
                },
                "data-ocid": "nav.student_button",
                children: "I am a Student"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const HERO_BADGES = [
  {
    label: "AI Answer",
    gradient: "from-blue-500 to-blue-600",
    delay: "0s",
    position: "-top-4 left-2"
  },
  {
    label: "24/7 Help",
    gradient: "from-purple-500 to-purple-700",
    delay: "0.5s",
    position: "-top-4 right-2"
  },
  {
    label: "Ask Freely",
    gradient: "from-indigo-500 to-violet-600",
    delay: "1s",
    position: "-bottom-4 left-1/2 -translate-x-1/2"
  }
];
function StudentIllustration() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-56 h-56 mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-4 rounded-full bg-purple-500/15 blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "170",
        height: "190",
        viewBox: "0 0 170 190",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-label": "Student asking questions illustration",
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-body", x1: "0", y1: "0", x2: "0.7", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#60A5FA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "45%", stopColor: "#6366F1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-head", x1: "0", y1: "0", x2: "0.6", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#93C5FD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#818CF8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-book-l", x1: "0", y1: "0", x2: "1", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4F46E5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#6366F1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-book-r", x1: "0", y1: "0", x2: "1", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6366F1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#818CF8" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-bubble", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "rgba(19,18,45,0.95)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "rgba(30,27,75,0.92)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stu-bubble-text", x1: "0", y1: "0", x2: "1", y2: "0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#A78BFA" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "stu-glow", cx: "50%", cy: "55%", r: "50%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8", stopOpacity: "0.4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "filter",
              {
                id: "stu-shadow",
                x: "-20%",
                y: "-20%",
                width: "140%",
                height: "140%",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "3", result: "blur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feFlood", { floodColor: "#6366F1", floodOpacity: "0.4", result: "color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "color", in2: "blur", operator: "in", result: "glow" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "glow" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "filter",
              {
                id: "stu-bubble-shadow",
                x: "-20%",
                y: "-20%",
                width: "140%",
                height: "140%",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "feDropShadow",
                  {
                    dx: "0",
                    dy: "2",
                    stdDeviation: "4",
                    floodColor: "#6366F1",
                    floodOpacity: "0.5"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "85", cy: "115", rx: "65", ry: "72", fill: "url(#stu-glow)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "55",
              y: "100",
              width: "60",
              height: "72",
              rx: "12",
              fill: "url(#stu-body)",
              filter: "url(#stu-shadow)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "85",
              cy: "72",
              r: "27",
              fill: "url(#stu-head)",
              filter: "url(#stu-shadow)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "77",
              cy: "62",
              rx: "7",
              ry: "9",
              fill: "white",
              opacity: "0.18",
              transform: "rotate(-15 77 62)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "77", cy: "71", r: "3.5", fill: "white", opacity: "0.92" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "93", cy: "71", r: "3.5", fill: "white", opacity: "0.92" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "78", cy: "71.5", r: "1.5", fill: "#4338CA", opacity: "0.85" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "94", cy: "71.5", r: "1.5", fill: "#4338CA", opacity: "0.85" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M77 80 Q85 87 93 80",
              stroke: "white",
              strokeWidth: "2.2",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "28",
              y: "105",
              width: "30",
              height: "10",
              rx: "5",
              fill: "url(#stu-body)",
              opacity: "0.75"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "112",
              y: "105",
              width: "30",
              height: "10",
              rx: "5",
              fill: "url(#stu-body)",
              opacity: "0.75"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "24",
              y: "110",
              width: "38",
              height: "26",
              rx: "5",
              fill: "#3730A3",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "25",
              y: "112",
              width: "17",
              height: "22",
              rx: "3",
              fill: "url(#stu-book-l)",
              opacity: "0.95"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "43",
              y: "112",
              width: "17",
              height: "22",
              rx: "3",
              fill: "url(#stu-book-r)",
              opacity: "0.95"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "42",
              y1: "112",
              x2: "42",
              y2: "134",
              stroke: "white",
              strokeWidth: "1",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "28",
              y1: "118",
              x2: "38",
              y2: "118",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "28",
              y1: "122",
              x2: "38",
              y2: "122",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "28",
              y1: "126",
              x2: "36",
              y2: "126",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "45",
              y1: "118",
              x2: "57",
              y2: "118",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "45",
              y1: "122",
              x2: "57",
              y2: "122",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "45",
              y1: "126",
              x2: "55",
              y2: "126",
              stroke: "white",
              strokeWidth: "1.2",
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "96",
              y: "18",
              width: "66",
              height: "42",
              rx: "12",
              fill: "url(#stu-bubble)",
              filter: "url(#stu-bubble-shadow)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "96.5",
              y: "18.5",
              width: "65",
              height: "41",
              rx: "11.5",
              fill: "none",
              stroke: "url(#stu-bubble-text)",
              strokeWidth: "1.2",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "104,60 116,60 110,70", fill: "url(#stu-bubble)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "129",
              y: "36",
              textAnchor: "middle",
              fontSize: "11",
              fill: "url(#stu-bubble-text)",
              fontWeight: "800",
              children: "How?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "129",
              y: "52",
              textAnchor: "middle",
              fontSize: "11",
              fill: "url(#stu-bubble-text)",
              fontWeight: "700",
              children: "Why?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M56 47 L57.5 50.5 L61 52 L57.5 53.5 L56 57 L54.5 53.5 L51 52 L54.5 50.5 Z",
              fill: "#FCD34D",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M114 40 L114.9 42.2 L117 43 L114.9 43.8 L114 46 L113.1 43.8 L111 43 L113.1 42.2 Z",
              fill: "#C4B5FD",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M152 58 L152.7 59.8 L154.5 60.5 L152.7 61.2 L152 63 L151.3 61.2 L149.5 60.5 L151.3 59.8 Z",
              fill: "#93C5FD",
              opacity: "0.8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M15 78 L16.2 81 L19 82 L16.2 83 L15 86 L13.8 83 L11 82 L13.8 81 Z",
              fill: "#818CF8",
              opacity: "0.75"
            }
          )
        ]
      }
    ) }),
    HERO_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute ${badge.position} badge-float`,
        style: { animationDelay: badge.delay },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `bg-gradient-to-r ${badge.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap`,
            style: {
              boxShadow: "0 2px 14px rgba(99,102,241,0.6), 0 1px 3px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)"
            },
            children: badge.label
          }
        )
      },
      badge.label
    ))
  ] });
}
const HOW_CARDS = [
  {
    icon: MessageCircle,
    iconGrad: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.45)",
    title: "Ask Your Doubt",
    desc: "Submit any doubt anonymously, any time. Text or image — no judgment, no fear.",
    badge: "Step 1"
  },
  {
    icon: Brain,
    iconGrad: "from-purple-500 to-indigo-500",
    glow: "rgba(168,85,247,0.45)",
    title: "Get AI Answer",
    desc: "Get instant AI-powered answers in seconds. Smart, accurate, and always available.",
    badge: "Step 2"
  },
  {
    icon: GraduationCap,
    iconGrad: "from-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.45)",
    title: "Teacher Support",
    desc: "Real teachers review and answer complex doubts with detailed explanations.",
    badge: "Step 3"
  }
];
const ABOUT_CARDS = [
  {
    icon: TriangleAlert,
    iconGrad: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.4)",
    title: "The Problem",
    bullets: [
      "Students fear asking doubts in class",
      "Questions go unanswered, confidence drops"
    ]
  },
  {
    icon: Shield,
    iconGrad: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.4)",
    title: "Our Solution",
    bullets: [
      "Ask anonymously — no fear, no judgment",
      "Safe, supportive learning environment"
    ]
  },
  {
    icon: Sparkles,
    iconGrad: "from-purple-500 to-violet-600",
    glow: "rgba(139,92,246,0.4)",
    title: "AskSpark Platform",
    bullets: [
      "AI + real teachers always available",
      "Fast, reliable answers 24/7"
    ]
  }
];
const FEATURE_CARDS = [
  {
    icon: MessageCircle,
    iconGrad: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.4)",
    title: "Ask Any Question",
    desc: "No question is too small. Ask anonymously or with your name — get answers fast."
  },
  {
    icon: Users,
    iconGrad: "from-purple-500 to-indigo-500",
    glow: "rgba(168,85,247,0.4)",
    title: "Learn Together",
    desc: "Join a community of students. Share knowledge, solve problems together."
  },
  {
    icon: TrendingUp,
    iconGrad: "from-indigo-500 to-blue-600",
    glow: "rgba(99,102,241,0.4)",
    title: "Track Your Progress",
    desc: "Watch your confidence score and XP grow with every question answered."
  },
  {
    icon: Star,
    iconGrad: "from-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.4)",
    title: "Build Confidence",
    desc: "From nervous to confident — AskSpark turns doubts into your biggest strengths."
  }
];
const HOW_STEPS = [
  {
    icon: LogIn,
    title: "Sign In or Stay Anonymous",
    subtitle: "Your choice — no pressure"
  },
  {
    icon: Send,
    title: "Submit Your Doubt",
    subtitle: "Text or image — any format"
  },
  {
    icon: Zap,
    title: "AI Processes & Organizes",
    subtitle: "Smart categorization instantly"
  },
  {
    icon: GraduationCap,
    title: "Teacher Answers",
    subtitle: "Text or video explanation"
  },
  {
    icon: Trophy,
    title: "Gain Confidence",
    subtitle: "XP points + confidence score"
  }
];
const TEAM = [
  {
    name: "Rohit Kumar",
    role: "Founder",
    emoji: "🚀",
    grad: "from-blue-500 to-indigo-600"
  },
  {
    name: "P. Rohit",
    role: "Developer",
    emoji: "💻",
    grad: "from-indigo-500 to-purple-600"
  },
  {
    name: "Nehal",
    role: "Designer",
    emoji: "🎨",
    grad: "from-purple-500 to-pink-500"
  },
  {
    name: "K. Hemanth",
    role: "Backend Developer",
    emoji: "⚙️",
    grad: "from-violet-500 to-blue-600"
  }
];
function LandingPage() {
  const navigate = useNavigate();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { data: profile } = useUserProfile();
  const [ctaLoading, setCtaLoading] = reactExports.useState(
    null
  );
  const featuresRef = reactExports.useRef(null);
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
        String(Date.now() + 15e3)
      );
      void saveUserToFirestore(
        localProfile.userId,
        localProfile.displayName,
        "teacher"
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
  const handleExplore = (e) => {
    var _a;
    e.preventDefault();
    (_a = featuresRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-hero min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto w-full py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 glass-card border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 neon-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            "AI-Powered Education Platform"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-tight tracking-tight text-foreground max-w-lg mb-4", children: [
            "Learn Better. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Ask Smarter." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-8", children: "Get instant answers from AI or Teachers. Any doubt. Any time." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row gap-3 mb-2",
              "data-ocid": "hero.cta_row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "rounded-xl gradient-primary text-white font-semibold px-7 py-3 shadow-primary border-0 hover:opacity-90 transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto min-w-[160px] glow-button",
                    onClick: handleAskDoubt,
                    disabled: ctaLoading === "doubt",
                    "data-ocid": "hero.ask_doubt",
                    children: [
                      ctaLoading === "doubt" ? "Loading..." : "Ask a Doubt",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "rounded-xl border-2 border-primary/40 text-primary hover:bg-primary/10 font-semibold px-7 py-3 transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto min-w-[160px]",
                    onClick: handleExplore,
                    "data-ocid": "hero.explore",
                    children: "Explore"
                  }
                )
              ]
            }
          ),
          profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-xl glass-card border-primary/25 warm-shadow mt-6",
              "data-ocid": "hero.welcome_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary", children: profile.role === AppRole.teacher ? "T" : "S" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-sm min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Welcome back!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1 text-xs", children: [
                    "You’re signed in as",
                    " ",
                    profile.role === AppRole.teacher ? "a teacher" : "a student",
                    "."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "rounded-full gradient-primary text-white border-0 font-semibold flex-shrink-0",
                    onClick: () => navigate({
                      to: profile.role === AppRole.teacher ? "/dashboard/teacher" : "/dashboard/student"
                    }),
                    "data-ocid": "hero.dashboard_button",
                    children: [
                      "Dashboard ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 w-3.5 h-3.5" })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 warm-shadow-xl w-full max-w-sm relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-purple-600/8 rounded-2xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentIllustration, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 px-2 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Confidence Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: "85%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2.5 rounded-full bg-primary/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700",
                style: {
                  width: "85%",
                  boxShadow: "0 0 8px rgba(139,80,230,0.6)"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: "Keep asking to grow your score!" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "features",
        ref: featuresRef,
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.08 0.003 265) 0%, oklch(0.10 0.012 275) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              "Simple 3-Step Process"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground max-w-2xl mx-auto", children: [
              "How ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AskSpark" }),
              " Works"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-lg mx-auto", children: "From doubt to confidence in three simple steps" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: HOW_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-7 hover-lift neon-border group cursor-default relative overflow-hidden",
              "data-ocid": `how.${card.badge.toLowerCase().replace(" ", "_")}_card`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none",
                    style: {
                      background: `radial-gradient(circle, ${card.glow}, transparent)`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1 bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-2.5 py-1 rounded-full mb-5", children: card.badge }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`,
                    style: {
                      boxShadow: `0 8px 24px ${card.glow}, 0 0 12px ${card.glow}`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-7 h-7 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-xl mb-3", children: card.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: card.desc })
              ]
            },
            card.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "about",
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.10 0.012 275) 0%, oklch(0.12 0.015 290) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4", children: "About the Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
              "Why ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AskSpark" }),
              "?"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: ABOUT_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-6 hover-lift neon-border cursor-default group relative overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-25 pointer-events-none",
                    style: {
                      background: `radial-gradient(circle, ${card.glow}, transparent)`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-12 h-12 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`,
                    style: { boxShadow: `0 4px 16px ${card.glow}` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-6 h-6 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-3", children: card.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: card.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary opacity-60 mt-2 flex-shrink-0" }),
                      b
                    ]
                  },
                  b
                )) })
              ]
            },
            card.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "features-grid",
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.12 0.015 290) 0%, oklch(0.10 0.012 275) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4", children: "Platform Features" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
              "Everything You Need to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Learn Confidently" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: FEATURE_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-6 hover-lift neon-border cursor-default group relative overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none",
                    style: {
                      background: `radial-gradient(circle, ${card.glow}, transparent)`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-12 h-12 rounded-2xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`,
                    style: { boxShadow: `0 4px 16px ${card.glow}` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-6 h-6 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: card.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: card.desc })
              ]
            },
            card.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "how-it-works",
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.10 0.012 275) 0%, oklch(0.09 0.008 270) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4", children: "Simple Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
              "5 Steps to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Confidence" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-start justify-between gap-2", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl glass-card warm-shadow flex items-center justify-center neon-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center shadow-primary", children: i + 1 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mb-1 leading-tight px-1", children: step.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.subtitle })
            ] }),
            i < HOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-primary/40" }) })
          ] }, step.title)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex flex-col items-center gap-3", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center w-full max-w-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 w-full warm-shadow neon-border flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl glass-card flex items-center justify-center neon-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center", children: i + 1 })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm", children: step.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: step.subtitle })
                  ] })
                ] }),
                i < HOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-4 h-4 text-primary/40" }) })
              ]
            },
            step.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "our-story",
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.09 0.008 270) 0%, oklch(0.11 0.015 285) 50%, oklch(0.09 0.008 270) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💡" }),
            " Our Origin"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-gradient mb-3", children: "Our Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground mb-12", children: "How AskSpark Started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card warm-shadow rounded-3xl p-8 sm:p-12 text-left space-y-6 neon-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "💡" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90 text-base sm:text-lg leading-relaxed", children: [
                "AskSpark started as a simple college project by a group of first-year",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Electrical and Electronics Engineering (EEE)" }),
                " ",
                "students."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-primary/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "During our classes, we noticed a common problem — many students had doubts but hesitated to ask them. Fear of judgment, lack of confidence, and limited interaction often stopped learning." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-semibold text-base sm:text-lg", children: [
                "We realized that",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "learning is not just about studying — it’s about asking questions freely." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "So, we decided to build AskSpark." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-primary/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-bold uppercase tracking-widest", children: "A platform where students can:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col items-center gap-3", children: [
                { icon: "🙋", text: "Ask doubts without fear" },
                { icon: "👩‍🏫", text: "Get real help from teachers" },
                { icon: "📈", text: "Build confidence step by step" }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-3 text-base font-semibold text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: item.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.text })
                  ]
                },
                item.text
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-primary/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📈" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "What began as a small idea in our first year has now grown into a mission:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-gradient", children: "To make learning fearless and accessible for everyone." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🎓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl sm:text-3xl font-bold text-gradient leading-snug", children: "We are not just building a platform." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl sm:text-3xl font-bold text-gradient leading-snug", children: "We are building confidence." })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "team",
        className: "py-20 px-4 sm:px-6",
        style: {
          background: "linear-gradient(180deg, oklch(0.09 0.008 270) 0%, oklch(0.10 0.012 275) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4", children: "The Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
              "Meet ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Team Spark" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: TEAM.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-6 text-center hover-lift neon-border group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-16 h-16 rounded-full bg-gradient-to-br ${member.grad} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`,
                    style: { boxShadow: "0 4px 20px rgba(139,80,230,0.4)" },
                    children: member.emoji
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base mb-1", children: member.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-semibold", children: member.role })
              ]
            },
            member.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4 sm:px-6 gradient-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden warm-shadow-xl neon-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-800/80 via-purple-800/80 to-violet-900/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 -right-8 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-blue-500/20 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-14 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-4xl font-bold text-white mb-4", children: "Start Your Learning Journey Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mb-8 max-w-md mx-auto text-base", children: "Join thousands of students building real confidence with AskSpark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "rounded-full bg-white text-indigo-700 font-semibold px-8 py-3 hover:bg-white/90 transition-all duration-150 hover:scale-[1.02] border-0 shadow-lg min-w-[160px] w-full sm:w-auto",
              onClick: handleAskDoubt,
              "data-ocid": "cta.ask_doubt",
              children: [
                "Ask a Doubt ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "rounded-full border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 transition-all duration-150 hover:scale-[1.02] min-w-[160px] w-full sm:w-auto",
              onClick: handleJoinAsTeacher,
              "data-ocid": "cta.teacher_button",
              children: "Join as Teacher"
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "footer",
      {
        style: {
          background: "linear-gradient(180deg, oklch(0.07 0.003 265) 0%, oklch(0.06 0.003 265) 100%)",
          borderTop: "1px solid rgba(139,125,230,0.2)"
        },
        className: "py-16 px-4 sm:px-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid md:grid-cols-3 gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AskSparkLogo, { variant: "icon", height: 32 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-foreground", children: "AskSpark" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "The AI-powered confidence-building platform for students. Ask freely, learn boldly." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground/70 mb-4 text-sm uppercase tracking-wider", children: "Platform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Features", "How It Works", "For Students", "For Teachers"].map(
                (l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors",
                    children: l
                  },
                  l
                )
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground/70 mb-4 text-sm uppercase tracking-wider", children: "Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-muted-foreground text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "📧 hello@askspark.app" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "🌐 English · हिंदी · తెలుగు" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto mt-12 pt-6 border-t border-primary/15 text-center text-muted-foreground text-sm", children: [
            "© ",
            year,
            " AskSpark · Team Spark. Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                target: "_blank",
                rel: "noreferrer",
                className: "underline hover:text-primary transition-colors",
                children: "caffeine.ai"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  LandingPage as default
};
