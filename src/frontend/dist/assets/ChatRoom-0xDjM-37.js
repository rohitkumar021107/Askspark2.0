import { X as shimExports, r as reactExports, j as jsxRuntimeExports, e as ue } from "./index-CiicjzrK.js";
import { c as createContextScope } from "./index-Ci0ctMen.js";
import { u as useCallbackRef } from "./index-C7zsWbmt.js";
import { d as useLayoutEffect2 } from "./index-BUlsMpCV.js";
import { P as Primitive } from "./index-xWxfC-pn.js";
import { c as cn } from "./utils-C0ugf0YY.js";
import { B as Badge } from "./badge-Ncr4NsWM.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { C as Card, d as CardContent } from "./card-CrjAUlyJ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DaVgRmoe.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { S as ScrollArea } from "./scroll-area-QUII3CK_.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CKDsVIvG.js";
import { M as MessageCircle } from "./message-circle-nHju7Woe.js";
import { U as Users } from "./users-BBY2vuqG.js";
import { S as Shield } from "./shield-BXPWLYjV.js";
import { M as MessageSquare } from "./message-square-BVVl9NSs.js";
import { S as Send } from "./send-adheBpJl.js";
import { P as Plus } from "./plus-Dd62hBQ1.js";
import { S as Search } from "./search-I-QYT-Ec.js";
import "./Combination-BPR_6sdE.js";
import "./index-UGGF_iej.js";
import "./x-Sd9Di6ji.js";
import "./index-BjI1O3hJ.js";
import "./index-IXOTxK3N.js";
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const BLOCKED_WORDS = [
  "badword1",
  "badword2",
  "badword3",
  "badword4",
  "slur1",
  "slur2",
  "hate1",
  "dirty1",
  "abuse1",
  "abuse2"
];
function containsBlockedWords(text) {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((w) => lower.includes(w));
}
const ROOMS = [
  { id: "math", name: "Mathematics", members: 142, icon: "📐" },
  { id: "physics", name: "Physics", members: 98, icon: "⚛️" },
  { id: "chemistry", name: "Chemistry", members: 76, icon: "🧪" },
  { id: "cs", name: "Computer Science", members: 214, icon: "💻" },
  { id: "general", name: "General", members: 389, icon: "💬" }
];
const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-fuchsia-500"
];
function GroupChatTab() {
  const [activeRoom, setActiveRoom] = reactExports.useState("cs");
  const [input, setInput] = reactExports.useState("");
  const [messages, setMessages] = reactExports.useState({});
  const [violations, setViolations] = reactExports.useState(0);
  const [isBanned, setIsBanned] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const nextId = reactExports.useRef(100);
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeRoom]);
  const sendMessage = () => {
    const text = input.trim();
    if (!text || isBanned) return;
    if (containsBlockedWords(text)) {
      const newViolations = violations + 1;
      setViolations(newViolations);
      if (newViolations >= 3) {
        setIsBanned(true);
        ue.error("You have been blocked for repeated violations.");
      } else {
        ue.warning(
          `⚠️ Warning: Inappropriate language detected. ${3 - newViolations} warning(s) remaining before ban.`,
          { duration: 5e3 }
        );
      }
      setInput("");
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const newMsg = {
      id: nextId.current++,
      user: "You",
      initials: "ME",
      color: "bg-indigo-500",
      text,
      time: timeStr,
      isOwn: true
    };
    setMessages((prev) => ({
      ...prev,
      [activeRoom]: [...prev[activeRoom] || [], newMsg]
    }));
    setInput("");
  };
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const currentRoom = ROOMS.find((r) => r.id === activeRoom);
  const roomMessages = messages[activeRoom] || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[600px] gap-0 rounded-2xl overflow-hidden border border-white/40 warm-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-52 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-white/40 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
        "Study Rooms"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 space-y-1", children: ROOMS.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveRoom(room.id),
          className: `w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${activeRoom === room.id ? "bg-primary/10 text-primary" : "hover:bg-muted/60 text-foreground"}`,
          "data-ocid": "chat.tab",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: room.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold truncate", children: room.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                room.members,
                " online"
              ] })
            ] })
          ] })
        },
        room.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col bg-white/40 backdrop-blur-sm min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-white/40 bg-white/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-foreground text-sm", children: [
            currentRoom.icon,
            " ",
            currentRoom.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            currentRoom.members,
            " members online"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 border-green-200 text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 mr-1" }),
          "Moderated"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-amber-50/80 border-b border-amber-100 text-[11px] text-amber-700 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Community Guidelines:" }),
          " Be respectful. No abusive language. No personal attacks. Violations = permanent ban."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
        roomMessages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 flex items-center justify-center text-center p-8 text-muted-foreground h-full",
            "data-ocid": "chat.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 mx-auto mb-3 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No messages yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Be the first to start the conversation!" })
            ] })
          }
        ),
        roomMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex gap-2.5 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-7 h-7 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarFallback,
                {
                  className: `${msg.color} text-white text-[10px] font-bold`,
                  children: msg.initials
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `max-w-xs ${msg.isOwn ? "items-end" : "items-start"} flex flex-col gap-0.5`,
                  children: [
                    !msg.isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-muted-foreground", children: msg.user }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `px-3 py-2 rounded-2xl text-sm ${msg.isOwn ? "gradient-primary text-white rounded-tr-sm" : "bg-white/80 text-foreground rounded-tl-sm"}`,
                        children: msg.text
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: msg.time })
                  ]
                }
              )
            ]
          },
          msg.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-white/40 bg-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: isBanned ? "You are banned from this chat" : "Type a message... (press Enter to send)",
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKey,
            disabled: isBanned,
            className: "flex-1 rounded-full border-border/60 bg-white/70",
            "data-ocid": "chat.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            onClick: sendMessage,
            disabled: isBanned || !input.trim(),
            className: "rounded-full gradient-primary text-white border-0 w-9 h-9 flex-shrink-0",
            "data-ocid": "chat.primary_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
          }
        )
      ] }) })
    ] }),
    isBanned && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6",
        "data-ocid": "chat.modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-sm w-full border-red-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-red-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "Account Blocked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You have been blocked from the AskIQ community for violating our community guidelines." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "To appeal, contact support at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "mailto:rohitkumar021107k@gmail.com",
                className: "text-primary hover:underline",
                children: "rohitkumar021107k@gmail.com"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
function PersonalMessagesTab() {
  const [conversations, setConversations] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(1);
  const [input, setInput] = reactExports.useState("");
  const [violations, setViolations] = reactExports.useState(0);
  const [isBanned, setIsBanned] = reactExports.useState(false);
  const [showNewChat, setShowNewChat] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const nextMsgId = reactExports.useRef(500);
  const selected = conversations.find((c) => c.id === selectedId);
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedId, conversations]);
  const sendMessage = () => {
    const text = input.trim();
    if (!text || isBanned) return;
    if (containsBlockedWords(text)) {
      const newViolations = violations + 1;
      setViolations(newViolations);
      if (newViolations >= 3) {
        setIsBanned(true);
        ue.error("You have been blocked for repeated violations.");
      } else {
        ue.warning(
          `⚠️ Warning: Inappropriate language detected. ${3 - newViolations} warning(s) remaining before ban.`,
          { duration: 5e3 }
        );
      }
      setInput("");
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const newMsg = {
      id: nextMsgId.current++,
      user: "You",
      initials: "ME",
      color: "bg-indigo-500",
      text,
      time: timeStr,
      isOwn: true
    };
    setConversations(
      (prev) => prev.map(
        (c) => c.id === selectedId ? {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: text,
          time: timeStr,
          unread: 0
        } : c
      )
    );
    setInput("");
  };
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const handleSelect = (id) => {
    setSelectedId(id);
    setConversations(
      (prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c)
    );
  };
  const MOCK_USERS = [
    "Ishaan Kumar",
    "Meera Nair",
    "Dev Patel",
    "Kiran Bose",
    "Ananya Rao"
  ];
  const startNewChat = (name) => {
    const color = AVATAR_COLORS[conversations.length % AVATAR_COLORS.length];
    const initials = name.split(" ").map((n) => n[0]).join("");
    const newConvo = {
      id: Date.now(),
      name,
      initials,
      color,
      lastMessage: "Say hello!",
      time: "Now",
      unread: 0,
      messages: []
    };
    setConversations((prev) => [newConvo, ...prev]);
    setSelectedId(newConvo.id);
    setShowNewChat(false);
    setSearchQuery("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[600px] gap-0 rounded-2xl overflow-hidden border border-white/40 warm-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-white/40 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-white/40 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "w-7 h-7 rounded-full",
            onClick: () => setShowNewChat(true),
            "data-ocid": "chat.open_modal_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 space-y-1", children: [
        conversations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-6 text-center text-muted-foreground text-sm",
            "data-ocid": "chat.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No conversations yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Start a new chat below" })
            ]
          }
        ),
        conversations.map((convo) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleSelect(convo.id),
            className: `w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${selectedId === convo.id ? "bg-primary/10" : "hover:bg-muted/60"}`,
            "data-ocid": "chat.item.1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarFallback,
                {
                  className: `${convo.color} text-white text-xs font-bold`,
                  children: convo.initials
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground truncate", children: convo.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground ml-1 flex-shrink-0", children: convo.time })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: convo.lastMessage }),
                  convo.unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full p-0 ml-1 flex-shrink-0", children: convo.unread })
                ] })
              ] })
            ] })
          },
          convo.id
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col bg-white/40 backdrop-blur-sm min-w-0", children: !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-center p-8 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 mx-auto mb-3 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Select a conversation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Or start a new chat using the + button" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-white/40 bg-white/30 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvatarFallback,
          {
            className: `${selected.color} text-white text-xs font-bold`,
            children: selected.initials
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: selected.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-green-500 font-medium", children: "● Online" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: scrollRef,
          className: "flex-1 overflow-y-auto p-4 space-y-3",
          children: [
            selected.messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-10 h-10 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No messages yet. Say hello!" })
            ] }) }),
            selected.messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex gap-2.5 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-7 h-7 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AvatarFallback,
                    {
                      className: `${msg.color} text-white text-[10px] font-bold`,
                      children: msg.initials
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `max-w-xs flex flex-col gap-0.5 ${msg.isOwn ? "items-end" : "items-start"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `px-3 py-2 rounded-2xl text-sm ${msg.isOwn ? "gradient-primary text-white rounded-tr-sm" : "bg-white/80 text-foreground rounded-tl-sm"}`,
                            children: msg.text
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: msg.time })
                      ]
                    }
                  )
                ]
              },
              msg.id
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-white/40 bg-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: isBanned ? "You are banned" : "Type a message...",
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKey,
            disabled: isBanned,
            className: "flex-1 rounded-full border-border/60 bg-white/70",
            "data-ocid": "chat.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            onClick: sendMessage,
            disabled: isBanned || !input.trim(),
            className: "rounded-full gradient-primary text-white border-0 w-9 h-9 flex-shrink-0",
            "data-ocid": "chat.primary_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewChat, onOpenChange: setShowNewChat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "chat.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Start New Chat" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search students...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-9 rounded-xl",
              "data-ocid": "chat.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: MOCK_USERS.filter(
          (u) => u.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => startNewChat(user),
            className: "w-full text-left px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-center gap-3",
            "data-ocid": "chat.item.1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xs font-bold", children: user.split(" ").map((n) => n[0]).join("") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: user })
            ]
          },
          user
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full rounded-xl",
            onClick: () => setShowNewChat(false),
            "data-ocid": "chat.cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
function ChatRoom() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-hero pt-16 pb-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
        "Community"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-2", children: [
        "Student ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Community Chat" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Study together, ask questions, and support each other — all in a safe, moderated space." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "group", className: "space-y-6", "data-ocid": "chat.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-card border-white/40 p-1 h-auto rounded-2xl gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "group",
            className: "rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2.5",
            "data-ocid": "chat.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
              "Study Rooms"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "personal",
            className: "rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2.5",
            "data-ocid": "chat.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-2" }),
              "Personal Messages"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "group", className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GroupChatTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "personal", className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PersonalMessagesTab, {}) })
    ] }) }),
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
  ChatRoom as default
};
