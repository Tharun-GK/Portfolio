"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCommandPalette } from "@/hooks/useCommandPalette";

type PaletteApi = ReturnType<typeof useCommandPalette>;

const PaletteContext = createContext<PaletteApi | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const palette = useCommandPalette();

  return (
    <PaletteContext.Provider value={palette}>
      {children}
      <CommandPalette />
    </PaletteContext.Provider>
  );
}

export function usePalette(): PaletteApi {
  const value = useContext(PaletteContext);
  if (!value) {
    throw new Error("usePalette must be used within CommandPaletteProvider");
  }
  return value;
}

function CommandPalette() {
  const router = useRouter();
  const { open, query, setQuery, results, close } = usePalette();
  const inputRef = useRef<HTMLInputElement>(null);
  const labelId = useId();
  const listId = useId();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function go(href: string) {
    close();
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-[var(--panel-strong)]/80 p-4 pt-[12vh]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <label id={labelId} htmlFor="command-palette-input" className="sr-only">
          Command search
        </label>
        <input
          id="command-palette-input"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && results[0]) {
              event.preventDefault();
              go(results[0].href);
            }
          }}
          placeholder="Open Mission Control, search Suraksha, python…"
          className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
          aria-controls={listId}
          aria-autocomplete="list"
        />
        <ul id={listId} role="listbox" className="mt-2 max-h-80 overflow-auto">
          {results.length === 0 ? (
            <li className="px-2 py-3 text-sm text-[var(--muted)]">No matching commands.</li>
          ) : (
            results.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === 0}>
                <Link
                  href={item.href}
                  className="block rounded-[var(--radius-sm)] px-2 py-2 hover:bg-[var(--panel-hover)]"
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.href);
                  }}
                >
                  <span className="block text-sm">{item.title}</span>
                  <span className="block text-xs text-[var(--muted)]">{item.description}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
        <p className="mt-2 font-mono text-[0.65rem] text-[var(--muted)]">
          Esc closes · Enter opens the first result
        </p>
      </div>
    </div>
  );
}
