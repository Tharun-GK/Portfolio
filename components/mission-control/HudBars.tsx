import Link from "next/link";
import { clampProgress } from "@/lib/design-tokens";

interface HudBarsProps {
  items: {
    id: string;
    label: string;
    value: number;
    status?: string;
    tone?: string;
    href?: string;
  }[];
}

export function HudBars({ items }: HudBarsProps) {
  return (
    <ul className="grid gap-4" aria-label="Mission overview">
      {items.map((item) => {
        const value = clampProgress(item.value);
        const body = (
          <>
            <div className="flex justify-between gap-2 text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="font-mono text-[var(--muted)]">{value}%</span>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden bg-[rgba(8,16,24,0.85)]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-label={item.label}
            >
              <div
                className="h-full"
                style={{ width: `${value}%`, background: item.tone ?? "var(--accent)" }}
              />
            </div>
            {item.status ? (
              <p className="mt-1.5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: item.tone ?? "var(--accent)" }}
                  aria-hidden
                />
                {item.status}
              </p>
            ) : null}
          </>
        );

        return (
          <li key={item.id}>
            {item.href ? (
              <Link href={item.href} className="block hover:text-[var(--accent)]">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}
