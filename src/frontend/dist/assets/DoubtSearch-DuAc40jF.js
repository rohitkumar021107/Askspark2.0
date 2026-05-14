import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as AnimatePresence, m as motion } from "./index-CiicjzrK.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { S as Search } from "./search-I-QYT-Ec.js";
import { C as ChevronUp } from "./chevron-up-gQIqj1MH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode);
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
  Biology: "bg-pink-100 text-pink-700",
  Maths: "bg-blue-100 text-blue-700",
  Programming: "bg-purple-100 text-purple-700",
  Electronics: "bg-orange-100 text-orange-700",
  General: "bg-gray-100 text-gray-700"
};
const FALLBACK_VIDEOS = {
  Mathematics: "WUvTyaaNkzM",
  Physics: "4i1MUWJoI0U",
  Chemistry: "0RRVV4Diomg",
  "Computer Science": "rL8X2mlNHPM",
  Biology: "Ae4MadKPJC0",
  Maths: "WUvTyaaNkzM",
  Programming: "rL8X2mlNHPM",
  Electronics: "4i1MUWJoI0U",
  General: "WUvTyaaNkzM"
};
function getKeywords(q) {
  return q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
}
function scoreText(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw)).length;
}
function DoubtSearch({ lecturesOnly = false }) {
  const [query, setQuery] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [openVideo, setOpenVideo] = reactExports.useState(null);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);
  const results = [];
  const related = [];
  let showRelated = false;
  if (debouncedQuery.trim().length > 0) {
    const keywords = getKeywords(debouncedQuery);
    for (const lec of RECORDED) {
      const matchCount = scoreText(
        `${lec.title} ${lec.subject} ${lec.desc}`,
        keywords
      );
      const item = {
        id: `lec-${lec.id}`,
        title: lec.title,
        subject: lec.subject,
        type: "Lecture",
        youtubeId: lec.youtubeId,
        matchCount
      };
      if (matchCount >= keywords.length && keywords.length > 0) {
        results.push(item);
      } else if (matchCount > 0) {
        related.push(item);
      }
    }
    if (!lecturesOnly) {
      try {
        const raw = localStorage.getItem("askspark_doubts");
        const doubts = raw ? JSON.parse(raw) : [];
        for (let i = 0; i < doubts.length; i++) {
          const d = doubts[i];
          const subject = d.subject ?? "General";
          const matchCount = scoreText(`${d.text} ${subject}`, keywords);
          const item = {
            id: `doubt-${i}`,
            title: d.text.slice(0, 60) + (d.text.length > 60 ? "..." : ""),
            subject,
            type: "Doubt",
            youtubeId: FALLBACK_VIDEOS[subject] ?? FALLBACK_VIDEOS.General,
            matchCount
          };
          if (matchCount >= keywords.length && keywords.length > 0) {
            results.push(item);
          } else if (matchCount > 0) {
            related.push(item);
          }
        }
      } catch {
      }
    }
    results.sort((a, b) => b.matchCount - a.matchCount);
    related.sort((a, b) => b.matchCount - a.matchCount);
    showRelated = results.length === 0 && related.length > 0;
  }
  const displayResults = showRelated ? related.slice(0, 3) : results;
  const isEmpty = debouncedQuery.trim().length > 0 && displayResults.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Search your doubt...",
          className: "pl-11 pr-4 py-3 rounded-full glass-card warm-shadow border border-white/40 text-sm focus-visible:ring-primary/40",
          "data-ocid": "search.input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: debouncedQuery.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        transition: { duration: 0.25 },
        className: "mt-4",
        "data-ocid": "search.panel",
        children: [
          showRelated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber-600 mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔍" }),
            " Showing related results"
          ] }),
          isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-8 text-muted-foreground text-sm",
              "data-ocid": "search.empty_state",
              children: "No results found. Try different keywords."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: displayResults.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.06 },
              className: "glass-card warm-shadow rounded-2xl border border-white/40 overflow-hidden",
              "data-ocid": `search.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs border-0 ${SUBJECT_COLORS[item.subject] ?? "bg-gray-100 text-gray-700"}`,
                        children: item.subject
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs border-0 ${item.type === "Lecture" ? "bg-indigo-100 text-indigo-700" : "bg-rose-100 text-rose-700"}`,
                        children: item.type
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3 leading-snug", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setOpenVideo(openVideo === item.id ? null : item.id),
                      className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors",
                      "data-ocid": `search.play.button.${i + 1}`,
                      children: openVideo === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }),
                        " Hide Solution"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                        " ▶ Play Solution"
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openVideo === item.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    transition: { duration: 0.3 },
                    className: "overflow-hidden",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "iframe",
                      {
                        src: `https://www.youtube.com/embed/${item.youtubeId}`,
                        title: item.title,
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        className: "w-full h-full",
                        loading: "lazy"
                      }
                    ) })
                  },
                  "video"
                ) })
              ]
            },
            item.id
          )) })
        ]
      },
      "results"
    ) })
  ] });
}
export {
  DoubtSearch as D
};
