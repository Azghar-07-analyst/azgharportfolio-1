import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const stats = [
  { value: 10000, suffix: "+", label: "Records Processed" },
  { value: 3, suffix: "", label: "Projects Delivered" },
  { value: 85, suffix: "%+", label: "Model Accuracy" },
  { value: 2, suffix: "", label: "Certifications Earned" },
];

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
              <div className="flex h-full flex-col items-center justify-center rounded-2xl glass p-8 text-center transition-transform hover:-translate-y-1">
                <p
                  className="font-display font-extrabold tracking-tight text-gradient"
                  style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", textShadow: "0 0 30px oklch(0.78 0.16 215 / 0.35)" }}
                >
                  <CountUp end={s.value} suffix={s.suffix} duration={2200} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
