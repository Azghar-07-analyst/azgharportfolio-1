import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link2, Linkedin, Twitter, MessageCircle, X, Check } from "lucide-react";
import { toast } from "sonner";

const URL = "https://azgharportfolio-1.lovable.app";
const TEXT = "Check out Syed Azghar Abbas Rizvi's data analyst portfolio!";

const options = [
  {
    key: "copy",
    label: "Copy Link",
    icon: Link2,
    color: "#00d4ff",
  },
  {
    key: "linkedin",
    label: "Share on LinkedIn",
    icon: Linkedin,
    color: "#0a66c2",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`,
  },
  {
    key: "twitter",
    label: "Share on X",
    icon: Twitter,
    color: "#1d9bf0",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(TEXT)}&url=${encodeURIComponent(URL)}`,
  },
  {
    key: "whatsapp",
    label: "Share via WhatsApp",
    icon: MessageCircle,
    color: "#25d366",
    href: `https://wa.me/?text=${encodeURIComponent(`${TEXT} ${URL}`)}`,
  },
] as const;

export function ShareModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-share", onOpen);
    return () => window.removeEventListener("open-share", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handle = (opt: (typeof options)[number]) => {
    if (opt.key === "copy") {
      navigator.clipboard?.writeText(URL).then(() => {
        setCopied(true);
        toast.success("Link copied! 📋");
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }
    window.open(opt.href, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-border glass p-6"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close share"
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-lg font-bold">Share This Portfolio</h3>
            <p className="mt-1 text-sm text-muted-foreground">Spread the word ✨</p>
            <div className="mt-5 space-y-2.5">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isCopied = opt.key === "copy" && copied;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handle(opt)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-left text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-cyan"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                      style={{ background: opt.color }}
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    {isCopied ? "Copied!" : opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
