import type { CSSProperties } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ProjectsBackground } from "./ProjectsBackground";

type Part = { icon: string; label: string; text: string };

const projects: { title: string; parts: Part[]; stack: string[] }[] = [
  {
    title: "Global Layoffs Data Analysis",
    parts: [
      { icon: "❌", label: "Problem", text: "Raw global layoff data was unstructured, inconsistent, and unusable for analysis." },
      { icon: "⚙️", label: "Solution", text: "Built an end-to-end SQL pipeline to clean and standardize 10,000+ records." },
      { icon: "📈", label: "Impact", text: "Revealed 3 key industries and regions responsible for the majority of global layoffs." },
    ],
    stack: ["SQL", "Python"],
  },
  {
    title: "Boston Housing Price Prediction",
    parts: [
      { icon: "❌", label: "Problem", text: "Housing price patterns were complex and non-linear, making manual estimation unreliable." },
      { icon: "⚙️", label: "Solution", text: "Built regression models with advanced feature engineering techniques in Python." },
      { icon: "📈", label: "Impact", text: "Achieved R² above 0.85 with a 15% boost in prediction accuracy." },
    ],
    stack: ["Python", "Scikit-Learn"],
  },
  {
    title: "InsightSphere Retail Sales Analytics",
    parts: [
      { icon: "❌", label: "Problem", text: "Retail sales data was scattered with no visibility into trends or performance." },
      { icon: "⚙️", label: "Solution", text: "Processed 10,000+ records using SQL and Excel with interactive dashboards." },
      { icon: "📈", label: "Impact", text: "Identified key seasonality patterns and top performing products for stakeholders." },
    ],
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
    transition: { type: "spring", bounce: 0.35, duration: 0.6, staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const partVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
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

                  <div className="mt-4 flex-1 space-y-3">
                    {p.parts.map((part) => (
                      <motion.div key={part.label} variants={partVariants} className="flex gap-2.5">
                        <span className="select-none text-base leading-6" aria-hidden>
                          {part.icon}
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">{part.label}: </span>
                          {part.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s, si) => (
                      <span
                        key={s}
                        className="tech-badge rounded-full bg-secondary px-3 py-1 text-xs font-medium text-cyan"
                        style={{ "--badge-i": si } as CSSProperties}
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
