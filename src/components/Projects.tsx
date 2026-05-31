import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const projects = [
  {
    title: "Global Layoffs Data Analysis",
    impact:
      "Built an end-to-end SQL workflow over 10K+ records; ran EDA on industry & geography trends to surface layoff patterns.",
    stack: ["SQL", "Python"],
  },
  {
    title: "Boston Housing Price Prediction",
    impact:
      "Achieved R² > 0.85 with a 15% accuracy boost via feature engineering on housing market data.",
    stack: ["Python", "Scikit-Learn"],
  },
  {
    title: "InsightSphere Retail Sales Analytics",
    impact:
      "Analyzed 10K+ records for seasonality trends and shipped interactive dashboards for stakeholders.",
    stack: ["Excel", "SQL", "Tableau", "Power BI"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Projects</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Selected work</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <TiltCard className="group flex h-full flex-col rounded-2xl glass p-6 transition-shadow duration-300 hover:glow-purple [transform-style:preserve-3d]">
                <div className="mb-4 h-1 w-12 rounded-full" style={{ background: "var(--gradient-brand)" }} />
                <h3 className="font-display text-xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.impact}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-cyan"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-cyan"
                >
                  <Github className="h-4 w-4" /> View Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
