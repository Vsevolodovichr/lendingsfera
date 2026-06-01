import { useEffect, useRef, useState } from "react";

import { ArchitecturalScene } from "./ArchitecturalScene";

export function ScrollStage() {
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotionPreference();
  const compact = useCompactViewport();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
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
