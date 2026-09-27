import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "quiet";
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-[var(--motion-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-[var(--accent)] text-[var(--bg)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--text)] hover:bg-[var(--panel-hover)]",
        variant === "quiet" &&
          "bg-[var(--panel-strong)] text-[var(--text)] hover:bg-[var(--panel-hover)]",
        className,
      )}
      {...props}
    />
  );
}
