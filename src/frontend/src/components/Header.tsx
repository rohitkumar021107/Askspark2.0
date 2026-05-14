import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { loadLocalProfile } from "../hooks/useLocalProfile";
import AskSparkLogo from "./AskSparkLogo";
import NotificationBell from "./NotificationBell";

const NAV_LINKS = [
  { href: "/", label: "Home", isAnchor: false },
  { href: "/submit", label: "Ask Doubt", isAnchor: false },
  { href: "/dashboard", label: "Dashboard", isAnchor: false },
  { href: "/onboarding", label: "Login", isAnchor: false },
  { href: "/onboarding", label: "Sign Up", isAnchor: false },
];

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "warm-shadow" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center shrink-0 transition-opacity duration-150 hover:opacity-80"
          data-ocid="nav.link"
        >
          <AskSparkLogo
            variant="horizontal"
            height={44}
            idPrefix="nav_h"
            className="hidden md:block"
          />
          <AskSparkLogo
            variant="icon"
            height={38}
            idPrefix="nav_m"
            className="md:hidden"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              to={link.href}
              className="hover:text-primary transition-colors duration-150"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loadLocalProfile() && <NotificationBell />}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary/40 text-primary hover:bg-primary/10 font-medium min-w-[120px] px-5 py-2.5 transition-all duration-150 hover:scale-[1.02]"
            onClick={() => navigate({ to: "/onboarding" })}
            data-ocid="header.secondary_button"
          >
            I&apos;m a Student
          </Button>
          <Button
            size="sm"
            className="rounded-full gradient-primary text-white hover:opacity-90 font-medium px-5 py-2.5 shadow-primary border-0 min-w-[120px] transition-all duration-150 hover:scale-[1.02] glow-button"
            onClick={() => navigate({ to: "/onboarding" })}
            data-ocid="header.primary_button"
          >
            I&apos;m a Teacher
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {loadLocalProfile() && <NotificationBell />}
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-muted/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-primary/20 px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              to={link.href}
              className="text-sm font-medium py-2.5 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-primary/20 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/40 text-primary w-full py-2.5"
              onClick={() => {
                navigate({ to: "/onboarding" });
                setMobileOpen(false);
              }}
              data-ocid="header.secondary_button"
            >
              I&apos;m a Student
            </Button>
            <Button
              size="sm"
              className="rounded-full gradient-primary text-white border-0 w-full py-2.5 glow-button"
              onClick={() => {
                navigate({ to: "/onboarding" });
                setMobileOpen(false);
              }}
              data-ocid="header.primary_button"
            >
              I&apos;m a Teacher
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
