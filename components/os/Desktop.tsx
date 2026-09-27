"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/components/boot/BootScreen";
import { AppIconGrid } from "@/components/os/AppIcon";
import { usePalette } from "@/components/os/CommandPalette";
import { Taskbar } from "@/components/os/Taskbar";
import { WindowManager } from "@/components/os/WindowManager";
import { useWindowManager } from "@/hooks/useWindowManager";
import { persistSkipBoot, readSkipBoot } from "@/lib/boot";
import { SITE_NAME } from "@/lib/constants";
import type { DesktopApp } from "@/lib/os-apps";
import type { DesktopPayload } from "@/types/desktop";

interface DesktopProps {
  desktop: DesktopPayload;
}

export function Desktop({ desktop }: DesktopProps) {
  const [mode, setMode] = useState<"unknown" | "desktop">("unknown");
  const [booted, setBooted] = useState(false);
  const { openWindow } = useWindowManager();
  const palette = usePalette();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    function apply() {
      setMode(media.matches ? "desktop" : "unknown");
    }

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
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

  return (
    <div className="relative min-h-screen">
      <a
        href="#os-workspace"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--panel)] focus:px-3 focus:py-2"
      >
        Skip to workspace
      </a>
      <div
        id="os-workspace"
        className="absolute inset-0 bottom-14 overflow-hidden bg-[var(--bg)] p-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          {SITE_NAME}
        </p>
        <h1 className="mt-2 text-2xl font-semibold">{desktop.name}</h1>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">{desktop.positioning}</p>
        <div className="mt-8 max-w-3xl">
          <AppIconGrid onOpen={openApp} />
        </div>
        <WindowManager desktop={desktop} />
      </div>
      <Taskbar onCommand={() => palette.setOpen(true)} />
    </div>
  );
}
