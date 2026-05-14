import { r as reactExports, j as jsxRuntimeExports } from "./index-CiicjzrK.js";
function AskSparkLogo({
  variant = "horizontal",
  height = 40,
  className = "",
  idPrefix
}) {
  const reactId = reactExports.useId();
  const uid = idPrefix ?? reactId.replace(/[^a-zA-Z0-9]/g, "_");
  const iconSize = height;
  if (variant === "icon") {
    const ids2 = {
      body: `${uid}_icon_body`,
      bolt: `${uid}_icon_bolt`,
      base: `${uid}_icon_base`,
      glow: `${uid}_icon_glow`,
      shadow: `${uid}_icon_shadow`,
      clip: `${uid}_icon_clip`
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: iconSize,
        height: iconSize,
        viewBox: "0 0 64 64",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className,
        "aria-label": "AskSpark",
        role: "img",
        style: { overflow: "visible", flexShrink: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids2.body, x1: "0", y1: "0", x2: "0.6", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#60A5FA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "40%", stopColor: "#6366F1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids2.bolt, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FFFFFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "#FDE68A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FCD34D" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids2.base, x1: "0", y1: "0", x2: "1", y2: "0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#A78BFA" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: ids2.glow, cx: "50%", cy: "44%", r: "50%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8", stopOpacity: "0.55" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: ids2.shadow, x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "2.5", result: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feFlood", { floodColor: "#6366F1", floodOpacity: "0.55", result: "color" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "color", in2: "blur", operator: "in", result: "glow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "glow" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: ids2.clip, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 28c0-5.523 4.477-10 10-10s10 4.477 10 10c0 3.5-1.8 6.6-4.5 8.4V40H26.5v-3.6C23.8 34.6 22 31.5 22 28z" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "32", cy: "30", rx: "18", ry: "20", fill: `url(#${ids2.glow})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M22 28c0-5.523 4.477-10 10-10s10 4.477 10 10c0 3.5-1.8 6.6-4.5 8.4V40H26.5v-3.6C23.8 34.6 22 31.5 22 28z",
              fill: `url(#${ids2.body})`,
              filter: `url(#${ids2.shadow})`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "27.5",
              cy: "22.5",
              rx: "4",
              ry: "5.5",
              fill: "white",
              opacity: "0.22",
              clipPath: `url(#${ids2.clip})`,
              transform: "rotate(-20 27.5 22.5)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "26.5",
              y: "40",
              width: "11",
              height: "2.5",
              rx: "1.25",
              fill: `url(#${ids2.base})`,
              opacity: "0.88"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "28",
              y: "43",
              width: "8",
              height: "2",
              rx: "1",
              fill: `url(#${ids2.base})`,
              opacity: "0.65"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M33.5 22l-4 7h3.5l-2 7 6-8.5H33l2.5-5.5z",
              fill: `url(#${ids2.bolt})`,
              filter: `url(#${ids2.shadow})`
            }
          )
        ]
      }
    );
  }
  const wordmarkFontSize = height * 0.48;
  const totalWidth = iconSize + 8 + wordmarkFontSize * 4.2;
  const ids = {
    body: `${uid}_h_body`,
    bolt: `${uid}_h_bolt`,
    base: `${uid}_h_base`,
    text: `${uid}_h_text`,
    glow: `${uid}_h_glow`,
    shadow: `${uid}_h_shadow`,
    clip: `${uid}_h_clip`
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: totalWidth,
      height,
      viewBox: `0 0 ${totalWidth} ${height}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-label": "AskSpark",
      role: "img",
      style: { overflow: "visible", flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids.body, x1: "0", y1: "0", x2: "0.6", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#60A5FA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "40%", stopColor: "#6366F1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids.bolt, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FFFFFF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "#FDE68A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FCD34D" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids.base, x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#A78BFA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: ids.text, x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3B82F6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "45%", stopColor: "#6366F1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#8B5CF6" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: ids.glow, cx: "50%", cy: "44%", r: "50%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#818CF8", stopOpacity: "0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7C3AED", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: ids.shadow, x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "2", result: "blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("feFlood", { floodColor: "#6366F1", floodOpacity: "0.5", result: "color" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "color", in2: "blur", operator: "in", result: "glow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "glow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: ids.clip, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${iconSize * 0.345} ${iconSize * 0.438}
               c0-${iconSize * 0.156} ${iconSize * 0.07}-${iconSize * 0.282} ${iconSize * 0.156}-${iconSize * 0.282}
               s${iconSize * 0.156} ${iconSize * 0.126} ${iconSize * 0.156} ${iconSize * 0.282}
               c0 ${iconSize * 0.109}-${iconSize * 0.056} ${iconSize * 0.206}-${iconSize * 0.141} ${iconSize * 0.263}
               V${iconSize * 0.625}H${iconSize * 0.414}v-${iconSize * 0.063}
               c-${iconSize * 0.085}-${iconSize * 0.057}-${iconSize * 0.069}-${iconSize * 0.154}-${iconSize * 0.069}-${iconSize * 0.263}z`
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(0, ${(height - iconSize) / 2})`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: iconSize / 2,
              cy: iconSize * 0.47,
              rx: iconSize * 0.28,
              ry: iconSize * 0.31,
              fill: `url(#${ids.glow})`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${iconSize * 0.345} ${iconSize * 0.438}
             c0-${iconSize * 0.156} ${iconSize * 0.07}-${iconSize * 0.282} ${iconSize * 0.156}-${iconSize * 0.282}
             s${iconSize * 0.156} ${iconSize * 0.126} ${iconSize * 0.156} ${iconSize * 0.282}
             c0 ${iconSize * 0.109}-${iconSize * 0.056} ${iconSize * 0.206}-${iconSize * 0.141} ${iconSize * 0.263}
             V${iconSize * 0.625}H${iconSize * 0.414}v-${iconSize * 0.063}
             c-${iconSize * 0.085}-${iconSize * 0.057}-${iconSize * 0.069}-${iconSize * 0.154}-${iconSize * 0.069}-${iconSize * 0.263}z`,
              fill: `url(#${ids.body})`,
              filter: `url(#${ids.shadow})`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: iconSize * 0.41,
              cy: iconSize * 0.315,
              rx: iconSize * 0.062,
              ry: iconSize * 0.085,
              fill: "white",
              opacity: "0.22",
              clipPath: `url(#${ids.clip})`,
              transform: `rotate(-20 ${iconSize * 0.41} ${iconSize * 0.315})`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: iconSize * 0.414,
              y: iconSize * 0.625,
              width: iconSize * 0.172,
              height: iconSize * 0.063,
              rx: iconSize * 0.031,
              fill: `url(#${ids.base})`,
              opacity: "0.88"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: iconSize * 0.438,
              y: iconSize * 0.703,
              width: iconSize * 0.125,
              height: iconSize * 0.047,
              rx: iconSize * 0.023,
              fill: `url(#${ids.base})`,
              opacity: "0.65"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${iconSize * 0.523} ${iconSize * 0.281}
             l-${iconSize * 0.063} ${iconSize * 0.109}
             h${iconSize * 0.055}
             l-${iconSize * 0.031} ${iconSize * 0.109}
             l${iconSize * 0.094}-${iconSize * 0.133}
             H${iconSize * 0.516}
             l${iconSize * 0.039}-${iconSize * 0.086}z`,
              fill: `url(#${ids.bolt})`,
              filter: `url(#${ids.shadow})`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: iconSize + 8,
            y: height * 0.72,
            fontSize: wordmarkFontSize,
            fontWeight: "700",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
            letterSpacing: "-0.02em",
            fill: `url(#${ids.text})`,
            children: "AskSpark"
          }
        )
      ]
    }
  );
}
export {
  AskSparkLogo as A
};
