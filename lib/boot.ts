export const BOOT_STORAGE_KEY = "tharun-os:skip-boot";

export const BOOT_STEPS = [
  "System initialization",
  "Loading modules",
  "Loading project registry",
  "Loading activity stream",
  "Loading system status",
  "Desktop ready",
] as const;

export function readSkipBoot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function persistSkipBoot(): void {
  try {
    window.localStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    // Storage may be unavailable; boot still completes in memory.
  }
}
