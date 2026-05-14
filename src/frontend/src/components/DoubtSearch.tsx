import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, PlayCircle, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const RECORDED = [
  {
    id: 1,
    title: "Calculus: Limits & Derivatives",
    subject: "Mathematics",
    youtubeId: "WUvTyaaNkzM",
    desc: "Complete introduction to limits and derivative rules with examples.",
  },
  {
    id: 2,
    title: "Thermodynamics Fundamentals",
    subject: "Physics",
    youtubeId: "4i1MUWJoI0U",
    desc: "Laws of thermodynamics explained with real-world applications.",
  },
  {
    id: 3,
    title: "Periodic Table & Elements",
    subject: "Chemistry",
    youtubeId: "0RRVV4Diomg",
    desc: "Understanding the periodic table structure and element properties.",
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    youtubeId: "rL8X2mlNHPM",
    desc: "Big O notation and algorithm complexity explained simply.",
  },
  {
    id: 5,
    title: "Human Body Systems",
    subject: "Biology",
    youtubeId: "Ae4MadKPJC0",
    desc: "Overview of major human body systems and how they interact.",
  },
];

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: "bg-blue-100 text-blue-700",
  Physics: "bg-orange-100 text-orange-700",
  Chemistry: "bg-green-100 text-green-700",
  "Computer Science": "bg-purple-100 text-purple-700",
  Biology: "bg-pink-100 text-pink-700",
  Maths: "bg-blue-100 text-blue-700",
  Programming: "bg-purple-100 text-purple-700",
  Electronics: "bg-orange-100 text-orange-700",
  General: "bg-gray-100 text-gray-700",
};

const FALLBACK_VIDEOS: Record<string, string> = {
  Mathematics: "WUvTyaaNkzM",
  Physics: "4i1MUWJoI0U",
  Chemistry: "0RRVV4Diomg",
  "Computer Science": "rL8X2mlNHPM",
  Biology: "Ae4MadKPJC0",
  Maths: "WUvTyaaNkzM",
  Programming: "rL8X2mlNHPM",
  Electronics: "4i1MUWJoI0U",
  General: "WUvTyaaNkzM",
};

type ResultItem = {
  id: string;
  title: string;
  subject: string;
  type: "Lecture" | "Doubt";
  youtubeId: string;
  matchCount: number;
};

function getKeywords(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function scoreText(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw)).length;
}

interface Props {
  lecturesOnly?: boolean;
}

export default function DoubtSearch({ lecturesOnly = false }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const results: ResultItem[] = [];
  const related: ResultItem[] = [];
  let showRelated = false;

  if (debouncedQuery.trim().length > 0) {
    const keywords = getKeywords(debouncedQuery);

    // Search lectures
    for (const lec of RECORDED) {
      const matchCount = scoreText(
        `${lec.title} ${lec.subject} ${lec.desc}`,
        keywords,
      );
      const item: ResultItem = {
        id: `lec-${lec.id}`,
        title: lec.title,
        subject: lec.subject,
        type: "Lecture",
        youtubeId: lec.youtubeId,
        matchCount,
      };
      if (matchCount >= keywords.length && keywords.length > 0) {
        results.push(item);
      } else if (matchCount > 0) {
        related.push(item);
      }
    }

    // Search localStorage doubts
    if (!lecturesOnly) {
      try {
        const raw = localStorage.getItem("askspark_doubts");
        const doubts: Array<{
          text: string;
          subject?: string;
          timestamp?: number;
        }> = raw ? JSON.parse(raw) : [];
        for (let i = 0; i < doubts.length; i++) {
          const d = doubts[i];
          const subject = d.subject ?? "General";
          const matchCount = scoreText(`${d.text} ${subject}`, keywords);
          const item: ResultItem = {
            id: `doubt-${i}`,
            title: d.text.slice(0, 60) + (d.text.length > 60 ? "..." : ""),
            subject,
            type: "Doubt",
            youtubeId: FALLBACK_VIDEOS[subject] ?? FALLBACK_VIDEOS.General,
            matchCount,
          };
          if (matchCount >= keywords.length && keywords.length > 0) {
            results.push(item);
          } else if (matchCount > 0) {
            related.push(item);
          }
        }
      } catch {
        // ignore localStorage parse errors
      }
    }

    results.sort((a, b) => b.matchCount - a.matchCount);
    related.sort((a, b) => b.matchCount - a.matchCount);
    showRelated = results.length === 0 && related.length > 0;
  }

  const displayResults = showRelated ? related.slice(0, 3) : results;
  const isEmpty =
    debouncedQuery.trim().length > 0 && displayResults.length === 0;

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your doubt..."
          className="pl-11 pr-4 py-3 rounded-full glass-card warm-shadow border border-white/40 text-sm focus-visible:ring-primary/40"
          data-ocid="search.input"
        />
      </div>

      {/* Results */}
      <AnimatePresence>
        {debouncedQuery.trim().length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
            data-ocid="search.panel"
          >
            {showRelated && (
              <p className="text-xs font-semibold text-amber-600 mb-3 flex items-center gap-1.5">
                <span>🔍</span> Showing related results
              </p>
            )}

            {isEmpty && (
              <div
                className="text-center py-8 text-muted-foreground text-sm"
                data-ocid="search.empty_state"
              >
                No results found. Try different keywords.
              </div>
            )}

            <div className="space-y-3">
              {displayResults.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card warm-shadow rounded-2xl border border-white/40 overflow-hidden"
                  data-ocid={`search.item.${i + 1}`}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge
                        className={`text-xs border-0 ${SUBJECT_COLORS[item.subject] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {item.subject}
                      </Badge>
                      <Badge
                        className={`text-xs border-0 ${
                          item.type === "Lecture"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-3 leading-snug">
                      {item.title}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenVideo(openVideo === item.id ? null : item.id)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      data-ocid={`search.play.button.${i + 1}`}
                    >
                      {openVideo === item.id ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" /> Hide Solution
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" /> ▶ Play Solution
                        </>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {openVideo === item.id && (
                      <motion.div
                        key="video"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="aspect-video bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${item.youtubeId}`}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
