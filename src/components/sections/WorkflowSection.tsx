import { motion } from "motion/react";

import { siteContent } from "@/content/siteContent";
import { SectionFrame } from "./SectionFrame";

export function WorkflowSection() {
  return (
    <SectionFrame
      id="workflow"
      title="CRM створена для агентств, рієлторів, керівників відділів та девелоперів."
      lead="Об'єкти, клієнти, угоди, задачі й аналітика зібрані в один спокійний робочий контур."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-18%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-4 md:grid-cols-2"
      >
        {siteContent.workflow.map((item, index) => (
          <div
            key={item}
            className="group relative overflow-hidden rounded-[28px] border border-border bg-surface/72 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-border-strong"
          >
            <div className="absolute -right-8 -top-10 size-32 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/18" />
            <div className="relative flex items-center justify-between gap-6">
              <h3 className="text-2xl font-semibold text-foreground">{item}</h3>
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </SectionFrame>
  );
}
