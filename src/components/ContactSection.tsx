import { ArrowRight, Mail, Phone } from "lucide-react";
import { Reveal } from "./Reveal";

const USERS = ["1 (приватний рієлтор)", "2–3", "4–10", "11–25", "26–50", "50+"];
const INTEREST = [
  "Щомісячна підписка",
  "Річна ліцензія",
  "Дворічна ліцензія",
  "Пожиттєвий доступ",
  "Індивідуальна CRM",
  "Сайт для агентства",
  "Інтеграції",
  "Консультація",
];

export function ContactSection() {
  return (
    <section id="contact" className="px-5 md:px-8 py-10 md:py-14">
      <Reveal>
        <div className="surface-pop rounded-3xl p-6 md:p-10 dot-grid">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Заявка</span>
              <h2 className="mt-2 text-3xl md:text-[40px] font-bold tracking-[-0.02em] leading-tight">
                Залиште <span className="text-gradient-accent">заявку</span>
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-md">
                Ми зв'яжемося з вами для консультації, демонстрації та індивідуального розрахунку.
              </p>

              <div className="mt-6 space-y-3">
                <a href="tel:+380000000000" className="flex items-center gap-3 surface-card rounded-xl p-3.5 hover:translate-y-[-1px] transition-transform">
                  <div className="grid place-items-center h-10 w-10 rounded-lg"
                    style={{ background: "color-mix(in oklab, var(--accent) 14%, var(--surface-2))" }}>
                    <Phone className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Телефон</div>
                    <div className="text-sm font-semibold">+38 (000) 000 00 00</div>
                  </div>
                </a>
                <a href="mailto:hello@hatosfera.ua" className="flex items-center gap-3 surface-card rounded-xl p-3.5 hover:translate-y-[-1px] transition-transform">
                  <div className="grid place-items-center h-10 w-10 rounded-lg"
                    style={{ background: "color-mix(in oklab, var(--accent) 14%, var(--surface-2))" }}>
                    <Mail className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Email</div>
                    <div className="text-sm font-semibold">hello@hatosfera.ua</div>
                  </div>
                </a>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Ваше ім'я" placeholder="Олена Коваль" />
              <Field label="Компанія / Агентство" placeholder="Хатосфера Estate" />
              <Select label="Кількість користувачів" options={USERS} />
              <Select label="Що цікавить" options={INTEREST} />
              <Field label="Контакт" placeholder="Telegram, WhatsApp або телефон" full />
              <Field label="Коментар" placeholder="Необов'язково" textarea full />
              <button
                type="submit"
                className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 h-12 rounded-full text-sm font-semibold transition-all hover:translate-y-[-1px]"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)", boxShadow: "0 14px 32px -14px var(--accent)" }}
              >
                Надіслати заявку <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, placeholder, full, textarea }: { label: string; placeholder: string; full?: boolean; textarea?: boolean }) {
  const cls = `w-full rounded-xl px-3.5 py-3 text-sm outline-none transition-all`;
  const style: React.CSSProperties = {
    background: "var(--surface-2)",
    border: "1px solid var(--border-soft)",
    color: "var(--foreground)",
  };
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] mb-1.5">{label}</span>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} className={cls} style={style} />
      ) : (
        <input placeholder={placeholder} className={cls} style={style} />
      )}
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] mb-1.5">{label}</span>
      <select
        className="w-full rounded-xl px-3.5 py-3 text-sm outline-none"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)", color: "var(--foreground)" }}
      >
        <option>Оберіть варіант</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
