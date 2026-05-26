import { Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const PLANS = [
  { name: "Особистий Профі", price: "990 ₴", per: "/ міс.", desc: "До 200 обʼєктів" },
  { name: "Агентство", price: "2 990 ₴", per: "/ міс.", desc: "Для невеликих агентств" },
  { name: "Бізнес", price: "6 990 ₴", per: "/ міс.", desc: "Для зростаючих агентств" },
  { name: "Елітна Мережа", price: "13 990 ₴", per: "/ міс.", desc: "Для мережевих агентств" },
  { name: "Корпоративний", price: "Індивідуально", per: "", desc: "Для великих компаній" },
];

export function PricingSection() {
  const { theme } = useTheme();
  const popularName = theme === "dark" ? "Агентство" : "Бізнес";

  return (
    <section className="px-5 md:px-8 pb-8 md:pb-10">
      <div className="rounded-3xl p-5 md:p-7 surface-card dot-grid">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
          <h2 className="text-base md:text-lg font-semibold tracking-tight">Оберіть свій план</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PLANS.map((p) => {
            const popular = p.name === popularName;
            return (
              <div
                key={p.name}
                className="relative rounded-2xl p-4 surface-pop transition-transform hover:translate-y-[-2px]"
                style={popular ? { borderColor: "var(--border-strong)", borderWidth: 1.5 } : undefined}
              >
                {popular && (
                  <span
                    className="absolute -top-2.5 right-3 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                  >
                    Популярний
                  </span>
                )}
                <div className="text-xs text-[var(--muted-foreground)] mb-1.5">{p.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold tracking-tight ${popular ? "text-gradient-accent" : ""}`}>{p.price}</span>
                  {p.per && <span className="text-[11px] text-[var(--muted-foreground)]">{p.per}</span>}
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)] mt-2">{p.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
