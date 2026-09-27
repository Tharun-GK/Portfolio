"use client";

import { AppWindow } from "@/components/os/AppWindow";
import { AppWindowBody } from "@/components/os/AppWindowBody";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { DesktopPayload } from "@/types/desktop";

interface WindowManagerProps {
  desktop: DesktopPayload;
}

export function WindowManager({ desktop }: WindowManagerProps) {
  const {
    windows,
    focusedId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
  } = useWindowManager();

  return (
    <>
      {windows.map((item) => (
        <AppWindow
          key={item.id}
          window={item}
          focused={focusedId === item.id}
          onFocus={() => focusWindow(item.id)}
          onClose={() => closeWindow(item.id)}
          onMinimize={() => minimizeWindow(item.id)}
          onMaximize={() => maximizeWindow(item.id)}
          onMove={(x, y) => moveWindow(item.id, x, y)}
        >
          <AppWindowBody window={item} desktop={desktop} />
        </AppWindow>
      ))}
    </>
  );
}
