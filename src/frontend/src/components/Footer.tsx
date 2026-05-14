import { GraduationCap, Heart } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-foreground text-card py-14 mt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">SCSS</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Helping students build confidence one question at a time.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a
                  href="/#features"
                  className="hover:opacity-100 transition-opacity"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="hover:opacity-100 transition-opacity"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/submit"
                  className="hover:opacity-100 transition-opacity"
                >
                  Submit Doubt
                </a>
              </li>
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Dashboards</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a
                  href="/dashboard/student"
                  className="hover:opacity-100 transition-opacity"
                >
                  Student
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/teacher"
                  className="hover:opacity-100 transition-opacity"
                >
                  Teacher
                </a>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Team</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Rohith Kumar</li>
              <li>Hemanth</li>
              <li>P. Rohith</li>
              <li>Nehal</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-60">
          <p>
            &copy; {year}. Built with{" "}
            <Heart className="inline w-3 h-3 fill-current" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              className="underline hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noreferrer"
            >
              caffeine.ai
            </a>
          </p>
          <p>Student Confidence Support System</p>
        </div>
      </div>
    </footer>
  );
}
