import { useEffect, useRef, useState, type ReactNode } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setV(true);
      return;
    }

    let timeoutId: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timeoutId = window.setTimeout(() => setV(true), delay);
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 320ms ease, transform 320ms ease",
      }}
    >
      {children}
    </div>
  );
}

export function useAutoIndex(length: number, interval = 2000, paused = false) {
  const [i, setI] = useState(0);
  const [canAutoPlay, setCanAutoPlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setCanAutoPlay(document.visibilityState === "visible" && !motionQuery.matches);
    };

    update();
    document.addEventListener("visibilitychange", update);
    motionQuery.addEventListener("change", update);

    return () => {
      document.removeEventListener("visibilitychange", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!canAutoPlay || paused || length <= 1) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % length), interval);
    return () => window.clearInterval(id);
  }, [canAutoPlay, length, interval, paused]);

  return [i, setI] as const;
}
