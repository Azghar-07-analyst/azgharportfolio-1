import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, FileDown, X } from "lucide-react";
import { toast } from "sonner";

type Pos = { x: number; y: number };

const MENU = [
  { key: "email", label: "Email Azghar", icon: Mail, emoji: "📧" },
  { key: "linkedin", label: "View LinkedIn", icon: Linkedin, emoji: "💼" },
  { key: "github", label: "View GitHub", icon: Github, emoji: "🐙" },
  { key: "resume", label: "Download Resume", icon: FileDown, emoji: "📄" },
] as const;

/**
 * Bundles three site-wide enhancements:
 *  - Custom branded right-click context menu
 *  - Network status toast (offline / back online)
 *  - Global keyboard navigation (Escape closes overlays, "/" focuses chat)
 */
export function SiteExtras() {
  const [menu, setMenu] = useState<Pos | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ---- Context menu ----
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      const pad = 12;
      const w = 200;
      const h = 230;
      const x = Math.min(e.clientX, window.innerWidth - w - pad);
      const y = Math.min(e.clientY, window.innerHeight - h - pad);
      setMenu({ x, y });
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("click", onClick);
    window.addEventListener("scroll", () => setMenu(null), { passive: true });
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // ---- Network status ----
  useEffect(() => {
    const onOffline = () =>
      toast("You are offline — but the portfolio still works! 📶", { duration: 4000 });
    const onOnline = () => toast.success("Back online ✅", { duration: 2500 });
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  // ---- Keyboard navigation ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      if (e.key === "Escape") {
        setMenu(null);
        window.dispatchEvent(new Event("close-overlays"));
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        window.dispatchEvent(new Event("focus-chat"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const act = (key: string) => {
    setMenu(null);
    switch (key) {
      case "email":
        window.location.href = "mailto:azgharabbas@gmail.com";
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/azghar-abbas", "_blank", "noopener");
        break;
      case "github":
        window.open("https://github.com/Azghar-07-analyst", "_blank", "noopener");
        break;
      case "resume": {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "";
        a.click();
        break;
      }
    }
  };

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{ top: menu.y, left: menu.x }}
          className="fixed z-[130] w-[200px] overflow-hidden rounded-xl border border-cyan/30 glass p-1.5 shadow-2xl"
        >
          <p className="px-3 py-1.5 text-xs font-bold text-gradient">Azghar's Portfolio</p>
          {MENU.map((m) => (
            <button
              key={m.key}
              onClick={() => act(m.key)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span aria-hidden>{m.emoji}</span>
              <m.icon className="h-4 w-4 text-cyan" /> {m.label}
            </button>
          ))}
          <button
            onClick={() => setMenu(null)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            <span aria-hidden>❌</span>
            <X className="h-4 w-4" /> Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
