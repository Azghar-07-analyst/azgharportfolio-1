import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

type Item = {
  icon: typeof GraduationCap;
  title: string;
  org: string;
  date: string;
  desc: string;
  current?: boolean;
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
  },
  {
    icon: Briefcase,
    title: "Data Analytics Intern",
    org: "VCodez, Chennai",
    date: "May 2025 – July 2025",
    desc: "Cleaned data with SQL & Python, ran EDA and built Power BI dashboards.",
  },
  {
    icon: GraduationCap,
    title: "M.Sc Applied Data Science",
    org: "SRM Institute, Chennai",
    date: "Current",
    desc: "Advancing in machine learning, statistics and data science at scale.",
    current: true,
  },
];

export function Experience() {
  return (
    <section id="experience" className="section-px section-py relative scroll-mt-24">
      <div className="mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Experience</p>
          <h2 className="heading-2 mt-2 font-display font-bold">My journey</h2>
        </Reveal>

        <div className="relative mt-12">
          {/* Center / left line */}
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
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex md:items-center ${left ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-4 top-5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2 ${
                      it.current ? "timeline-dot-pulse" : ""
                    }`}
                    style={{ background: "var(--gradient-brand)" }}
                  />

                  {/* Card */}
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
