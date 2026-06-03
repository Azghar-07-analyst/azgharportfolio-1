export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora">
        <span className="aurora-band aurora-band-1" />
        <span className="aurora-band aurora-band-2" />
        <span className="aurora-band aurora-band-3" />
      </div>
      <div className="perspective-grid" />
    </div>
  );
}
