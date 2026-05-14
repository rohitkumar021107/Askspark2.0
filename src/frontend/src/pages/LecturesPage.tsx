import DoubtSearch from "@/components/DoubtSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User, Video } from "lucide-react";
import { motion } from "motion/react";

const LIVE_CLASSES = [
  {
    id: 1,
    title: "Integration by Parts",
    subject: "Mathematics",
    date: "Today",
    time: "5:00 PM",
    teacher: "Mr. Sharma",
    badge: "Starting Soon",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    date: "Tomorrow",
    time: "4:00 PM",
    teacher: "Ms. Gupta",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    date: "Wed, 28 Mar",
    time: "6:00 PM",
    teacher: "Dr. Patel",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 4,
    title: "Data Structures: Trees",
    subject: "Computer Science",
    date: "Thu, 29 Mar",
    time: "7:00 PM",
    teacher: "Mr. Verma",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    title: "Cell Biology & Genetics",
    subject: "Biology",
    date: "Fri, 30 Mar",
    time: "5:30 PM",
    teacher: "Ms. Rao",
    badge: "Upcoming",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

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
};

export default function LecturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            onClick={() => navigate({ to: "/learning" })}
            data-ocid="lectures.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </button>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            🎓 <span className="text-gradient">Lectures</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Attend live sessions or watch recorded videos at your pace.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Tabs defaultValue="live" data-ocid="lectures.tab">
          <TabsList className="mb-8 rounded-xl">
            <TabsTrigger value="live" data-ocid="lectures.live.tab">
              🔴 Live Classes
            </TabsTrigger>
            <TabsTrigger value="recorded" data-ocid="lectures.recorded.tab">
              📹 Recorded Lectures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <div className="grid sm:grid-cols-2 gap-4">
              {LIVE_CLASSES.map((cls, i) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card warm-shadow rounded-2xl p-5 border border-white/40"
                  data-ocid={`lectures.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge
                      className={`text-xs font-semibold ${cls.badgeColor} border-0`}
                    >
                      {cls.badge}
                    </Badge>
                    <Badge
                      className={`text-xs ${SUBJECT_COLORS[cls.subject] ?? ""} border-0`}
                    >
                      {cls.subject}
                    </Badge>
                  </div>
                  <Badge className="text-xs bg-amber-100 text-amber-700 border-0 mb-2">
                    Sample
                  </Badge>
                  <h3 className="font-display font-bold text-foreground text-lg mb-3">
                    {cls.title}
                  </h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cls.date}</span>
                      <Clock className="w-3.5 h-3.5 ml-1" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      <span>{cls.teacher}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full gradient-primary text-white border-0 hover:opacity-90 font-medium"
                    data-ocid={`lectures.join.button.${i + 1}`}
                  >
                    <Video className="mr-1.5 w-3 h-3" /> Join Class
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recorded">
            {/* Search inside recorded lectures */}
            <div className="mb-6">
              <DoubtSearch lecturesOnly />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {RECORDED.map((vid, i) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card warm-shadow rounded-2xl overflow-hidden border border-white/40"
                  data-ocid={`lectures.recorded.item.${i + 1}`}
                >
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`text-xs ${SUBJECT_COLORS[vid.subject] ?? ""} border-0`}
                      >
                        {vid.subject}
                      </Badge>
                      <Badge className="text-xs bg-amber-100 text-amber-700 border-0">
                        Sample
                      </Badge>
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-1">
                      {vid.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{vid.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
