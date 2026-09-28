"use client";

import { type PointerEvent } from "react";

interface WindowControlsProps {
  title: string;
  maximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onDragStart: (event: PointerEvent<HTMLDivElement>) => void;
}

export function WindowControls({
  title,
  maximized,
  onMinimize,
  onMaximize,
  onClose,
  onDragStart,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--os-border)] bg-[var(--os-chrome)] px-2 py-1.5">
      <div
        className="flex min-w-0 flex-1 cursor-grab items-center gap-2 active:cursor-grabbing"
        onPointerDown={onDragStart}
      >
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-[var(--os-cyan)]"
        />
        <h2 className="truncate font-mono text-[0.7rem] uppercase tracking-[0.14em]">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          className="h-7 w-7 font-mono text-xs text-[var(--muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--text)]"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onMinimize();
          }}
          aria-label={`Minimize ${title}`}
        >
          –
        </button>
        <button
          type="button"
          className="h-7 w-7 font-mono text-xs text-[var(--muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--text)]"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onMaximize();
          }}
          aria-label={maximized ? `Restore ${title}` : `Maximize ${title}`}
        >
          {maximized ? "▭" : "□"}
        </button>
        <button
          type="button"
          className="h-7 w-7 font-mono text-xs text-[var(--muted)] hover:bg-[var(--os-danger-bg)] hover:text-[var(--os-danger)]"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label={`Close ${title}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}
