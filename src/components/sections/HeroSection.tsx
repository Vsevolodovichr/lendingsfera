import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/siteContent";

type HeroMetric = [LucideIcon, string, string];

const heroMetrics: HeroMetric[] = [
  [Building2, "Об'єкти", "база"],
  [ChartNoAxesCombined, "Угоди", "+24%"],
  [ShieldCheck, "Дані", "ролі"],
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center px-5 pb-20 pt-36 md:px-8 md:pt-40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-5 text-sm font-semibold tracking-[0.28em] text-accent uppercase">
            {siteContent.hero.subtitle}
          </p>
          <h1 className="text-balance text-6xl font-semibold leading-[0.88] text-foreground md:text-8xl lg:text-[8.4rem]">
            {siteContent.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-foreground/86 md:text-2xl">
            {siteContent.hero.line}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {siteContent.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="#contact">
                {siteContent.hero.primary}
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#pricing">{siteContent.hero.secondary}</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel relative min-h-[430px] overflow-hidden rounded-[34px] p-5 md:min-h-[560px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(231,181,83,0.24),transparent_34%),linear-gradient(145deg,transparent,rgba(255,255,255,0.08))]" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="grid grid-cols-3 gap-3">
              {siteContent.hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-border bg-surface/74 p-4 backdrop-blur-xl"
                >
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="mt-2 text-xs leading-5 text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-border-strong bg-background/68 p-5 shadow-[var(--shadow-deep)] backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-semibold">Дашборд керівника</span>
                <span className="text-xs text-accent">Активність сьогодні</span>
              </div>
              <div className="grid gap-3">
                {heroMetrics.map(([Icon, label, value]) => (
                  <div
                    key={String(label)}
                    className="flex items-center justify-between rounded-2xl border border-border bg-surface/72 px-4 py-3"
                  >
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon data-icon="inline-start" />
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
