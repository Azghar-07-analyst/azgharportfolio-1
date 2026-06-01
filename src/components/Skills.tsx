import { Reveal } from "./Reveal";

const groups = [
  {
    title: "Programming",
    skills: ["Python", "SQL", "R"],
  },
  {
    title: "BI Tools",
    skills: ["Power BI", "Tableau", "Excel"],
  },
  {
    title: "Libraries",
    skills: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch"],
  },
  {
    title: "Machine Learning",
    skills: ["Regression", "EDA", "Feature Engineering", "ETL"],
  },
  {
    title: "Database",
    skills: ["MySQL"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-px section-py relative scroll-mt-24">
      <div className="mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Skills</p>
          <h2 className="heading-2 mt-2 font-display font-bold">Technical Toolkit</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <div className="h-full rounded-2xl glass p-6">
                <h3 className="mb-5 font-display text-lg font-bold text-gradient">{g.title}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="skill-pill rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium"
                    >
                      {s}
                    </span>
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
