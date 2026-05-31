import { useState, type ReactNode, type MouseEvent } from "react";

type Ripple = { id: number; x: number; y: number; size: number };

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const add = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };
  const layer = (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute animate-ripple rounded-full bg-foreground/30"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </span>
  );
  return { add, layer };
}

export function RippleButton({
  children,
  className,
  onClick,
  style,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const { add, layer } = useRipples();
  return (
    <button
      className={`relative overflow-hidden ${className ?? ""}`}
      style={style}
      onClick={(e) => {
        add(e);
        onClick?.();
      }}
    >
      {children}
      {layer}
    </button>
  );
}

export function RippleLink({
  children,
  className,
  href,
  download,
  target,
  rel,
  style,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}) {
  const { add, layer } = useRipples();
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={style}
      onClick={add}
    >
      {children}
      {layer}
    </a>
  );
}
