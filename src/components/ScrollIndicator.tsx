import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Scroll to explore
          </span>
          <span className="scroll-mouse">
            <ChevronDown className="h-5 w-5 text-cyan" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
