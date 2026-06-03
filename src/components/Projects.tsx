import { Github, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ProjectsBackground } from "./ProjectsBackground";

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

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(12px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.35, duration: 0.6 },
  },
};

export function Projects() {
  return (
    <section id="projects" className="section-px section-py relative overflow-hidden scroll-mt-24">
      <ProjectsBackground />
      <div className="relative mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Projects</p>
          <h2 className="heading-2 mt-2 font-display font-bold">Selected work</h2>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={cardVariants} className="project-materialize">
              <TiltCard className="project-card card-glow-border group flex h-full flex-col rounded-2xl glass p-6 [transform-style:preserve-3d]">
                <span className="project-shine" aria-hidden />
                <div className="project-inner relative flex h-full flex-col">
                  <div className="mb-4 h-1 w-12 rounded-full" style={{ background: "var(--gradient-brand)" }} />
                  <h3 className="font-display text-xl font-bold leading-snug">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.impact}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s, si) => (
                      <span
                        key={s}
                        className="tech-badge rounded-full bg-secondary px-3 py-1 text-xs font-medium text-cyan"
                        style={{ ["--badge-i" as string]: si } as Record<string, number>}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://github.com/Azghar-07-analyst"
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn group/btn relative mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-secondary px-4 text-sm font-semibold text-foreground transition-colors hover:text-primary-foreground"
                  >
                    <span className="project-btn-fill" aria-hidden />
                    <Github className="relative z-10 h-4 w-4" /> <span className="relative z-10">View Project</span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
