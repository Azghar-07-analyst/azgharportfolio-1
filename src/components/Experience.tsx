import { MapPin, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";

const bullets = [
  "Cleaned and preprocessed datasets using SQL and Python.",
  "Performed EDA to identify trends and anomalies across business data.",
  "Created interactive Power BI dashboards to communicate actionable insights.",
];

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Experience</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Where I've worked</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="group relative mt-10 overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:glow-purple sm:p-9">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-mesh blur-3xl opacity-50 transition-opacity group-hover:opacity-90" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-display font-extrabold text-primary-foreground glow-cyan"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  V
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Data Analytics Intern</h3>
                  <p className="text-cyan">VCodez</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> May 2025 – July 2025
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Chennai, India
                </span>
              </div>
            </div>

            <ul className="relative mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
