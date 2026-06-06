import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Check } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";
import { track } from "@/lib/analytics";

type Fields = { name: string; email: string; message: string };
const empty: Fields = { name: "", email: "", message: "" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!values.name.trim()) e.name = true;
    if (!emailRe.test(values.email.trim())) e.email = true;
    if (!values.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitContact({ data: values });
      setStatus("done");
      setValues(empty);
    } catch {
      setStatus("idle");
    }
  };

  const field = (key: keyof Fields, label: string, type = "text", textarea = false) => {
    const common = {
      id: key,
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((v) => ({ ...v, [key]: e.target.value }));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: false }));
      },
      className: `float-field peer w-full rounded-xl border bg-secondary/60 px-4 pb-2 pt-4 text-sm outline-none transition-colors ${
        values[key] ? "filled" : ""
      } ${errors[key] ? "border-destructive field-shake" : "border-border"}`,
    };
    return (
      <div className="relative">
        {textarea ? (
          <textarea {...common} rows={4} className={`${common.className} resize-none`} />
        ) : (
          <input {...common} type={type} />
        )}
        <label htmlFor={key} className="float-label text-sm">
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border glass p-6 text-left sm:p-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground glow-cyan"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <p className="text-lg font-semibold">Thanks! I&apos;ll get back to you soon 🚀</p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm font-semibold text-cyan hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            {field("name", "Your name")}
            {field("email", "Your email", "email")}
            {field("message", "Your message", "text", true)}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-shimmer group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan transition-transform hover:scale-[1.02] disabled:opacity-70"
              style={{ background: "var(--gradient-brand)" }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
