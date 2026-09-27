"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CommandHit } from "@/lib/commands";

type Resolver = (query: string, limit?: number) => CommandHit[];

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resolver, setResolver] = useState<Resolver | null>(null);

  const results: CommandHit[] = useMemo(
    () => (resolver ? resolver(query) : []),
    [query, resolver],
  );

  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    void import("@/lib/commands").then((module) => {
      if (!cancelled) {
        setResolver(() => module.resolveCommandQuery);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isPalette =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      const isSlash =
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement) &&
        !(event.target instanceof HTMLSelectElement);

      if (isPalette || (isSlash && !open)) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        setQuery("");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    toggle,
    close,
  };
}
