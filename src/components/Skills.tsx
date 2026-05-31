import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const groups = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 88 },
      { name: "R", level: 75 },
    ],
  },
  {
    title: "BI Tools",
    skills: [
      { name: "Power BI", level: 88 },
      { name: "Tableau", level: 80 },
      { name: "Excel", level: 92 },
    ],
  },
  {
    title: "Libraries",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Scikit-Learn", level: 82 },
      { name: "PyTorch", level: 68 },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      { name: "Regression", level: 85 },
      { name: "EDA", level: 90 },
      { name: "Feature Engineering", level: 82 },
      { name: "ETL", level: 80 },
    ],
  },
  {
    title: "Database",
    skills: [{ name: "MySQL", level: 86 }],
  },
];

function Bar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-brand)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Skills</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Technical toolkit</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <div className="h-full rounded-2xl glass p-6">
                <h3 className="mb-5 font-display text-lg font-bold text-gradient">{g.title}</h3>
                <div className="space-y-4">
                  {g.skills.map((s, si) => (
                    <Bar key={s.name} name={s.name} level={s.level} delay={si * 0.12} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
