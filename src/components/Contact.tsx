import { Mail, Phone, Linkedin, Github, Clock } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { track } from "@/lib/analytics";

const items = [
  { icon: Mail, label: "Email", value: "azgharabbas@gmail.com", href: "mailto:azgharabbas@gmail.com", key: "email" },
  { icon: Phone, label: "Phone", value: "+91 9150642752", href: "tel:+919150642752", key: "phone" },
  { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: "https://linkedin.com/in/azghar-abbas", key: "linkedin" },
  { icon: Github, label: "GitHub", value: "View my code", href: "https://github.com/Azghar-07-analyst", key: "github" },
];

export function Contact() {
  const handleClick = (key: string, e: React.MouseEvent) => {
    if (key === "email") {
      e.preventDefault();
      navigator.clipboard
        ?.writeText("azgharabbas@gmail.com")
        .then(() => toast.success("Email copied! 📋"))
        .catch(() => {
          window.location.href = "mailto:azgharabbas@gmail.com";
        });
      track("email_copied");
    } else if (key === "linkedin") {
      track("linkedin_clicked");
    } else if (key === "github") {
      track("github_clicked");
    }
  };

  return (
    <section id="contact" className="contact-bg section-px section-py relative overflow-hidden scroll-mt-24">
      <div className="relative container-xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Contact</p>
          <h2 className="heading-2 mt-2 font-display font-extrabold">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Looking for a data analyst who turns numbers into decisions? Let's talk — I'm one
            message away.
          </p>
          <span className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground/90">
            <Clock className="h-4 w-4 text-cyan" /> ⚡ Usually responds within 24 hours
          </span>
        </Reveal>

        <ContactForm />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.12} direction="left">
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={(e) => handleClick(it.key, e)}
                className="group flex items-center gap-4 rounded-2xl glass p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:glow-cyan"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <it.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{it.label}</p>
                  <p className="font-medium transition-colors group-hover:text-cyan">{it.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
