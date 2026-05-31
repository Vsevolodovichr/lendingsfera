import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const logo = theme === "dark" ? logoLight : logoDark;

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-border bg-surface/70 px-4 py-3 shadow-[var(--shadow-glass)] backdrop-blur-2xl">
        <a href="/" className="flex items-center gap-3" aria-label="Хатосфера CRM">
          <img src={logo} alt="Хатосфера" className="size-10 object-contain" />
          <span className="text-sm font-semibold tracking-[0.18em] text-foreground uppercase">
            Хатосфера CRM
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основна навігація">
          {siteContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Перемкнути тему">
            {theme === "dark" ? (
              <Sun data-icon="inline-start" />
            ) : (
              <Moon data-icon="inline-start" />
            )}
          </Button>
          <Button asChild>
            <a href="#contact">Залишити заявку</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Перемкнути тему">
            {theme === "dark" ? (
              <Sun data-icon="inline-start" />
            ) : (
              <Moon data-icon="inline-start" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
          >
            {open ? <X data-icon="inline-start" /> : <Menu data-icon="inline-start" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 grid max-w-7xl overflow-hidden rounded-[24px] border border-border bg-surface/90 shadow-[var(--shadow-glass)] backdrop-blur-2xl transition-all lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="min-h-0 px-3" aria-label="Мобільна навігація">
          <div className="flex flex-col gap-1 py-3">
            {siteContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="#contact" onClick={() => setOpen(false)}>
                Залишити заявку
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
