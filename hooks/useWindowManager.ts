"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  createWindowManagerState,
  reduceWindowState,
  type OpenWindowInput,
  type ViewportSize,
  type WindowManagerState,
} from "@/lib/window-manager";

export type { ManagedWindow, WindowState } from "@/lib/window-manager";

const listeners = new Set<() => void>();

let store: WindowManagerState = createWindowManagerState();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): WindowManagerState {
  return store;
}

function dispatch(action: Parameters<typeof reduceWindowState>[1]): void {
  store = reduceWindowState(store, action);
  emit();
}

export function resetWindowManager(): void {
  store = createWindowManagerState();
  emit();
}

export function useWindowManager() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const openWindow = useCallback((window: OpenWindowInput) => {
    dispatch({ type: "open", window });
  }, []);

  const closeWindow = useCallback((id: string) => {
    dispatch({ type: "close", id });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: "minimize", id });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    dispatch({ type: "maximize", id });
  }, []);

  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: "restore", id });
  }, []);

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: "focus", id });
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number, viewport: ViewportSize) => {
    dispatch({ type: "move", id, x, y, viewport });
  }, []);

  return {
    windows: snapshot.windows,
    focusedId: snapshot.focusedId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
  };
}
