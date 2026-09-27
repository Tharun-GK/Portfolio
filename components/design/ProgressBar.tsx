import { clampProgress } from "@/lib/design-tokens";

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const progress = clampProgress(value);

  return (
    <div className="grid gap-1">
      {label ? (
        <p className="text-xs text-[var(--muted)]">
          {label} {progress}%
        </p>
      ) : (
        <span className="sr-only">Progress {progress} percent</span>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={label ?? "Progress"}
        className="h-1.5 overflow-hidden rounded-full bg-[var(--panel-strong)]"
      >
        <div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
