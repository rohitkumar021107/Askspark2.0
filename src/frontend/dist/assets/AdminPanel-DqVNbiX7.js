import { c as createLucideIcon, j as jsxRuntimeExports, u as useNavigate, r as reactExports, e as ue } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, d as CardContent } from "./card-CrjAUlyJ.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { c as cn } from "./utils-C0ugf0YY.js";
import { g as getRatingsCount, a as getAverageRating } from "./useRatings-D01Uc0bv.js";
import { S as Shield } from "./shield-BXPWLYjV.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import "./useFirestoreRatings-DaeseLrE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const ADMIN_PASSWORD = "spark2024";
function AdminPanel() {
  const navigate = useNavigate();
  const [password, setPassword] = reactExports.useState("");
  const [authed, setAuthed] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  function tryLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  }
  if (!authed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "glass-card border-white/40 warm-shadow w-full max-w-sm",
        "data-ocid": "admin.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-3 shadow-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Admin Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "AskSpark internal dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "password",
                  placeholder: "Enter admin password",
                  className: "pl-9",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && tryLogin(),
                  "data-ocid": "admin.input"
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "admin.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full gradient-primary text-white border-0",
                onClick: tryLogin,
                "data-ocid": "admin.submit_button",
                children: "Enter Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                className: "w-full text-muted-foreground",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "admin.link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
                  " Back to Home"
                ]
              }
            )
          ] })
        ] })
      }
    ) });
  }
  const doubts = (() => {
    try {
      return JSON.parse(localStorage.getItem("askspark_doubts") || "[]");
    } catch {
      return [];
    }
  })();
  const hasProfile = !!localStorage.getItem("askspark_profile");
  const ratingsCount = getRatingsCount();
  const avgRating = getAverageRating();
  const STATS = [
    {
      label: "Active Users",
      value: hasProfile ? "1" : "0",
      icon: "👤",
      color: "bg-blue-50 text-blue-700"
    },
    {
      label: "Total Doubts",
      value: doubts.length,
      icon: "❓",
      color: "bg-amber-50 text-amber-700"
    },
    {
      label: "Rated Doubts",
      value: ratingsCount,
      icon: "⭐",
      color: "bg-yellow-50 text-yellow-700"
    },
    {
      label: "Avg Rating",
      value: avgRating > 0 ? `${avgRating.toFixed(1)} / 5` : "N/A",
      icon: "📊",
      color: "bg-green-50 text-green-700"
    }
  ];
  function clearAllData() {
    const confirm = window.confirm(
      "⚠️ This will delete ALL AskSpark data from this browser. This cannot be undone. Continue?"
    );
    if (!confirm) return;
    const keys = Object.keys(localStorage).filter(
      (k) => k.startsWith("askspark_")
    );
    for (const k of keys) localStorage.removeItem(k);
    ue.success("All AskSpark data cleared.");
    navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav sticky top-0 z-40 px-4 sm:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/" }),
            className: "w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted/40 transition-colors",
            "data-ocid": "admin.link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Admin Dashboard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "rounded-full text-destructive border-destructive/30 hover:bg-destructive/5",
          onClick: clearAllData,
          "data-ocid": "admin.delete_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1.5" }),
            " Clear All Data"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Platform Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Local data stored in this browser session." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "glass-card border-white/40 warm-shadow",
          "data-ocid": `admin.card.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl mb-3`,
                children: s.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
          ] })
        },
        s.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass-card border-white/40 warm-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Recent Doubts" }),
        doubts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-8 text-muted-foreground text-sm",
            "data-ocid": "admin.empty_state",
            children: "No doubts submitted yet."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: doubts.slice(0, 20).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": `admin.row.${i + 1}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full", children: d.subject ?? "General" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm max-w-xs truncate", children: d.title ?? d.text ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: d.timestamp ? new Date(d.timestamp).toLocaleDateString() : "—" })
          ] }, d.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass-card border-white/40 warm-shadow border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: "🤝" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground text-lg", children: "Powered by Team Spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Built for Indian Students · Supported by educators who care" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 inline-block text-xs text-muted-foreground border border-dashed border-primary/30 rounded-xl px-4 py-2", children: "📢 Sponsorship inquiries: sponsor@askspark.app" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground py-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " AskSpark Admin Panel · Internal use only"
      ] })
    ] })
  ] });
}
export {
  AdminPanel as default
};
