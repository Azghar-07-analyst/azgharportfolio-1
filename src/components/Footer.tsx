import { Mail, Phone, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/in/azghar-abbas", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Azghar-07-analyst", label: "GitHub" },
  { icon: Mail, href: "mailto:azgharabbas@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+919150642752", label: "Phone" },
];

export function Footer() {
  return (
    <footer className="section-px border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Built with data &amp; passion — <span className="text-foreground">Syed Azghar Abbas Rizvi</span> © 2026
        </p>
        <div className="flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-xl glass transition-all duration-300 hover:-translate-y-1 hover:text-cyan hover:glow-cyan"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
