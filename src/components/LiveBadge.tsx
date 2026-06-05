import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

function istTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export function LiveBadge() {
  const [time, setTime] = useState(istTime);

  useEffect(() => {
    const id = setInterval(() => setTime(istTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur sm:text-xs">
      <span className="inline-flex items-center gap-1.5 tabular-nums text-foreground/90">
        <Clock className="h-3 w-3 text-cyan" /> {time} IST
      </span>
      <span className="opacity-40">•</span>
      <span className="inline-flex items-center gap-1">
        <MapPin className="h-3 w-3 text-purple" /> Chennai, India
      </span>
      <span className="opacity-40">•</span>
      <span className="text-cyan">Open to Remote</span>
    </span>
  );
}
