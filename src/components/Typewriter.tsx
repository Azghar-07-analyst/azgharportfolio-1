import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = prefersReduced();
    if (reduced.current) {
      setText(words[0]);
      setPhase("pausing");
    }
  }, [words]);

  useEffect(() => {
    if (reduced.current) return;
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1000);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 600);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 45);
      } else {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words]);

  const cursorPaused = phase === "pausing" || reduced.current;

  return (
    <span className={className}>
      <span className="text-cyan tw-glow">{text}</span>
      <span className={`tw-cursor ${cursorPaused ? "tw-cursor-blink" : ""}`}>|</span>
    </span>
  );
}

export function TypingOnce({
  text,
  speed = 45,
  className,
  startDelay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (prefersReduced()) {
      setShown(text);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return <span className={className}>{shown || "\u00A0"}</span>;
}
