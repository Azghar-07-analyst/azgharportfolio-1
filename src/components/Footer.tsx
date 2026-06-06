import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { VisitorCounter } from "./VisitorCounter";
import { track } from "@/lib/analytics";

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/in/azghar-abbas", label: "LinkedIn", event: "linkedin_clicked" },
  { icon: Github, href: "https://github.com/Azghar-07-analyst", label: "GitHub", event: "github_clicked" },
  { icon: Mail, href: "mailto:azgharabbas@gmail.com", label: "Email", event: "email_clicked" },
  { icon: Phone, href: "tel:+919150642752", label: "Phone", event: "phone_clicked" },
];

export function Footer() {
  return (
    <footer className="section-px relative overflow-hidden border-t border-border py-10">
      <div className="footer-glow" aria-hidden />
      <div className="relative mx-auto flex container-xl flex-col items-center gap-6 text-center">
        <VisitorCounter />

        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:text-left">
          <div className="space-y-1">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Built with data &amp; passion — <span className="text-foreground">Syed Azghar Abbas Rizvi</span> © 2026
            </p>
            <p className="text-xs text-muted-foreground">Last updated: June 2026</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                onClick={() => track(s.event)}
                className="flex h-11 w-11 items-center justify-center rounded-xl glass transition-all duration-300 hover:-translate-y-1 hover:text-cyan hover:glow-cyan"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
