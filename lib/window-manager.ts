export type WindowState = "open" | "minimized" | "maximized";

export interface ManagedWindow {
  id: string;
  title: string;
  href: string;
  appId: string;
  state: WindowState;
  zIndex: number;
  x: number;
  y: number;
  restoreX: number;
  restoreY: number;
  width: number;
  height: number;
  openedAt: number;
}

export interface WindowManagerState {
  windows: ManagedWindow[];
  focusedId: string | null;
}

export interface OpenWindowInput {
  id: string;
  title: string;
  href: string;
  appId: string;
  x?: number;
  y?: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export const DEFAULT_WINDOW_WIDTH = 640;
export const DEFAULT_WINDOW_HEIGHT = 420;
export const TASKBAR_CLEARANCE = 72;

export type WindowManagerAction =
  | { type: "open"; window: OpenWindowInput }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "maximize"; id: string }
  | { type: "restore"; id: string }
  | { type: "move"; id: string; x: number; y: number; viewport: ViewportSize };

export function createWindowManagerState(): WindowManagerState {
  return { windows: [], focusedId: null };
}

function nextZ(windows: ManagedWindow[]): number {
  return windows.reduce((max, item) => Math.max(max, item.zIndex), 10) + 1;
}

function topVisibleId(windows: ManagedWindow[]): string | null {
  const visible = windows.filter((item) => item.state !== "minimized");
  if (visible.length === 0) {
    return null;
  }
  return [...visible].sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
}

export function clampWindowPosition(
  x: number,
  y: number,
  viewport: ViewportSize,
  width = DEFAULT_WINDOW_WIDTH,
): { x: number; y: number } {
  const minVisible = 64;
  const maxX = Math.max(0, viewport.width - minVisible);
  const maxY = Math.max(0, viewport.height - TASKBAR_CLEARANCE);
  return {
    x: Math.min(Math.max(x, minVisible - width), maxX),
    y: Math.min(Math.max(y, 0), maxY),
  };
}

function replaceWindow(
  windows: ManagedWindow[],
  id: string,
  update: (window: ManagedWindow) => ManagedWindow,
): ManagedWindow[] {
  return windows.map((item) => (item.id === id ? update(item) : item));
}

export function reduceWindowState(
  state: WindowManagerState,
  action: WindowManagerAction,
): WindowManagerState {
  switch (action.type) {
    case "open": {
      const existing = state.windows.find((item) => item.id === action.window.id);
      if (existing) {
        const windows = replaceWindow(state.windows, existing.id, (item) => ({
          ...item,
          state: "open",
          zIndex: nextZ(state.windows),
        }));
        return { windows, focusedId: existing.id };
      }

      const offset = state.windows.length * 28;
      const x = action.window.x ?? 72 + offset;
      const y = action.window.y ?? 56 + offset;
      const created: ManagedWindow = {
        id: action.window.id,
        title: action.window.title,
        href: action.window.href,
        appId: action.window.appId,
        state: "open",
        zIndex: nextZ(state.windows),
        x,
        y,
        restoreX: x,
        restoreY: y,
        width: DEFAULT_WINDOW_WIDTH,
        height: DEFAULT_WINDOW_HEIGHT,
        openedAt: Date.now(),
      };

      return {
        windows: [...state.windows, created],
        focusedId: created.id,
      };
    }
    case "close": {
      const windows = state.windows.filter((item) => item.id !== action.id);
      return {
        windows,
        focusedId:
          state.focusedId === action.id ? topVisibleId(windows) : state.focusedId,
      };
    }
    case "focus": {
      const target = state.windows.find((item) => item.id === action.id);
      if (!target || target.state === "minimized") {
        return state;
      }
      return {
        windows: replaceWindow(state.windows, action.id, (item) => ({
          ...item,
          zIndex: nextZ(state.windows),
        })),
        focusedId: action.id,
      };
    }
    case "minimize": {
      const windows = replaceWindow(state.windows, action.id, (item) => ({
        ...item,
        state: "minimized",
      }));
      return {
        windows,
        focusedId:
          state.focusedId === action.id ? topVisibleId(windows) : state.focusedId,
      };
    }
    case "maximize": {
      const target = state.windows.find((item) => item.id === action.id);
      if (!target) {
        return state;
      }
      if (target.state === "maximized") {
        return {
          windows: replaceWindow(state.windows, action.id, (item) => ({
            ...item,
            state: "open",
            x: item.restoreX,
            y: item.restoreY,
            zIndex: nextZ(state.windows),
          })),
          focusedId: action.id,
        };
      }
      return {
        windows: replaceWindow(state.windows, action.id, (item) => ({
          ...item,
          restoreX: item.x,
          restoreY: item.y,
          state: "maximized",
          zIndex: nextZ(state.windows),
        })),
        focusedId: action.id,
      };
    }
    case "restore": {
      const target = state.windows.find((item) => item.id === action.id);
      if (!target) {
        return state;
      }
      return {
        windows: replaceWindow(state.windows, action.id, (item) => ({
          ...item,
          state: "open",
          x: item.state === "maximized" ? item.restoreX : item.x,
          y: item.state === "maximized" ? item.restoreY : item.y,
          zIndex: nextZ(state.windows),
        })),
        focusedId: action.id,
      };
    }
    case "move": {
      const target = state.windows.find((item) => item.id === action.id);
      if (!target || target.state === "maximized") {
        return state;
      }
      const next = clampWindowPosition(action.x, action.y, action.viewport, target.width);
      return {
        windows: replaceWindow(state.windows, action.id, (item) => ({
          ...item,
          x: next.x,
          y: next.y,
          restoreX: next.x,
          restoreY: next.y,
        })),
        focusedId: state.focusedId,
      };
    }
    default:
      return state;
  }
}
