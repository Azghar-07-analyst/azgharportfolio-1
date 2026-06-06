import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { track } from "@/lib/analytics";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = 80; // sticky navbar offset
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  };

  const go = (id: string) => {
    if (open) {
      // Close the mobile drawer first, then scroll once layout settles
      setOpen(false);
      setTimeout(() => scrollTo(id), 280);
    } else {
      scrollTo(id);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="section-px mx-auto flex max-w-6xl items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2" aria-label="Home">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-extrabold text-primary-foreground glow-cyan"
            style={{ background: "var(--gradient-brand)" }}
          >
            AZ
          </span>
        </button>


        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`nav-link relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-cyan"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div class="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-semibold text-green-400 lg:inline-flex">
            <span className="status-dot" /> Actively Looking
          </span>
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            onClick={() => track("resume_downloaded", { source: "navbar" })}
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan transition-transform hover:scale-105 md:inline-flex"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button className="flex h-11 w-11 items-center justify-center text-foreground md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="section-px overflow-hidden md:hidden"
          >
            <ul className="mt-3 overflow-hidden rounded-2xl glass">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`flex min-h-[44px] w-full items-center px-6 text-left text-sm font-medium transition-colors active:text-cyan ${
                      active === l.id ? "text-cyan" : "text-muted-foreground hover:text-cyan"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="p-3">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-primary-foreground glow-cyan"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
