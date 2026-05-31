import { Briefcase, MapPin, Calendar } from "lucide-react";
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
          <div className="mt-10 rounded-2xl glass p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Briefcase className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Data Analytics Intern</h3>
                  <p className="text-cyan">VCodez</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> May 2025
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Chennai, India
                </span>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
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
