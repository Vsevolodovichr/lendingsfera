import { useEffect, useRef, useState } from "react";

import { ArchitecturalScene } from "./ArchitecturalScene";

const chapterIds = ["hero", "product", "pricing", "contact"];

export function ScrollStage() {
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotionPreference();
  const compact = useCompactViewport();

  useEffect(() => {
    if (reducedMotion) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const centers = chapterIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element))
        .map((element) => element.offsetTop + element.offsetHeight * 0.5);

      if (centers.length < 2) {
        progressRef.current = 0;
        return;
      }

      const viewportCenter = window.scrollY + window.innerHeight * 0.5;
      const lastIndex = centers.length - 1;

      if (viewportCenter <= centers[0]) {
        progressRef.current = 0;
        return;
      }

      if (viewportCenter >= centers[lastIndex]) {
        progressRef.current = 1;
        return;
      }

      const index = centers.findIndex((center, currentIndex) => {
        const next = centers[currentIndex + 1];
        return typeof next === "number" && viewportCenter >= center && viewportCenter <= next;
      });
      const from = centers[index];
      const to = centers[index + 1];

      progressRef.current = (index + (viewportCenter - from) / (to - from)) / lastIndex;
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
