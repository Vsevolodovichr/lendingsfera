import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionFrameProps = {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ id, title, lead, children, className }: SectionFrameProps) {
  return (
    <section id={id} className={cn("relative min-h-[100dvh] px-5 py-28 md:px-8", className)}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-accent uppercase">{id}</p>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] text-foreground md:text-6xl">
            {title}
          </h2>
          {lead ? (
            <p className="mt-6 max-w-[58ch] text-base leading-8 text-muted-foreground md:text-lg">
              {lead}
            </p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
