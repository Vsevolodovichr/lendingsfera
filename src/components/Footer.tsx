import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-8 pt-4">
      <div className="surface-card rounded-2xl px-5 md:px-7 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Хатосфера" className="h-7 w-7 object-contain" />
          <div className="text-sm">
            <span className="font-semibold">Хатосфера <span className="text-gradient-accent">CRM</span></span>
            <span className="block text-[11px] text-[var(--muted-foreground)]">CRM для ринку нерухомості України</span>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[var(--muted-foreground)]">
          <a href="#features" className="hover:text-[var(--foreground)]">Функціонал</a>
          <a href="#screens" className="hover:text-[var(--foreground)]">Інтерфейс</a>
          <a href="#pricing" className="hover:text-[var(--foreground)]">Ціни</a>
          <a href="#services" className="hover:text-[var(--foreground)]">Розширення</a>
          <a href="#contact" className="hover:text-[var(--foreground)]">Зв'язатись</a>
        </nav>
        <div className="text-[11px] text-[var(--muted-foreground)]">© 2026 Хатосфера. Усі права захищені.</div>
      </div>
    </footer>
  );
}
