import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, W as Link, l as loadLocalProfile } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { A as AskSparkLogo } from "./AskSparkLogo--OCsylaZ.js";
import { u as useNotifications, B as Bell } from "./useNotifications-DtVnhzgN.js";
import { X } from "./x-Sd9Di6ji.js";
import { M as Menu } from "./menu-BRbSQqMd.js";
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
const TYPE_ICONS = {
  call: "📞",
  class: "🎥",
  doubt_answered: "✅",
  new_doubt: "❓",
  call_request: "📲"
};
function NotificationBell() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const [open, setOpen] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const recent = notifications.slice(0, 10);
  reactExports.useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);
  function handleNotificationClick(id, navigateTo) {
    markRead(id);
    setOpen(false);
    if (navigateTo) {
      navigate({ to: navigateTo });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative",
      "data-ocid": "notifications.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200",
            onClick: () => setOpen((prev) => !prev),
            "aria-label": "Notifications",
            "aria-expanded": open,
            "aria-haspopup": "true",
            "data-ocid": "notifications.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-foreground" }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 animate-pulse",
                  "aria-label": `${unreadCount} unread notifications`,
                  children: unreadCount > 9 ? "9+" : unreadCount
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute top-full mt-2 right-0 w-80 sm:w-96 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden z-[100] shadow-2xl transition-all duration-200 origin-top-right ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`,
            "aria-label": "Notifications",
            "data-ocid": "notifications.popover",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-foreground", children: "Notifications" }),
                  unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold", children: [
                    unreadCount,
                    " new"
                  ] })
                ] }),
                unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-primary hover:text-primary/80 hover:underline transition-colors",
                    onClick: markAllRead,
                    "data-ocid": "notifications.secondary_button",
                    children: "Mark all read"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-80 overflow-y-auto overscroll-contain", children: recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-10 flex flex-col items-center gap-2 text-muted-foreground",
                  "data-ocid": "notifications.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 opacity-30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "No notifications yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-60", children: "We'll notify you when something happens" })
                  ]
                }
              ) : recent.map((n, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/10 active:bg-white/15 transition-colors border-b border-white/10 last:border-0 ${n.read ? "opacity-50" : ""}`,
                  onClick: () => handleNotificationClick(n.id, n.navigateTo),
                  "data-ocid": `notifications.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-base flex-shrink-0 mt-0.5",
                        "aria-hidden": "true",
                        children: TYPE_ICONS[n.type] ?? "🔔"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      n.title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground truncate", children: n.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/80 leading-snug break-words", children: n.message }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: timeAgo(n.createdAt) })
                    ] }),
                    !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5 animate-pulse" })
                  ]
                },
                n.id
              )) })
            ]
          }
        )
      ]
    }
  );
}
const NAV_LINKS = [
  { href: "/", label: "Home", isAnchor: false },
  { href: "/submit", label: "Ask Doubt", isAnchor: false },
  { href: "/dashboard", label: "Dashboard", isAnchor: false },
  { href: "/onboarding", label: "Login", isAnchor: false },
  { href: "/onboarding", label: "Sign Up", isAnchor: false }
];
function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center shrink-0 transition-opacity duration-150 hover:opacity-80",
              "data-ocid": "nav.link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AskSparkLogo,
                  {
                    variant: "horizontal",
                    height: 44,
                    idPrefix: "nav_h",
                    className: "hidden md:block"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AskSparkLogo,
                  {
                    variant: "icon",
                    height: 38,
                    idPrefix: "nav_m",
                    className: "md:hidden"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground", children: NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.href,
              className: "hover:text-primary transition-colors duration-150",
              "data-ocid": "nav.link",
              children: link.label
            },
            `${link.href}-${link.label}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            loadLocalProfile() && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/40 text-primary hover:bg-primary/10 font-medium min-w-[120px] px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]",
                onClick: () => navigate({ to: "/onboarding" }),
                "data-ocid": "header.secondary_button",
                children: "I'm a Student"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 min-w-[120px] transition-all duration-150 hover:scale-[1.02] glow-button",
                onClick: () => navigate({ to: "/onboarding" }),
                "data-ocid": "header.primary_button",
                children: "I'm a Teacher"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [
            loadLocalProfile() && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-2 rounded-xl hover:bg-muted/40 transition-colors",
                onClick: () => setMobileOpen(!mobileOpen),
                "data-ocid": "header.toggle",
                "aria-label": "Toggle menu",
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5 text-foreground" })
              }
            )
          ] })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden glass-nav border-t border-primary/20 px-4 py-4 flex flex-col gap-1 animate-fade-in", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.href,
              className: "text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors",
              onClick: () => setMobileOpen(false),
              "data-ocid": "nav.link",
              children: link.label
            },
            `${link.href}-${link.label}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-3 border-t border-primary/20 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "rounded-full border-primary/40 text-primary w-full py-2.5",
                onClick: () => {
                  navigate({ to: "/onboarding" });
                  setMobileOpen(false);
                },
                "data-ocid": "header.secondary_button",
                children: "I'm a Student"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "rounded-full gradient-primary text-white border-0 w-full py-2.5 glow-button",
                onClick: () => {
                  navigate({ to: "/onboarding" });
                  setMobileOpen(false);
                },
                "data-ocid": "header.primary_button",
                children: "I'm a Teacher"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Header as H
};
