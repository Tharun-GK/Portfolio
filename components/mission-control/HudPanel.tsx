import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
  icon?: ReactNode;
}

export function HudPanel({ children, title, subtitle, className, id, icon }: HudPanelProps) {
  return (
    <section id={id} className={cn("hud-frame p-4 sm:p-5", className)}>
      {title ? (
        <header className="mb-4 flex items-start gap-2.5">
          {icon ? <span className="mt-0.5 text-[var(--accent)]">{icon}</span> : null}
          <div>
            <h2 className="text-[0.95rem] font-semibold tracking-wide text-[var(--text)]">{title}</h2>
            {subtitle ? <p className="mt-1 text-xs text-[var(--muted)]">{subtitle}</p> : null}
          </div>
        </header>
      ) : null}
      {children}
    </section>
  );
}
