import { motion } from "motion/react";
import { ArrowRight, Download, TrendingUp, BarChart3, Activity } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { RippleButton, RippleLink } from "./Ripple";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function FloatingDashboard() {
  const bars = [55, 80, 40, 95, 65, 78];
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-6 rounded-[2rem] bg-mesh blur-2xl opacity-70" />
      <div className="relative w-[300px] rounded-3xl glass p-5 glow-cyan sm:w-[360px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-cyan" /> Live Insights
          </div>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-cyan">+24%</span>
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
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              className="w-full rounded-md"
              style={{ background: "var(--gradient-brand)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-mesh pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-spin-slow rounded-full bg-purple/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-cyan/20 blur-3xl" />
        <ParticleField />
      </div>


      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-cyan glow-cyan" /> Available for opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
          >
            Syed Azghar <br />
            Abbas <span className="text-gradient">Rizvi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl font-semibold text-foreground/90 sm:text-2xl"
          >
            Turning Raw Data into Strategic Decisions
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-sm text-muted-foreground sm:text-base"
          >
            Data Analyst • Python • SQL • Power BI • Machine Learning
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <RippleButton
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan transition-transform hover:scale-105"
              style={{ background: "var(--gradient-brand)" }}
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </RippleButton>
            <RippleLink
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </RippleLink>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex justify-center lg:justify-end"
        >
          <FloatingDashboard />
        </motion.div>
      </div>
    </section>
  );
}
