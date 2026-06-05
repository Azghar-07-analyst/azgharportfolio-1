import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { BarChart3, LineChart, PieChart, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const articles = [
  {
    title: "What I Learned Analyzing 10,000 Global Layoff Records",
    teaser: "Turning messy, inconsistent layoff data into a clean SQL pipeline and real insights.",
    icon: BarChart3,
  },
  {
    title: "How Feature Engineering Boosted My Model Accuracy by 15%",
    teaser: "The feature engineering decisions that pushed my Boston Housing model past R² 0.85.",
    icon: LineChart,
  },
  {
    title: "Building Dashboards That Actually Drive Decisions",
    teaser: "Designing Power BI & Tableau dashboards stakeholders genuinely act on.",
    icon: PieChart,
  },
];

const LINK = "https://linkedin.com/in/azghar-abbas";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
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

export function Insights() {
  return (
    <section id="insights" className="section-px section-py relative overflow-hidden scroll-mt-24">
      <div className="relative mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Insights</p>
          <h2 className="heading-2 mt-2 font-display font-bold">Articles &amp; write-ups</h2>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {articles.map((a) => (
            <motion.div
              key={a.title}
              variants={cardVariants}
              className="insight-card flex h-full flex-col overflow-hidden rounded-2xl border border-border glass"
              style={{ "--badge-i": 0 } as CSSProperties}
            >
              <div className="insight-thumb relative flex h-32 items-center justify-center">
                <a.icon className="h-12 w-12 text-foreground/80" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-bold leading-snug">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.teaser}</p>
                <a
                  href={LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-cyan"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
