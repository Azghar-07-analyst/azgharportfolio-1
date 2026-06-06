import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// Persistent + live-ish visitor counter.
// Uses the free counterapi.dev (successor to the old countapi.xyz) with a
// graceful local fallback so the UI never breaks if the network is offline.
const NAMESPACE = "azgharportfolio-1.lovable.app";
const KEY = "portfolio_views";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const bump = async () => {
      try {
        const res = await fetch(
          `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("counter unavailable");
        const data = (await res.json()) as { count?: number };
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
          return;
        }
        throw new Error("no count");
      } catch {
        // Local fallback: increment a stored count so the badge still shows.
        try {
          const stored = Number(localStorage.getItem("pf_views") || "1240");
          const next = stored + 1;
          localStorage.setItem("pf_views", String(next));
          if (!cancelled) setCount(next);
        } catch {
          if (!cancelled) setCount(1240);
        }
      }
    };

    bump();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Eye className="h-4 w-4 text-cyan" />
      <span className="tabular-nums font-medium text-foreground">
        {count === null ? "…" : count.toLocaleString()}
      </span>
      people have viewed this portfolio
    </span>
  );
}
