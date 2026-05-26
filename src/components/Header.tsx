import { Menu, Moon, Sun, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const NAV: { label: string; href: string }[] = [
  { label: "Функції", href: "#features" },
  { label: "Тарифи", href: "#pricing" },
  { label: "Послуги", href: "#services" },
  { label: "Контакти", href: "#contact" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const ctaLabel = theme === "dark" ? "Залишити заявку" : "Отримати консультацію";
  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <header className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5">
      <a href="#" className="flex items-center gap-2.5">
        <img src={logo} alt="Хатосфера" className="h-9 w-9 object-contain" />
        <span className="font-semibold tracking-tight text-[15px] md:text-base text-[var(--foreground)]">
          Хатосфера <span className="text-gradient-accent">CRM</span>
        </span>
      </a>

      <nav className="hidden lg:flex items-center gap-8">
        {NAV.map((n) => (
          <a key={n.label} href={n.href} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            {n.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid place-items-center h-10 w-10 rounded-full surface-card hover:scale-105 transition-transform"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-[var(--accent)]" /> : <Moon className="h-4 w-4 text-[var(--accent)]" />}
        </button>

        <button
          className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium transition-all hover:translate-y-[-1px]"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </button>

        <button onClick={() => setOpen(!open)} className="lg:hidden grid place-items-center h-10 w-10 rounded-full surface-card">
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="absolute top-20 right-5 left-5 z-50 surface-pop rounded-2xl p-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-sm text-[var(--muted-foreground)] py-1">{n.label}</a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="md:hidden mt-2 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full text-sm font-medium"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
