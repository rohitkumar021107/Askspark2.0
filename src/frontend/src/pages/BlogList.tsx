import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Home,
  PenLine,
  Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import { blogPosts } from "../data/blogPosts";

export default function BlogList() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-hero pt-16 pb-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Back to homepage */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            data-ocid="blog.link"
          >
            <Home className="w-4 h-4" />
            AskSpark Home
          </Link>

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 ml-4">
            <BookOpen className="w-4 h-4" />
            AskSpark Blog
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            Learn, Grow, and <span className="text-gradient">Ask Boldly</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Insights on student confidence, anonymous learning, and how AskSpark
            is helping students ask their doubts without fear.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              data-ocid={`blog.item.${i + 1}`}
            >
              <Card className="glass-card border-white/40 warm-shadow hover:warm-shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col overflow-hidden">
                {/* Thumbnail */}
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src="/assets/generated/blog-header.dim_1200x480.jpg"
                    loading="lazy"
                    alt={`AskSpark blog — ${post.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-0 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          TA
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <PenLine className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Submit Doubt CTA Banner */}
        <div className="mt-16 glass-card rounded-3xl p-8 sm:p-10 text-center border-white/40 warm-shadow-lg">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Have a doubt? Ask it on AskSpark
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto mb-7">
            Anonymously, for free — AskSpark helps students ask questions
            without fear and get real answers from teachers.
          </p>
          <Link to="/submit" data-ocid="blog.primary_button">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white border-0 shadow-primary hover:opacity-90 px-8"
            >
              Ask Your Doubt Now
            </Button>
          </Link>
        </div>
      </main>

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
