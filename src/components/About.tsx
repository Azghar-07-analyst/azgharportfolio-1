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
    <section id="about" className="section-px section-py container-xl relative overflow-hidden scroll-mt-24">
      <div className="about-spotlight" aria-hidden />
      <Reveal className="text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan">About</p>
        <h2 className="heading-2 mt-2 font-display font-bold">
          Insights that move the needle
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground lg:text-left lg:text-xl">
          I'm a data analyst who transforms messy, complex datasets into clear, actionable
          insights. Passionate about <span className="text-foreground">Python</span>,{" "}
          <span className="text-foreground">SQL</span>, and building{" "}
          <span className="text-foreground">dashboards that actually drive decisions</span>.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.15 + i * 0.1}>
            <div className="flex h-full items-center gap-5 rounded-2xl glass p-7 transition-transform hover:-translate-y-1">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--gradient-brand)" }}
              >
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold">
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
