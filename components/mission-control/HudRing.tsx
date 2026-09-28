import { clampProgress } from "@/lib/design-tokens";

interface HudRingProps {
  value: number;
  label: string;
  caption?: string;
  tone?: "cyan" | "green" | "violet";
}

const tones: Record<NonNullable<HudRingProps["tone"]>, string> = {
  cyan: "#4fd4ee",
  green: "#5ee0a8",
  violet: "#b48cff",
};

export function HudRing({ value, label, caption, tone = "cyan" }: HudRingProps) {
  const progress = clampProgress(value);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const stroke = tones[tone];

  return (
    <figure className="grid justify-items-center gap-2">
      <svg viewBox="0 0 92 92" className="h-[5.5rem] w-[5.5rem] text-[var(--text)]" aria-hidden>
        <circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke="rgba(126, 201, 216, 0.12)"
          strokeWidth="6"
        />
        <circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 46 46)"
          className="hud-ring-progress"
        />
        <text x="46" y="51" textAnchor="middle" fill="currentColor" fontSize="15" fontFamily="ui-monospace, monospace">
          {progress}%
        </text>
      </svg>
      <figcaption className="text-center">
        <p className="text-xs font-medium">{label}</p>
        {caption ? <p className="mt-1 text-[0.7rem] text-[var(--muted)]">{caption}</p> : null}
      </figcaption>
    </figure>
  );
}
