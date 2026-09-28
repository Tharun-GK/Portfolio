"use client";

import { useRef } from "react";
import { AppWindow } from "@/components/os/AppWindow";
import { AppWindowBody } from "@/components/os/AppWindowBody";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { DesktopPayload } from "@/types/desktop";

interface WindowManagerProps {
  desktop: DesktopPayload;
}

export function WindowManager({ desktop }: WindowManagerProps) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const {
    windows,
    focusedId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
  } = useWindowManager();

  function viewport() {
    const node = workspaceRef.current;
    if (!node) {
      return { width: 1280, height: 720 };
    }
    return { width: node.clientWidth, height: node.clientHeight };
  }

  return (
    <div ref={workspaceRef} className="pointer-events-none absolute inset-0">
      {windows.map((item) => (
        <div key={`${item.id}-${item.openedAt}`} className="pointer-events-auto">
          <AppWindow
            window={item}
            focused={focusedId === item.id}
            onFocus={() => focusWindow(item.id)}
            onClose={() => closeWindow(item.id)}
            onMinimize={() => minimizeWindow(item.id)}
            onMaximize={() => maximizeWindow(item.id)}
            onMove={(x, y) => moveWindow(item.id, x, y, viewport())}
          >
            <AppWindowBody window={item} desktop={desktop} />
          </AppWindow>
        </div>
      ))}
    </div>
  );
}
