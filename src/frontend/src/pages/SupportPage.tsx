import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { addDoc, collection } from "firebase/firestore";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { db } from "../lib/firebase";

const FAQS = [
  {
    q: "How do I submit a doubt?",
    a: "Go to Submit Doubt page, fill in your question and subject, and hit Submit. It's anonymous!",
  },
  {
    q: "Is AskSpark free to use?",
    a: "Yes! AskSpark is completely free for all students.",
  },
  {
    q: "Can I ask questions anonymously?",
    a: "Absolutely. No login required — just ask your doubt and get help.",
  },
  {
    q: "How do I access recorded lectures?",
    a: "Go to Learning Hub → Lectures → Recorded Lectures tab.",
  },
  {
    q: "How does the weekly test work?",
    a: "Tests are auto-generated each week based on popular topics. Go to Weekly Test from your dashboard.",
  },
  {
    q: "Can I chat with other students?",
    a: "Yes! Join study rooms in the Chat section or send personal messages to peers.",
  },
  {
    q: "How do I earn points?",
    a: "Ask a doubt (+10 points) or invite a friend (+20 points). Points show on your dashboard.",
  },
  {
    q: "How do I change my class or branch?",
    a: "Go to your Profile page and click Edit Profile to update your class or branch.",
  },
];

export interface SupportRequest {
  id?: string;
  name: string;
  email?: string;
  subject: string;
  message: string;
  timestamp: number;
  status: "pending" | "resolved";
  userId: string;
}

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  showQuickButtons?: boolean;
  relatedDoubts?: string[];
};

const WELCOME_MESSAGE: Message = {
  id: 1,
  text: "👋 Hi! I'm **AskSpark Bot**. I can guide you around AskSpark. Ask me anything!",
  isUser: false,
  time: "just now",
  showQuickButtons: true,
};

function getBotReply(input: string): {
  text: string;
  showQuickButtons?: boolean;
} {
  const msg = input.toLowerCase();

  if (msg.includes("doubt") || msg.includes("ask") || msg.includes("submit"))
    return {
      text: "Here's how to submit a doubt:\n1. Click **Submit Doubt** in the menu\n2. Type your question\n3. Choose your subject\n4. Hit Submit — done! No login needed. 🎯",
    };

  if (
    msg.includes("profile") ||
    msg.includes("edit") ||
    msg.includes("photo") ||
    msg.includes("picture")
  )
    return {
      text: "Go to your **Profile page** → click Edit Profile. You can update your name, photo, class/branch, and interests. ✏️",
    };

  if (
    msg.includes("lecture") ||
    msg.includes("video") ||
    msg.includes("class") ||
    msg.includes("recorded")
  )
    return {
      text: "Open **Learning Hub → Lectures** to watch live sessions or recorded videos. 🎓",
    };

  if (
    msg.includes("test") ||
    msg.includes("quiz") ||
    msg.includes("dpp") ||
    msg.includes("practice") ||
    msg.includes("mcq")
  )
    return {
      text: "Go to **Learning Hub → Practice** for DPP questions. Weekly tests are on your dashboard too! 📝",
    };

  if (msg.includes("chat") || msg.includes("message") || msg.includes("talk"))
    return {
      text: "Use the **Chat** section to join study rooms or send direct messages to teachers and students. 💬",
    };

  if (
    msg.includes("support") ||
    msg.includes("help") ||
    msg.includes("problem") ||
    msg.includes("issue")
  )
    return {
      text: "You're already in the right place! Browse the **FAQ** tab or use **Ask for Help** to send a message to our team. 🙌",
    };

  if (
    msg.includes("point") ||
    msg.includes("reward") ||
    msg.includes("badge") ||
    msg.includes("leader")
  )
    return {
      text: "Earn **+10 points** for doubts, **+20** for invites. Top scorers get the **Top Learner** badge! 🏆",
    };

  if (
    msg.includes("invite") ||
    msg.includes("refer") ||
    msg.includes("friend") ||
    msg.includes("share")
  )
    return {
      text: "Share your referral link from the dashboard. Each friend who joins earns you **+20 points**! 🎁",
    };

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return {
      text: "Hey there! 👋 I'm AskSpark Bot. What can I help you with today?",
    };

  return {
    text: "I'm here to help! Try asking about **doubts**, **lectures**, **profile**, or **tests**. 🤖",
    showQuickButtons: true,
  };
}

function getRelatedDoubts(userInput: string): string[] {
  try {
    const stored = localStorage.getItem("askspark_doubts");
    if (!stored) return [];
    const doubts: { text: string }[] = JSON.parse(stored);
    const inputWords = userInput
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
    if (inputWords.length === 0) return [];
    const matches = doubts
      .filter((d) => {
        const dText = d.text?.toLowerCase() || "";
        return inputWords.some((w) => dText.includes(w));
      })
      .map((d) => d.text)
      .slice(0, 3);
    return matches;
  } catch {
    return [];
  }
}

function BoldText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => {
        const parts = line.split("**");
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional text rendering
          <span key={li}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: positional bold segments
                <strong key={i}>{part}</strong>
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: positional text segments
                <span key={i}>{part}</span>
              ),
            )}
            {li < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs flex-shrink-0">
        🤖
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/70 border border-white/60 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.25,
            }}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          AskSpark Bot is typing...
        </span>
      </div>
    </div>
  );
}

function BotChatTab() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMsg: Message = { id: Date.now(), text, isUser: true, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const { text: replyText, showQuickButtons } = getBotReply(text);
      const related = getRelatedDoubts(text);
      const reply: Message = {
        id: Date.now() + 1,
        text: replyText,
        isUser: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...(showQuickButtons ? { showQuickButtons: true } : {}),
        ...(related.length > 0 ? { relatedDoubts: related } : {}),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  }

  return (
    <div className="flex flex-col h-[520px] glass-card rounded-2xl border border-white/40 overflow-hidden warm-shadow">
      {/* Bot header */}
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3 bg-white/40">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm">
          🤖
        </div>
        <div>
          <div className="font-display font-bold text-sm text-foreground">
            AskSpark Bot 🤖
          </div>
          <div className="text-xs text-green-600 font-medium">● Active</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${
              msg.isUser ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`flex items-end gap-2 ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isUser && (
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs flex-shrink-0">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isUser
                    ? "gradient-primary text-white rounded-br-sm"
                    : "bg-white/70 text-foreground border border-white/60 rounded-bl-sm"
                }`}
              >
                <BoldText text={msg.text} />
                <div
                  className={`text-xs mt-1 ${
                    msg.isUser ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </div>
                {/* Quick action buttons */}
                {!msg.isUser && msg.showQuickButtons && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/submit" })}
                      className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      data-ocid="support.bot.ask_doubt_button"
                    >
                      📝 Ask Doubt
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/profile" })}
                      className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      data-ocid="support.bot.profile_button"
                    >
                      👤 Go to Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/learning" })}
                      className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      data-ocid="support.bot.learning_button"
                    >
                      📚 Open Learning Hub
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Related doubts */}
            {!msg.isUser &&
              msg.relatedDoubts &&
              msg.relatedDoubts.length > 0 && (
                <div className="ml-8 mt-1.5 max-w-[80%] bg-muted/50 border border-border/40 rounded-xl px-3 py-2">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    You may also find this helpful:
                  </p>
                  {msg.relatedDoubts.map((d, i) => (
                    <p
                      // biome-ignore lint/suspicious/noArrayIndexKey: related doubts shown in stable order
                      key={`rd-${i}`}
                      className="text-xs text-foreground/70 before:content-['•'] before:mr-1.5"
                    >
                      {d.length > 60 ? `${d.slice(0, 60)}...` : d}
                    </p>
                  ))}
                </div>
              )}
          </motion.div>
        ))}
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border/50 flex gap-2">
        <Input
          placeholder="Ask me anything about AskSpark..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          className="rounded-full border-border/60 bg-white/60 text-sm"
          data-ocid="support.bot.input"
        />
        <Button
          size="icon"
          className="rounded-full gradient-primary text-white border-0 flex-shrink-0"
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          data-ocid="support.bot.submit_button"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function FAQTab() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => (
        <div
          key={item.q}
          className="glass-card rounded-2xl border border-white/40 overflow-hidden"
          data-ocid={`support.faq.item.${i + 1}`}
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            data-ocid="support.faq.toggle"
          >
            <span className="font-semibold text-foreground text-sm pr-4">
              {item.q}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 text-sm text-muted-foreground border-t border-border/40 pt-3">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function HelpFormTab() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [msgError, setMsgError] = useState("");

  function validateMessage(val: string) {
    if (val.trim().length > 0 && val.trim().length < 10) {
      setMsgError("Message must be at least 10 characters.");
    } else {
      setMsgError("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !subject || message.trim().length < 10) return;

    setSending(true);
    try {
      const userId =
        localStorage.getItem("askspark_userId") ??
        localStorage.getItem("userId") ??
        "anonymous";

      const payload: Omit<SupportRequest, "id"> = {
        name: name.trim(),
        subject,
        message: message.trim(),
        timestamp: Date.now(),
        status: "pending",
        userId,
      };

      await addDoc(collection(db, "support_requests"), payload);

      setName("");
      setSubject("");
      setMessage("");
      setMsgError("");
      toast.success(
        "Your request has been sent! We'll get back to you soon. ✅",
      );
    } catch (err) {
      console.error("Support form submission failed:", err);
      toast.error("Failed to send your request. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const isValid =
    name.trim().length > 0 && subject.length > 0 && message.trim().length >= 10;

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl border border-white/40 p-6 warm-shadow space-y-5"
      data-ocid="support.help.panel"
    >
      <div className="space-y-1.5">
        <Label htmlFor="help-name">Your Name *</Label>
        <Input
          id="help-name"
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={sending}
          data-ocid="support.help.input"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="help-subject">Subject *</Label>
        <Select value={subject} onValueChange={setSubject} disabled={sending}>
          <SelectTrigger id="help-subject" data-ocid="support.help.select">
            <SelectValue placeholder="Pick a subject" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Mathematics",
              "Physics",
              "Chemistry",
              "Computer Science",
              "Biology",
              "Other",
            ].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="help-message">Message * (min 10 characters)</Label>
        <Textarea
          id="help-message"
          placeholder="Describe your issue or question in detail..."
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            validateMessage(e.target.value);
          }}
          onBlur={() => validateMessage(message)}
          required
          disabled={sending}
          data-ocid="support.help.textarea"
        />
        {msgError && (
          <p
            className="text-xs text-red-500 mt-1"
            data-ocid="support.help.field_error"
          >
            {msgError}
          </p>
        )}
        <p className="text-xs text-muted-foreground text-right">
          {message.trim().length}/10 minimum
        </p>
      </div>

      <Button
        type="submit"
        disabled={sending || !isValid}
        className="w-full rounded-full gradient-primary text-white border-0 hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        data-ocid="support.help.submit_button"
      >
        {sending ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </span>
        )}
      </Button>

      {!isValid && name.trim() && subject && (
        <p
          className="text-xs text-center text-muted-foreground"
          data-ocid="support.help.error_state"
        >
          Please fill all required fields (message needs at least 10
          characters).
        </p>
      )}
    </form>
  );
}

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            onClick={() => navigate({ to: "/learning" })}
            data-ocid="support.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </button>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            🤖 <span className="text-gradient">24/7 Support</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Chat with our AI bot, browse FAQs, or send a help request.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Tabs defaultValue="chat" data-ocid="support.tab">
          <TabsList className="mb-8 rounded-xl">
            <TabsTrigger value="chat" data-ocid="support.chat.tab">
              🤖 AskSpark Bot
            </TabsTrigger>
            <TabsTrigger value="faq" data-ocid="support.faq.tab">
              ❓ FAQ
            </TabsTrigger>
            <TabsTrigger value="help" data-ocid="support.help.tab">
              📬 Ask for Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <BotChatTab />
          </TabsContent>
          <TabsContent value="faq">
            <FAQTab />
          </TabsContent>
          <TabsContent value="help">
            <HelpFormTab />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="text-center py-8 text-xs text-muted-foreground border-t border-border/40">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
