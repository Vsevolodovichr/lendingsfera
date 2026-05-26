import { useState } from "react";
import { UserPlus, Package, Plug, Globe, Settings2, GraduationCap } from "lucide-react";
import { Reveal, useAutoIndex } from "./Reveal";

const CATS = [
  {
    icon: UserPlus,
    title: "Користувачі та ресурси",
    items: [
      ["Додатковий користувач", "490–790 грн/міс"],
      ["Додаткові 10 ГБ файлів", "390 грн/міс"],
      ["Додаткова філія", "1 500 грн/міс"],
      ["Збільшення ліміту об'єктів", "індивідуально"],
    ],
  },
  {
    icon: Package,
    title: "Імпорт та перенесення",
    items: [
      ["Імпорт великої бази", "від 5 000 грн"],
      ["Перенесення клієнтів з Excel", "від 3 000 грн"],
      ["Перенесення об'єктів з Excel", "від 5 000 грн"],
      ["Очищення бази", "від 7 000 грн"],
    ],
  },
  {
    icon: Plug,
    title: "Інтеграції",
    items: [
      ["Інтеграція з сайтом", "від 15 000 грн"],
      ["Інтеграція з телефонією", "від 12 000 грн"],
      ["Інтеграція з Telegram", "від 8 000 грн"],
      ["API для зовнішніх сервісів", "від 25 000 грн"],
    ],
  },
  {
    icon: Globe,
    title: "Сайт та просування",
    items: [
      ["SEO-просування лендінгу", "від 8 000 грн/міс"],
      ["Обслуговування лендінгу", "від 3 000 грн/міс"],
      ["SEO-тексти", "від 1 500 грн/стор."],
      ["Ведення блогу", "від 6 000 грн/міс"],
    ],
  },
  {
    icon: Settings2,
    title: "Кастомні функції",
    items: [
      ["Кастомний модуль", "від 20 000 грн"],
      ["White Label", "від 30 000 грн"],
      ["Персональні звіти", "індивідуально"],
      ["Індивідуальний дизайн CRM", "від 50 000 грн"],
    ],
  },
  {
    icon: GraduationCap,
    title: "Навчання та супровід",
    items: [
      ["Персональне навчання", "3 000 грн/год"],
      ["Групова навчальна сесія", "від 7 000 грн/міс"],
      ["Пріоритетна підтримка 24/7", "від 9 900 грн/міс"],
      ["Технічний супровід CRM", "від 5 000 грн/міс"],
    ],
  },
];

export function ServicesSection() {
  const [hover, setHover] = useState(false);
  const [focus] = useAutoIndex(CATS.length, 2400, hover);

  return (
    <section id="services" className="px-5 md:px-8 py-10 md:py-14"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <Reveal>
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Розширення</span>
          <h2 className="mt-2 text-3xl md:text-[40px] font-bold tracking-[-0.02em] leading-tight max-w-3xl">
            Додаткові <span className="text-gradient-accent">можливості</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Розширюйте CRM під конкретне агентство, мережу або бізнес-модель.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CATS.map((c, i) => {
          const Icon = c.icon;
          const on = i === focus;
          return (
            <Reveal key={c.title} delay={i * 60}>
              <div
                className="rounded-2xl p-5 h-full surface-pop transition-all duration-500"
                style={{
                  transform: on ? "translateY(-4px)" : "none",
                  border: on ? "1.5px solid var(--border-strong)" : "1px solid var(--border-soft)",
                  boxShadow: on ? "0 24px 50px -22px var(--accent)" : "var(--shadow-card)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid place-items-center h-10 w-10 rounded-xl"
                    style={{ background: "color-mix(in oklab, var(--accent) 14%, var(--surface-2))" }}>
                    <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-semibold tracking-tight">{c.title}</h3>
                </div>
                <ul className="space-y-2">
                  {c.items.map(([name, price]) => (
                    <li key={name} className="flex items-center justify-between gap-3 py-1.5"
                      style={{ borderBottom: "1px dashed var(--border-soft)" }}>
                      <span className="text-[12.5px]">{name}</span>
                      <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: "var(--accent)" }}>
                        {price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
