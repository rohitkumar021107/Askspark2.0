import { u as useNavigate, j as jsxRuntimeExports, r as reactExports, m as motion, d as AnimatePresence, R as addDoc, I as collection, J as db, e as ue } from "./index-CiicjzrK.js";
import { B as Button } from "./button-O9_CG0nl.js";
import { I as Input } from "./input-D9SZkx1r.js";
import { L as Label } from "./label-Cg1KVKjU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DP7kiOU_.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CKDsVIvG.js";
import { T as Textarea } from "./textarea-B84xdT9O.js";
import { A as ArrowLeft } from "./arrow-left-KPljXCER.js";
import { S as Send } from "./send-adheBpJl.js";
import { C as ChevronDown } from "./chevron-down-DQR61kK2.js";
import "./utils-C0ugf0YY.js";
import "./index-xWxfC-pn.js";
import "./index-IXOTxK3N.js";
import "./index-BUlsMpCV.js";
import "./index-BjI1O3hJ.js";
import "./Combination-BPR_6sdE.js";
import "./index-C7zsWbmt.js";
import "./chevron-up-gQIqj1MH.js";
import "./index-UGGF_iej.js";
const FAQS = [
  {
    q: "How do I submit a doubt?",
    a: "Go to Submit Doubt page, fill in your question and subject, and hit Submit. It's anonymous!"
  },
  {
    q: "Is AskSpark free to use?",
    a: "Yes! AskSpark is completely free for all students."
  },
  {
    q: "Can I ask questions anonymously?",
    a: "Absolutely. No login required — just ask your doubt and get help."
  },
  {
    q: "How do I access recorded lectures?",
    a: "Go to Learning Hub → Lectures → Recorded Lectures tab."
  },
  {
    q: "How does the weekly test work?",
    a: "Tests are auto-generated each week based on popular topics. Go to Weekly Test from your dashboard."
  },
  {
    q: "Can I chat with other students?",
    a: "Yes! Join study rooms in the Chat section or send personal messages to peers."
  },
  {
    q: "How do I earn points?",
    a: "Ask a doubt (+10 points) or invite a friend (+20 points). Points show on your dashboard."
  },
  {
    q: "How do I change my class or branch?",
    a: "Go to your Profile page and click Edit Profile to update your class or branch."
  }
];
const WELCOME_MESSAGE = {
  id: 1,
  text: "👋 Hi! I'm **AskSpark Bot**. I can guide you around AskSpark. Ask me anything!",
  isUser: false,
  time: "just now",
  showQuickButtons: true
};
function getBotReply(input) {
  const msg = input.toLowerCase();
  if (msg.includes("doubt") || msg.includes("ask") || msg.includes("submit"))
    return {
      text: "Here's how to submit a doubt:\n1. Click **Submit Doubt** in the menu\n2. Type your question\n3. Choose your subject\n4. Hit Submit — done! No login needed. 🎯"
    };
  if (msg.includes("profile") || msg.includes("edit") || msg.includes("photo") || msg.includes("picture"))
    return {
      text: "Go to your **Profile page** → click Edit Profile. You can update your name, photo, class/branch, and interests. ✏️"
    };
  if (msg.includes("lecture") || msg.includes("video") || msg.includes("class") || msg.includes("recorded"))
    return {
      text: "Open **Learning Hub → Lectures** to watch live sessions or recorded videos. 🎓"
    };
  if (msg.includes("test") || msg.includes("quiz") || msg.includes("dpp") || msg.includes("practice") || msg.includes("mcq"))
    return {
      text: "Go to **Learning Hub → Practice** for DPP questions. Weekly tests are on your dashboard too! 📝"
    };
  if (msg.includes("chat") || msg.includes("message") || msg.includes("talk"))
    return {
      text: "Use the **Chat** section to join study rooms or send direct messages to teachers and students. 💬"
    };
  if (msg.includes("support") || msg.includes("help") || msg.includes("problem") || msg.includes("issue"))
    return {
      text: "You're already in the right place! Browse the **FAQ** tab or use **Ask for Help** to send a message to our team. 🙌"
    };
  if (msg.includes("point") || msg.includes("reward") || msg.includes("badge") || msg.includes("leader"))
    return {
      text: "Earn **+10 points** for doubts, **+20** for invites. Top scorers get the **Top Learner** badge! 🏆"
    };
  if (msg.includes("invite") || msg.includes("refer") || msg.includes("friend") || msg.includes("share"))
    return {
      text: "Share your referral link from the dashboard. Each friend who joins earns you **+20 points**! 🎁"
    };
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return {
      text: "Hey there! 👋 I'm AskSpark Bot. What can I help you with today?"
    };
  return {
    text: "I'm here to help! Try asking about **doubts**, **lectures**, **profile**, or **tests**. 🤖",
    showQuickButtons: true
  };
}
function getRelatedDoubts(userInput) {
  try {
    const stored = localStorage.getItem("askspark_doubts");
    if (!stored) return [];
    const doubts = JSON.parse(stored);
    const inputWords = userInput.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    if (inputWords.length === 0) return [];
    const matches = doubts.filter((d) => {
      var _a;
      const dText = ((_a = d.text) == null ? void 0 : _a.toLowerCase()) || "";
      return inputWords.some((w) => dText.includes(w));
    }).map((d) => d.text).slice(0, 3);
    return matches;
  } catch {
    return [];
  }
}
function BoldText({ text }) {
  const lines = text.split("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: lines.map((line, li) => {
    const parts = line.split("**");
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: positional text rendering
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        parts.map(
          (part, i) => i % 2 === 1 ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional bold segments
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: part }, i)
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional text segments
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i)
          )
        ),
        li < lines.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
      ] }, li)
    );
  }) });
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 justify-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs flex-shrink-0", children: "🤖" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 rounded-2xl rounded-bl-sm bg-white/70 border border-white/60 flex items-center gap-1.5", children: [
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-2 h-2 rounded-full bg-primary",
          animate: { opacity: [0.3, 1, 0.3] },
          transition: {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.25
          }
        },
        i
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "AskSpark Bot is typing..." })
    ] })
  ] });
}
function BotChatTab() {
  const navigate = useNavigate();
  const [messages, setMessages] = reactExports.useState([WELCOME_MESSAGE]);
  const [input, setInput] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const now = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const userMsg = { id: Date.now(), text, isUser: true, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const { text: replyText, showQuickButtons } = getBotReply(text);
      const related = getRelatedDoubts(text);
      const reply = {
        id: Date.now() + 1,
        text: replyText,
        isUser: false,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        ...showQuickButtons ? { showQuickButtons: true } : {},
        ...related.length > 0 ? { relatedDoubts: related } : {}
      };
      setMessages((prev) => [...prev, reply]);
    }, 1e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[520px] glass-card rounded-2xl border border-white/40 overflow-hidden warm-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border/50 flex items-center gap-3 bg-white/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm", children: "🤖" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm text-foreground", children: "AskSpark Bot 🤖" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-green-600 font-medium", children: "● Active" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-4 space-y-3", children: [
      messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: `flex flex-col ${msg.isUser ? "items-end" : "items-start"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-end gap-2 ${msg.isUser ? "justify-end" : "justify-start"}`,
                children: [
                  !msg.isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs flex-shrink-0", children: "🤖" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isUser ? "gradient-primary text-white rounded-br-sm" : "bg-white/70 text-foreground border border-white/60 rounded-bl-sm"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BoldText, { text: msg.text }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `text-xs mt-1 ${msg.isUser ? "text-white/70" : "text-muted-foreground"}`,
                            children: msg.time
                          }
                        ),
                        !msg.isUser && msg.showQuickButtons && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => navigate({ to: "/submit" }),
                              className: "px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors",
                              "data-ocid": "support.bot.ask_doubt_button",
                              children: "📝 Ask Doubt"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => navigate({ to: "/profile" }),
                              className: "px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors",
                              "data-ocid": "support.bot.profile_button",
                              children: "👤 Go to Profile"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => navigate({ to: "/learning" }),
                              className: "px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors",
                              "data-ocid": "support.bot.learning_button",
                              children: "📚 Open Learning Hub"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            ),
            !msg.isUser && msg.relatedDoubts && msg.relatedDoubts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-8 mt-1.5 max-w-[80%] bg-muted/50 border border-border/40 rounded-xl px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "You may also find this helpful:" }),
              msg.relatedDoubts.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-foreground/70 before:content-['•'] before:mr-1.5",
                  children: d.length > 60 ? `${d.slice(0, 60)}...` : d
                },
                `rd-${i}`
              ))
            ] })
          ]
        },
        msg.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isTyping && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 8 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {})
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 border-t border-border/50 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Ask me anything about AskSpark...",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && sendMessage(),
          className: "rounded-full border-border/60 bg-white/60 text-sm",
          "data-ocid": "support.bot.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "icon",
          className: "rounded-full gradient-primary text-white border-0 flex-shrink-0",
          onClick: sendMessage,
          disabled: !input.trim() || isTyping,
          "data-ocid": "support.bot.submit_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}
function FAQTab() {
  const [open, setOpen] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-2xl border border-white/40 overflow-hidden",
      "data-ocid": `support.faq.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-5 py-4 text-left",
            onClick: () => setOpen(open === i ? null : i),
            "data-ocid": "support.faq.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm pr-4", children: item.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 text-sm text-muted-foreground border-t border-border/40 pt-3", children: item.a })
          }
        ) })
      ]
    },
    item.q
  )) });
}
function HelpFormTab() {
  const [name, setName] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const [msgError, setMsgError] = reactExports.useState("");
  function validateMessage(val) {
    if (val.trim().length > 0 && val.trim().length < 10) {
      setMsgError("Message must be at least 10 characters.");
    } else {
      setMsgError("");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !subject || message.trim().length < 10) return;
    setSending(true);
    try {
      const userId = localStorage.getItem("askspark_userId") ?? localStorage.getItem("userId") ?? "anonymous";
      const payload = {
        name: name.trim(),
        subject,
        message: message.trim(),
        timestamp: Date.now(),
        status: "pending",
        userId
      };
      await addDoc(collection(db, "support_requests"), payload);
      setName("");
      setSubject("");
      setMessage("");
      setMsgError("");
      ue.success(
        "Your request has been sent! We'll get back to you soon. ✅"
      );
    } catch (err) {
      console.error("Support form submission failed:", err);
      ue.error("Failed to send your request. Please try again.");
    } finally {
      setSending(false);
    }
  }
  const isValid = name.trim().length > 0 && subject.length > 0 && message.trim().length >= 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "glass-card rounded-2xl border border-white/40 p-6 warm-shadow space-y-5",
      "data-ocid": "support.help.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "help-name", children: "Your Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "help-name",
              placeholder: "e.g. Rahul Sharma",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              disabled: sending,
              "data-ocid": "support.help.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "help-subject", children: "Subject *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subject, onValueChange: setSubject, disabled: sending, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "help-subject", "data-ocid": "support.help.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pick a subject" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
              "Mathematics",
              "Physics",
              "Chemistry",
              "Computer Science",
              "Biology",
              "Other"
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "help-message", children: "Message * (min 10 characters)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "help-message",
              placeholder: "Describe your issue or question in detail...",
              rows: 4,
              value: message,
              onChange: (e) => {
                setMessage(e.target.value);
                validateMessage(e.target.value);
              },
              onBlur: () => validateMessage(message),
              required: true,
              disabled: sending,
              "data-ocid": "support.help.textarea"
            }
          ),
          msgError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-red-500 mt-1",
              "data-ocid": "support.help.field_error",
              children: msgError
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
            message.trim().length,
            "/10 minimum"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: sending || !isValid,
            className: "w-full rounded-full gradient-primary text-white border-0 hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            "data-ocid": "support.help.submit_button",
            children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "animate-spin w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8v8z"
                      }
                    )
                  ]
                }
              ),
              "Sending..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              "Send Message"
            ] })
          }
        ),
        !isValid && name.trim() && subject && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-center text-muted-foreground",
            "data-ocid": "support.help.error_state",
            children: "Please fill all required fields (message needs at least 10 characters)."
          }
        )
      ]
    }
  );
}
function SupportPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6",
          onClick: () => navigate({ to: "/learning" }),
          "data-ocid": "support.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Learning Hub"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: [
        "🤖 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "24/7 Support" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Chat with our AI bot, browse FAQs, or send a help request." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chat", "data-ocid": "support.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-8 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "chat", "data-ocid": "support.chat.tab", children: "🤖 AskSpark Bot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "faq", "data-ocid": "support.faq.tab", children: "❓ FAQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "help", "data-ocid": "support.help.tab", children: "📬 Ask for Help" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BotChatTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "faq", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HelpFormTab, {}) })
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
  SupportPage as default
};
