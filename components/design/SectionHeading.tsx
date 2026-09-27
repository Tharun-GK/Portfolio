import { type ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  eyebrow?: string;
}

export function SectionHeading({ children, eyebrow }: SectionHeadingProps) {
  return (
    <div className="mb-4">
      {eyebrow ? (
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-lg font-medium tracking-tight">{children}</h2>
    </div>
  );
}
