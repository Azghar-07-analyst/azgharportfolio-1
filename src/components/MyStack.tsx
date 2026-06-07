import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

type Node = { name: string; desc: string; r: number; speed: number; offset: number };

const DESCRIPTIONS: Record<string, string> = {
  Python: "Primary language for data analysis, ML modeling and automation",
  SQL: "Used for querying, cleaning and managing large datasets",
  "Power BI": "Building interactive dashboards and business intelligence reports",
  Tableau: "Creating visual analytics and data storytelling for stakeholders",
  "Scikit-Learn": "Machine learning library used for regression and classification models",
  Pandas: "Core library for data manipulation and exploratory data analysis",
  MySQL: "Relational database management for structured data storage",
  PyTorch: "Deep learning framework for building neural network models",
  Excel: "Data cleaning, pivot tables and quick analysis for business data",
  R: "Statistical analysis and data visualization",
};

const nodes: Node[] = [
  { name: "Python", desc: DESCRIPTIONS.Python, r: 110, speed: 26, offset: 0 },
  { name: "SQL", desc: DESCRIPTIONS.SQL, r: 110, speed: 26, offset: 120 },
  { name: "Power BI", desc: DESCRIPTIONS["Power BI"], r: 110, speed: 26, offset: 240 },
  { name: "Tableau", desc: DESCRIPTIONS.Tableau, r: 165, speed: 34, offset: 40 },
  { name: "Scikit-Learn", desc: DESCRIPTIONS["Scikit-Learn"], r: 165, speed: 34, offset: 130 },
  { name: "Pandas", desc: DESCRIPTIONS.Pandas, r: 165, speed: 34, offset: 220 },
  { name: "MySQL", desc: DESCRIPTIONS.MySQL, r: 165, speed: 34, offset: 310 },
  { name: "PyTorch", desc: DESCRIPTIONS.PyTorch, r: 220, speed: 44, offset: 70 },
  { name: "Excel", desc: DESCRIPTIONS.Excel, r: 220, speed: 44, offset: 190 },
  { name: "R", desc: DESCRIPTIONS.R, r: 220, speed: 44, offset: 300 },
];

const mobileInner: Node[] = [
  { name: "Python", desc: DESCRIPTIONS.Python, r: 75, speed: 22, offset: 0 },
  { name: "SQL", desc: DESCRIPTIONS.SQL, r: 75, speed: 22, offset: 90 },
  { name: "Power BI", desc: DESCRIPTIONS["Power BI"], r: 75, speed: 22, offset: 180 },
  { name: "Pandas", desc: DESCRIPTIONS.Pandas, r: 75, speed: 22, offset: 270 },
];
const mobileOuter: Node[] = [
  { name: "Tableau", desc: DESCRIPTIONS.Tableau, r: 140, speed: 38, offset: 0 },
  { name: "Scikit-Learn", desc: DESCRIPTIONS["Scikit-Learn"], r: 140, speed: 38, offset: 60 },
  { name: "PyTorch", desc: DESCRIPTIONS.PyTorch, r: 140, speed: 38, offset: 120 },
  { name: "MySQL", desc: DESCRIPTIONS.MySQL, r: 140, speed: 38, offset: 180 },
  { name: "Excel", desc: DESCRIPTIONS.Excel, r: 140, speed: 38, offset: 240 },
  { name: "R", desc: DESCRIPTIONS.R, r: 140, speed: 38, offset: 300 },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type Tip = { name: string; desc: string; x: number; y: number; placement: "top" | "bottom" };

const TIP_WIDTH = 220;

/** Floating tooltip rendered at a fixed viewport position with edge-aware flipping. */
function Tooltip({ tip }: { tip: Tip }) {
  const half = TIP_WIDTH / 2;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const clampedX = Math.min(Math.max(tip.x, half + 12), vw - half - 12);
  return (
    <div
      className="pointer-events-none fixed z-[60] -translate-x-1/2 rounded-xl border border-cyan/60 bg-background/85 px-3 py-2 text-center text-xs font-medium leading-snug text-foreground shadow-[0_0_18px_oklch(0.78_0.16_215/0.35)] backdrop-blur-md"
      style={{
        left: clampedX,
        top: tip.placement === "bottom" ? tip.y + 14 : undefined,
        bottom: tip.placement === "top" ? window.innerHeight - tip.y + 14 : undefined,
        width: TIP_WIDTH,
        transform: "translateX(-50%)",
      }}
      role="tooltip"
    >
      <span className="block font-display text-[13px] font-bold text-gradient">{tip.name}</span>
      <span className="mt-0.5 block text-[11px] text-muted-foreground">{tip.desc}</span>
    </div>
  );
}

function useTooltip() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setTip(null);
    setPaused(false);
  }, []);

  const show = useCallback((el: HTMLElement, name: string, desc: string, autoHide: boolean) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const placement: "top" | "bottom" = rect.top < 140 ? "bottom" : "top";
    const y = placement === "bottom" ? rect.bottom : rect.top;
    setTip({ name, desc, x: cx, y, placement });
    setPaused(true);
    if (timer.current) clearTimeout(timer.current);
    if (autoHide) {
      timer.current = setTimeout(() => {
        setTip(null);
        setPaused(false);
      }, 2500);
    }
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { tip, paused, show, clear };
}

function OrbitView({
  list,
  rings,
  diameter,
  coreSize,
  nodeSize,
  coreLabel,
  isMobile,
}: {
  list: Node[];
  rings: number[];
  diameter: number;
  coreSize: number;
  nodeSize: number;
  coreLabel: string;
  isMobile: boolean;
}) {
  const { tip, paused, show, clear } = useTooltip();
  const playState = paused ? "paused" : "running";

  const onActivate = (e: React.MouseEvent<HTMLButtonElement>, n: Node) => {
    show(e.currentTarget, n.name, n.desc, true);
  };

  return (
    <>
      <div className="relative mx-auto" style={{ width: diameter, height: diameter, maxWidth: "90vw" }}>
        {rings.map((r) => (
          <span key={r} className="orbit-ring" style={{ width: r * 2, height: r * 2 }} />
        ))}

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="orbit-core-ring absolute inset-[-8px] rounded-full"
            style={{ background: "conic-gradient(from 0deg, var(--cyan), var(--purple), var(--cyan))", filter: "blur(2px)", opacity: 0.8, animationPlayState: playState }}
          />
          <div
            className="relative flex items-center justify-center rounded-full bg-background text-center font-display font-extrabold text-gradient glow-cyan"
            style={{ width: coreSize, height: coreSize }}
          >
            {coreLabel}
          </div>
        </div>

        {list.map((n) => (
          <div
            key={n.name}
            className="orbit-spin"
            style={{ width: n.r * 2, height: n.r * 2, animationDuration: `${n.speed}s`, animationDelay: `${-(n.offset / 360) * n.speed}s`, animationPlayState: playState }}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <button
                onClick={(e) => onActivate(e, n)}
                onMouseEnter={isMobile ? undefined : (e) => show(e.currentTarget, n.name, n.desc, false)}
                onMouseLeave={isMobile ? undefined : clear}
                className="orbit-node relative flex flex-col items-center"
                style={{ animationDuration: `${n.speed}s`, animationDelay: `${-(n.offset / 360) * n.speed}s`, animationPlayState: playState }}
              >
                <span
                  className="flex items-center justify-center rounded-full border border-cyan/40 bg-secondary font-bold text-cyan transition-all hover:scale-110 hover:glow-cyan"
                  style={{ width: nodeSize, height: nodeSize, fontSize: nodeSize < 40 ? 10 : 12 }}
                >
                  {n.name.slice(0, 2)}
                </span>
                <span className="mt-1 whitespace-nowrap font-medium text-muted-foreground" style={{ fontSize: nodeSize < 40 ? 8 : 10 }}>
                  {n.name}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {tip && <Tooltip tip={tip} />}
    </>
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
  const reducedMotion = useReducedMotion();

  const renderView = () => {
    if (reducedMotion) return <CloudView />;
    if (isMobile)
      return (
        <OrbitView
          list={[...mobileInner, ...mobileOuter]}
          rings={[75, 140]}
          diameter={320}
          coreSize={64}
          nodeSize={36}
          coreLabel="AZ"
          isMobile
        />
      );
    return (
      <OrbitView
        list={nodes}
        rings={[110, 165, 220]}
        diameter={520}
        coreSize={96}
        nodeSize={48}
        coreLabel="Azghar"
        isMobile={false}
      />
    );
  };

  return (
    <section id="stack" className="section-px section-py relative overflow-hidden scroll-mt-24">
      <div className="relative mx-auto container-xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">My Stack</p>
          <h2 className="heading-2 mt-2 font-display font-bold">At a glance</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {reducedMotion ? "The tools I reach for every day." : "Tap or hover a node to see how I use each tool."}
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          {renderView()}
        </motion.div>
      </div>
    </section>
  );
}
