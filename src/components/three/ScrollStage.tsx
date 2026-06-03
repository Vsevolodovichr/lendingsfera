import { useEffect, useRef, useState } from "react";

import { ArchitecturalScene } from "./ArchitecturalScene";

export function ScrollStage() {
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotionPreference();
  const compact = useCompactViewport();

  useEffect(() => {
    if (reducedMotion) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      ) - window.innerHeight;

      if (maxScroll <= 0) {
        progressRef.current = 0;
        return;
      }

      progressRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="scroll-stage-3d pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <ArchitecturalScene progressRef={progressRef} reducedMotion={false} compact={compact} />
    </div>
  );
}

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useCompactViewport() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
}
