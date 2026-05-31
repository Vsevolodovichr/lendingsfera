import { motion } from "motion/react";

import { siteContent } from "@/content/siteContent";
import { SectionFrame } from "./SectionFrame";

export function ServicesSection() {
  return (
    <SectionFrame
      id="services"
      title="Додаткові можливості"
      lead="Розширюйте CRM під конкретне агентство, мережу або бізнес-модель."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {siteContent.services.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ delay: index * 0.05, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-[28px] p-6"
          >
            <h3 className="text-2xl font-semibold text-foreground">{group.title}</h3>
            <div className="mt-5 grid gap-3">
              {group.items.map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/42 px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{name}</span>
                  <span className="text-right font-semibold text-foreground">{price}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
