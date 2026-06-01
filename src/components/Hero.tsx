import { motion } from "motion/react";
import { ArrowRight, Download, TrendingUp, BarChart3, Activity } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { RippleButton, RippleLink } from "./Ripple";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Sparkline() {
  const pts = [12, 22, 16, 30, 26, 40, 34, 52, 46, 60];
  const max = Math.max(...pts);
  const w = 120;
  const h = 40;
  const step = w / (pts.length - 1);
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * h}`)
    .join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(190 100% 50%)" />
          <stop offset="100%" stopColor="hsl(265 83% 58%)" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,212,255,0.35)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#spark-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FloatingDashboard() {
  const bars = [55, 80, 40, 95, 65, 78];
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-6 rounded-[2rem] bg-mesh blur-2xl opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-[300px] overflow-hidden rounded-3xl p-[1.5px] sm:w-[360px]"
        style={{ background: "linear-gradient(135deg, hsl(190 100% 50% / 0.6), hsl(265 83% 58% / 0.6), transparent)" }}
      >
        <div className="rounded-[calc(1.5rem-1.5px)] glass p-5 glow-cyan">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <Activity className="h-4 w-4 text-cyan" /> Live Insights
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-400/15 px-2 py-0.5 text-xs font-semibold text-green-400">
              <TrendingUp className="h-3 w-3" /> +24%
            </span>
          </div>

          <div className="mb-3 h-12 rounded-2xl bg-secondary/40 p-1.5">
            <Sparkline />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-secondary/60 p-3">
              <TrendingUp className="mb-1 h-4 w-4 text-purple" />
              <p className="text-xl font-bold">10K+</p>
              <p className="text-xs text-muted-foreground">Records</p>
            </div>
            <div className="rounded-2xl bg-secondary/60 p-3">
              <BarChart3 className="mb-1 h-4 w-4 text-cyan" />
              <p className="text-xl font-bold">R² .85</p>
              <p className="text-xs text-muted-foreground">Model fit</p>
            </div>
          </div>

          <div className="flex h-28 items-end justify-between gap-2 rounded-2xl bg-secondary/40 p-3">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${h}%`, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-md"
                style={{ background: "var(--gradient-brand)" }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="section-px relative flex min-h-screen items-center overflow-hidden bg-mesh pt-28 pb-16 lg:pt-24 lg:pb-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-spin-slow rounded-full bg-purple/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-cyan/20 blur-3xl" />
        <ParticleField />
      </div>


      <div className="mx-auto grid w-full container-xl items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground/90"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.7)]" />
            </span>
            Open to Work — Let's Connect
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display font-extrabold leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
          >
            Syed Azghar <br />
            Abbas <span className="text-gradient">Rizvi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg font-semibold text-foreground/90 sm:text-2xl"
          >
            Turning Raw Data into Strategic Decisions
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-base text-muted-foreground"
          >
            Data Analyst • Python • SQL • Power BI • Machine Learning
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap"
          >
            <RippleButton
              onClick={() => scrollTo("projects")}
              className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan transition-transform hover:scale-105 sm:w-auto"
              style={{ background: "var(--gradient-brand)" }}
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </RippleButton>
            <RippleLink
              href="/resume.pdf"
              download
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary sm:w-auto"
            >
              <Download className="h-4 w-4" /> Download Resume
            </RippleLink>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex scale-90 justify-center sm:scale-100 lg:justify-end"
        >
          <FloatingDashboard />
        </motion.div>
      </div>
    </section>
  );
}
