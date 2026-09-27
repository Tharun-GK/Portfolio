"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared/Button";
import { BOOT_STEPS, persistSkipBoot, readSkipBoot } from "@/lib/boot";
import { SITE_NAME } from "@/lib/constants";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (readSkipBoot() || reduceMotion) {
      persistSkipBoot();
      onComplete();
    }
  }, [onComplete, reduceMotion]);

  useEffect(() => {
    if (readSkipBoot() || reduceMotion) {
      return;
    }

    if (stepIndex >= BOOT_STEPS.length) {
      persistSkipBoot();
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setStepIndex((current) => current + 1);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion, stepIndex]);

  function skip() {
    persistSkipBoot();
    onComplete();
  }

  const current = BOOT_STEPS[Math.min(stepIndex, BOOT_STEPS.length - 1)];

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        className="flex min-h-screen flex-col justify-center bg-[var(--bg)] px-6"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {SITE_NAME}
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Initializing environment</h1>
        <p className="mt-4 font-mono text-sm text-[var(--accent)]">{current}</p>
        <ol className="sr-only">
          {BOOT_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-8">
          <Button variant="ghost" onClick={skip}>
            Skip
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
