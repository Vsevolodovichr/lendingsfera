import { Check } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/siteContent";

export function PricingSection() {
  return (
    <section id="pricing" className="relative min-h-[100dvh] px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-accent uppercase">
            pricing
          </p>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] text-foreground md:text-6xl">
            Оберіть свій план
          </h2>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            Щомісячна підписка або ліцензія — гнучкі умови для будь-якого масштабу бізнесу.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {siteContent.pricing.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ delay: index * 0.05, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className={
                plan.featured
                  ? "relative rounded-[30px] border border-border-strong bg-accent p-[1px] shadow-[0_28px_80px_-46px_var(--accent)]"
                  : "rounded-[30px] border border-border bg-surface/76 p-[1px] backdrop-blur-xl"
              }
            >
              <div className="flex h-full flex-col rounded-[29px] bg-surface/92 p-5">
                {plan.featured ? (
                  <div className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Найпопулярніший
                  </div>
                ) : null}
                <div className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  {plan.tag}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{plan.desc}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-semibold text-foreground">{plan.monthly}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{plan.monthlyUnit}</span>
                </div>
                <div className="mt-3 text-xs leading-5 text-muted-foreground">
                  1 рік: {plan.license1y}
                  <br />2 роки: {plan.license2y} · довічно: {plan.lifetime}
                </div>
                <div className="mt-6 grid gap-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <Check data-icon="inline-start" className="mt-1 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant={plan.featured ? "default" : "secondary"}
                  className="mt-auto"
                >
                  <a href="#contact">Обрати план</a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
