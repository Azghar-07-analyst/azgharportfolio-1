import { Reveal } from "./Reveal";

export function QuoteBanner() {
  return (
    <section className="section-px section-py relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradient-x" style={{ background: "var(--gradient-brand)", opacity: 0.14 }} />
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="font-display font-bold italic leading-tight" style={{ fontSize: "clamp(1.5rem, 6vw, 3rem)" }}>
          "Data is the new oil — <span className="text-gradient not-italic">I refine it.</span>"
        </p>
      </Reveal>
    </section>
  );
}
