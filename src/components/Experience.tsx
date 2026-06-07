import { useState } from "react";
import { GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

type Item = {
  icon: typeof GraduationCap;
  title: string;
  org: string;
  date: string;
  desc: string;
  current?: boolean;
  tags?: string[];
  gained?: string;
};

const items: Item[] = [
  {
    icon: GraduationCap,
    title: "Senior Higher Secondary",
    org: "Montfort Academy, Chennai",
    date: "Completed",
    desc: "Built the academic foundation in mathematics and computing.",
  },
  {
    icon: GraduationCap,
    title: "BCA — Computer Applications",
    org: "The New College, Chennai",
    date: "Completed",
    desc: "Studied programming, databases and applied computer science.",
    tags: ["Data Structures", "Programming Fundamentals"],
  },
  {
    icon: Briefcase,
    title: "Data Analytics Intern",
    org: "VCodez, Chennai",
    date: "May 2025 – July 2025",
    desc: "Cleaned data with SQL & Python, ran EDA and built Power BI dashboards.",
    tags: ["SQL", "Python", "Power BI", "EDA"],
    gained:
      "Real-world data cleaning experience, stakeholder dashboard delivery, SQL query optimization, and translating raw data into business decisions.",
  },
  {
    icon: GraduationCap,
    title: "M.Sc Applied Data Science",
    org: "SRM Institute, Chennai",
    date: "Current",
    desc: "Advancing in machine learning, statistics and data science at scale.",
    current: true,
    tags: ["Python", "Machine Learning", "Statistics", "R"],
  },
];

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="experience" className="section-px section-py relative scroll-mt-24">
      <div className="mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Experience</p>
          <h2 className="heading-2 mt-2 font-display font-bold">My journey</h2>
        </Reveal>

        <div className="relative mt-12">
          <motion.div
            aria-hidden
            className="absolute left-4 top-0 w-[3px] origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{ background: "var(--gradient-brand)", height: "100%" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-8">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              const isOpen = expanded === it.title;
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex md:items-center ${left ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <span
                    className={`absolute left-4 top-5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2 ${
                      it.current ? "timeline-dot-pulse" : ""
                    }`}
                    style={{ background: "var(--gradient-brand)" }}
                  />

                  <div className="w-full pl-10 md:w-1/2 md:pl-0">
                    <div
                      className={`group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-cyan ${
                        left ? "md:mr-8" : "md:ml-8"
                      } ${it.current ? "glow-purple" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
                          style={{ background: "var(--gradient-brand)" }}
                        >
                          <it.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold leading-snug">{it.title}</h3>
                          <p className="text-sm text-cyan">{it.org}</p>
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {it.date}
                        {it.current && (
                          <span className="ml-2 rounded-full bg-purple/15 px-2 py-0.5 text-[10px] text-purple">
                            In progress
                          </span>
                        )}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>

                      {it.tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-cyan/30 bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-cyan"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {it.gained && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpanded(isOpen ? null : it.title)}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-purple transition-colors hover:text-cyan"
                          >
                            What I gained
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="mt-2 rounded-xl bg-secondary/60 p-3 text-sm leading-relaxed text-muted-foreground">
                                  {it.gained}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
