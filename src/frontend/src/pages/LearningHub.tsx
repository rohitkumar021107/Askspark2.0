import DoubtSearch from "@/components/DoubtSearch";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, MessageSquare, PenLine } from "lucide-react";
import { motion } from "motion/react";

const HUB_CARDS = [
  {
    emoji: "🎓",
    icon: BookOpen,
    title: "Lectures",
    desc: "Live classes & recorded videos",
    to: "/learning/lectures",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-200/60",
    badge: "Live & Recorded",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "📝",
    icon: PenLine,
    title: "Practice (DPP)",
    desc: "Daily practice problems by subject",
    to: "/learning/practice",
    color: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-200/60",
    badge: "MCQs + Solutions",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    emoji: "💬",
    icon: MessageSquare,
    title: "24/7 Support",
    desc: "Chat, FAQ, and help form",
    to: "/learning/support",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-200/60",
    badge: "Always Open",
    badgeColor: "bg-green-100 text-green-700",
  },
];

export default function LearningHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            onClick={() => navigate({ to: "/dashboard/student" })}
            data-ocid="learning.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-white/70 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full warm-shadow mb-5">
              🚀 Your Learning Space
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Learning <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Everything you need to learn — Lectures · Practice · Support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <DoubtSearch />
      </div>

      {/* Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid sm:grid-cols-3 gap-6">
          {HUB_CARDS.map((card, i) => (
            <motion.button
              key={card.to}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                navigate({
                  to: card.to as
                    | "/learning/lectures"
                    | "/learning/practice"
                    | "/learning/support",
                })
              }
              className={`glass-card warm-shadow rounded-2xl p-7 text-left w-full group cursor-pointer border bg-gradient-to-br ${card.color} ${card.border} hover:shadow-lg transition-all`}
              data-ocid={`learning.${i === 0 ? "lectures" : i === 1 ? "practice" : "support"}.card`}
            >
              <div className="text-5xl mb-4">{card.emoji}</div>
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${card.badgeColor}`}
              >
                {card.badge}
              </span>
              <h2 className="font-display text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
                Explore →
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 glass-card rounded-2xl p-5 border border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50"
          data-ocid="learning.panel"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-amber-600 font-semibold">💡 Pro tip:</span>{" "}
            Start with <strong>Practice (DPP)</strong> to test your knowledge,
            then watch <strong>Lecture videos</strong> for any topics you found
            tricky, and use <strong>Support</strong> if you're stuck!
          </p>
        </motion.div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-6">
        <div className="border border-dashed border-primary/20 bg-primary/5 rounded-xl p-3 text-xs text-muted-foreground text-center">
          📢 Sponsored · Reach AskSpark&#39;s learning community ·
          sponsor@askspark.app
        </div>
      </div>

      {/* Footer */}
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
