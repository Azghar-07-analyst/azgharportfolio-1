import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const dot = dotRef.current;
    const trailContainer = trailRef.current;
    if (!dot || !trailContainer) return;

    // Pre-create a pool of trailing dots (comet tail).
    const TRAIL = 12;
    const trail: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL; i++) {
      const t = document.createElement("div");
      t.className = "cursor-trail-dot";
      trailContainer.appendChild(t);
      trail.push(t);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    // history of recent positions for the tail
    const pts = Array.from({ length: TRAIL }, () => ({ x, y }));
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      trailContainer.style.opacity = "1";
    };

    const loop = () => {
      x += (mouseX - x) * 0.2;
      y += (mouseY - y) * 0.2;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      // shift history
      pts.unshift({ x, y });
      pts.pop();
      for (let i = 0; i < TRAIL; i++) {
        const p = pts[i];
        const scale = 1 - i / TRAIL;
        trail[i].style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${scale})`;
        trail[i].style.opacity = String(0.5 * scale);
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      trail.forEach((t) => t.remove());
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="custom-cursor-trail" aria-hidden />
      <div ref={dotRef} className="custom-cursor" aria-hidden />
    </>
  );
}
