import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  Mail,
  MessageCircle,
  Send,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FAQS = [
  {
    q: "How do I submit a doubt?",
    a: "Click the 'Submit Doubt' button in the navigation or from your student dashboard. Fill in the subject, title, and description of your question. You can also attach an image for better context. Anonymous submission is available if you prefer privacy.",
  },
  {
    q: "Is anonymous submission really safe?",
    a: "Yes, completely. When you submit anonymously, your name and identity are not attached to the doubt at any point. Teachers only see the question content and subject, never your personal information. This is designed to reduce the fear of judgment.",
  },
  {
    q: "How long does it take for a teacher to respond?",
    a: "Most doubts are answered within 24 hours. High-priority doubts (marked as urgent) are typically addressed within 2-4 hours. You'll receive an in-app notification as soon as your doubt is answered.",
  },
  {
    q: "Can teachers do video calls to explain doubts?",
    a: "Yes! Teachers can initiate a video call session directly from any doubt card in their dashboard. You'll receive a join link in your student dashboard under the answered doubt. This uses your device's camera and microphone via WebRTC.",
  },
  {
    q: "What is the Community Chat and how do I use it?",
    a: "The Community Chat (/chat) has two sections: Study Rooms (group discussions organized by subject) and Personal Messages (one-on-one chats with other students). All chats are moderated — abusive language is automatically detected and results in warnings or a ban.",
  },
  {
    q: "What happens if someone uses abusive language in chat?",
    a: "Our automatic moderation system detects inappropriate language in real time. The first offense triggers a warning. After 3 violations, the user is permanently blocked from the community. You can report violations by contacting support.",
  },
  {
    q: "How does the confidence score work?",
    a: "Your confidence score increases each time you submit a doubt, engage in discussions, or receive an upvote on a helpful question. It reflects how actively you participate in learning. Badges are awarded at milestones to celebrate your growth.",
  },
  {
    q: "I'm a teacher — how do I manage my account?",
    a: "Teachers get access to the Teacher Dashboard where you can view all submitted doubts, respond with text/voice/video/image answers, initiate video calls, and track your response stats. Contact your institution admin to set up your teacher account.",
  },
];

const QUICK_LINKS = [
  {
    to: "/submit",
    icon: BookOpen,
    title: "Submit a Doubt",
    desc: "Ask your question anonymously or with your name",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    to: "/dashboard/student",
    icon: LayoutDashboard,
    title: "Student Dashboard",
    desc: "View your doubts, scores, and badges",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    to: "/chat",
    icon: MessageCircle,
    title: "Community Chat",
    desc: "Join study rooms and connect with peers",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    to: "/dashboard/teacher",
    icon: GraduationCap,
    title: "Teacher Dashboard",
    desc: "Manage doubts and track student progress",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export default function HelpCenter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Help Request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:rohitkumar021107k@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            We&apos;re here to{" "}
            <span className="text-gradient">help you succeed</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find answers to common questions, contact our support team, or
            explore quick links to get where you need to go.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Students Helped", value: "2,400+" },
            { icon: Clock, label: "Avg Response Time", value: "< 4 hrs" },
            { icon: Shield, label: "Safe & Anonymous", value: "100%" },
            { icon: Lightbulb, label: "Doubts Resolved", value: "8,100+" },
          ].map(({ icon: Icon, label, value }) => (
            <Card
              key={label}
              className="glass-card border-white/40 text-center"
            >
              <CardContent className="p-4">
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display font-bold text-xl text-foreground">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <section data-ocid="help.section">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-6">
            Quick answers to the most common questions.
          </p>
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            data-ocid="help.panel"
          >
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="glass-card border-white/40 px-5 rounded-2xl"
              >
                <AccordionTrigger className="font-medium text-foreground hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Section */}
        <section className="grid md:grid-cols-2 gap-8" data-ocid="help.section">
          {/* Direct email CTA */}
          <Card className="glass-card border-white/40 warm-shadow">
            <CardContent className="p-8 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Still need help?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our support team typically responds within a few hours. Reach
                  out directly and we&apos;ll get back to you.
                </p>
              </div>
              <div className="text-sm text-muted-foreground font-medium bg-muted/50 px-4 py-2 rounded-full">
                rohitkumar021107k@gmail.com
              </div>
              <a href="mailto:rohitkumar021107k@gmail.com" className="w-full">
                <Button
                  className="w-full rounded-full gradient-primary text-white border-0 shadow-primary hover:opacity-90"
                  data-ocid="help.primary_button"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send us an email
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Contact form */}
          <Card className="glass-card border-white/40 warm-shadow">
            <CardContent className="p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Send a message
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Fill out the form and we&apos;ll open your email client with the
                details pre-filled.
              </p>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="help-name" className="text-sm font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="help-name"
                    placeholder="e.g. Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 rounded-xl border-border/60"
                    data-ocid="help.input"
                  />
                </div>
                <div>
                  <Label htmlFor="help-email" className="text-sm font-medium">
                    Your Email
                  </Label>
                  <Input
                    id="help-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 rounded-xl border-border/60"
                    data-ocid="help.input"
                  />
                </div>
                <div>
                  <Label htmlFor="help-message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="help-message"
                    placeholder="Describe your issue or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="mt-1 rounded-xl border-border/60 resize-none"
                    data-ocid="help.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full gradient-primary text-white border-0 shadow-primary hover:opacity-90"
                  data-ocid="help.submit_button"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section data-ocid="help.section">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Quick Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Jump directly to the feature you need.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                <Card className="glass-card border-white/40 warm-shadow hover:warm-shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${link.bg} ${link.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">
                        {link.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {link.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
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
