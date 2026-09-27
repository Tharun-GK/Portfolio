"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { searchPortfolio, type SearchResult } from "@/lib/search";

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results: SearchResult[] = useMemo(
    () => (query.trim() ? searchPortfolio(query) : []),
    [query],
  );

  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isPalette =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      const isSlash =
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement);

      if (isPalette || isSlash) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    toggle,
  };
}
