import { Reveal } from "./Reveal";

export function QuoteBanner() {
  return (
    <section className="relative overflow-hidden px-5 py-24">
      <div className="absolute inset-0 -z-10 animate-gradient-x" style={{ background: "var(--gradient-brand)", opacity: 0.14 }} />
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="font-display text-3xl font-bold italic leading-tight sm:text-5xl">
          "Data is the new oil — <span className="text-gradient not-italic">I refine it.</span>"
        </p>
      </Reveal>
    </section>
  );
}
