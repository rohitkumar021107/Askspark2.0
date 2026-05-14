import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, d as AnimatePresence, m as motion } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { C as CircleCheck } from "./circle-check-Dos6jNK6.js";
import "./utils-C0ugf0YY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const QUESTIONS = {
  Mathematics: [
    {
      q: "What is the derivative of sin(x)?",
      options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
      answer: 0,
      videoId: "WUvTyaaNkzM"
    },
    {
      q: "∫x dx equals?",
      options: ["x²", "x²/2 + C", "2x", "x + C"],
      answer: 1,
      videoId: "WUvTyaaNkzM"
    },
    {
      q: "What is the value of lim(x→0) sin(x)/x?",
      options: ["0", "∞", "1", "-1"],
      answer: 2,
      videoId: "WUvTyaaNkzM"
    },
    {
      q: "Which is the correct quadratic formula?",
      options: [
        "(-b±√b²-4ac)/2a",
        "(-b±√b²+4ac)/2a",
        "(b±√b²-4ac)/2a",
        "(-b±√b²-4ac)/a"
      ],
      answer: 0,
      videoId: "WUvTyaaNkzM"
    },
    {
      q: "What is the slope of y = 3x + 7?",
      options: ["7", "3", "10", "3/7"],
      answer: 1,
      videoId: "WUvTyaaNkzM"
    }
  ],
  Physics: [
    {
      q: "What is Newton's second law?",
      options: ["F=mv", "F=ma", "F=m/a", "F=a/m"],
      answer: 1,
      videoId: "4i1MUWJoI0U"
    },
    {
      q: "Unit of force is?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2,
      videoId: "4i1MUWJoI0U"
    },
    {
      q: "Speed of light in vacuum?",
      options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
      answer: 1,
      videoId: "4i1MUWJoI0U"
    },
    {
      q: "What is the SI unit of energy?",
      options: ["Newton", "Watt", "Joule", "Pascal"],
      answer: 2,
      videoId: "4i1MUWJoI0U"
    },
    {
      q: "Which law states energy cannot be created or destroyed?",
      options: [
        "Newton's 1st",
        "Ohm's Law",
        "Law of Conservation of Energy",
        "Boyle's Law"
      ],
      answer: 2,
      videoId: "4i1MUWJoI0U"
    }
  ],
  Chemistry: [
    {
      q: "Atomic number of Carbon?",
      options: ["6", "12", "8", "14"],
      answer: 0,
      videoId: "0RRVV4Diomg"
    },
    {
      q: "Chemical formula of water?",
      options: ["H₂O₂", "HO", "H₂O", "H₃O"],
      answer: 2,
      videoId: "0RRVV4Diomg"
    },
    {
      q: "Which gas is released in photosynthesis?",
      options: ["CO₂", "N₂", "O₂", "H₂"],
      answer: 2,
      videoId: "0RRVV4Diomg"
    },
    {
      q: "pH of pure water?",
      options: ["0", "14", "10", "7"],
      answer: 3,
      videoId: "0RRVV4Diomg"
    },
    {
      q: "What is the valency of Oxygen?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      videoId: "0RRVV4Diomg"
    }
  ],
  "Computer Science": [
    {
      q: "What does CPU stand for?",
      options: [
        "Central Process Unit",
        "Central Processing Unit",
        "Computer Processing Unit",
        "Core Processing Unit"
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM"
    },
    {
      q: "Time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2,
      videoId: "rL8X2mlNHPM"
    },
    {
      q: "Which data structure uses LIFO?",
      options: ["Queue", "Array", "Stack", "Tree"],
      answer: 2,
      videoId: "rL8X2mlNHPM"
    },
    {
      q: "What is HTML?",
      options: [
        "A programming language",
        "A markup language",
        "A database",
        "An OS"
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM"
    },
    {
      q: "What does RAM stand for?",
      options: [
        "Read Access Memory",
        "Random Access Memory",
        "Run Access Memory",
        "Read All Memory"
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM"
    }
  ],
  Biology: [
    {
      q: "Basic unit of life?",
      options: ["Tissue", "Organ", "Cell", "Atom"],
      answer: 2,
      videoId: "Ae4MadKPJC0"
    },
    {
      q: "Where does photosynthesis occur?",
      options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
      answer: 1,
      videoId: "Ae4MadKPJC0"
    },
    {
      q: "DNA stands for?",
      options: [
        "Deoxyribonucleic Acid",
        "Diribonucleic Acid",
        "Deoxyribose Nucleic Acid",
        "Double Nucleic Acid"
      ],
      answer: 0,
      videoId: "Ae4MadKPJC0"
    },
    {
      q: "Which organ pumps blood?",
      options: ["Liver", "Kidney", "Lungs", "Heart"],
      answer: 3,
      videoId: "Ae4MadKPJC0"
    },
    {
      q: "How many chromosomes in human cells?",
      options: ["23", "46", "48", "44"],
      answer: 1,
      videoId: "Ae4MadKPJC0"
    }
  ]
};
const SUBJECTS = Object.keys(QUESTIONS);
function PracticePage() {
  const navigate = useNavigate();
  const [subject, setSubject] = reactExports.useState("Mathematics");
  const [selected, setSelected] = reactExports.useState(
    Array(5).fill(null)
  );
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [videoOpen, setVideoOpen] = reactExports.useState({});
  const questions = QUESTIONS[subject];
  function handleSubjectChange(s) {
    setSubject(s);
    setSelected(Array(5).fill(null));
    setSubmitted(false);
    setVideoOpen({});
  }
  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setSelected((prev) => prev.map((v, i) => i === qIdx ? optIdx : v));
  }
  function handleSubmit() {
    if (selected.some((s) => s === null)) return;
    setSubmitted(true);
  }
  const score = submitted ? selected.filter((s, i) => s === questions[i].answer).length : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6",
          onClick: () => navigate({ to: "/learning" }),
          "data-ocid": "practice.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Learning Hub"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
        "📝 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Practice (DPP)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Daily practice problems — pick a subject and test yourself!" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-8", "data-ocid": "practice.select", children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handleSubjectChange(s),
          className: `px-4 py-2 rounded-full text-sm font-semibold border transition-all ${subject === s ? "gradient-primary text-white border-0 shadow-primary" : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"}`,
          "data-ocid": "practice.subject.tab",
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0 },
          className: `mb-6 p-4 rounded-2xl text-center font-display font-bold text-xl ${score >= 4 ? "bg-green-50 text-green-700 border border-green-200" : score >= 3 ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-red-50 text-red-700 border border-red-200"}`,
          "data-ocid": "practice.success_state",
          children: [
            score >= 4 ? "🎉" : score >= 3 ? "👍" : "📚",
            " Your Score: ",
            score,
            "/5",
            score === 5 && " — Perfect!",
            score >= 3 && score < 5 && " — Good job!",
            score < 3 && " — Keep practising!"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: questions.map((q, qi) => {
        const isCorrect = submitted && selected[qi] === q.answer;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: qi * 0.05 },
            className: `glass-card warm-shadow rounded-2xl p-5 border ${submitted ? isCorrect ? "border-green-300 bg-green-50/40" : "border-red-200 bg-red-50/30" : "border-white/40"}`,
            "data-ocid": `practice.item.${qi + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center", children: qi + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: q.q }),
                submitted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto flex-shrink-0", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-500" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: q.options.map((opt, oi) => {
                const isSelected = selected[qi] === oi;
                const isAnswerKey = submitted && oi === q.answer;
                const isSelectedWrong = submitted && isSelected && oi !== q.answer;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSelect(qi, oi),
                    disabled: submitted,
                    className: `text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${isAnswerKey ? "bg-green-100 border-green-400 text-green-800 font-semibold" : isSelectedWrong ? "bg-red-100 border-red-400 text-red-800" : isSelected ? "bg-primary/10 border-primary text-primary font-semibold" : "border-border hover:border-primary/40 hover:bg-muted/40"}`,
                    "data-ocid": "practice.radio",
                    children: opt
                  },
                  opt
                );
              }) }),
              submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "rounded-full text-xs border-primary/30 text-primary hover:bg-primary/5",
                    onClick: () => setVideoOpen((prev) => ({ ...prev, [qi]: !prev[qi] })),
                    "data-ocid": `practice.solution.button.${qi + 1}`,
                    children: [
                      videoOpen[qi] ? "Hide" : "View",
                      " Solution 🎬"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: videoOpen[qi] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    className: "overflow-hidden mt-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-xl overflow-hidden bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "iframe",
                      {
                        src: `https://www.youtube.com/embed/${q.videoId}`,
                        title: `Solution for question ${qi + 1}`,
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        className: "w-full h-full",
                        loading: "lazy"
                      }
                    ) })
                  }
                ) })
              ] })
            ]
          },
          `${subject}-${q.q.slice(0, 20)}`
        );
      }) }),
      !submitted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "rounded-full gradient-primary text-white border-0 hover:opacity-90 font-semibold px-10 shadow-primary",
            onClick: handleSubmit,
            disabled: selected.some((s) => s === null),
            "data-ocid": "practice.submit_button",
            children: "Submit Answers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
          selected.filter((s) => s !== null).length,
          "/5 questions answered"
        ] })
      ] }),
      submitted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "rounded-full border-primary/30 text-primary hover:bg-primary/5",
          onClick: () => handleSubjectChange(subject),
          "data-ocid": "practice.secondary_button",
          children: "Try Again"
        }
      ) })
    ] }),
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
  PracticePage as default
};
