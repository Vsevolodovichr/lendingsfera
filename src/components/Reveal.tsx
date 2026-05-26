import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setV(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 800ms ease, transform 700ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {children}
    </div>
  );
}

export function useAutoIndex(length: number, interval = 2000, paused = false) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval, paused]);
  return [i, setI] as const;
}
