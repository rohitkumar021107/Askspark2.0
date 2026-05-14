import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-CiicjzrK.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, d as CardContent } from "./card-CrjAUlyJ.js";
import { c as createContextScope } from "./index-Ci0ctMen.js";
import { P as Primitive } from "./index-xWxfC-pn.js";
import { c as cn } from "./utils-C0ugf0YY.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { A as ArrowRight } from "./arrow-right-BKmUScdq.js";
import { T as Trophy } from "./trophy-BAW9KDeo.js";
import { C as CircleCheck } from "./circle-check-Dos6jNK6.js";
import { C as ChevronUp } from "./chevron-up-gQIqj1MH.js";
import { C as ChevronDown } from "./chevron-down-DQR61kK2.js";
import { B as BookOpen } from "./book-open-Bmv8GHoc.js";
import { M as Monitor } from "./monitor-BQbe68LJ.js";
import { Z as Zap } from "./zap-BeqXzABK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$1);
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
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode);
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const questionBank = [
  {
    id: 1,
    topic: "Math",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2"],
    answer: 1
  },
  {
    id: 2,
    topic: "Math",
    question: "What is the value of √144?",
    options: ["11", "12", "13", "14"],
    answer: 1
  },
  {
    id: 3,
    topic: "Math",
    question: "Solve: 2x + 5 = 15",
    options: ["x=4", "x=5", "x=6", "x=10"],
    answer: 1
  },
  {
    id: 4,
    topic: "Math",
    question: "What is the area of a circle with radius 7? (π≈22/7)",
    options: ["44", "154", "88", "308"],
    answer: 1
  },
  {
    id: 5,
    topic: "Physics",
    question: "What is Newton's Second Law?",
    options: ["F=mv", "F=ma", "E=mc²", "v=u+at"],
    answer: 1
  },
  {
    id: 6,
    topic: "Physics",
    question: "What is the SI unit of force?",
    options: ["Watt", "Joule", "Newton", "Pascal"],
    answer: 2
  },
  {
    id: 7,
    topic: "Physics",
    question: "Speed of light in vacuum is approximately?",
    options: [
      "3×10⁶ m/s",
      "3×10⁸ m/s",
      "3×10¹⁰ m/s",
      "3×10⁴ m/s"
    ],
    answer: 1
  },
  {
    id: 8,
    topic: "CS",
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Central Program Utility",
      "Core Processing Unit"
    ],
    answer: 0
  },
  {
    id: 9,
    topic: "CS",
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Array", "Tree"],
    answer: 1
  },
  {
    id: 10,
    topic: "CS",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    id: 11,
    topic: "Chemistry",
    question: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    answer: 1
  },
  {
    id: 12,
    topic: "Chemistry",
    question: "What is the chemical formula for water?",
    options: ["HO", "H₂O", "H₂O₂", "OH"],
    answer: 1
  },
  {
    id: 13,
    topic: "Chemistry",
    question: "pH of a neutral solution is?",
    options: ["0", "7", "14", "1"],
    answer: 1
  },
  {
    id: 14,
    topic: "Biology",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"],
    answer: 2
  },
  {
    id: 15,
    topic: "Biology",
    question: "DNA stands for?",
    options: [
      "Deoxyribonucleic Acid",
      "Diribonucleic Acid",
      "Deoxyribose Nucleic Acid",
      "Dynamic Nucleic Acid"
    ],
    answer: 0
  },
  {
    id: 16,
    topic: "English",
    question: "Which of these is a synonym for 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: 1
  },
  {
    id: 17,
    topic: "English",
    question: "What is the past tense of 'run'?",
    options: ["Runned", "Ran", "Running", "Run"],
    answer: 1
  }
];
const studyNotes = {
  Math: [
    "Derivative rules: d/dx(xⁿ) = nxⁿ⁻¹",
    "Area of circle = πr²; Circumference = 2πr",
    "Quadratic formula: x = (−b ± √(b²−4ac)) / 2a",
    "Always check units in word problems"
  ],
  Physics: [
    "Newton's Laws: 1st=Inertia, 2nd=F=ma, 3rd=Action-Reaction",
    "v = u + at;  s = ut + ½ат²;  v² = u² + 2as",
    "Kinetic Energy = ½mv²;  Potential Energy = mgh",
    "Speed of light = 3×10⁸ m/s"
  ],
  CS: [
    "Stack = LIFO;  Queue = FIFO",
    "Binary Search = O(log n);  Linear Search = O(n)",
    "RAM = volatile;  ROM = non-volatile",
    "Loop complexity: single loop = O(n), nested = O(n²)"
  ],
  Chemistry: [
    "Periodic table: H(1), He(2), Li(3), C(6), N(7), O(8), Na(11), Fe(26)",
    "Valency: H=1, O=2, N=3, C=4",
    "Acids: pH<7;  Bases: pH>7;  Neutral = 7",
    "Avogadro's number = 6.022×10²³"
  ],
  Biology: [
    "Cell organelles: Mitochondria=energy, Ribosome=protein synthesis, Nucleus=control center",
    "Photosynthesis: CO₂ + H₂O → Glucose + O₂ (light energy)",
    "DNA is double helix;  RNA is single stranded",
    "Blood types: A, B, AB, O"
  ],
  English: [
    "Subject-Verb Agreement: singular subject → singular verb",
    "Common irregular verbs: run→ran, go→went, see→saw, take→took",
    "Tenses: Simple, Continuous, Perfect, Perfect Continuous",
    "Punctuation: comma for pauses, semicolon for related clauses"
  ]
};
const topicIcons = {
  Math: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "\\ud83d\\udd22" }),
  Physics: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
  CS: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-4 h-4" }),
  Chemistry: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4" }),
  Biology: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4" }),
  English: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" })
};
const OPTION_LABELS = ["A", "B", "C", "D"];
function getWeeklyQuestions() {
  const seed = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1e3));
  const shuffled = [...questionBank].sort((a, b) => {
    const ha = Math.sin(seed * a.id) * 1e4;
    const hb = Math.sin(seed * b.id) * 1e4;
    return ha - Math.floor(ha) - (hb - Math.floor(hb));
  });
  const selected = [];
  const topicCount = {};
  for (const q of shuffled) {
    if (selected.length === 10) break;
    topicCount[q.topic] = topicCount[q.topic] ?? 0;
    if (topicCount[q.topic] < 2) {
      selected.push(q);
      topicCount[q.topic]++;
    }
  }
  for (const q of shuffled) {
    if (selected.length === 10) break;
    if (!selected.includes(q)) selected.push(q);
  }
  return selected.slice(0, 10);
}
function ScoreRing({ pct }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = pct / 100 * circ;
  const color = pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-36 h-36 flex items-center justify-center mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "144",
        height: "144",
        className: "absolute inset-0 -rotate-90",
        role: "img",
        "aria-label": `Score: ${pct}%`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
            "Score ring showing ",
            pct,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "72",
              cy: "72",
              r,
              fill: "none",
              stroke: "oklch(0.93 0.012 70)",
              strokeWidth: "10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "72",
              cy: "72",
              r,
              fill: "none",
              stroke: color,
              strokeWidth: "10",
              strokeDasharray: `${dash} ${circ}`,
              strokeLinecap: "round",
              style: { transition: "stroke-dasharray 1s ease" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-3xl text-foreground", children: [
        pct,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Score" })
    ] })
  ] });
}
function WeeklyTest() {
  const navigate = useNavigate();
  const [phase, setPhase] = reactExports.useState("intro");
  const [questions] = reactExports.useState(getWeeklyQuestions);
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [expandedNotes, setExpandedNotes] = reactExports.useState(
    {}
  );
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1e3)) % 52 + 1;
  const topics = [...new Set(questions.map((q) => q.topic))];
  const topicStats = topics.map((topic) => {
    const qs = questions.filter((q) => q.topic === topic);
    const correct = qs.filter((q) => answers[q.id] === q.answer).length;
    const pct = qs.length > 0 ? Math.round(correct / qs.length * 100) : 0;
    const status = pct < 50 ? "fear" : pct <= 70 ? "needs" : "strong";
    return { topic, correct, total: qs.length, pct, status };
  }).sort((a, b) => a.pct - b.pct);
  const totalCorrect = questions.filter(
    (q) => answers[q.id] === q.answer
  ).length;
  const totalPct = Math.round(totalCorrect / questions.length * 100);
  const scoreMsg = totalPct < 40 ? "Keep going! Every question teaches you something 💪" : totalPct <= 70 ? "Good effort! A few more reviews and you'll nail it 🌟" : "Excellent! You're on top of your topics 🏆";
  const fearTopics = topicStats.filter((t) => t.status === "fear");
  function selectAnswer(optionIdx) {
    const qId = questions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  }
  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      const correct = questions.filter(
        (q) => answers[q.id] === q.answer
      ).length;
      const pct = Math.round(correct / questions.length * 100);
      const allTopics = [...new Set(questions.map((q) => q.topic))];
      const topicResults = allTopics.map((topic) => {
        const qs = questions.filter((q) => q.topic === topic);
        const topicCorrect = qs.filter(
          (q) => answers[q.id] === q.answer
        ).length;
        return { topic, pct: Math.round(topicCorrect / qs.length * 100) };
      });
      const strong = topicResults.filter((t) => t.pct >= 70).map((t) => t.topic);
      const fearZones = topicResults.filter((t) => t.pct < 50).map((t) => t.topic);
      const newResult = {
        week: weekNumber,
        score: pct,
        strong,
        fearZones,
        date: (/* @__PURE__ */ new Date()).toLocaleDateString()
      };
      try {
        const existing = JSON.parse(
          localStorage.getItem("askspark_test_history") || "[]"
        );
        const filtered = existing.filter(
          (r) => r.week !== weekNumber
        );
        localStorage.setItem(
          "askspark_test_history",
          JSON.stringify([newResult, ...filtered].slice(0, 20))
        );
      } catch {
      }
      setPhase("results");
    }
  }
  function toggleNote(topic) {
    setExpandedNotes((prev) => ({ ...prev, [topic]: !prev[topic] }));
  }
  if (phase === "intro") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "rounded-full",
            onClick: () => navigate({ to: "/dashboard/student" }),
            "data-ocid": "weekly_test.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
              " Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Weekly Test" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 sm:p-12 warm-shadow text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "\\ud83d\\udcdd" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: [
            "Week #",
            weekNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Weekly Confidence Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-md mx-auto", children: "Auto-generated from your most asked topics this week" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: "bg-muted text-muted-foreground border-border gap-1.5 px-3 py-1",
            children: [
              topicIcons[t],
              " ",
              t
            ]
          },
          t
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 max-w-sm mx-auto", children: [
          { label: "Questions", value: "10" },
          { label: "~Duration", value: "5 min" },
          { label: "Topics", value: `${topics.length}` }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-2xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-foreground", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
        ] }, s.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "10 questions \\u00b7 ~5 minutes \\u00b7 Get your fear zone report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "rounded-full gradient-primary text-white border-0 shadow-primary px-10 font-semibold text-base",
            onClick: () => setPhase("test"),
            "data-ocid": "weekly_test.primary_button",
            children: "Start Test \\u2192"
          }
        )
      ] }) })
    ] });
  }
  if (phase === "test") {
    const q = questions[currentQ];
    const selected = answers[q.id];
    const progress = (currentQ + 1) / questions.length * 100;
    const isLast = currentQ === questions.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Weekly Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            currentQ + 1,
            " / ",
            questions.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2 rounded-full" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 sm:p-10 warm-shadow space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border gap-1.5", children: [
            topicIcons[q.topic],
            " ",
            q.topic
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "Q",
            currentQ + 1
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl sm:text-2xl font-bold text-foreground leading-snug", children: q.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "weekly_test.list", children: q.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm ${selected === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-white/60 hover:border-primary/40 text-foreground"}`,
            onClick: () => selectAnswer(i),
            "data-ocid": `weekly_test.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex w-6 h-6 rounded-full bg-muted items-center justify-center text-xs font-bold mr-3", children: OPTION_LABELS[i] }),
              opt
            ]
          },
          `q${q.id}-opt-${OPTION_LABELS[i]}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "rounded-full gradient-primary text-white border-0 shadow-primary px-8",
            disabled: selected === void 0,
            onClick: handleNext,
            "data-ocid": "weekly_test.primary_button",
            children: [
              isLast ? "Submit Test" : "Next",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ]
          }
        ) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "rounded-full",
          onClick: () => navigate({ to: "/dashboard/student" }),
          "data-ocid": "weekly_test.secondary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
            " Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Your Results" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card rounded-3xl p-8 warm-shadow text-center space-y-4",
          "data-ocid": "weekly_test.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-amber-500 mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Test Complete!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { pct: totalPct }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-semibold text-foreground", children: [
              totalCorrect,
              " / ",
              questions.length,
              " correct"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto text-sm", children: scoreMsg }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "rounded-full",
                  onClick: () => {
                    setPhase("intro");
                    setCurrentQ(0);
                    setAnswers({});
                  },
                  "data-ocid": "weekly_test.secondary_button",
                  children: "Retake Test"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "rounded-full gradient-primary text-white border-0 shadow-primary",
                  onClick: () => navigate({ to: "/dashboard/student" }),
                  "data-ocid": "weekly_test.primary_button",
                  children: "\\ud83d\\udcca View Test History"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "\\ud83d\\udcca Topic Report \\u2014 Fear Zone Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: topicStats.map((ts, i) => {
          const barColor = ts.status === "fear" ? "bg-red-500" : ts.status === "needs" ? "bg-amber-400" : "bg-green-500";
          const label = ts.status === "fear" ? "Fear Zone 🔴" : ts.status === "needs" ? "Needs Work 🟡" : "Strong 🟢";
          const labelClass = ts.status === "fear" ? "bg-red-100 text-red-700" : ts.status === "needs" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "glass-card border-white/40 warm-shadow",
              "data-ocid": `weekly_test.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: topicIcons[ts.topic] }),
                    ts.topic
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                      ts.correct,
                      "/",
                      ts.total
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${labelClass} border-0 text-xs`, children: label })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-2.5 rounded-full ${barColor} transition-all duration-700`,
                    style: { width: `${ts.pct}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1 text-right", children: [
                  ts.pct,
                  "%"
                ] })
              ] })
            },
            ts.topic
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "\\ud83d\\udcda Your Personalized Study Plan" }),
        fearTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card rounded-3xl p-8 warm-shadow text-center",
            "data-ocid": "weekly_test.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-green-500 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "No fear zones detected!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "You scored above 50% on all topics. Keep up the amazing work! \\ud83c\\udf89" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: fearTopics.map((ts, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "glass-card border-red-200/60 warm-shadow",
            "data-ocid": `weekly_test.panel.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-between p-5 text-left",
                  onClick: () => toggleNote(ts.topic),
                  "data-ocid": `weekly_test.toggle.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600", children: topicIcons[ts.topic] }),
                      ts.topic,
                      " \\u2014 Quick Revision Notes",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs", children: "Fear Zone" })
                    ] }),
                    expandedNotes[ts.topic] ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                  ]
                }
              ),
              expandedNotes[ts.topic] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 border-t border-border/50 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mt-4", children: (studyNotes[ts.topic] ?? []).map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2 text-sm text-foreground/80",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", children: "\\u2022" }),
                    note
                  ]
                },
                note
              )) }) })
            ] })
          },
          ts.topic
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground py-4", children: [
        "\\u00a9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with \\u2764\\ufe0f using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noreferrer",
            className: "underline hover:text-foreground transition-colors",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
export {
  WeeklyTest as default
};
