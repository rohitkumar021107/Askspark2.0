import { j as jsxRuntimeExports, W as Link } from "./index-CiicjzrK.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, d as CardContent } from "./card-CrjAUlyJ.js";
import { H as Header } from "./Header-CHS4WW_R.js";
import { b as blogPosts } from "./blogPosts-CcSUrwEy.js";
import { H as House } from "./house-Cq-rS24c.js";
import { B as BookOpen } from "./book-open-Bmv8GHoc.js";
import { P as PenLine } from "./pen-line-C2iuSrkv.js";
import { C as Calendar } from "./calendar-DX2QbqvM.js";
import { C as Clock } from "./clock-DKrs62zG.js";
import { A as ArrowRight } from "./arrow-right-BKmUScdq.js";
import { S as Sparkles } from "./sparkles-CCW2A6A2.js";
import "./utils-C0ugf0YY.js";
import "./AskSparkLogo--OCsylaZ.js";
import "./useNotifications-DtVnhzgN.js";
import "./x-Sd9Di6ji.js";
import "./menu-BRbSQqMd.js";
function BlogList() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-hero pt-16 pb-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6",
          "data-ocid": "blog.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
            "AskSpark Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
        "AskSpark Blog"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight", children: [
        "Learn, Grow, and ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Ask Boldly" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Insights on student confidence, anonymous learning, and how AskSpark is helping students ask their doubts without fear." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: blogPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog/$slug",
          params: { slug: post.slug },
          "data-ocid": `blog.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-card border-white/40 warm-shadow hover:warm-shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-44 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/blog-header.dim_1200x480.jpg",
                loading: "lazy",
                alt: `AskSpark blog — ${post.title}`,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: post.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs bg-primary/10 text-primary border-0 rounded-full",
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5 flex-1", children: post.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0", children: "TA" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.author })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                      post.date
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                      post.readTime
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all", children: [
                  "Read",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] })
              ] })
            ] })
          ] })
        },
        post.slug
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 glass-card rounded-3xl p-8 sm:p-10 text-center border-white/40 warm-shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground mb-3", children: "Have a doubt? Ask it on AskSpark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mx-auto mb-7", children: "Anonymously, for free — AskSpark helps students ask questions without fear and get real answers from teachers." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", "data-ocid": "blog.primary_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "rounded-full gradient-primary text-white border-0 shadow-primary hover:opacity-90 px-8",
            children: "Ask Your Doubt Now"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border/40 mt-8 py-8 text-center text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with ❤️ using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  BlogList as default
};
