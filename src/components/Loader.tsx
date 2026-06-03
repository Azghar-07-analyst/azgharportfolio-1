import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--secondary)" strokeWidth="3" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#loader-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="276"
                className="loader-ring"
              />
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 215)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.24 295)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display text-3xl font-extrabold text-gradient">AZ</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
