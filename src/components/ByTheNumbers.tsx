import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const stats = [
  { value: 10000, display: 10000, suffix: "+", label: "Records Processed" },
  { value: 3, display: 3, suffix: "", label: "Projects Delivered" },
  { value: 85, display: 85, suffix: "%+", label: "Model Accuracy" },
  { value: 2, display: 2, suffix: "", label: "Certifications Earned" },
];

const R = 52;
const CIRC = 2 * Math.PI * R;

function StatRing({ value, suffix, label, watermark }: { value: number; suffix: string; label: string; watermark: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setCount(value);
        setProgress(1);
        return;
      }
      const duration = 2200;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * value));
        setProgress(eased);
        if (p < 1) requestAnimationFrame(tick);
        else setBurst(true);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (run(), io.disconnect())),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="relative flex h-full flex-col items-center justify-center rounded-2xl glass p-8 text-center transition-transform hover:-translate-y-1">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-2 select-none font-display font-extrabold leading-none text-foreground/[0.04]"
        style={{ fontSize: "6rem", filter: "blur(2px)" }}
      >
        {watermark}
      </span>

      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="var(--secondary)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
          />
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-extrabold tracking-tight text-gradient" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
            {count.toLocaleString()}
            {suffix}
          </span>
        </div>

        {burst &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
              style={{ background: i % 2 ? "#7c3aed" : "#00d4ff" }}
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: Math.cos((i / 8) * Math.PI * 2) * 56,
                y: Math.sin((i / 8) * Math.PI * 2) * 56,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
      </div>

      <p className="mt-3 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export function ByTheNumbers() {
  return (
    <section className="section-px section-py relative overflow-hidden">
      <div className="mx-auto container-xl">
        <Reveal className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">By The Numbers</p>
          <h2 className="heading-2 mt-2 font-display font-bold">Impact at a glance</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <StatRing value={s.value} suffix={s.suffix} label={s.label} watermark={`${s.display}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
