import { BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const certs = [
  { title: "Data Analytics Essentials", issuer: "Cisco Networking Academy" },
  { title: "Introduction to Data Science", issuer: "Cisco Networking Academy" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Certifications</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Credentials</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <div className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:glow-cyan">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mesh blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl glow-purple"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <BadgeCheck className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
