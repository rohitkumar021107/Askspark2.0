import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Leaf,
  Monitor,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

const questionBank = [
  {
    id: 1,
    topic: "Math",
    question: "What is the derivative of x\u00b2?",
    options: ["x", "2x", "x\u00b2", "2"],
    answer: 1,
  },
  {
    id: 2,
    topic: "Math",
    question: "What is the value of \u221a144?",
    options: ["11", "12", "13", "14"],
    answer: 1,
  },
  {
    id: 3,
    topic: "Math",
    question: "Solve: 2x + 5 = 15",
    options: ["x=4", "x=5", "x=6", "x=10"],
    answer: 1,
  },
  {
    id: 4,
    topic: "Math",
    question: "What is the area of a circle with radius 7? (\u03c0\u224822/7)",
    options: ["44", "154", "88", "308"],
    answer: 1,
  },
  {
    id: 5,
    topic: "Physics",
    question: "What is Newton's Second Law?",
    options: ["F=mv", "F=ma", "E=mc\u00b2", "v=u+at"],
    answer: 1,
  },
  {
    id: 6,
    topic: "Physics",
    question: "What is the SI unit of force?",
    options: ["Watt", "Joule", "Newton", "Pascal"],
    answer: 2,
  },
  {
    id: 7,
    topic: "Physics",
    question: "Speed of light in vacuum is approximately?",
    options: [
      "3\u00d710\u2076 m/s",
      "3\u00d710\u2078 m/s",
      "3\u00d710\u00b9\u2070 m/s",
      "3\u00d710\u2074 m/s",
    ],
    answer: 1,
  },
  {
    id: 8,
    topic: "CS",
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Central Program Utility",
      "Core Processing Unit",
    ],
    answer: 0,
  },
  {
    id: 9,
    topic: "CS",
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Array", "Tree"],
    answer: 1,
  },
  {
    id: 10,
    topic: "CS",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n\u00b2)", "O(log n)", "O(1)"],
    answer: 2,
  },
  {
    id: 11,
    topic: "Chemistry",
    question: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    answer: 1,
  },
  {
    id: 12,
    topic: "Chemistry",
    question: "What is the chemical formula for water?",
    options: ["HO", "H\u2082O", "H\u2082O\u2082", "OH"],
    answer: 1,
  },
  {
    id: 13,
    topic: "Chemistry",
    question: "pH of a neutral solution is?",
    options: ["0", "7", "14", "1"],
    answer: 1,
  },
  {
    id: 14,
    topic: "Biology",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"],
    answer: 2,
  },
  {
    id: 15,
    topic: "Biology",
    question: "DNA stands for?",
    options: [
      "Deoxyribonucleic Acid",
      "Diribonucleic Acid",
      "Deoxyribose Nucleic Acid",
      "Dynamic Nucleic Acid",
    ],
    answer: 0,
  },
  {
    id: 16,
    topic: "English",
    question: "Which of these is a synonym for 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: 1,
  },
  {
    id: 17,
    topic: "English",
    question: "What is the past tense of 'run'?",
    options: ["Runned", "Ran", "Running", "Run"],
    answer: 1,
  },
];

const studyNotes: Record<string, string[]> = {
  Math: [
    "Derivative rules: d/dx(x\u207f) = nx\u207f\u207b\u00b9",
    "Area of circle = \u03c0r\u00b2; Circumference = 2\u03c0r",
    "Quadratic formula: x = (\u2212b \u00b1 \u221a(b\u00b2\u22124ac)) / 2a",
    "Always check units in word problems",
  ],
  Physics: [
    "Newton's Laws: 1st=Inertia, 2nd=F=ma, 3rd=Action-Reaction",
    "v = u + at;  s = ut + \u00bdат\u00b2;  v\u00b2 = u\u00b2 + 2as",
    "Kinetic Energy = \u00bdmv\u00b2;  Potential Energy = mgh",
    "Speed of light = 3\u00d710\u2078 m/s",
  ],
  CS: [
    "Stack = LIFO;  Queue = FIFO",
    "Binary Search = O(log n);  Linear Search = O(n)",
    "RAM = volatile;  ROM = non-volatile",
    "Loop complexity: single loop = O(n), nested = O(n\u00b2)",
  ],
  Chemistry: [
    "Periodic table: H(1), He(2), Li(3), C(6), N(7), O(8), Na(11), Fe(26)",
    "Valency: H=1, O=2, N=3, C=4",
    "Acids: pH<7;  Bases: pH>7;  Neutral = 7",
    "Avogadro's number = 6.022\u00d710\u00b2\u00b3",
  ],
  Biology: [
    "Cell organelles: Mitochondria=energy, Ribosome=protein synthesis, Nucleus=control center",
    "Photosynthesis: CO\u2082 + H\u2082O \u2192 Glucose + O\u2082 (light energy)",
    "DNA is double helix;  RNA is single stranded",
    "Blood types: A, B, AB, O",
  ],
  English: [
    "Subject-Verb Agreement: singular subject \u2192 singular verb",
    "Common irregular verbs: run\u2192ran, go\u2192went, see\u2192saw, take\u2192took",
    "Tenses: Simple, Continuous, Perfect, Perfect Continuous",
    "Punctuation: comma for pauses, semicolon for related clauses",
  ],
};

const topicIcons: Record<string, React.ReactNode> = {
  Math: <span className="text-lg">\ud83d\udd22</span>,
  Physics: <Zap className="w-4 h-4" />,
  CS: <Monitor className="w-4 h-4" />,
  Chemistry: <FlaskConical className="w-4 h-4" />,
  Biology: <Leaf className="w-4 h-4" />,
  English: <BookOpen className="w-4 h-4" />,
};

const OPTION_LABELS = ["A", "B", "C", "D"];

function getWeeklyQuestions() {
  const seed = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const shuffled = [...questionBank].sort((a, b) => {
    const ha = Math.sin(seed * a.id) * 10000;
    const hb = Math.sin(seed * b.id) * 10000;
    return ha - Math.floor(ha) - (hb - Math.floor(hb));
  });
  const selected: typeof questionBank = [];
  const topicCount: Record<string, number> = {};
  for (const q of shuffled) {
    if (selected.length === 10) break;
    topicCount[q.topic] = topicCount[q.topic] ?? 0;
    if (topicCount[q.topic] < 2) {
      selected.push(q);
      topicCount[q.topic]++;
    }
  }
  for (const q of shuffled) {
    if (selected.length === 10) break;
    if (!selected.includes(q)) selected.push(q);
  }
  return selected.slice(0, 10);
}

function ScoreRing({ pct }: { pct: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative w-36 h-36 flex items-center justify-center mx-auto">
      <svg
        width="144"
        height="144"
        className="absolute inset-0 -rotate-90"
        role="img"
        aria-label={`Score: ${pct}%`}
      >
        <title>Score ring showing {pct}%</title>
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="oklch(0.93 0.012 70)"
          strokeWidth="10"
        />
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="text-center">
        <div className="font-display font-bold text-3xl text-foreground">
          {pct}%
        </div>
        <div className="text-xs text-muted-foreground">Score</div>
      </div>
    </div>
  );
}

type Phase = "intro" | "test" | "results";

export default function WeeklyTest() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions] = useState(getWeeklyQuestions);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );

  const weekNumber =
    (Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % 52) + 1;
  const topics = [...new Set(questions.map((q) => q.topic))];

  const topicStats = topics
    .map((topic) => {
      const qs = questions.filter((q) => q.topic === topic);
      const correct = qs.filter((q) => answers[q.id] === q.answer).length;
      const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
      const status = pct < 50 ? "fear" : pct <= 70 ? "needs" : "strong";
      return { topic, correct, total: qs.length, pct, status };
    })
    .sort((a, b) => a.pct - b.pct);

  const totalCorrect = questions.filter(
    (q) => answers[q.id] === q.answer,
  ).length;
  const totalPct = Math.round((totalCorrect / questions.length) * 100);
  const scoreMsg =
    totalPct < 40
      ? "Keep going! Every question teaches you something \ud83d\udcaa"
      : totalPct <= 70
        ? "Good effort! A few more reviews and you'll nail it \ud83c\udf1f"
        : "Excellent! You're on top of your topics \ud83c\udfc6";

  const fearTopics = topicStats.filter((t) => t.status === "fear");

  function selectAnswer(optionIdx: number) {
    const qId = questions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      // Save test result to localStorage
      const correct = questions.filter(
        (q) => answers[q.id] === q.answer,
      ).length;
      const pct = Math.round((correct / questions.length) * 100);
      const allTopics = [...new Set(questions.map((q) => q.topic))];
      const topicResults = allTopics.map((topic) => {
        const qs = questions.filter((q) => q.topic === topic);
        const topicCorrect = qs.filter(
          (q) => answers[q.id] === q.answer,
        ).length;
        return { topic, pct: Math.round((topicCorrect / qs.length) * 100) };
      });
      const strong = topicResults
        .filter((t) => t.pct >= 70)
        .map((t) => t.topic);
      const fearZones = topicResults
        .filter((t) => t.pct < 50)
        .map((t) => t.topic);
      const newResult = {
        week: weekNumber,
        score: pct,
        strong,
        fearZones,
        date: new Date().toLocaleDateString(),
      };
      try {
        const existing = JSON.parse(
          localStorage.getItem("askspark_test_history") || "[]",
        );
        const filtered = existing.filter(
          (r: { week: number }) => r.week !== weekNumber,
        );
        localStorage.setItem(
          "askspark_test_history",
          JSON.stringify([newResult, ...filtered].slice(0, 20)),
        );
      } catch {
        /* ignore */
      }
      setPhase("results");
    }
  }

  function toggleNote(topic: string) {
    setExpandedNotes((prev) => ({ ...prev, [topic]: !prev[topic] }));
  }

  // Intro
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => navigate({ to: "/dashboard/student" })}
              data-ocid="weekly_test.secondary_button"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <span className="font-display font-bold text-foreground">
              Weekly Test
            </span>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="glass-card rounded-3xl p-8 sm:p-12 warm-shadow text-center space-y-6">
            <div className="text-6xl">\ud83d\udcdd</div>
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                Week #{weekNumber}
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Weekly Confidence Test
              </h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Auto-generated from your most asked topics this week
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {topics.map((t) => (
                <Badge
                  key={t}
                  className="bg-muted text-muted-foreground border-border gap-1.5 px-3 py-1"
                >
                  {topicIcons[t]} {t}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {[
                { label: "Questions", value: "10" },
                { label: "~Duration", value: "5 min" },
                { label: "Topics", value: `${topics.length}` },
              ].map((s) => (
                <div key={s.label} className="bg-muted/50 rounded-2xl p-3">
                  <div className="font-display font-bold text-xl text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              10 questions \u00b7 ~5 minutes \u00b7 Get your fear zone report
            </p>
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white border-0 shadow-primary px-10 font-semibold text-base"
              onClick={() => setPhase("test")}
              data-ocid="weekly_test.primary_button"
            >
              Start Test \u2192
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Test
  if (phase === "test") {
    const q = questions[currentQ];
    const selected = answers[q.id];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const isLast = currentQ === questions.length - 1;
    return (
      <div className="min-h-screen bg-background">
        <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <span className="font-display font-bold text-foreground">
              Weekly Test
            </span>
            <span className="text-sm text-muted-foreground">
              {currentQ + 1} / {questions.length}
            </span>
          </div>
          <div className="max-w-3xl mx-auto mt-2">
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="glass-card rounded-3xl p-6 sm:p-10 warm-shadow space-y-6">
            <div className="flex items-center gap-2">
              <Badge className="bg-muted text-muted-foreground border-border gap-1.5">
                {topicIcons[q.topic]} {q.topic}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                Q{currentQ + 1}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-snug">
              {q.question}
            </h2>
            <div className="space-y-3" data-ocid="weekly_test.list">
              {q.options.map((opt, i) => (
                <button
                  key={`q${q.id}-opt-${OPTION_LABELS[i]}`}
                  type="button"
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm ${selected === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-white/60 hover:border-primary/40 text-foreground"}`}
                  onClick={() => selectAnswer(i)}
                  data-ocid={`weekly_test.item.${i + 1}`}
                >
                  <span className="inline-flex w-6 h-6 rounded-full bg-muted items-center justify-center text-xs font-bold mr-3">
                    {OPTION_LABELS[i]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                className="rounded-full gradient-primary text-white border-0 shadow-primary px-8"
                disabled={selected === undefined}
                onClick={handleNext}
                data-ocid="weekly_test.primary_button"
              >
                {isLast ? "Submit Test" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Results
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full"
            onClick={() => navigate({ to: "/dashboard/student" })}
            data-ocid="weekly_test.secondary_button"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
          </Button>
          <span className="font-display font-bold text-foreground">
            Your Results
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Score Summary */}
        <div
          className="glass-card rounded-3xl p-8 warm-shadow text-center space-y-4"
          data-ocid="weekly_test.card"
        >
          <Trophy className="w-8 h-8 text-amber-500 mx-auto" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            Test Complete!
          </h2>
          <ScoreRing pct={totalPct} />
          <div className="text-lg font-semibold text-foreground">
            {totalCorrect} / {questions.length} correct
          </div>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm">
            {scoreMsg}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setPhase("intro");
                setCurrentQ(0);
                setAnswers({});
              }}
              data-ocid="weekly_test.secondary_button"
            >
              Retake Test
            </Button>
            <Button
              className="rounded-full gradient-primary text-white border-0 shadow-primary"
              onClick={() => navigate({ to: "/dashboard/student" })}
              data-ocid="weekly_test.primary_button"
            >
              \ud83d\udcca View Test History
            </Button>
          </div>
        </div>

        {/* Fear Zone Report */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            \ud83d\udcca Topic Report \u2014 Fear Zone Analysis
          </h2>
          <div className="space-y-3">
            {topicStats.map((ts, i) => {
              const barColor =
                ts.status === "fear"
                  ? "bg-red-500"
                  : ts.status === "needs"
                    ? "bg-amber-400"
                    : "bg-green-500";
              const label =
                ts.status === "fear"
                  ? "Fear Zone \ud83d\udd34"
                  : ts.status === "needs"
                    ? "Needs Work \ud83d\udfe1"
                    : "Strong \ud83d\udfe2";
              const labelClass =
                ts.status === "fear"
                  ? "bg-red-100 text-red-700"
                  : ts.status === "needs"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700";
              return (
                <Card
                  key={ts.topic}
                  className="glass-card border-white/40 warm-shadow"
                  data-ocid={`weekly_test.item.${i + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <span className="text-muted-foreground">
                          {topicIcons[ts.topic]}
                        </span>
                        {ts.topic}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {ts.correct}/{ts.total}
                        </span>
                        <Badge className={`${labelClass} border-0 text-xs`}>
                          {label}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${barColor} transition-all duration-700`}
                        style={{ width: `${ts.pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">
                      {ts.pct}%
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Material */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            \ud83d\udcda Your Personalized Study Plan
          </h2>
          {fearTopics.length === 0 ? (
            <div
              className="glass-card rounded-3xl p-8 warm-shadow text-center"
              data-ocid="weekly_test.empty_state"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground">
                No fear zones detected!
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                You scored above 50% on all topics. Keep up the amazing work!
                \ud83c\udf89
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {fearTopics.map((ts, i) => (
                <Card
                  key={ts.topic}
                  className="glass-card border-red-200/60 warm-shadow"
                  data-ocid={`weekly_test.panel.${i + 1}`}
                >
                  <CardContent className="p-0">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() => toggleNote(ts.topic)}
                      data-ocid={`weekly_test.toggle.${i + 1}`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-foreground">
                        <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          {topicIcons[ts.topic]}
                        </span>
                        {ts.topic} \u2014 Quick Revision Notes
                        <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                          Fear Zone
                        </Badge>
                      </div>
                      {expandedNotes[ts.topic] ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {expandedNotes[ts.topic] && (
                      <div className="px-5 pb-5 border-t border-border/50 animate-fade-in">
                        <ul className="space-y-2 mt-4">
                          {(studyNotes[ts.topic] ?? []).map((note) => (
                            <li
                              key={note}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                \u2022
                              </span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground py-4">
          \u00a9 {new Date().getFullYear()}. Built with \u2764\ufe0f using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </main>
    </div>
  );
}
