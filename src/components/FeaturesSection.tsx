import { useRef, useState } from "react";
import { Home, Users, Handshake, ListChecks, BarChart3, Sparkles, FileText, Search, Link as LinkIcon, History } from "lucide-react";
import { Reveal, useAutoIndex } from "./Reveal";

const TABS = [
  {
    key: "obj",
    label: "Об'єкти",
    icon: Home,
    title: "База об'єктів без хаосу",
    desc: "Квартири, будинки, комерція, земля, фото, документи, статуси й відповідальні менеджери в одному просторі.",
    bullets: ["Пошук і фільтрація", "Статус та тип операції", "Прив'язка до клієнтів", "Історія змін"],
    stat: { value: "30 000+", label: "об'єктів у системі" },
  },
  {
    key: "cli",
    label: "Клієнти",
    icon: Users,
    title: "Клієнти й історія взаємодій",
    desc: "Картка клієнта з усіма контактами, інтересами, запитами та повним журналом комунікацій.",
    bullets: ["Сегментація бази", "Нотатки та теги", "Прив'язки до угод", "Імпорт з Excel"],
    stat: { value: "100 000+", label: "клієнтів у мережах" },
  },
  {
    key: "deals",
    label: "Угоди",
    icon: Handshake,
    title: "Воронка угод під контролем",
    desc: "Kanban-етапи, прогноз закриття, нагадування й автоматичні переходи між статусами.",
    bullets: ["Етапи Kanban", "Шаблони документів", "Прогноз доходу", "Авто-нагадування"],
    stat: { value: "+24%", label: "конверсії в угоду" },
  },
  {
    key: "tasks",
    label: "Завдання",
    icon: ListChecks,
    title: "Командний календар і задачі",
    desc: "Завдання прив'язані до клієнтів та об'єктів. Нагадування у Telegram і push.",
    bullets: ["Командний календар", "Push та Telegram", "Делегування", "Контроль виконання"],
    stat: { value: "24/7", label: "у мобільній PWA" },
  },
  {
    key: "an",
    label: "Аналітика",
    icon: BarChart3,
    title: "Глибока аналітика агентства",
    desc: "Дашборди по менеджерах, джерелах, етапах і виторгу. Експорт у PDF та Excel.",
    bullets: ["Дашборди менеджерів", "Звіти за період", "Експорт PDF/Excel", "ROI по джерелах"],
    stat: { value: "12+", label: "готових звітів" },
  },
  {
    key: "ai",
    label: "AI-метчинг",
    icon: Sparkles,
    title: "AI-метчинг клієнт ↔ об'єкт",
    desc: "Алгоритм підбирає кращі об'єкти під запит клієнта та підсвічує пріоритетні угоди.",
    bullets: ["Авто-підбір об'єктів", "Скоринг лідів", "AI-поради менеджеру", "Розширений матчинг"],
    stat: { value: "AI", label: "у тарифі від «Активне»" },
  },
  {
    key: "docs",
    label: "Документи",
    icon: FileText,
    title: "Документи та шаблони",
    desc: "Готові договори, акти й рахунки. Підстановка реквізитів за один клік.",
    bullets: ["Шаблони договорів", "Авто-реквізити", "Експорт PDF", "Зберігання у картці"],
    stat: { value: "5–150 ГБ", label: "файлів у тарифах" },
  },
];

const BULLET_ICONS = [Search, LinkIcon, ListChecks, History];

export function FeaturesSection() {
  const hoverRef = useRef(false);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useAutoIndex(TABS.length, 3200, hover);
  const t = TABS[active];
  const Icon = t.icon;

  return (
    <section id="features" className="px-5 md:px-8 py-10 md:py-14"
      onMouseEnter={() => { hoverRef.current = true; setHover(true); }}
      onMouseLeave={() => { hoverRef.current = false; setHover(false); }}
    >
      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Функціонал</span>
            <h2 className="mt-2 text-3xl md:text-[40px] font-bold tracking-[-0.02em] leading-tight max-w-2xl">
              Все що потрібно <span className="text-gradient-accent">агентству</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              CRM створена для агентств, рієлторів, керівників відділів та девелоперів.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-7 sm:grid-cols-7 justify-between gap-1 sm:gap-2 mb-5">
          {TABS.map((tab, i) => {
            const TabIcon = tab.icon;
            const on = i === active;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(i)}
                className="sm:inline-flex flex-col-1 justify-center  sm:items-center items-center w-full gap-0.5 sm:gap-2 h-9 px:2 sm:px-4.5 rounded-lg text-[0px] sm:text-[12px] font-medium transition-colors duration-200"
                style={{
                  background: on ? "var(--accent)" : "var(--surface-2)",
                  color: on ? "var(--accent-foreground)" : "var(--muted-foreground)",
                  border: on ? "1px solid var(--accent)" : "1px solid var(--border-soft)",
                  boxShadow: on ? "0 8px 20px -10px var(--accent)" : "none",
                  transform: on ? "translateY(-1px)" : "none",
                }}
              >
                <TabIcon className="ml-3 sm:ml-0 h-6.5 sm:h-4.5 w-6.5 sm:w-4.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5">
        <Reveal>
          <div key={t.key} className="surface-pop rounded-3xl p-6 sm:p-14 dot-grid">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl"
                style={{ background: "color-mix(in oklab, var(--accent) 14%, var(--surface-2))" }}>
                <Icon className="h-5 w-5" style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t.label}
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{t.title}</h3>
            <p className="mt-3 text-muted-foreground max-w-lg">{t.desc}</p>

            <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
              {t.bullets.map((b, i) => {
                const BI = BULLET_ICONS[i % BULLET_ICONS.length];
                return (
                  <div key={b} className="surface-card rounded-xl p-3 flex items-center gap-2.5">
                    <BI className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="text-[13px]">{b}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-end gap-3 pt-5" style={{ borderTop: "1px dashed var(--border)" }}>
              <div className="text-3xl font-bold text-gradient-accent tabular-nums">{t.stat.value}</div>
              <div className="text-xs text-muted-foreground mb-1.5">{t.stat.label}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <FeatureMock active={active} />
        </Reveal>
      </div>
    </section>
  );
}

function FeatureMock({ active }: { active: number }) {
  return (
    <div className="surface-pop rounded-3xl p-5 md:p-6 h-full min-h-105 relative overflow-hidden">
      <div className="flex items-center gap-1.5 mb-4">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-2)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 50%, var(--surface-3))" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--surface-3)" }} />
        <div className="ml-3 flex-1 h-7 rounded-md surface-card text-[10px] flex items-center px-2 text-muted-foreground">
          app.hatosfera.ua / {TABS[active].key}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const focused = i === active % 6;
          return (
            <div
              key={i}
              className="rounded-xl p-3 transition-[background-color,border-color,transform] duration-200"
              style={{
                background: focused
                  ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 14%, var(--surface-2)), var(--surface-2))"
                  : "var(--surface-2)",
                border: focused ? "1px solid var(--border-strong)" : "1px solid var(--border-soft)",
                transform: focused ? "translateY(-1px)" : "none",
                boxShadow: "none",
              }}
            >
              <div className="h-12 rounded-md mb-2" style={{ background: "var(--surface-3)" }} />
              <div className="h-2 rounded mb-1.5" style={{ background: "var(--surface-3)", width: "70%" }} />
              <div className="h-2 rounded" style={{ background: "var(--surface-3)", width: "45%" }} />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">#{(i + 1) * 12 + active}</span>
                <span className="text-[10px] font-semibold" style={{ color: focused ? "var(--accent)" : "var(--muted-foreground)" }}>
                  {focused ? "Активне" : "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 surface-card rounded-xl p-3">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="text-muted-foreground">Активність сьогодні</span>
          <span className="font-semibold tabular-nums">{42 + active * 7}</span>
        </div>
        <div className="grid grid-cols-12 gap-1 h-12 items-end">
          {Array.from({ length: 12 }).map((_, i) => {
            const h = 18 + ((i * 31 + active * 17) % 70);
            const on = i === (active * 2) % 12;
            return (
              <div
                key={i}
                className="rounded-sm transition-[height,background-color] duration-200"
                style={{
                  height: `${h}%`,
                  background: on ? "linear-gradient(180deg, var(--accent), var(--accent-2))" : "var(--surface-3)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}


