import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const QUOTES = [
  "In data we trust 📊",
  "Turning noise into signal 🎯",
  "Every dataset tells a story 📖",
  "Decisions backed by data 🚀",
];

/**
 * Cross-fading quote rotator. Each line fades in, holds 1.5s, fades out,
 * then the next fades in. Loops forever. Static for reduced-motion users.
 */
export function QuoteCycle({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 2200);
    return () => clearInterval(id);
  }, []);

  if (reduced) {
    return <p className={className}>{QUOTES[0]}</p>;
  }

  return (
    <div className={`relative h-7 ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-x-0 font-display text-lg font-semibold text-gradient"
        >
          {QUOTES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
