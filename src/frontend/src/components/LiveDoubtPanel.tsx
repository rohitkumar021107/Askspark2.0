import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { rtdbListen, rtdbPush, rtdbSet } from "@/hooks/useFirebaseRTDB";
import { loadLocalProfile } from "@/hooks/useLocalProfile";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Doubt {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  answered: boolean;
  topic?: string;
}

interface Props {
  classId: string;
  isHost: boolean;
}

export default function LiveDoubtPanel({ classId, isHost }: Props) {
  const profile = loadLocalProfile();
  const userId = localStorage.getItem("userId") ?? "guest";
  const userName = profile?.displayName ?? "Student";

  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = rtdbListen(`liveClasses/${classId}/doubts`, (val) => {
      const raw = val as Record<string, Omit<Doubt, "id">> | null;
      if (!raw) {
        setDoubts([]);
        return;
      }
      const list = Object.entries(raw)
        .map(([id, d]) => ({ ...d, id }))
        .sort((a, b) => a.timestamp - b.timestamp);
      setDoubts(list);
    });
    return unsub;
  }, [classId]);

  function ask() {
    const trimmed = text.trim();
    if (!trimmed) return;
    rtdbPush(`liveClasses/${classId}/doubts`, {
      userId,
      userName,
      text: trimmed,
      timestamp: Date.now(),
      answered: false,
    });
    setText("");
    setSubmitted(true);
    toast.success("Doubt sent to teacher!");
    setTimeout(() => setSubmitted(false), 3000);
  }

  function markAnswered(doubt: Doubt) {
    rtdbSet(`liveClasses/${classId}/doubts/${doubt.id}/answered`, true);
  }

  const pending = doubts.filter((d) => !d.answered);
  const answered = doubts.filter((d) => d.answered);

  if (!isHost) {
    return (
      <div className="flex flex-col h-full p-3 gap-3">
        <div className="text-sm font-semibold text-foreground flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          Ask a Doubt
        </div>
        {submitted ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-2 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
            <p className="text-sm font-medium">Doubt sent!</p>
            <p className="text-xs text-muted-foreground">
              Teacher will address it shortly.
            </p>
          </div>
        ) : (
          <>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What would you like to ask?"
              className="flex-1 resize-none text-sm min-h-[100px]"
              data-ocid="doubt.textarea"
            />
            <Button
              onClick={ask}
              disabled={!text.trim()}
              className="w-full"
              data-ocid="doubt.primary_button"
            >
              Ask Doubt
            </Button>
          </>
        )}

        <ScrollArea className="flex-1">
          {doubts.filter((d) => d.userId === userId).length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Your doubts
              </div>
              {doubts
                .filter((d) => d.userId === userId)
                .map((d) => (
                  <div
                    key={d.id}
                    className="mb-2 p-2.5 rounded-xl bg-muted/50 text-sm"
                  >
                    <p>{d.text}</p>
                    <Badge
                      className={`mt-1 text-[10px] ${d.answered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {d.answered ? "Answered" : "Pending"}
                    </Badge>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50">
        <HelpCircle className="w-4 h-4 text-amber-500" />
        Live Doubts
        {pending.length > 0 && (
          <Badge className="bg-amber-100 text-amber-700 ml-auto">
            {pending.length} pending
          </Badge>
        )}
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        {pending.length === 0 && answered.length === 0 && (
          <div className="text-center text-muted-foreground text-xs py-6">
            No doubts yet
          </div>
        )}
        {pending.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-amber-600 mb-2 uppercase tracking-wide">
              Unanswered
            </div>
            {pending.map((d) => (
              <div
                key={d.id}
                className="mb-2 p-3 rounded-xl bg-amber-50 border border-amber-200"
                data-ocid="doubt.card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{d.userName}</p>
                    <p className="text-sm text-foreground mt-0.5">{d.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(d.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0 text-xs"
                    onClick={() => markAnswered(d)}
                    data-ocid="doubt.save_button"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Answered
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {answered.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Answered
            </div>
            {answered.map((d) => (
              <div
                key={d.id}
                className="mb-2 p-3 rounded-xl bg-muted/40 opacity-60"
              >
                <p className="text-xs font-medium">{d.userName}</p>
                <p className="text-sm text-foreground mt-0.5">{d.text}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
