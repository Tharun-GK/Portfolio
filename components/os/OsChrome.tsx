"use client";

import { type ReactNode } from "react";
import { CommandPaletteProvider } from "@/components/os/CommandPalette";

export function OsChrome({ children }: { children: ReactNode }) {
  return <CommandPaletteProvider>{children}</CommandPaletteProvider>;
}
