import { motion, type Variants } from "motion/react";
import {
  BarChart3,
  Code2,
  Database,
  Sigma,
  AreaChart,
  Table,
  Table2,
  Hash,
  Brain,
  Flame,
  TrendingUp,
  Search,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Variant = "flip" | "bi" | "ripple" | "fill" | "wiggle";

const skillIcons: Record<string, LucideIcon> = {
  Python: Code2,
  SQL: Database,
  R: Sigma,
  "Power BI": BarChart3,
  Tableau: AreaChart,
  Excel: Table,
  Pandas: Table2,
  NumPy: Hash,
  "Scikit-Learn": Brain,
  PyTorch: Flame,
  Regression: TrendingUp,
  EDA: Search,
  "Feature Engineering": SlidersHorizontal,
  ETL: Workflow,
  MySQL: Database,
};

const groups: { title: string; skills: string[]; variant: Variant }[] = [
  { title: "Programming", skills: ["Python", "SQL", "R"], variant: "flip" },
  { title: "BI Tools", skills: ["Power BI", "Tableau", "Excel"], variant: "bi" },
  { title: "Libraries", skills: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch"], variant: "ripple" },
  { title: "Machine Learning", skills: ["Regression", "EDA", "Feature Engineering", "ETL"], variant: "fill" },
  { title: "Database", skills: ["MySQL"], variant: "wiggle" },
];

const parentVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, when: "beforeChildren" },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0.55, duration: 0.7 },
  },
};

export function Skills() {
  return (
    <section id="skills" className="skills-aurora section-px section-py relative scroll-mt-24">
      <div className="mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Skills</p>
          <h2 className="heading-2 mt-2 inline-block font-display font-bold">
            Technical Toolkit
            <motion.span
              className="skills-underline mt-2 block h-[3px] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={parentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {groups.map((g) => (
            <motion.div key={g.title} variants={categoryVariants} className="h-full rounded-2xl glass p-6">
              <motion.h3 variants={headingVariants} className="font-display text-lg font-bold text-gradient">
                {g.title}
              </motion.h3>
              <motion.span
                variants={lineVariants}
                className="mb-5 mt-2 block h-px w-full origin-left rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              <div className="flex flex-wrap gap-2.5">
                {g.skills.map((s, si) => (
                  <motion.span key={s} variants={badgeVariants} className="inline-block">
                    <span className="skill-wave inline-block rounded-full" style={{ animationDelay: `${si * 0.25}s` }}>
                      <span className={`skill-pill skill-${g.variant} relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium`}>
                        <span className="skill-fill-bg" aria-hidden />
                        <span className="skill-label relative z-10">{s}</span>
                        {g.variant === "bi" && (
                          <BarChart3 className="skill-bi-icon relative z-10 h-4 w-4 text-cyan" aria-hidden />
                        )}
                      </span>
                    </span>
                  </motion.span>
                ))}

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
