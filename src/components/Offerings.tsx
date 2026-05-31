import { Sparkles, LayoutDashboard, Brain, BookOpenText } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Sparkles,
    title: "Data Cleaning & EDA",
    desc: "Turning messy raw data into analysis-ready truth.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Development",
    desc: "Interactive Power BI & Tableau views that drive action.",
  },
  {
    icon: Brain,
    title: "Predictive Modeling",
    desc: "ML models that forecast outcomes with confidence.",
  },
  {
    icon: BookOpenText,
    title: "Data Storytelling",
    desc: "Translating numbers into decisions stakeholders trust.",
  },
];

export function Offerings() {
  return (
    <section className="section-px section-py relative scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Value</p>
          <h2 className="heading-2 mt-2 font-display font-bold">
            What I Bring to the Table
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="group [perspective:1200px] h-full">
                <div className="relative h-full rounded-2xl glass p-6 transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(6deg)_rotateX(4deg)] group-hover:glow-cyan">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <it.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
