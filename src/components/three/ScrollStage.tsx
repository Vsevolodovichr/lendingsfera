import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { ArchitecturalScene } from "./ArchitecturalScene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollStage() {
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotionPreference();
  const compact = useCompactViewport();

  useGSAP(
    () => {
      if (reducedMotion) return undefined;

      const progress = { value: 0 };
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          onUpdate: () => {
            progressRef.current = progress.value;
          },
        },
      });

      timeline
        .addLabel("hero", 0)
        .to(progress, { value: 1 / 3, duration: 1, ease: "none" })
        .addLabel("product")
        .to(progress, { value: 2 / 3, duration: 1, ease: "none" })
        .addLabel("pricing")
        .to(progress, { value: 1, duration: 1, ease: "none" })
        .addLabel("contact");

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { dependencies: [reducedMotion] },
  );

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
