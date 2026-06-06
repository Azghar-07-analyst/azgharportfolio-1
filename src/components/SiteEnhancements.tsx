import { useEffect } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const NORMAL_TITLE_FALLBACK = "Syed Azghar Abbas Rizvi — Data Analyst";

function fireConfetti() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const end = Date.now() + 1200;
  const colors = ["#00d4ff", "#7c3aed", "#ffffff"];
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors,
  });
}

/**
 * Bundles the small delight features:
 *  - "hire" keyboard easter egg → confetti + toast
 *  - Tab title swap when the visitor switches away
 */
export function SiteEnhancements() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ---- Easter egg: type "hire" anywhere ----
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "hire") {
        buffer = "";
        fireConfetti();
        toast.success("Great decision! 🎉", {
          description: "Email azgharabbas@gmail.com",
          duration: 6000,
        });
      }
    };

    // ---- Tab title animation ----
    const originalTitle = document.title || NORMAL_TITLE_FALLBACK;
    const onVisibility = () => {
      document.title = document.hidden
        ? "👋 Come back! — Azghar's Portfolio"
        : originalTitle;
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = originalTitle;
    };
  }, []);

  return null;
}
