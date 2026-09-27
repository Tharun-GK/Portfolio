"use client";

import { useEffect, useState } from "react";

export function DesktopClock() {
  const [value, setValue] = useState("");

  useEffect(() => {
    function tick() {
      setValue(
        new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    }

    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!value) {
    return <span className="hidden w-12 sm:inline" />;
  }

  return (
    <time className="hidden font-mono text-xs text-[var(--muted)] sm:block" dateTime={value}>
      {value}
    </time>
  );
}
