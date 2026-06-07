import { ShieldCheck, Award, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const certs = [
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Issued 2024",
    href: "https://www.netacad.com/courses/data-analytics-essentials",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "Issued 2024",
    href: "https://www.netacad.com/courses/data-science",
  },
];

function DrawCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <motion.path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="section-px section-py relative scroll-mt-24">
      <div className="mx-auto container-xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Certifications</p>
          <h2 className="heading-2 mt-2 font-display font-bold">Credentials</h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2" style={{ perspective: "1200px" }}>
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, rotateY: 180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-2xl glass p-8 transition-all duration-300 hover:-translate-y-1 hover:glow-cyan sm:p-10">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mesh blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />

                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-green-400/15 px-2.5 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-400/30">
                  <DrawCheck /> Verified
                </span>

                <div className="relative flex items-start gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                    <div
                      className="absolute inset-0 animate-spin-slow rounded-full opacity-90"
                      style={{ background: "conic-gradient(from 0deg, #f5d782, #00d4ff, #7c3aed, #f5d782)" }}
                    />
                    <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-background">
                      <ShieldCheck className="h-7 w-7 text-cyan" />
                    </div>
                  </div>

                  <div className="pr-16">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-secondary/70 px-2.5 py-1">
                      <Award className="h-4 w-4 text-purple" />
                      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                        {c.issuer}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {c.date}
                    </p>
                  </div>
                </div>

                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-6 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-cyan/40 bg-secondary px-4 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/10"
                >
                  <ExternalLink className="h-4 w-4" /> View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
