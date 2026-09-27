import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "aside" | "div" | "li";
}

export function Panel({ children, className, as: Tag = "section" }: PanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] p-5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
