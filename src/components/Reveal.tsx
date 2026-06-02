import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

function makeVariants(direction: Direction): Variants {
  const offset =
    direction === "left" ? { x: -60, y: 0 } : direction === "right" ? { x: 60, y: 0 } : { x: 0, y: 28 };
  return {
    hidden: { opacity: 0, scale: 0.95, ...offset },
    show: { opacity: 1, scale: 1, x: 0, y: 0 },
  };
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={makeVariants(direction)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
