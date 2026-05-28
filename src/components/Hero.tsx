import { ArrowRight } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useTheme } from "./ThemeProvider";
import { StatsStrip } from "./StatsStrip";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const { theme } = useTheme();
  const frameRef = useRef<number | null>(null);
  const dark = theme === "dark";

  const desc = dark
    ? "Система, що тримає агентство в порядку"
    : "Мʼяка система для жорсткого контролю процесів";
  const primaryCTA = dark ? "Залишити заявку" : "Отримати консультацію";
  const secondaryCTA = dark ? "Переглянути тарифи" : "Дивитись можливості";

  function shouldSkipParallax(element: HTMLElement) {
    if (typeof window === "undefined") return true;
    return (
      element.clientWidth < 1024 ||
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
    );
  }

  function resetParallax(element: HTMLElement) {
    element.style.setProperty("--mx", "0px");
    element.style.setProperty("--my", "0px");
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const section = event.currentTarget;
    if (shouldSkipParallax(section)) {
      resetParallax(section);
      return;
    }

    const clientX = event.clientX;
    const clientY = event.clientY;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      section.style.setProperty("--mx", `${(x * 12).toFixed(2)}px`);
      section.style.setProperty("--my", `${(y * 9).toFixed(2)}px`);
      section.style.setProperty("--rx", "0deg");
      section.style.setProperty("--ry", "0deg");
      frameRef.current = null;
    });
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    resetParallax(event.currentTarget);
  }

  return (
    <section className="hero-section px-5 md:px-8 pt-4 md:pt-6 pb-10" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-8 items-center">
        <div className="hero-copy">
          <span
            className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full font-medium"
            style={{
              border: "1px solid var(--border-strong)",
              color: "var(--accent)",
              background: "color-mix(in oklab, var(--accent) 8%, transparent)",
            }}
          >
            Для агентств нерухомості
          </span>

          <h1 className="mt-5 text-[40px] sm:text-5xl lg:text-[64px] font-bold leading-[1.02] tracking-[-0.02em]">
            Хатосфера <span className="text-gradient-accent">CRM</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl font-medium" style={{ color: "var(--accent)" }}>
            CRM для ринку нерухомості України
          </p>

          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-lg">
            {desc}
          </p>

          <div className="mt-7"><StatsStrip /></div>

          <div className="mt-6 flex flex-col sm:flex-row gap-5">
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-10 rounded-lg text-sm font-semibold transition-transform hover:-translate-y-px"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)", boxShadow: "0 10px 30px -10px var(--accent)" }}
            >
              {primaryCTA} <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold surface-card hover:-translate-y-px transition-transform"
            >
              {secondaryCTA}
            </button>
          </div>


        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}


