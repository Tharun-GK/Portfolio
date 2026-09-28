"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface CityTransitionProps {
  locationId: string;
  children: ReactNode;
}

export function CityTransition({ locationId, children }: CityTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={locationId}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
    >
      {children}
    </motion.div>
  );
}
