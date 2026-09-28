"use client";

import { useEffect, useState } from "react";

function formatStamp(date: Date) {
  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date),
  };
}

export function CommandClock() {
  const [stamp, setStamp] = useState(() => formatStamp(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setStamp(formatStamp(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="text-right font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
      <time dateTime={new Date().toISOString()}>
        <span className="block sm:inline">{stamp.date}</span>
        <span className="mx-2 hidden text-[var(--accent)] sm:inline" aria-hidden>
          ·
        </span>
        <span className="block text-[var(--text)] sm:inline">{stamp.time}</span>
      </time>
    </p>
  );
}
