import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { StatsStrip } from "./StatsStrip";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const desc = dark
    ? "Система, що тримає агентство в порядку"
    : "Мʼяка система для жорсткого контролю процесів";
  const primaryCTA = dark ? "Залишити заявку" : "Отримати консультацію";
  const secondaryCTA = dark ? "Переглянути тарифи" : "Дивитись можливості";

  return (
    <section className="px-5 md:px-8 pt-4 md:pt-6 pb-10">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-8 items-center">
        <div>
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

          <p className="mt-3 text-base md:text-lg text-[var(--muted-foreground)] max-w-lg">
            {desc}
          </p>

          <div className="mt-7"><StatsStrip /></div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm font-semibold transition-all hover:translate-y-[-1px]"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)", boxShadow: "0 10px 30px -10px var(--accent)" }}
            >
              {primaryCTA} <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm font-semibold surface-card hover:translate-y-[-1px] transition-transform"
            >
              {secondaryCTA}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
            Безпечно. Ваші дані під захистом.
          </div>
        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
