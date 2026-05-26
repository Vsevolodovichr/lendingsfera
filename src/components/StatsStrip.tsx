import { Users, Building2, ShieldCheck, Lock } from "lucide-react";

const STATS = [
  { icon: ShieldCheck, value: "99.9%", label: "доступність" },
  { icon: Lock, value: "Дані", label: "під захистом" },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
      {STATS.map(({ icon: Icon, value, label }) => (
        <div key={label} className="surface-card rounded-2xl p-3 flex items-center gap-3">
          <div
            className="grid place-items-center h-10 w-10 rounded-xl shrink-0"
            style={{ background: "color-mix(in oklab, var(--accent) 12%, var(--surface-2))" }}
          >
            <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">{value}</div>
            <div className="text-xs text-muted-foreground leading-tight truncate">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
