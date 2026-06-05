import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText } from "lucide-react";

export function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-resume", handler);
    return () => window.removeEventListener("open-resume", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-0 backdrop-blur-md sm:p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-none border border-border bg-card sm:h-[90vh] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-primary-foreground glow-cyan"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Download className="h-4 w-4" /> Download
              </a>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-cyan" /> Resume
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close resume"
                className="flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:text-cyan"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe src="/resume.pdf#view=FitH" title="Resume" className="h-full w-full flex-1 bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
