import { motion } from "motion/react";

import { siteContent } from "@/content/siteContent";
import { SectionFrame } from "./SectionFrame";

export function InterfaceSection() {
  return (
    <SectionFrame
      id="interface"
      title="Подивіться, як виглядає CRM"
      lead="Чисті інтерфейси для десктопу й мобільного PWA: керівник, менеджер і рієлтор бачать потрібні дані без зайвого шуму."
    >
      <motion.div
        initial={{ opacity: 0, rotateX: 8, y: 30 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-18%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel overflow-hidden rounded-[34px] p-4 md:p-6"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="text-sm text-muted-foreground">Хатосфера CRM</div>
            <div className="text-xl font-semibold text-foreground">Дашборд керівника</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Дашборд", "Об'єкти", "Клієнти", "Угоди", "Завдання", "Аналітика"].map(
              (tab, index) => (
                <span
                  key={tab}
                  className={
                    index === 0
                      ? "rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"
                      : "rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  }
                >
                  {tab}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[26px] border border-border bg-background/54 p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">Воронка угод</div>
            <div className="grid gap-3">
              {siteContent.interfaceRows.map((row) => (
                <div
                  key={row.join("-")}
                  className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-3 rounded-2xl border border-border bg-surface/70 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-foreground">{row[0]}</span>
                  <span className="hidden text-muted-foreground sm:inline">{row[1]}</span>
                  <span className="text-muted-foreground">{row[2]}</span>
                  <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold text-accent">
                    {row[3]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-border bg-background/54 p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">Динаміка по тижнях</div>
            <div className="flex h-64 items-end gap-3">
              {[42, 64, 58, 78, 68, 91, 84].map((height, index) => (
                <div key={height + index} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-accent/38 to-accent"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
