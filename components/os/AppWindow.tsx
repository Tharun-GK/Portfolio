"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { WindowControls } from "@/components/os/WindowControls";
import type { ManagedWindow } from "@/hooks/useWindowManager";
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
  const drag = useRef<{ ox: number; oy: number; startX: number; startY: number } | null>(
    null,
  );

  if (window.state === "minimized") {
    return null;
  }

  const maximized = window.state === "maximized";

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (maximized || event.button !== 0) {
      return;
    }
    onFocus();
    drag.current = {
      ox: event.clientX,
      oy: event.clientY,
      startX: window.x,
      startY: window.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) {
      return;
    }
    const x = drag.current.startX + (event.clientX - drag.current.ox);
    const y = Math.max(0, drag.current.startY + (event.clientY - drag.current.oy));
    onMove(x, y);
  }

  function onPointerUp() {
    drag.current = null;
  }

  return (
    <motion.section
      role="dialog"
      aria-label={window.title}
      aria-modal="false"
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] shadow-[var(--shadow-panel)]",
        focused ? "ring-1 ring-[var(--accent)]" : "",
        maximized
          ? "inset-4 bottom-20 right-4 left-4 top-4 w-auto"
          : "h-[min(28rem,calc(100%-6rem))] w-[min(40rem,calc(100%-2rem))]",
      )}
      style={
        maximized
          ? { zIndex: window.zIndex }
          : { left: window.x, top: window.y, zIndex: window.zIndex }
      }
      onMouseDown={onFocus}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
    >
      <div onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        <WindowControls
          title={window.title}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
          onPointerDown={onPointerDown}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
    </motion.section>
  );
}
