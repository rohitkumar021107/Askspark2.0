import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Question = {
  q: string;
  options: string[];
  answer: number;
  videoId: string;
};
type SubjectKey =
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Computer Science"
  | "Biology";

const QUESTIONS: Record<SubjectKey, Question[]> = {
  Mathematics: [
    {
      q: "What is the derivative of sin(x)?",
      options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
      answer: 0,
      videoId: "WUvTyaaNkzM",
    },
    {
      q: "∫x dx equals?",
      options: ["x²", "x²/2 + C", "2x", "x + C"],
      answer: 1,
      videoId: "WUvTyaaNkzM",
    },
    {
      q: "What is the value of lim(x→0) sin(x)/x?",
      options: ["0", "∞", "1", "-1"],
      answer: 2,
      videoId: "WUvTyaaNkzM",
    },
    {
      q: "Which is the correct quadratic formula?",
      options: [
        "(-b±√b²-4ac)/2a",
        "(-b±√b²+4ac)/2a",
        "(b±√b²-4ac)/2a",
        "(-b±√b²-4ac)/a",
      ],
      answer: 0,
      videoId: "WUvTyaaNkzM",
    },
    {
      q: "What is the slope of y = 3x + 7?",
      options: ["7", "3", "10", "3/7"],
      answer: 1,
      videoId: "WUvTyaaNkzM",
    },
  ],
  Physics: [
    {
      q: "What is Newton's second law?",
      options: ["F=mv", "F=ma", "F=m/a", "F=a/m"],
      answer: 1,
      videoId: "4i1MUWJoI0U",
    },
    {
      q: "Unit of force is?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2,
      videoId: "4i1MUWJoI0U",
    },
    {
      q: "Speed of light in vacuum?",
      options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
      answer: 1,
      videoId: "4i1MUWJoI0U",
    },
    {
      q: "What is the SI unit of energy?",
      options: ["Newton", "Watt", "Joule", "Pascal"],
      answer: 2,
      videoId: "4i1MUWJoI0U",
    },
    {
      q: "Which law states energy cannot be created or destroyed?",
      options: [
        "Newton's 1st",
        "Ohm's Law",
        "Law of Conservation of Energy",
        "Boyle's Law",
      ],
      answer: 2,
      videoId: "4i1MUWJoI0U",
    },
  ],
  Chemistry: [
    {
      q: "Atomic number of Carbon?",
      options: ["6", "12", "8", "14"],
      answer: 0,
      videoId: "0RRVV4Diomg",
    },
    {
      q: "Chemical formula of water?",
      options: ["H₂O₂", "HO", "H₂O", "H₃O"],
      answer: 2,
      videoId: "0RRVV4Diomg",
    },
    {
      q: "Which gas is released in photosynthesis?",
      options: ["CO₂", "N₂", "O₂", "H₂"],
      answer: 2,
      videoId: "0RRVV4Diomg",
    },
    {
      q: "pH of pure water?",
      options: ["0", "14", "10", "7"],
      answer: 3,
      videoId: "0RRVV4Diomg",
    },
    {
      q: "What is the valency of Oxygen?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      videoId: "0RRVV4Diomg",
    },
  ],
  "Computer Science": [
    {
      q: "What does CPU stand for?",
      options: [
        "Central Process Unit",
        "Central Processing Unit",
        "Computer Processing Unit",
        "Core Processing Unit",
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM",
    },
    {
      q: "Time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2,
      videoId: "rL8X2mlNHPM",
    },
    {
      q: "Which data structure uses LIFO?",
      options: ["Queue", "Array", "Stack", "Tree"],
      answer: 2,
      videoId: "rL8X2mlNHPM",
    },
    {
      q: "What is HTML?",
      options: [
        "A programming language",
        "A markup language",
        "A database",
        "An OS",
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM",
    },
    {
      q: "What does RAM stand for?",
      options: [
        "Read Access Memory",
        "Random Access Memory",
        "Run Access Memory",
        "Read All Memory",
      ],
      answer: 1,
      videoId: "rL8X2mlNHPM",
    },
  ],
  Biology: [
    {
      q: "Basic unit of life?",
      options: ["Tissue", "Organ", "Cell", "Atom"],
      answer: 2,
      videoId: "Ae4MadKPJC0",
    },
    {
      q: "Where does photosynthesis occur?",
      options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
      answer: 1,
      videoId: "Ae4MadKPJC0",
    },
    {
      q: "DNA stands for?",
      options: [
        "Deoxyribonucleic Acid",
        "Diribonucleic Acid",
        "Deoxyribose Nucleic Acid",
        "Double Nucleic Acid",
      ],
      answer: 0,
      videoId: "Ae4MadKPJC0",
    },
    {
      q: "Which organ pumps blood?",
      options: ["Liver", "Kidney", "Lungs", "Heart"],
      answer: 3,
      videoId: "Ae4MadKPJC0",
    },
    {
      q: "How many chromosomes in human cells?",
      options: ["23", "46", "48", "44"],
      answer: 1,
      videoId: "Ae4MadKPJC0",
    },
  ],
};

const SUBJECTS = Object.keys(QUESTIONS) as SubjectKey[];

export default function PracticePage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectKey>("Mathematics");
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(5).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [videoOpen, setVideoOpen] = useState<Record<number, boolean>>({});

  const questions = QUESTIONS[subject];

  function handleSubjectChange(s: SubjectKey) {
    setSubject(s);
    setSelected(Array(5).fill(null));
    setSubmitted(false);
    setVideoOpen({});
  }

  function handleSelect(qIdx: number, optIdx: number) {
    if (submitted) return;
    setSelected((prev) => prev.map((v, i) => (i === qIdx ? optIdx : v)));
  }

  function handleSubmit() {
    if (selected.some((s) => s === null)) return;
    setSubmitted(true);
  }

  const score = submitted
    ? selected.filter((s, i) => s === questions[i].answer).length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            onClick={() => navigate({ to: "/learning" })}
            data-ocid="practice.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </button>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            📝 <span className="text-gradient">Practice (DPP)</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Daily practice problems — pick a subject and test yourself!
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Subject selector */}
        <div className="flex flex-wrap gap-2 mb-8" data-ocid="practice.select">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSubjectChange(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                subject === s
                  ? "gradient-primary text-white border-0 shadow-primary"
                  : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="practice.subject.tab"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Score banner after submit */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`mb-6 p-4 rounded-2xl text-center font-display font-bold text-xl ${
                score >= 4
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : score >= 3
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-red-50 text-red-700 border border-red-200"
              }`}
              data-ocid="practice.success_state"
            >
              {score >= 4 ? "🎉" : score >= 3 ? "👍" : "📚"} Your Score: {score}
              /5
              {score === 5 && " — Perfect!"}
              {score >= 3 && score < 5 && " — Good job!"}
              {score < 3 && " — Keep practising!"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const isCorrect = submitted && selected[qi] === q.answer;
            return (
              <motion.div
                key={`${subject}-${q.q.slice(0, 20)}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qi * 0.05 }}
                className={`glass-card warm-shadow rounded-2xl p-5 border ${
                  submitted
                    ? isCorrect
                      ? "border-green-300 bg-green-50/40"
                      : "border-red-200 bg-red-50/30"
                    : "border-white/40"
                }`}
                data-ocid={`practice.item.${qi + 1}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
                    {qi + 1}
                  </span>
                  <p className="font-semibold text-foreground">{q.q}</p>
                  {submitted && (
                    <span className="ml-auto flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected[qi] === oi;
                    const isAnswerKey = submitted && oi === q.answer;
                    const isSelectedWrong =
                      submitted && isSelected && oi !== q.answer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(qi, oi)}
                        disabled={submitted}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${
                          isAnswerKey
                            ? "bg-green-100 border-green-400 text-green-800 font-semibold"
                            : isSelectedWrong
                              ? "bg-red-100 border-red-400 text-red-800"
                              : isSelected
                                ? "bg-primary/10 border-primary text-primary font-semibold"
                                : "border-border hover:border-primary/40 hover:bg-muted/40"
                        }`}
                        data-ocid="practice.radio"
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* View Solution */}
                {submitted && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() =>
                        setVideoOpen((prev) => ({ ...prev, [qi]: !prev[qi] }))
                      }
                      data-ocid={`practice.solution.button.${qi + 1}`}
                    >
                      {videoOpen[qi] ? "Hide" : "View"} Solution 🎬
                    </Button>
                    <AnimatePresence>
                      {videoOpen[qi] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3"
                        >
                          <div className="aspect-video rounded-xl overflow-hidden bg-black">
                            <iframe
                              src={`https://www.youtube.com/embed/${q.videoId}`}
                              title={`Solution for question ${qi + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                              loading="lazy"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Submit */}
        {!submitted && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white border-0 hover:opacity-90 font-semibold px-10 shadow-primary"
              onClick={handleSubmit}
              disabled={selected.some((s) => s === null)}
              data-ocid="practice.submit_button"
            >
              Submit Answers
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              {selected.filter((s) => s !== null).length}/5 questions answered
            </p>
          </div>
        )}

        {submitted && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
              onClick={() => handleSubjectChange(subject)}
              data-ocid="practice.secondary_button"
            >
              Try Again
            </Button>
          </div>
        )}
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
