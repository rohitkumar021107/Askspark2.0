import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getAverageRating, getRatingsCount } from "../hooks/useRatings";

const ADMIN_PASSWORD = "spark2024";

interface DoubtRecord {
  id: string;
  title?: string;
  text?: string;
  subject?: string;
  timestamp?: number;
  userId?: string;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  function tryLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card
          className="glass-card border-white/40 warm-shadow w-full max-w-sm"
          data-ocid="admin.card"
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-3 shadow-primary">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AskSpark internal dashboard
              </p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                  data-ocid="admin.input"
                />
              </div>
              {error && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.error_state"
                >
                  {error}
                </p>
              )}
              <Button
                className="w-full gradient-primary text-white border-0"
                onClick={tryLogin}
                data-ocid="admin.submit_button"
              >
                Enter Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => navigate({ to: "/" })}
                data-ocid="admin.link"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Load data
  const doubts: DoubtRecord[] = (() => {
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
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total Doubts",
      value: doubts.length,
      icon: "❓",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Rated Doubts",
      value: ratingsCount,
      icon: "⭐",
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Avg Rating",
      value: avgRating > 0 ? `${avgRating.toFixed(1)} / 5` : "N/A",
      icon: "📊",
      color: "bg-green-50 text-green-700",
    },
  ];

  function clearAllData() {
    const confirm = window.confirm(
      "⚠️ This will delete ALL AskSpark data from this browser. This cannot be undone. Continue?",
    );
    if (!confirm) return;
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("askspark_"),
    );
    for (const k of keys) localStorage.removeItem(k);
    toast.success("All AskSpark data cleared.");
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted/40 transition-colors"
              data-ocid="admin.link"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-foreground">
                Admin Dashboard
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-destructive border-destructive/30 hover:bg-destructive/5"
            onClick={clearAllData}
            data-ocid="admin.delete_button"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear All Data
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Platform Overview
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Local data stored in this browser session.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Card
              key={s.label}
              className="glass-card border-white/40 warm-shadow"
              data-ocid={`admin.card.${i + 1}`}
            >
              <CardContent className="p-5">
                <div
                  className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl mb-3`}
                >
                  {s.icon}
                </div>
                <div className="text-2xl font-display font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Doubts table */}
        <Card className="glass-card border-white/40 warm-shadow">
          <CardContent className="p-5">
            <h2 className="font-display font-bold text-foreground mb-4">
              Recent Doubts
            </h2>
            {doubts.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground text-sm"
                data-ocid="admin.empty_state"
              >
                No doubts submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doubts.slice(0, 20).map((d, i) => (
                      <TableRow key={d.id} data-ocid={`admin.row.${i + 1}`}>
                        <TableCell className="text-xs text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {d.subject ?? "General"}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm max-w-xs truncate">
                          {d.title ?? d.text ?? "—"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {d.timestamp
                            ? new Date(d.timestamp).toLocaleDateString()
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sponsorship section */}
        <Card className="glass-card border-white/40 warm-shadow border-dashed">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-display font-bold text-foreground text-lg">
              Powered by Team Spark
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Built for Indian Students · Supported by educators who care
            </p>
            <div className="mt-4 inline-block text-xs text-muted-foreground border border-dashed border-primary/30 rounded-xl px-4 py-2">
              📢 Sponsorship inquiries: sponsor@askspark.app
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground py-4">
          © {new Date().getFullYear()} AskSpark Admin Panel · Internal use only
        </div>
      </main>
    </div>
  );
}
