import { BadgeCheck, ShieldCheck, Award } from "lucide-react";
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

                {/* Verified tag */}
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-green-400/15 px-2.5 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-400/30">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>

                <div className="relative flex items-start gap-4">
                  {/* Gold/cyan seal */}
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                    <div
                      className="absolute inset-0 animate-spin-slow rounded-full opacity-90"
                      style={{ background: "conic-gradient(from 0deg, #f5d782, #00d4ff, #7c3aed, #f5d782)" }}
                    />
                    <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-background">
                      <ShieldCheck className="h-7 w-7 text-cyan" />
                    </div>
                  </div>

                  <div className="pr-16">
                    {/* Issuer logo placeholder */}
                    <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-secondary/70 px-2.5 py-1">
                      <Award className="h-4 w-4 text-purple" />
                      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                        {c.issuer}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
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
