import { describe, expect, it } from "vitest";
import {
  createWindowManagerState,
  reduceWindowState,
  type WindowManagerState,
} from "@/lib/window-manager";

const viewport = { width: 1280, height: 800 };

function open(
  state: WindowManagerState,
  id: string,
  title = id,
): WindowManagerState {
  return reduceWindowState(state, {
    type: "open",
    window: { id, title, href: `/${id}`, appId: id },
  });
}

describe("window manager state machine", () => {
  it("opens a focused window", () => {
    const state = open(createWindowManagerState(), "mission-control");
    expect(state.windows).toHaveLength(1);
    expect(state.focusedId).toBe("mission-control");
    expect(state.windows[0]?.state).toBe("open");
  });

  it("closes a window and removes it from state", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, { type: "close", id: "mission-control" });
    expect(state.windows).toHaveLength(0);
    expect(state.focusedId).toBeNull();
  });

  it("focuses a window to the highest z-index without changing maximized state", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = open(state, "github");
    state = reduceWindowState(state, { type: "maximize", id: "mission-control" });
    state = reduceWindowState(state, { type: "focus", id: "mission-control" });
    const mission = state.windows.find((item) => item.id === "mission-control");
    const github = state.windows.find((item) => item.id === "github");
    expect(mission?.state).toBe("maximized");
    expect(mission?.zIndex ?? 0).toBeGreaterThan(github?.zIndex ?? 0);
    expect(state.focusedId).toBe("mission-control");
  });

  it("minimizes a window and keeps it in the collection", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, { type: "minimize", id: "mission-control" });
    expect(state.windows[0]?.state).toBe("minimized");
    expect(state.windows).toHaveLength(1);
    expect(state.focusedId).toBeNull();
  });

  it("restores a minimized window", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, { type: "minimize", id: "mission-control" });
    state = reduceWindowState(state, { type: "restore", id: "mission-control" });
    expect(state.windows[0]?.state).toBe("open");
    expect(state.focusedId).toBe("mission-control");
  });

  it("maximizes and restores previous position", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, {
      type: "move",
      id: "mission-control",
      x: 180,
      y: 90,
      viewport,
    });
    state = reduceWindowState(state, { type: "maximize", id: "mission-control" });
    expect(state.windows[0]?.state).toBe("maximized");
    state = reduceWindowState(state, { type: "maximize", id: "mission-control" });
    expect(state.windows[0]?.state).toBe("open");
    expect(state.windows[0]?.x).toBe(180);
    expect(state.windows[0]?.y).toBe(90);
  });

  it("reopens a minimized window from the open action", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, { type: "minimize", id: "mission-control" });
    state = open(state, "mission-control");
    expect(state.windows[0]?.state).toBe("open");
    expect(state.windows).toHaveLength(1);
  });

  it("moves focus to the next visible window when the focused window closes", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = open(state, "github");
    state = open(state, "project-lab");
    expect(state.focusedId).toBe("project-lab");
    state = reduceWindowState(state, { type: "close", id: "project-lab" });
    expect(state.focusedId).toBe("github");
    expect(state.windows.map((item) => item.id).sort()).toEqual([
      "github",
      "mission-control",
    ]);
  });

  it("closes a background window without corrupting others", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = open(state, "github");
    state = open(state, "project-lab");
    state = reduceWindowState(state, { type: "focus", id: "github" });
    state = reduceWindowState(state, { type: "close", id: "github" });
    expect(state.windows.map((item) => item.id).sort()).toEqual([
      "mission-control",
      "project-lab",
    ]);
    expect(state.windows.every((item) => item.state === "open")).toBe(true);
  });

  it("reopens a closed window as a clean instance", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = reduceWindowState(state, {
      type: "move",
      id: "mission-control",
      x: 240,
      y: 120,
      viewport,
    });
    state = reduceWindowState(state, { type: "close", id: "mission-control" });
    state = open(state, "mission-control");
    expect(state.windows).toHaveLength(1);
    expect(state.windows[0]?.x).not.toBe(240);
    expect(state.windows[0]?.state).toBe("open");
    expect(state.focusedId).toBe("mission-control");
  });

  it("keeps independent state across multiple windows", () => {
    let state = open(createWindowManagerState(), "mission-control");
    state = open(state, "github");
    state = reduceWindowState(state, { type: "minimize", id: "mission-control" });
    state = reduceWindowState(state, { type: "maximize", id: "github" });
    const mission = state.windows.find((item) => item.id === "mission-control");
    const github = state.windows.find((item) => item.id === "github");
    expect(mission?.state).toBe("minimized");
    expect(github?.state).toBe("maximized");
  });
});
