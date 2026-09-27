"use client";

import { type PointerEvent } from "react";

interface WindowControlsProps {
  title: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
}

export function WindowControls({
  title,
  onMinimize,
  onMaximize,
  onClose,
  onPointerDown,
}: WindowControlsProps) {
  return (
    <div
      className="flex cursor-grab items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 active:cursor-grabbing"
      onPointerDown={onPointerDown}
    >
      <h2 className="truncate text-sm font-medium">{title}</h2>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="h-7 w-7 rounded-[var(--radius-sm)] text-sm hover:bg-[var(--panel-hover)]"
          onClick={onMinimize}
          aria-label={`Minimize ${title}`}
        >
          –
        </button>
        <button
          type="button"
          className="h-7 w-7 rounded-[var(--radius-sm)] text-sm hover:bg-[var(--panel-hover)]"
          onClick={onMaximize}
          aria-label={`Maximize ${title}`}
        >
          □
        </button>
        <button
          type="button"
          className="h-7 w-7 rounded-[var(--radius-sm)] text-sm hover:bg-[var(--panel-hover)]"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}
