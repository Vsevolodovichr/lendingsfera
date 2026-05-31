import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { siteContent } from "@/content/siteContent";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10 px-5 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[28px] border border-border bg-surface/70 p-6 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={theme === "dark" ? logoLight : logoDark}
            alt="Хатосфера"
            className="size-10 object-contain"
          />
          <div>
            <div className="text-sm font-semibold">Хатосфера CRM</div>
            <div className="text-xs text-muted-foreground">CRM для ринку нерухомості України</div>
          </div>
        </div>
        <nav
          className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          aria-label="Навігація в футері"
        >
          {siteContent.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-muted-foreground">© 2026 Хатосфера</div>
      </div>
    </footer>
  );
}
