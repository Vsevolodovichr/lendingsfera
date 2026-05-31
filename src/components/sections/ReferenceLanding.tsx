import { ArrowRight, Check, Clock3, Mail, Menu, Moon, Phone, Play, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import heroBuildingDark from "@/assets/hero-building-dark.png";
import heroBuildingLight from "@/assets/hero-building-light.png";
import { useTheme } from "@/components/layout/ThemeProvider";
import { ScrollStage } from "@/components/three/ScrollStage";
import { Button } from "@/components/ui/button";

const navItems = ["об'єкти", "клієнти", "угоди", "аналітика", "заявка"];

const chapters = [
  { id: "hero", number: "01", label: "Герой", sub: "перший екран" },
  { id: "product", number: "02", label: "Продукт", sub: "та робочий процес" },
  { id: "pricing", number: "03", label: "Тарифи", sub: "та послуги" },
  { id: "contact", number: "04", label: "Контакти", sub: "та підтримка" },
];

const kanban: Array<[string, string, string[]]> = [
  ["Нова заявка", "18", ["Іван Петренко", "2 410 000 ₴", "ЖК River Park"]],
  ["Кваліфікація", "14", ["Олена Коваль", "3 100 000 ₴", "ЖК Manhattan"]],
  ["Перегляд об'єктів", "21", ["Дмитро Л.", "1 900 000 ₴", "ЖК X-Plo"]],
  ["Пропозиція", "12", ["Наталія К.", "2 700 000 ₴", "ЖК Osocor"]],
  ["Успішна угода", "12", ["Віра П.", "4 800 000 ₴", "ЖК Creator City"]],
];

const plans = [
  { name: "Start", price: "2 490", label: "для маленьких команд" },
  { name: "Pro", price: "4 990", label: "для активних агентств", featured: true },
  { name: "Business", price: "9 990", label: "для великих мереж" },
  { name: "Додаткові послуги", price: "від 8 000", label: "міграції та інтеграції" },
];

export function ReferenceLanding() {
  const activeChapter = useActiveChapter();
  const { theme, toggleTheme } = useTheme();
  const logo = theme === "dark" ? logoLight : logoDark;
  const heroImage = theme === "dark" ? heroBuildingDark : heroBuildingLight;

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти до контенту
      </a>
      <ReferenceHeader logo={logo} theme={theme} onToggleTheme={toggleTheme} />
      <ChapterRail activeChapter={activeChapter} />
      <div className="reference-building-backdrop" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>
      <main id="main" className="reference-page relative z-10">
        <ScrollStage />
        <HeroChapter heroImage={heroImage} />
        <ProductChapter />
        <PricingChapter />
        <ContactChapter logo={logo} />
      </main>
      <ScrollStoryboard />
    </>
  );
}

function ReferenceHeader({
  logo,
  theme,
  onToggleTheme,
}: {
  logo: string;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  return (
    <header className="reference-header fixed inset-x-0 top-0 z-40">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Хатосфера CRM">
          <img src={logo} alt="Хатосфера" className="size-8 object-contain" />
          <span className="text-sm font-semibold text-foreground">Хатосфера CRM</span>
        </a>
        <nav className="hidden items-center gap-10 text-[11px] font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={
                item === "заявка" ? "#contact" : `#${item === "аналітика" ? "product" : "product"}`
              }
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <Button asChild size="sm" className="hidden rounded-sm md:inline-flex">
            <a href="#contact">Замовити демо</a>
          </Button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="reference-icon-button"
            aria-label="Перемкнути тему"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button type="button" className="reference-icon-button" aria-label="Відкрити меню">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}

function ChapterRail({ activeChapter }: { activeChapter: number }) {
  return (
    <aside className="reference-rail fixed left-0 top-0 z-30 hidden h-dvh w-[92px] border-r border-border/70 lg:block">
      <div className="flex h-full flex-col items-center justify-center gap-6">
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="group flex w-full flex-col items-center gap-3"
          >
            <span className={index === activeChapter ? "rail-number active" : "rail-number"}>
              {chapter.number}
            </span>
            <span className="text-center text-[10px] font-semibold uppercase leading-4 text-muted-foreground">
              {chapter.label}
              <br />
              {chapter.sub}
            </span>
            {index < chapters.length - 1 ? (
              <span className={index < activeChapter ? "rail-line active" : "rail-line"} />
            ) : null}
          </a>
        ))}
      </div>
    </aside>
  );
}

function HeroChapter({ heroImage }: { heroImage: string }) {
  return (
    <section id="hero" className="reference-chapter reference-hero">
      <div className="hero-building-stage" aria-hidden="true">
        <img src={heroImage} alt="" className="hero-building-raster" />
        <div className="hero-building-vignette" />
      </div>
      <div className="chapter-copy">
        <motion.p
          className="chapter-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CRM для нерухомості
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="max-w-[560px] text-balance text-[clamp(3.1rem,5.35vw,5.3rem)] font-medium leading-[0.96] tracking-[-0.045em] text-foreground"
        >
          CRM для нерухомості, <span className="text-accent">створена архітекторами продажів</span>
        </motion.h1>
        <p className="mt-6 max-w-[420px] text-sm leading-6 text-muted-foreground">
          Єдина система для керування об'єктами, клієнтами та угодами. Більше угод. Менше рутини.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Button asChild className="rounded-sm">
            <a href="#contact">Замовити демо</a>
          </Button>
          <a
            href="#product"
            className="inline-flex items-center gap-3 text-xs text-muted-foreground"
          >
            <span className="grid size-8 place-items-center rounded-full border border-border">
              <Play className="size-3 fill-current" />
            </span>
            Як це працює
          </a>
        </div>
        <div className="mt-10 grid max-w-md grid-cols-3 gap-8">
          {[
            ["97%", "задоволених користувачів"],
            ["2.7x", "більше угод з системою"],
            ["24/7", "підтримка та оновлення"],
          ].map(([value, label]) => (
            <div key={value}>
              <div className="text-xl font-medium text-foreground">{value}</div>
              <div className="mt-2 text-[11px] leading-4 text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <HeroDataPanel />
    </section>
  );
}

function HeroDataPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="reference-panel hero-panel"
    >
      <div className="mb-6 flex items-center justify-between">
        <span>Панель керівника</span>
        <span className="rounded-sm border border-border px-2 py-1 text-[10px] text-muted-foreground">
          Цей місяць
        </span>
      </div>
      {[
        ["Нові заявки", "48", "+18%"],
        ["Перегляди об'єктів", "124", "+27%"],
        ["Угоди в роботі", "78", "+16%"],
        ["Конверсія", "23%", "+6%"],
      ].map(([label, value, change]) => (
        <div key={label} className="mb-4 grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">{value}</span>
          <span className="text-accent">{change}</span>
        </div>
      ))}
      <div className="mt-6 border-t border-border pt-5">
        <div className="text-xs text-muted-foreground">Дохід</div>
        <div className="mt-2 text-2xl font-medium text-foreground">₴ 12 450 000</div>
        <div className="sparkline mt-5" />
      </div>
    </motion.aside>
  );
}

function ProductChapter() {
  return (
    <section id="product" className="reference-chapter">
      <div className="chapter-copy">
        <p className="chapter-kicker">02 продукт</p>
        <h2 className="reference-title">Весь цикл угоди в єдиному просторі</h2>
        <p className="reference-lead">
          Прозорий процес, контроль на кожному етапі та автоматизація рутини.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
          {[
            "Заявки з усіх каналів",
            "Кваліфікація та розподіл",
            "Робота з клієнтом",
            "Підбір об'єктів",
            "Угоди та документи",
            "Аналітика та звіти",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <Check className="size-4 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="product-board reference-panel">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">Угоди</span>
          <div className="flex gap-2 text-[10px] text-muted-foreground">
            <span className="rounded-sm border border-border px-2 py-1">Усі відділи</span>
            <span className="rounded-sm border border-border px-2 py-1">+ Нова угода</span>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {kanban.map(([title, count, card]) => (
            <div key={title} className="kanban-column">
              <div className="mb-3 flex justify-between text-[11px] text-muted-foreground">
                <span>{title}</span>
                <span>{count}</span>
              </div>
              <div className="rounded-sm border border-border bg-background/62 p-3">
                <div className="text-xs font-medium text-foreground">{card[0]}</div>
                <div className="mt-2 text-[11px] text-muted-foreground">{card[1]}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{card[2]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingChapter() {
  return (
    <section id="pricing" className="reference-chapter">
      <div className="chapter-copy">
        <p className="chapter-kicker">03 тарифи</p>
        <h2 className="reference-title">Тарифи та послуги</h2>
        <p className="reference-lead">Прозорі умови. Масштабується разом з вашим бізнесом.</p>
      </div>
      <div className="pricing-board">
        {plans.map((plan) => (
          <article key={plan.name} className={plan.featured ? "price-card featured" : "price-card"}>
            {plan.featured ? <span className="featured-label">Популярний</span> : null}
            <div className="text-sm font-medium text-foreground">{plan.name}</div>
            <div className="mt-4 text-3xl font-medium text-foreground">₴ {plan.price}</div>
            <div className="mt-2 text-xs text-muted-foreground">{plan.label}</div>
            <div className="mt-5 grid gap-2 text-[11px] text-muted-foreground">
              <span>✓ CRM для команди</span>
              <span>✓ Об'єкти та клієнти</span>
              <span>✓ Угоди та задачі</span>
            </div>
            <Button
              variant={plan.featured ? "default" : "secondary"}
              size="sm"
              className="mt-6 w-full rounded-sm"
            >
              Обрати
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactChapter({ logo }: { logo: string }) {
  return (
    <section id="contact" className="reference-chapter">
      <div className="chapter-copy">
        <p className="chapter-kicker">04 контакти</p>
        <h2 className="reference-title">Заявка на демо</h2>
        <p className="reference-lead">
          Заповніть форму, і ми покажемо, як Хатосфера CRM збільшить ваші продажі.
        </p>
      </div>
      <div className="contact-board">
        <form className="reference-panel contact-form">
          {["Ім'я", "Телефон", "Компанія", "Ваш запит"].map((label) => (
            <label key={label} className="grid gap-2">
              <span className="text-[11px] text-muted-foreground">{label}</span>
              <input
                className="reference-input"
                placeholder={label === "Ваш запит" ? "Опишіть коротко ваш запит" : label}
              />
            </label>
          ))}
          <Button className="rounded-sm">Надіслати заявку</Button>
        </form>
        <aside className="reference-panel contact-card">
          <img src={logo} alt="Хатосфера" className="size-9 object-contain" />
          <div>
            <div className="font-medium text-foreground">Хатосфера CRM</div>
            <div className="mt-2 text-xs leading-5 text-muted-foreground">
              Архітектура продажів вашої нерухомості
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-accent" />
              +380 44 123 45 67
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-accent" />
              hello@hatosfera.ua
            </span>
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-accent" />
              Київ, вул. Антоновича, 172
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ScrollStoryboard() {
  return (
    <div className="storyboard relative z-20 hidden border-t border-border bg-background/72 backdrop-blur-2xl lg:block">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[140px_repeat(4,1fr)] gap-6 px-8 py-5 text-xs">
        <div>
          <div className="font-medium text-foreground">Історія скролу</div>
          <div className="mt-2 text-muted-foreground">
            Єдина архітектурна сцена, що оживає під час скролу
          </div>
        </div>
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className="story-step">
            <span>{chapter.label}</span>
            <ArrowRight className="size-3 text-accent" />
          </a>
        ))}
      </div>
    </div>
  );
}

function useActiveChapter() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const centers = chapters.map((chapter) => {
        const element = document.getElementById(chapter.id);
        if (!element) return Number.POSITIVE_INFINITY;
        const rect = element.getBoundingClientRect();
        return Math.abs(rect.top + rect.height * 0.5 - window.innerHeight * 0.5);
      });
      setActive(centers.indexOf(Math.min(...centers)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}
