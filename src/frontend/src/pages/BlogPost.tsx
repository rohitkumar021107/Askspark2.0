import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Home,
  PenLine,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import Header from "../components/Header";
import { blogPosts } from "../data/blogPosts";

const BASE_URL = "https://student-confidence-support-system-03r.caffeine.xyz";

export default function BlogPost() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // ── Dynamic SEO per blog post ──────────────────────────────────────────────
  useEffect(() => {
    if (!post) return;

    // 1. Title tag
    document.title = post.metaTitle;

    // Helper to upsert a <meta> tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector
          .replace(/[\[\]]/g, "")
          .split("=")
          .map((s) => s.replace(/["']/g, ""));
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const canonicalUrl = `${BASE_URL}${post.canonicalPath}`;
    const articleUrl = `${BASE_URL}/blog/${post.slug}`;
    const ogImage = `${BASE_URL}/assets/generated/blog-header.dim_1200x480.jpg`;

    // 2. Meta description
    setMeta('meta[name="description"]', "content", post.metaDescription);

    // 3. Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 4. Open Graph
    setMeta('meta[property="og:title"]', "content", post.metaTitle);
    setMeta('meta[property="og:description"]', "content", post.metaDescription);
    setMeta('meta[property="og:url"]', "content", articleUrl);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[property="og:image"]', "content", ogImage);

    // 5. Twitter Card
    setMeta('meta[name="twitter:title"]', "content", post.metaTitle);
    setMeta(
      'meta[name="twitter:description"]',
      "content",
      post.metaDescription,
    );
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // 6. JSON-LD Article schema
    const ldId = "blog-post-jsonld";
    let ldScript = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = ldId;
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.metaTitle,
      description: post.metaDescription,
      image: ogImage,
      author: {
        "@type": "Organization",
        name: post.author,
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "AskSpark",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/assets/generated/favicon-spark-transparent.dim_64x64.png`,
        },
      },
      datePublished: post.date,
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      keywords: post.tags.join(", "),
    });

    // Restore on unmount
    return () => {
      document.title = "AskSpark \u2013 Student Confidence Support System";
      if (ldScript) ldScript.remove();
    };
  }, [post]);

  useEffect(() => {
    if (!post) {
      navigate({ to: "/blog" });
    }
  }, [post, navigate]);

  if (!post) return null;

  // Detect FAQ section boundaries
  const faqStartIndex = post.content.findIndex(
    (s) => s.type === "h2" && s.text.toLowerCase().startsWith("faq"),
  );

  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < post.content.length) {
      const section = post.content[i];
      const key = `${section.type}-${i}-${section.text.slice(0, 30)}`;

      // FAQ section: wrap everything from the FAQ h2 onwards in a styled block
      if (i === faqStartIndex && faqStartIndex !== -1) {
        const faqItems: React.ReactNode[] = [];
        faqItems.push(
          <h2
            key={`faq-h2-${i}`}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6"
          >
            {section.text}
          </h2>,
        );
        i++;
        while (i < post.content.length) {
          const s = post.content[i];
          const k = `faq-${s.type}-${i}`;
          if (s.type === "h3") {
            faqItems.push(
              <h3
                key={k}
                className="font-display text-lg font-semibold text-foreground mt-5 mb-2"
              >
                {s.text}
              </h3>,
            );
          } else if (s.type === "p") {
            faqItems.push(
              <p
                key={k}
                className="text-muted-foreground text-[17px] leading-[1.8]"
              >
                {s.text}
              </p>,
            );
          }
          i++;
        }
        elements.push(
          <div
            key="faq-block"
            className="bg-muted/30 rounded-2xl p-6 space-y-2 mt-10"
          >
            {faqItems}
          </div>,
        );
        continue;
      }

      if (section.type === "h2") {
        elements.push(
          <h2
            key={key}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-10 first:mt-0"
          >
            {section.text}
          </h2>,
        );
      } else if (section.type === "h3") {
        elements.push(
          <h3
            key={key}
            className="font-display text-xl font-semibold text-foreground mt-6"
          >
            {section.text}
          </h3>,
        );
      } else if (section.type === "highlight") {
        elements.push(
          <div
            key={key}
            className="glass-card border-l-4 border-primary rounded-2xl px-6 py-4 text-foreground font-medium leading-relaxed"
          >
            <Sparkles className="w-4 h-4 text-primary mb-2" />
            {section.text}
          </div>,
        );
      } else {
        elements.push(
          <p
            key={key}
            className="text-muted-foreground text-[17px] leading-[1.8]"
          >
            {section.text}
          </p>,
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-hero pt-14 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            data-ocid="blog.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-0 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* H1 — uses the full post title for clear heading hierarchy */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-7">{post.subtitle}</p>

          {/* Meta row with avatar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border/40 pt-5">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                TA
              </span>
              <span className="flex items-center gap-1.5">
                <PenLine className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Header image — per-post keyword alt text */}
      <div className="max-w-3xl mx-auto px-4 -mt-2 mb-0">
        <img
          src="/assets/generated/blog-header.dim_1200x480.jpg"
          loading="lazy"
          alt={post.heroImageAlt}
          width={1200}
          height={480}
          className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Content */}
      <main className="max-w-[680px] mx-auto px-4 py-12">
        <article className="space-y-6" data-ocid="blog.panel">
          {renderContent()}
        </article>

        {/* CTA */}
        <div className="mt-14 glass-card rounded-3xl p-8 text-center border-white/40 warm-shadow-lg">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-primary mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Ready to Ask Your Doubt on AskSpark?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Join thousands of students who ask boldly on AskSpark — anonymously
            or with your name.
          </p>
          <Link to="/submit" data-ocid="blog.primary_button">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white border-0 shadow-primary hover:opacity-90 px-8"
            >
              Ask Your Doubt Now
            </Button>
          </Link>

          {/* Internal links below CTA */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-border/40 text-sm">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
              data-ocid="blog.link"
            >
              <Home className="w-4 h-4" />
              Back to Homepage
            </Link>
            <Link
              to="/submit"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
              data-ocid="blog.link"
            >
              Submit a Doubt
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* You might also like */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              You might also like
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="flex items-start gap-4 p-4 glass-card rounded-2xl hover:border-primary/30 transition-all group"
                  data-ocid="blog.link"
                >
                  <img
                    src="/assets/generated/blog-header.dim_1200x480.jpg"
                    loading="lazy"
                    alt={`AskSpark blog: ${related.title}`}
                    width={160}
                    height={112}
                    className="w-20 h-14 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {related.readTime}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 pt-6 border-t border-border/40">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="blog.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-8 py-8 text-center text-sm text-muted-foreground">
        \u00a9 {new Date().getFullYear()}. Built with \u2764\ufe0f using{" "}
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
