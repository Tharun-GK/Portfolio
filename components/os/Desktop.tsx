"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/components/boot/BootScreen";
import { usePalette } from "@/components/os/CommandPalette";
import { SystemCore } from "@/components/os/SystemCore";
import { SystemRails } from "@/components/os/SystemRails";
import { SystemStatusBar } from "@/components/os/SystemStatusBar";
import { Taskbar } from "@/components/os/Taskbar";
import { WindowManager } from "@/components/os/WindowManager";
import { useWindowManager } from "@/hooks/useWindowManager";
import { persistSkipBoot, readSkipBoot } from "@/lib/boot";
import { getDesktopApp, type DesktopApp } from "@/lib/os-apps";
import type { DesktopPayload } from "@/types/desktop";

interface DesktopProps {
  desktop: DesktopPayload;
}

export function Desktop({ desktop }: DesktopProps) {
  const [mode, setMode] = useState<"unknown" | "desktop">("unknown");
  const [wide, setWide] = useState(false);
  const [booted, setBooted] = useState(false);
  const { openWindow } = useWindowManager();
  const palette = usePalette();

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const wideMedia = window.matchMedia("(min-width: 1024px)");

    function apply() {
      setMode(desktopMedia.matches ? "desktop" : "unknown");
      setWide(wideMedia.matches);
    }

    apply();
    desktopMedia.addEventListener("change", apply);
    wideMedia.addEventListener("change", apply);
    return () => {
      desktopMedia.removeEventListener("change", apply);
      wideMedia.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (mode !== "desktop") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (readSkipBoot() || reduceMotion) {
      persistSkipBoot();
      setBooted(true);
    }
  }, [mode]);

  const onBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  function openApp(app: DesktopApp) {
    openWindow({
      id: app.id,
      title: app.title,
      href: app.href,
      appId: app.id,
    });
  }

  if (mode !== "desktop") {
    return null;
  }

  if (!booted) {
    return <BootScreen onComplete={onBootComplete} />;
  }

  const projectLab = getDesktopApp("project-lab");

  return (
    <div className="os-shell relative min-h-screen">
      <a
        href="#os-workspace"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--panel)] focus:px-3 focus:py-2"
      >
        Skip to workspace
      </a>
      <SystemStatusBar currentFocus={desktop.currentFocus} />
      <div
        id="os-workspace"
        className="absolute inset-0 bottom-14 overflow-hidden pt-10"
      >
        <SystemCore desktop={desktop} onOpen={openApp} />
        <SystemRails
          desktop={desktop}
          compact={!wide}
          onOpenProjects={() => {
            if (projectLab) {
              openApp(projectLab);
            }
          }}
        />
        <WindowManager desktop={desktop} />
      </div>
      <Taskbar onCommand={() => palette.setOpen(true)} onOpenApp={openApp} />
    </div>
  );
}
