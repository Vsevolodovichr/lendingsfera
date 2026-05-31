import {
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  ChartNoAxesCombined,
  Home,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

import { siteContent } from "@/content/siteContent";
import { SectionFrame } from "./SectionFrame";

const icons = [Home, UsersRound, BriefcaseBusiness, CalendarCheck, ChartNoAxesCombined, Bot];

export function CapabilitiesSection() {
  return (
    <SectionFrame
      id="features"
      title="Все що потрібно агентству"
      lead="Функціонал зібраний навколо реальних процесів українського ринку нерухомості."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {siteContent.features.map((feature, index) => {
          const Icon = icons[index] ?? Home;

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ delay: index * 0.05, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-[28px] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon data-icon="inline-start" />
                </span>
                <span className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                  {feature.label}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {feature.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
