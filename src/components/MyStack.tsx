import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

type Node = { name: string; desc: string; r: number; speed: number; offset: number };

const nodes: Node[] = [
  { name: "Python", desc: "Primary language for analysis, ML & automation", r: 110, speed: 26, offset: 0 },
  { name: "SQL", desc: "Querying, cleaning & modeling relational data", r: 110, speed: 26, offset: 120 },
  { name: "Power BI", desc: "Interactive executive dashboards & reports", r: 110, speed: 26, offset: 240 },
  { name: "Tableau", desc: "Visual storytelling & exploratory dashboards", r: 165, speed: 34, offset: 40 },
  { name: "Scikit-Learn", desc: "Building & evaluating ML models", r: 165, speed: 34, offset: 130 },
  { name: "Pandas", desc: "Data wrangling & transformation in Python", r: 165, speed: 34, offset: 220 },
  { name: "MySQL", desc: "Relational database design & management", r: 165, speed: 34, offset: 310 },
  { name: "PyTorch", desc: "Deep learning experimentation", r: 220, speed: 44, offset: 70 },
  { name: "Excel", desc: "Rapid analysis, pivots & ad-hoc reporting", r: 220, speed: 44, offset: 190 },
  { name: "R", desc: "Statistical analysis & visualization", r: 220, speed: 44, offset: 300 },
];

function OrbitView({ active, setActive }: { active: string | null; setActive: (n: string | null) => void }) {
  return (
    <div className="relative mx-auto h-[520px] w-[520px] max-w-full">
      {[110, 165, 220].map((r) => (
        <span key={r} className="orbit-ring" style={{ width: r * 2, height: r * 2 }} />
      ))}

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="orbit-core-ring absolute inset-[-10px] rounded-full" style={{ background: "conic-gradient(from 0deg, var(--cyan), var(--purple), var(--cyan))", filter: "blur(2px)", opacity: 0.8 }} />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background text-center font-display font-extrabold text-gradient glow-cyan">
          Azghar
        </div>
      </div>

      {nodes.map((n) => (
        <div
          key={n.name}
          className="orbit-spin"
          style={{ width: n.r * 2, height: n.r * 2, animationDuration: `${n.speed}s`, animationDelay: `${-(n.offset / 360) * n.speed}s` }}
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <button
              onClick={() => setActive(active === n.name ? null : n.name)}
              className="orbit-node group relative flex flex-col items-center"
              style={{ animationDuration: `${n.speed}s`, animationDelay: `${-(n.offset / 360) * n.speed}s` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan/40 bg-secondary text-xs font-bold text-cyan transition-all hover:scale-110 hover:glow-cyan">
                {n.name.slice(0, 2)}
              </span>
              <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted-foreground">{n.name}</span>
              {active === n.name && (
                <span className="absolute bottom-full mb-2 w-40 rounded-xl border border-border glass p-2 text-center text-[11px] leading-snug text-foreground">
                  {n.desc}
                </span>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CloudView() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {nodes.map((n) => (
        <span
          key={n.name}
          className="rounded-full border border-cyan/40 bg-secondary px-4 py-2 text-sm font-semibold text-cyan"
          style={{ "--badge-i": 0 } as CSSProperties}
        >
          {n.name}
        </span>
      ))}
    </div>
  );
}

export function MyStack() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="stack" className="section-px section-py relative overflow-hidden scroll-mt-24">
      <div className="relative mx-auto container-xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">My Stack</p>
          <h2 className="heading-2 mt-2 font-display font-bold">At a glance</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {isMobile ? "The tools I reach for every day." : "Tap a node to see how I use each tool."}
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          {isMobile ? <CloudView /> : <OrbitView active={active} setActive={setActive} />}
        </motion.div>
      </div>
    </section>
  );
}
