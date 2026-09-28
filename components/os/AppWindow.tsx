"use client";

import { useReducedMotion } from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { WindowControls } from "@/components/os/WindowControls";
import type { ManagedWindow } from "@/lib/window-manager";
import { cn } from "@/lib/utils";

interface AppWindowProps {
  window: ManagedWindow;
  focused: boolean;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
}

export function AppWindow({
  window,
  focused,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
}: AppWindowProps) {
  const reduceMotion = useReducedMotion();
  const drag = useRef<{
    pointerId: number;
    ox: number;
    oy: number;
    startX: number;
    startY: number;
  } | null>(null);

  if (window.state === "minimized") {
    return null;
  }

  const maximized = window.state === "maximized";

  function onDragStart(event: PointerEvent<HTMLDivElement>) {
    if (maximized || event.button !== 0) {
      onFocus();
      return;
    }
    event.stopPropagation();
    onFocus();
    drag.current = {
      pointerId: event.pointerId,
      ox: event.clientX,
      oy: event.clientY,
      startX: window.x,
      startY: window.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.pointerId !== drag.current.pointerId) {
      return;
    }
    onMove(
      drag.current.startX + (event.clientX - drag.current.ox),
      drag.current.startY + (event.clientY - drag.current.oy),
    );
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.pointerId !== drag.current.pointerId) {
      return;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
  }

  return (
    <section
      role="dialog"
      aria-label={window.title}
      aria-modal="false"
      className={cn(
        "absolute flex flex-col overflow-hidden border bg-[var(--os-panel)] shadow-[var(--os-glow)]",
        focused
          ? "border-[var(--os-cyan)]"
          : "border-[var(--os-border)]",
        maximized
          ? "inset-3 bottom-[4.75rem] left-3 right-3 top-12"
          : "h-[min(26.25rem,calc(100%-5.5rem))] w-[min(40rem,calc(100%-1.5rem))]",
        reduceMotion ? "" : "transition-[opacity,box-shadow] duration-[var(--motion-fast)]",
      )}
      style={
        maximized
          ? { zIndex: window.zIndex, borderRadius: 2 }
          : {
              left: window.x,
              top: window.y,
              zIndex: window.zIndex,
              borderRadius: 2,
            }
      }
      onMouseDown={onFocus}
    >
      <div onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <WindowControls
          title={window.title}
          maximized={maximized}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
          onDragStart={onDragStart}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
    </section>
  );
}
