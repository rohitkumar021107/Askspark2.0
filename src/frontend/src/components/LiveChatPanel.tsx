import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { rtdbListen, rtdbPush } from "@/hooks/useFirebaseRTDB";
import { loadLocalProfile } from "@/hooks/useLocalProfile";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMsg {
  id?: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  isHost: boolean;
}

interface Props {
  classId: string;
  isHost: boolean;
}

export default function LiveChatPanel({ classId, isHost }: Props) {
  const profile = loadLocalProfile();
  const userId = localStorage.getItem("userId") ?? "guest";
  const userName = profile?.displayName ?? "Student";

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}/chat`, (val) => {
      const raw = val as Record<string, ChatMsg> | null;
      if (!raw) {
        setMessages([]);
        return;
      }
      const msgs = Object.entries(raw)
        .map(([id, m]) => ({ ...m, id }))
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });
    return unsub;
  }, [classId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg: Omit<ChatMsg, "id"> = {
      userId,
      userName,
      text: trimmed,
      timestamp: Date.now(),
      isHost,
    };
    rtdbPush(`liveClasses/${classId}/chat`, msg);
    setText("");
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-3 py-2">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-xs py-6">
            No messages yet. Say hi! 👋
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id ?? m.timestamp}
            className={`mb-2 flex gap-2 ${m.userId === userId ? "flex-row-reverse" : ""}`}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {m.userName.charAt(0).toUpperCase()}
            </div>
            <div
              className={`max-w-[80%] ${m.userId === userId ? "items-end" : "items-start"} flex flex-col`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs text-muted-foreground">
                  {m.userName}
                </span>
                {m.isHost && (
                  <Badge className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200">
                    Teacher
                  </Badge>
                )}
              </div>
              <div
                className={`rounded-2xl px-3 py-1.5 text-sm ${m.userId === userId ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </ScrollArea>

      <div className="flex gap-2 p-3 border-t border-border/50">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 text-sm"
          onKeyDown={(e) => e.key === "Enter" && send()}
          data-ocid="livechat.input"
        />
        <Button
          size="sm"
          onClick={send}
          disabled={!text.trim()}
          data-ocid="livechat.primary_button"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
