import { ArrowRight, Clock3, MonitorSmartphone, ShieldCheck, type LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/siteContent";

type Status = "idle" | "success" | "error";
type ContactItem = [LucideIcon, string, string];

const contactItems: ContactItem[] = [
  [MonitorSmartphone, "Демо 15 хв", "покажемо CRM на вашому сценарії"],
  [Clock3, "Відповідь", "у робочий день після заявки"],
  [ShieldCheck, "Після заявки", "узгодимо тариф, дані та запуск"],
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();

    if (!name || !contact) {
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <section id="contact" className="relative min-h-[100dvh] px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-accent uppercase">
            contact
          </p>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] text-foreground md:text-6xl">
            {siteContent.contact.title}
          </h2>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            {siteContent.contact.text}
          </p>
          <div className="mt-8 grid gap-3">
            {contactItems.map(([Icon, label, text]) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-[24px] border border-border bg-surface/72 p-4 backdrop-blur-xl"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon data-icon="inline-start" />
                </span>
                <div>
                  <div className="font-semibold text-foreground">{label}</div>
                  <div className="text-sm text-muted-foreground">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass-panel grid gap-4 rounded-[34px] p-5 md:grid-cols-2 md:p-7"
        >
          <Field name="name" label="Ваше ім'я" placeholder="Олена Коваль" required />
          <Field name="company" label="Компанія / Агентство" placeholder="Хатосфера Estate" />
          <Select
            name="users_count"
            label="Кількість користувачів"
            options={siteContent.contact.users}
          />
          <Select name="interest" label="Що цікавить" options={siteContent.contact.interests} />
          <Field
            name="contact"
            label="Контакт"
            placeholder="Telegram, WhatsApp або телефон"
            required
          />
          <Field
            name="comment"
            label="Коментар"
            placeholder="Необов'язково"
            textarea
            className="md:col-span-2"
          />

          {status === "error" ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 md:col-span-2">
              Заповніть ім'я та контакт.
            </div>
          ) : null}
          {status === "success" ? (
            <div className="rounded-2xl border border-accent/40 bg-accent/12 px-4 py-3 text-sm text-accent md:col-span-2">
              Заявку надіслано. Ми скоро зв'яжемося з вами.
            </div>
          ) : null}

          <Button type="submit" className="md:col-span-2">
            Надіслати заявку
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  textarea,
  className,
  ...props
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  return (
    <label className={className ? `grid gap-2 ${className}` : "grid gap-2"}>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {textarea ? (
        <textarea
          {...props}
          rows={5}
          className="min-h-32 resize-y rounded-[22px] border border-border bg-background/58 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-border-strong focus:ring-2 focus:ring-ring"
        />
      ) : (
        <input
          {...props}
          className="h-12 rounded-full border border-border bg-background/58 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-border-strong focus:ring-2 focus:ring-ring"
        />
      )}
    </label>
  );
}

function Select({ label, options, ...props }: { name: string; label: string; options: string[] }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <select
        {...props}
        className="h-12 rounded-full border border-border bg-background/58 px-4 text-sm text-foreground outline-none transition focus:border-border-strong focus:ring-2 focus:ring-ring"
      >
        <option value="">Оберіть варіант</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
