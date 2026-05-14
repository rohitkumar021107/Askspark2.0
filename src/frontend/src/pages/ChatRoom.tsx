import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  MessageSquare,
  Plus,
  Search,
  Send,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Auto-moderation word list (obfuscated — logic is real, actual slurs not stored)
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
  "abuse2",
];

function containsBlockedWords(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((w) => lower.includes(w));
}

interface ChatMessage {
  id: number;
  user: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  isOwn?: boolean;
}

interface Room {
  id: string;
  name: string;
  members: number;
  icon: string;
}

interface Conversation {
  id: number;
  name: string;
  initials: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
}

const ROOMS: Room[] = [
  { id: "math", name: "Mathematics", members: 142, icon: "📐" },
  { id: "physics", name: "Physics", members: 98, icon: "⚛️" },
  { id: "chemistry", name: "Chemistry", members: 76, icon: "🧪" },
  { id: "cs", name: "Computer Science", members: 214, icon: "💻" },
  { id: "general", name: "General", members: 389, icon: "💬" },
];

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-fuchsia-500",
];

function GroupChatTab() {
  const [activeRoom, setActiveRoom] = useState("cs");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [violations, setViolations] = useState(0);
  const [isBanned, setIsBanned] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef is stable
  useEffect(() => {
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
        toast.error("You have been blocked for repeated violations.");
      } else {
        toast.warning(
          `⚠️ Warning: Inappropriate language detected. ${3 - newViolations} warning(s) remaining before ban.`,
          { duration: 5000 },
        );
      }
      setInput("");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg: ChatMessage = {
      id: nextId.current++,
      user: "You",
      initials: "ME",
      color: "bg-indigo-500",
      text,
      time: timeStr,
      isOwn: true,
    };
    setMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMsg],
    }));
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentRoom = ROOMS.find((r) => r.id === activeRoom)!;
  const roomMessages = messages[activeRoom] || [];

  return (
    <div className="flex h-[600px] gap-0 rounded-2xl overflow-hidden border border-white/40 warm-shadow">
      {/* Sidebar */}
      <div className="w-52 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-white/40 flex flex-col">
        <div className="p-4 border-b border-white/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Study Rooms
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveRoom(room.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  activeRoom === room.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/60 text-foreground"
                }`}
                data-ocid="chat.tab"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{room.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">
                      {room.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {room.members} online
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm min-w-0">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/40 bg-white/30 flex items-center justify-between">
          <div>
            <div className="font-semibold text-foreground text-sm">
              {currentRoom.icon} {currentRoom.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentRoom.members} members online
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">
            <Shield className="w-3 h-3 mr-1" />
            Moderated
          </Badge>
        </div>

        {/* Rules banner */}
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-100 text-[11px] text-amber-700 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            <strong>Community Guidelines:</strong> Be respectful. No abusive
            language. No personal attacks. Violations = permanent ban.
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {roomMessages.length === 0 && (
            <div
              className="flex-1 flex items-center justify-center text-center p-8 text-muted-foreground h-full"
              data-ocid="chat.empty_state"
            >
              <div>
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="font-medium">No messages yet</p>
                <p className="text-sm mt-1">
                  Be the first to start the conversation!
                </p>
              </div>
            </div>
          )}
          {roomMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.isOwn ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarFallback
                  className={`${msg.color} text-white text-[10px] font-bold`}
                >
                  {msg.initials}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-xs ${
                  msg.isOwn ? "items-end" : "items-start"
                } flex flex-col gap-0.5`}
              >
                {!msg.isOwn && (
                  <div className="text-[10px] font-medium text-muted-foreground">
                    {msg.user}
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-2xl text-sm ${
                    msg.isOwn
                      ? "gradient-primary text-white rounded-tr-sm"
                      : "bg-white/80 text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/40 bg-white/30">
          <div className="flex gap-2">
            <Input
              placeholder={
                isBanned
                  ? "You are banned from this chat"
                  : "Type a message... (press Enter to send)"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isBanned}
              className="flex-1 rounded-full border-border/60 bg-white/70"
              data-ocid="chat.input"
            />
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={isBanned || !input.trim()}
              className="rounded-full gradient-primary text-white border-0 w-9 h-9 flex-shrink-0"
              data-ocid="chat.primary_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Banned overlay */}
      {isBanned && (
        <div
          className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          data-ocid="chat.modal"
        >
          <Card className="max-w-sm w-full border-red-200">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Account Blocked
              </h3>
              <p className="text-muted-foreground text-sm">
                You have been blocked from the AskIQ community for violating our
                community guidelines.
              </p>
              <p className="text-sm text-muted-foreground">
                To appeal, contact support at{" "}
                <a
                  href="mailto:rohitkumar021107k@gmail.com"
                  className="text-primary hover:underline"
                >
                  rohitkumar021107k@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function PersonalMessagesTab() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [input, setInput] = useState("");
  const [violations, setViolations] = useState(0);
  const [isBanned, setIsBanned] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextMsgId = useRef(500);

  const selected = conversations.find((c) => c.id === selectedId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef is stable
  useEffect(() => {
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
        toast.error("You have been blocked for repeated violations.");
      } else {
        toast.warning(
          `⚠️ Warning: Inappropriate language detected. ${3 - newViolations} warning(s) remaining before ban.`,
          { duration: 5000 },
        );
      }
      setInput("");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg: ChatMessage = {
      id: nextMsgId.current++,
      user: "You",
      initials: "ME",
      color: "bg-indigo-500",
      text,
      time: timeStr,
      isOwn: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: text,
              time: timeStr,
              unread: 0,
            }
          : c,
      ),
    );
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const MOCK_USERS = [
    "Ishaan Kumar",
    "Meera Nair",
    "Dev Patel",
    "Kiran Bose",
    "Ananya Rao",
  ];

  const startNewChat = (name: string) => {
    const color = AVATAR_COLORS[conversations.length % AVATAR_COLORS.length];
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    const newConvo: Conversation = {
      id: Date.now(),
      name,
      initials,
      color,
      lastMessage: "Say hello!",
      time: "Now",
      unread: 0,
      messages: [],
    };
    setConversations((prev) => [newConvo, ...prev]);
    setSelectedId(newConvo.id);
    setShowNewChat(false);
    setSearchQuery("");
  };

  return (
    <div className="flex h-[600px] gap-0 rounded-2xl overflow-hidden border border-white/40 warm-shadow">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-white/40 flex flex-col">
        <div className="p-4 border-b border-white/40 flex items-center justify-between">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Messages
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 rounded-full"
            onClick={() => setShowNewChat(true)}
            data-ocid="chat.open_modal_button"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.length === 0 && (
              <div
                className="p-6 text-center text-muted-foreground text-sm"
                data-ocid="chat.empty_state"
              >
                <p>No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat below</p>
              </div>
            )}
            {conversations.map((convo) => (
              <button
                key={convo.id}
                type="button"
                onClick={() => handleSelect(convo.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  selectedId === convo.id
                    ? "bg-primary/10"
                    : "hover:bg-muted/60"
                }`}
                data-ocid="chat.item.1"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback
                      className={`${convo.color} text-white text-xs font-bold`}
                    >
                      {convo.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-foreground truncate">
                        {convo.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground ml-1 flex-shrink-0">
                        {convo.time}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="text-[10px] text-muted-foreground truncate">
                        {convo.lastMessage}
                      </div>
                      {convo.unread > 0 && (
                        <Badge className="bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full p-0 ml-1 flex-shrink-0">
                          {convo.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm min-w-0">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-center p-8 text-muted-foreground">
            <div>
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Select a conversation</p>
              <p className="text-sm mt-1">
                Or start a new chat using the + button
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-white/40 bg-white/30 flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback
                  className={`${selected.color} text-white text-xs font-bold`}
                >
                  {selected.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  {selected.name}
                </div>
                <div className="text-[10px] text-green-500 font-medium">
                  ● Online
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {selected.messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No messages yet. Say hello!</p>
                  </div>
                </div>
              )}
              {selected.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.isOwn ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-7 h-7 flex-shrink-0">
                    <AvatarFallback
                      className={`${msg.color} text-white text-[10px] font-bold`}
                    >
                      {msg.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-xs flex flex-col gap-0.5 ${
                      msg.isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm ${
                        msg.isOwn
                          ? "gradient-primary text-white rounded-tr-sm"
                          : "bg-white/80 text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/40 bg-white/30">
              <div className="flex gap-2">
                <Input
                  placeholder={
                    isBanned ? "You are banned" : "Type a message..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={isBanned}
                  className="flex-1 rounded-full border-border/60 bg-white/70"
                  data-ocid="chat.input"
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={isBanned || !input.trim()}
                  className="rounded-full gradient-primary text-white border-0 w-9 h-9 flex-shrink-0"
                  data-ocid="chat.primary_button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* New Chat Dialog */}
      <Dialog open={showNewChat} onOpenChange={setShowNewChat}>
        <DialogContent className="max-w-sm" data-ocid="chat.dialog">
          <DialogHeader>
            <DialogTitle>Start New Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl"
                data-ocid="chat.search_input"
              />
            </div>
            <div className="space-y-1">
              {MOCK_USERS.filter((u) =>
                u.toLowerCase().includes(searchQuery.toLowerCase()),
              ).map((user) => (
                <button
                  key={user}
                  type="button"
                  onClick={() => startNewChat(user)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-center gap-3"
                  data-ocid="chat.item.1"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                      {user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {user}
                  </span>
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => setShowNewChat(false)}
              data-ocid="chat.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ChatRoom() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero pt-16 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MessageCircle className="w-4 h-4" />
            Community
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Student <span className="text-gradient">Community Chat</span>
          </h1>
          <p className="text-muted-foreground">
            Study together, ask questions, and support each other — all in a
            safe, moderated space.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="group" className="space-y-6" data-ocid="chat.tab">
          <TabsList className="glass-card border-white/40 p-1 h-auto rounded-2xl gap-1">
            <TabsTrigger
              value="group"
              className="rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2.5"
              data-ocid="chat.tab"
            >
              <Users className="w-4 h-4 mr-2" />
              Study Rooms
            </TabsTrigger>
            <TabsTrigger
              value="personal"
              className="rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2.5"
              data-ocid="chat.tab"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Personal Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="group" className="relative">
            <GroupChatTab />
          </TabsContent>
          <TabsContent value="personal" className="relative">
            <PersonalMessagesTab />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t border-border/40 mt-8 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
