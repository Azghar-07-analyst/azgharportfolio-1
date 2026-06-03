export function ProjectsBackground() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="projects-mesh">
        <span className="projects-blob projects-blob-1" />
        <span className="projects-blob projects-blob-2" />
        <span className="projects-blob projects-blob-3" />
      </div>
      <div className="absolute inset-0">
        {dots.map((_, i) => (
          <span
            key={i}
            className="projects-star"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 1.2}s`,
              animationDuration: `${8 + (i % 5) * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
