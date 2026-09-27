"use client";

import { useCallback, useSyncExternalStore } from "react";

export type WindowState = "open" | "minimized" | "maximized";

export interface ManagedWindow {
  id: string;
  title: string;
  href: string;
  state: WindowState;
  zIndex: number;
}

interface WindowManagerStore {
  windows: ManagedWindow[];
  focusedId: string | null;
}

const listeners = new Set<() => void>();

let store: WindowManagerStore = {
  windows: [],
  focusedId: null,
};

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): WindowManagerStore {
  return store;
}

function nextZ(windows: ManagedWindow[]): number {
  return windows.reduce((max, item) => Math.max(max, item.zIndex), 10) + 1;
}

export function useWindowManager() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const openWindow = useCallback((window: Omit<ManagedWindow, "state" | "zIndex">) => {
    const existing = store.windows.find((item) => item.id === window.id);
    if (existing) {
      store = {
        windows: store.windows.map((item) =>
          item.id === window.id
            ? { ...item, state: "open", zIndex: nextZ(store.windows) }
            : item,
        ),
        focusedId: window.id,
      };
      emit();
      return;
    }

    store = {
      windows: [
        ...store.windows,
        { ...window, state: "open", zIndex: nextZ(store.windows) },
      ],
      focusedId: window.id,
    };
    emit();
  }, []);

  const closeWindow = useCallback((id: string) => {
    store = {
      windows: store.windows.filter((item) => item.id !== id),
      focusedId: store.focusedId === id ? null : store.focusedId,
    };
    emit();
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    store = {
      windows: store.windows.map((item) =>
        item.id === id ? { ...item, state: "minimized" } : item,
      ),
      focusedId: store.focusedId === id ? null : store.focusedId,
    };
    emit();
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    store = {
      windows: store.windows.map((item) =>
        item.id === id
          ? {
              ...item,
              state: item.state === "maximized" ? "open" : "maximized",
              zIndex: nextZ(store.windows),
            }
          : item,
      ),
      focusedId: id,
    };
    emit();
  }, []);

  const focusWindow = useCallback((id: string) => {
    store = {
      windows: store.windows.map((item) =>
        item.id === id ? { ...item, zIndex: nextZ(store.windows), state: "open" } : item,
      ),
      focusedId: id,
    };
    emit();
  }, []);

  return {
    windows: snapshot.windows,
    focusedId: snapshot.focusedId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
  };
}
