import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Reveal, useAutoIndex } from "./Reveal";

const SHOTS = [
  { label: "Дашборд керівника", k: "dash" },
  { label: "Воронка угод", k: "funnel" },
  { label: "Картка об'єкта", k: "obj" },
  { label: "Картка клієнта", k: "cli" },
  { label: "AI-метчинг", k: "ai" },
];

export function ScreenshotsSection() {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useAutoIndex(SHOTS.length, 3000, hover);

  return (
    <section id="screens" className="px-5 md:px-8 py-10 md:py-14"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <Reveal>
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Інтерфейс</span>
          <h2 className="mt-2 text-3xl md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
            Подивіться, як <span className="text-gradient-accent">виглядає CRM</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Чисті інтерфейси для десктопу й мобільного PWA. Скріншоти-прев'ю поки що замокані.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-5 md:grid-cols-5 justify-between gap-2 mb-5">
          {SHOTS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.k}
                onClick={() => setActive(i)}
                className="h-9 px-3.5 rounded-lg text-[9px] sm:text-[12px] font-medium transition-colors duration-200"
                style={{
                  background: on ? "var(--accent)" : "var(--surface-2)",
                  color: on ? "var(--accent-foreground)" : "var(--muted-foreground)",
                  border: on ? "1px solid var(--accent)" : "1px solid var(--border-soft)",
                  boxShadow: "none",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <Reveal>
          <div className="surface-pop rounded-3xl p-4 sm:p-12 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
              <Monitor className="h-3.5 w-3.5" /> Desktop · {SHOTS[active].label}
            </div>
            <DesktopMock variant={active} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="surface-pop rounded-3xl p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
              <Smartphone className="h-3.5 w-3.5" /> Mobile PWA · iOS/Android
            </div>
            <PhoneMock variant={active} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DesktopMock({ variant }: { variant: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}>
      <div className="flex items-center gap-1.5 px-3 h-8" style={{ background: "var(--surface-3)" }}>
        <span className="h-2 w-2 rounded-full" style={{ background: "#ef6a6a" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "#e8b84a" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "#5ec48a" }} />
        <div className="ml-3 h-5 flex-1 max-w-xs rounded surface-card text-[9px] flex items-center px-2 text-muted-foreground">
          app.hatosfera.ua
        </div>
      </div>
      <div className="grid grid-cols-[140px_1fr] min-h-80">
        <aside className="p-3 space-y-1.5" style={{ borderRight: "1px solid var(--border-soft)", background: "var(--surface-2)" }}>
          {["Дашборд", "Об'єкти", "Клієнти", "Угоди", "Завдання", "Аналітика", "AI", "Документи"].map((l, i) => (
            <div key={l} className="h-7 rounded-md px-2 flex items-center text-[10px]"
              style={{
                background: i === variant ? "color-mix(in oklab, var(--accent) 18%, transparent)" : "transparent",
                color: i === variant ? "var(--accent)" : "var(--muted-foreground)",
                fontWeight: i === variant ? 600 : 400,
              }}>{l}</div>
          ))}
        </aside>
        <main className="p-4 space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg p-2.5" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
                <div className="text-[9px] text-muted-foreground mb-1">KPI {i + 1}</div>
                <div className="text-sm font-bold tabular-nums">{(128 + i * 47 + variant * 11)}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["Нові", "Перегляд", "Перемовини", "Угода"].map((s, i) => (
              <div key={s} className="rounded-lg p-2.5" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
                <div className="text-[9px] text-muted-foreground mb-1">{s}</div>
                <div className="space-y-1">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-8 rounded" style={{
                      background: (k === 0 && i === variant % 4) ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 20%, var(--surface-3)), var(--surface-3))" : "var(--surface-3)",
                      border: (k === 0 && i === variant % 4) ? "1px solid var(--border-strong)" : "1px solid transparent",
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-3" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
            <div className="text-[10px] text-muted-foreground mb-2">Динаміка по тижнях</div>
            <div className="grid grid-cols-14 gap-1 h-14 items-end" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const h = 20 + ((i * 23 + variant * 19) % 75);
                const on = i === (variant * 3) % 14;
                return <div key={i} className="rounded-sm transition-[height,background-color] duration-200" style={{
                  height: `${h}%`,
                  background: on ? "linear-gradient(180deg, var(--accent), var(--accent-2))" : "var(--surface-3)",
                }} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PhoneMock({ variant }: { variant: number }) {
  return (
    <div className="mx-auto rounded-[36px] p-2.5 w-55 h-110"
      style={{ background: "var(--surface-3)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
      <div className="h-full w-full rounded-[28px] overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="h-6 flex items-center justify-center text-[8px] text-muted-foreground" style={{ background: "var(--surface-2)" }}>
          09:41
        </div>
        <div className="p-3 space-y-2">
          <div className="text-[10px] text-muted-foreground">Хатосфера CRM</div>
          <div className="text-sm font-bold">Привіт, Олено 👋</div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg p-2 transition-[background-color,border-color] duration-200"
              style={{
                background: i === variant % 4 ? "color-mix(in oklab, var(--accent) 14%, var(--surface-2))" : "var(--surface-2)",
                border: i === variant % 4 ? "1px solid var(--border-strong)" : "1px solid var(--border-soft)",
              }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold">Угода #{1240 + i + variant}</span>
                <span className="text-[9px]" style={{ color: i === variant % 4 ? "var(--accent)" : "var(--muted-foreground)" }}>
                  {i === variant % 4 ? "Активна" : "Перегляд"}
                </span>
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">2-кімн., Київ · {(45 + i * 8)} м²</div>
              <div className="mt-1.5 h-1 rounded" style={{ background: "var(--surface-3)" }}>
                <div className="h-full rounded" style={{
                  width: `${20 + i * 22}%`,
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


