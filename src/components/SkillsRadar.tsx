import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const LABELS = [
  "Data Analysis",
  "Machine Learning",
  "Data Visualization",
  "Database Management",
  "Programming",
  "Business Intelligence",
];

const VALUES = [92, 80, 88, 85, 87, 90];

export function SkillsRadar() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    if (reduced) setShow(true);
    return () => io.disconnect();
  }, []);

  const grid = "rgba(124, 58, 237, 0.18)";
  const tick = "rgba(226, 232, 240, 0.65)";

  return (
    <div ref={ref} className="mx-auto mt-8 max-w-md">
      <div className="rounded-2xl glass p-5 sm:p-6">
        <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">
          Proficiency Overview
        </p>
        <div className="mx-auto aspect-square w-full max-w-sm">
          {show && (
            <Radar
              data={{
                labels: LABELS,
                datasets: [
                  {
                    label: "Proficiency",
                    data: VALUES,
                    backgroundColor: "rgba(0, 212, 255, 0.18)",
                    borderColor: "#00d4ff",
                    borderWidth: 2,
                    pointBackgroundColor: "#7c3aed",
                    pointBorderColor: "#00d4ff",
                    pointRadius: 4,
                    pointHoverRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                animation: { duration: 1400, easing: "easeOutCubic" },
                plugins: { legend: { display: false } },
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    angleLines: { color: grid },
                    grid: { color: grid },
                    pointLabels: { color: tick, font: { size: 11, family: "Plus Jakarta Sans" } },
                    ticks: { display: false, stepSize: 25 },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
