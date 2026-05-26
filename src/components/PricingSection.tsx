import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Reveal, useAutoIndex } from "./Reveal";

type Plan = {
  tag: string;
  name: string;
  monthly: string;
  monthlyUnit: string;
  license1y: string;
  license2y: string;
  lifetime: string;
  desc: string;
  features: string[];
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    tag: "Приватний рієлтор",
    name: "Особистий Профі",
    monthly: "2 175",
    monthlyUnit: "грн/міс",
    license1y: "21 750 грн",
    license2y: "39 150 грн",
    lifetime: "після 3 років",
    desc: "Для самостійної роботи",
    features: [
      "До 300 об'єктів нерухомості",
      "До 1 000 клієнтів",
      "Угоди та задачі без обмежень",
      "Особистий календар",
      "Мобільна PWA-версія",
      "До 5 ГБ файлів/фото",
    ],
  },
  {
    tag: "Невелике агентство",
    name: "Агентство",
    monthly: "7 900",
    monthlyUnit: "грн/міс",
    license1y: "79 000 грн",
    license2y: "142 200 грн",
    lifetime: "після 3 років",
    desc: "Для команд 2–10 людей",
    features: [
      "До 1 500 об'єктів",
      "До 5 000 клієнтів",
      "Командний календар",
      "Ролі та права доступу",
      "Внутрішній чат",
      "1 групова навчальна сесія",
    ],
  },
  {
    tag: "Активне агентство",
    name: "Бізнес",
    monthly: "14 900",
    monthlyUnit: "грн/міс",
    license1y: "149 000 грн",
    license2y: "268 200 грн",
    lifetime: "після 3 років",
    desc: "До 5 000 об'єктів, 25 000 клієнтів",
    popular: true,
    features: [
      "До 3 філій або відділів",
      "Шаблони документів",
      "Розширена аналітика",
      "AI-метчинг клієнт ↔ об'єкт",
      "До 50 ГБ файлів/фото",
      "До 3 навчальних сесій",
    ],
  },
  {
    tag: "Велике агентство / мережа",
    name: "Елітна Мережа",
    monthly: "29 900",
    monthlyUnit: "грн/міс",
    license1y: "299 000 грн",
    license2y: "538 200 грн",
    lifetime: "після 3 років",
    desc: "Для мережевих агентств",
    features: [
      "До 15 000 об'єктів, 100 000 клієнтів",
      "До 10 філій",
      "Топ-менеджерський дашборд",
      "Розширений AI-метчинг",
      "Персональний менеджер",
      "SLA-підтримка до 12 годин",
    ],
  },
  {
    tag: "Мережі, девелопери, франшизи",
    name: "Корпоративний",
    monthly: "від 49 900",
    monthlyUnit: "грн/міс",
    license1y: "від 499 000 грн",
    license2y: "індивідуально",
    lifetime: "за домовленістю",
    desc: "Для великих компаній",
    features: [
      "Індивідуальні ліміти",
      "Окрема інфраструктура",
      "Персональні модулі та API",
      "Індивідуальні інтеграції",
      "Розширена безпека",
      "White Label за домовленістю",
    ],
  },
];

export function PricingSection() {
  const [mode, setMode] = useState<"monthly" | "license">("monthly");
  const [hover, setHover] = useState(false);
  const [focus] = useAutoIndex(PLANS.length, 2800, hover);

  return (
    <section id="pricing" className="px-5 md:px-8 py-10 md:py-14"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Тарифи</span>
            <h2 className="mt-2 text-3xl md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
              Оберіть <span className="text-gradient-accent">свій план</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Щомісячна підписка або ліцензія — гнучкі умови для будь-якого масштабу бізнесу.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-full surface-card text-[12px] font-medium">
            {(["monthly", "license"] as const).map((m) => {
              const on = mode === m;
              return (
                <button key={m} onClick={() => setMode(m)}
                  className="h-9 px-4 rounded-full transition-all"
                  style={{
                    background: on ? "var(--accent)" : "transparent",
                    color: on ? "var(--accent-foreground)" : "var(--muted-foreground)",
                  }}>
                  {m === "monthly" ? "Щомісячно" : "Ліцензія"}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {PLANS.map((p, i) => {
          const isFocus = i === focus;
          const isPop = !!p.popular;
          const ring = isFocus || isPop;
          return (
            <Reveal key={p.name} delay={i * 70}>
              <div
                className="relative rounded-2xl p-5 h-full surface-pop transition-all duration-500"
                style={{
                  transform: isFocus ? "translateY(-6px) scale(1.015)" : "none",
                  boxShadow: isFocus ? "0 30px 60px -24px var(--accent)" : "var(--shadow-card)",
                  border: ring ? "1.5px solid var(--border-strong)" : "1px solid var(--border-soft)",
                }}
              >
                {isPop && (
                  <span className="absolute -top-2.5 left-4 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                    Найпопулярніший
                  </span>
                )}
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
                <div className="mt-1 text-lg font-semibold">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[26px] font-bold tracking-tight text-gradient-accent tabular-nums">
                    {mode === "monthly" ? p.monthly : p.license1y}
                  </span>
                  {mode === "monthly" && <span className="text-[11px] text-muted-foreground">{p.monthlyUnit}</span>}
                </div>
                {mode === "license" && (
                  <div className="text-[10px] text-muted-foreground mt-1">
                    2 роки: {p.license2y} · довічно: {p.lifetime}
                  </div>
                )}
                <div className="text-[11px] text-muted-foreground mt-2">{p.desc}</div>

                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[12px]">
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-5 w-full h-10 rounded-full text-[12px] font-semibold transition-all"
                  style={
                    isPop || isFocus
                      ? { background: "var(--accent)", color: "var(--accent-foreground)", boxShadow: "0 12px 28px -14px var(--accent)" }
                      : { background: "var(--surface-2)", color: "var(--foreground)", border: "1px solid var(--border-soft)" }
                  }
                >
                  {p.name === "Корпоративний" ? "Обговорити умови" : "Обрати план"}
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-6 surface-card rounded-2xl p-4 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-[12px]">
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
            <span className="text-muted-foreground">
              Разова оплата на 1 рік, 2 роки або пожиттєво — для довгого горизонту.
            </span>
          </div>
          <button onClick={() => setMode("license")} className="text-[12px] font-semibold" style={{ color: "var(--accent)" }}>
            Подивитись ліцензії →
          </button>
        </div>
      </Reveal>
    </section>
  );
}
