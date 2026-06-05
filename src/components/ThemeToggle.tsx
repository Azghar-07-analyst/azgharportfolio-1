import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
  window.setTimeout(() => root.classList.remove("theme-anim"), 500);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setTheme(saved);
    if (saved === "light") document.documentElement.classList.add("light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full glass transition-colors hover:text-cyan ${className ?? ""}`}
    >
      <Sun
        className="theme-toggle-icon absolute h-5 w-5"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0) scale(1)",
        }}
      />
      <Moon
        className="theme-toggle-icon absolute h-5 w-5"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0.5)",
        }}
      />
    </button>
  );
}
