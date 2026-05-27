import { CheckCircle2, Check, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import buildDark from "@/assets/build-dark.png";
import buildLight from "@/assets/build-light.png";

type CardKey = "chart" | "funnel" | "tasks" | "plan";
type FunnelCard = { title: string; rows: [string, number, number][] };
type TaskCard = { title: string; rows: [string, string][] };
type PlanCard = { title: string; price: string; desc: string; rows: string[] };

const chartCards = [
  { title: "Угоди в роботі", value: "128", change: "+24%" },
  { title: "Нові ліди", value: "47", change: "+18%" },
  { title: "Закриті угоди", value: "34", change: "+11%" },
];

const funnelCards: FunnelCard[] = [
  { title: "Воронка угод", rows: [["Нові", 73, 92], ["Перегляд", 38, 55], ["Переговори", 11, 22], ["Угода", 6, 12]] },
  { title: "Активні клієнти", rows: [["Ліди", 54, 72], ["Контакт", 31, 66], ["Показ", 14, 46], ["Закрито", 4, 19]] },
  { title: "Об'єкти", rows: [["Нові", 86, 76], ["Перевірені", 34, 58], ["Покази", 11, 43], ["Угода", 6, 25]] },
];

const taskCards: TaskCard[] = [
  { title: "Завдання на сьогодні", rows: [["Передзвонити клієнту", "09:30"], ["Показ обʼєкта", "11:00"], ["Підписати договір", "14:00"]] },
  { title: "План команди", rows: [["Оновити об'єкт", "10:20"], ["Погодити показ", "13:40"], ["Звірити документи", "16:10"]] },
  { title: "Контроль угод", rows: [["Зателефонувати", "08:50"], ["Підготувати договір", "14:10"], ["Закрити задачу", "18:30"]] },
];

const planCards: PlanCard[] = [
  { title: "Агентство", price: "2 990 ₴", desc: "Для невеликих агентств", rows: ["До 10 000 обʼєктів", "До 1 000 клієнтів", "Розширена аналітика", "Підтримка 24/7"] },
  { title: "Бізнес", price: "6 990 ₴", desc: "Для зростаючих агентств", rows: ["До 30 000 обʼєктів", "До 70 000 клієнтів", "Автоматизація угод", "Пріоритетна підтримка"] },
  { title: "Мережа", price: "13 990 ₴", desc: "Для мережевих агентств", rows: ["Безлімітні філії", "Ролі команди", "Контроль угод", "Преміум підтримка"] },
];

function MiniChart() {
  return (
    <svg
      viewBox="0 0 120 36"
      preserveAspectRatio="none"
      className="w-[220px] h-9"
    >
      <defs>
        <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 28 L15 22 L30 26 L48 14 L66 18 L84 8 L102 12 L120 4 L120 36 L0 36 Z" fill="url(#lg)" />
      <path d="M0 28 L15 22 L30 26 L48 14 L66 18 L84 8 L102 12 L120 4" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}

function FunnelRow({ label, value, pct }: { label: string; value: number; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }} />
      </div>
    </div>
  );
}

export function HeroVisual() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeCards, setActiveCards] = useState<Record<CardKey, number>>({
    chart: 0,
    funnel: 0,
    tasks: 0,
    plan: 0,
  });

  const cycleCard = (card: CardKey, total: number) => {
    setActiveCards((current) => ({
      ...current,
      [card]: (current[card] + 1) % total,
    }));
  };

  const chart = chartCards[activeCards.chart];
  const funnel = funnelCards[activeCards.funnel];
  const tasks = taskCards[activeCards.tasks];
  const plan = planCards[activeCards.plan];

  return (
    <div className="hero-visual relative w-full aspect-4/5 md:aspect-5/6 max-h-170">
      {/* Building backdrop */}
      <img
        src={dark ? buildDark : buildLight}
        alt="Building"
        className="hero-building-image absolute inset-0 w-full h-full object-contain object-center drop-shadow-2xl transform-gpu scale-[1.12]"
        style={{ filter: dark ? "drop-shadow(0 30px 60px rgba(0,0,0,0.6))" : "drop-shadow(0 20px 40px rgba(70,90,110,0.15))" }}
      />
<div className="hero-card-field hero-card-canvas absolute inset-0 origin-left scale-[0.9]" aria-label="Інтерактивні картки Хатосфера CRM">
      {/* Top deals card */}
      <div className="hero-card-stack hero-card-stack--chart absolute left-[5%] top-[15%] w-[58%] surface-pop p-3.5" onClick={() => cycleCard("chart", chartCards.length)}>
        <div className="hero-card-swap" key={`chart-${activeCards.chart}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-muted-foreground">{dark ? chart.title : chart.title.replace("Угоди в роботі", "Динаміка угод")}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
            <TrendingUp className="inline h-3 w-3 -mt-0.5 mr-0.5" />{chart.change}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold tracking-tight">{chart.value}</div>
          <div><MiniChart /></div>
        </div>
        </div>
      </div>


                  {/* Bottom plan card */}
      <div className="hero-card-stack hero-card-stack--plan absolute bottom-[18%] left-[0.1%] right-[43%] surface-pop px-3 py-4 accent-border" style={{ borderWidth: 1.5 }} onClick={() => cycleCard("plan", planCards.length)}>
        <div className="hero-card-swap" key={`plan-${activeCards.plan}`}>
        <div className=" grid grid-cols-2 gap-4 ">

          <div className="  mt-20">
            <div className="border-t border-border pt-6">
            <div className="flex gap-2 items-center justify-start">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Тариф</div>
            <div className="text-sm font-semibold">{plan.title}</div>
            </div>
            <div className="text-xl font-bold mt-1 text-gradient-accent">{plan.price}<span className="text-[11px] text-muted-foreground font-normal"> / міс.</span></div>
            <div className="text-[10px] text-muted-foreground mt-1">{plan.desc}</div>
            <button className="mt-2.5 w-full h-8 rounded-lg text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
              Обрати план
            </button>
          </div>
          </div>
          <div className=" space-y-1 mt-30 ">
            {plan.rows.map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-[10px]">
                <Check className="h-3 w-3 shrink-0" style={{ color: "var(--accent)" }} />
                <span className="text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Funnel card */}
      <div className="hero-card-stack hero-card-stack--funnel absolute top-[30%] left-[0%] w-[28%] surface-pop p-2.5" onClick={() => cycleCard("funnel", funnelCards.length)}>
        <div className="hero-card-swap" key={`funnel-${activeCards.funnel}`}>
        <div className="text-[11px] text-muted-foreground mb-2.5 font-medium">{funnel.title}</div>
        <div className="space-y-2">
          {funnel.rows.map(([label, value, pct]) => (
            <FunnelRow key={label} label={label} value={value} pct={pct} />
          ))}
        </div>
        </div>
      </div>




      {/* Tasks card */}
      <div className="hero-card-stack hero-card-stack--tasks absolute top-[28.5%] right-[42%] w-[29%] surface-pop px-3.5 py-8" onClick={() => cycleCard("tasks", taskCards.length)}>
        <div className="hero-card-swap" key={`tasks-${activeCards.tasks}`}>
        <div className="text-[16px] leading-tight text-muted-foreground mb-5.5 font-medium">{tasks.title}</div>

        <div className="w-full space-y-2.5">
          {tasks.rows.map(([t, time]) => (
            <div key={t} className="flex min-w-0 items-center gap-2 text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent)" }} />
              <span className="min-w-0 flex-1 truncate">{t}</span>
              <span className="text-muted-foreground tabular-nums">{time}</span>
            </div>
          ))}
        </div>

        </div>
      </div>
</div>

    </div>
  );
}
