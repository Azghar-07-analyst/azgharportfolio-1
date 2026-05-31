import { Database, FolderGit2, Award } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const stats = [
  { icon: Database, value: 10000, suffix: "+", label: "Records Analyzed" },
  { icon: FolderGit2, value: 3, suffix: "", label: "Live Projects" },
  { icon: Award, value: 2, suffix: "", label: "Industry Certifications" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan">About</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Insights that move the needle
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a data analyst who transforms messy, complex datasets into clear, actionable
            insights. Passionate about <span className="text-foreground">Python</span>,{" "}
            <span className="text-foreground">SQL</span>, and building{" "}
            <span className="text-foreground">dashboards that actually drive decisions</span>.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl glass p-5 transition-transform hover:-translate-y-1">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
