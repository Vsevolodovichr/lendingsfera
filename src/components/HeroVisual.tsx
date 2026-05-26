import { CheckCircle2, Check, TrendingUp } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import buildDark from "@/assets/build-dark.png";
import buildLight from "@/assets/build-light.png";

function MiniChart() {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-9">
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
        <span className="text-[var(--muted-foreground)]">{label}</span>
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

  const planTitle = dark ? "Агентство" : "Бізнес";
  const planPrice = dark ? "2 990 ₴" : "6 990 ₴";
  const planDesc = dark ? "Для невеликих агентств" : "Для зростаючих агентств";
  const dealsTitle = dark ? "Угоди в роботі" : "Динаміка угод";

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[5/6] max-h-[680px]">
      {/* Building backdrop */}
      <img
        src={dark ? buildDark : buildLight}
        alt="Building"
        className="absolute inset-0 w-full h-full object-contain object-center drop-shadow-2xl"
        style={{ filter: dark ? "drop-shadow(0 30px 60px rgba(0,0,0,0.6))" : "drop-shadow(0 20px 40px rgba(70,90,110,0.25))" }}
      />

      {/* Top deals card */}
      <div className="absolute top-[4%] right-[6%] w-[58%] surface-pop rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[var(--muted-foreground)]">{dealsTitle}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
            <TrendingUp className="inline h-3 w-3 -mt-0.5 mr-0.5" />+24%
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold tracking-tight">128</div>
          <div className="w-28"><MiniChart /></div>
        </div>
      </div>

      {/* Funnel card */}
      <div className="absolute top-[30%] left-[0%] w-[48%] surface-pop rounded-2xl p-3.5">
        <div className="text-[11px] text-[var(--muted-foreground)] mb-2.5 font-medium">Воронка угод</div>
        <div className="space-y-2">
          <FunnelRow label="Нові" value={73} pct={92} />
          <FunnelRow label="Перегляд" value={38} pct={55} />
          <FunnelRow label="Переговори" value={11} pct={22} />
          <FunnelRow label="Угода" value={6} pct={12} />
        </div>
      </div>

      {/* Tasks card */}
      <div className="absolute top-[28%] right-[2%] w-[44%] surface-pop rounded-2xl p-3.5">
        <div className="text-[11px] text-[var(--muted-foreground)] mb-2.5 font-medium">Завдання на сьогодні</div>
        <div className="space-y-2.5">
          {[
            ["Передзвонити клієнту", "09:30"],
            ["Показ обʼєкта", "11:00"],
            ["Підписати договір", "14:00"],
          ].map(([t, time]) => (
            <div key={t} className="flex items-center gap-2 text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent)" }} />
              <span className="flex-1 truncate">{t}</span>
              <span className="text-[var(--muted-foreground)] tabular-nums">{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom plan card */}
      <div className="absolute bottom-[2%] left-[10%] right-[6%] surface-pop rounded-2xl p-4 accent-border" style={{ borderWidth: 1.5 }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Тариф</div>
            <div className="text-sm font-semibold">{planTitle}</div>
            <div className="text-xl font-bold mt-1 text-gradient-accent">{planPrice}<span className="text-[11px] text-[var(--muted-foreground)] font-normal"> / міс.</span></div>
            <div className="text-[10px] text-[var(--muted-foreground)] mt-1">{planDesc}</div>
            <button className="mt-2.5 w-full h-8 rounded-lg text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
              Обрати план
            </button>
          </div>
          <div className="space-y-1.5">
            {["До 10 000 обʼєктів", "До 1 000 клієнтів", "Розширена аналітика", "Підтримка 24/7"].map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-[10px]">
                <Check className="h-3 w-3 shrink-0" style={{ color: "var(--accent)" }} />
                <span className="text-[var(--muted-foreground)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
