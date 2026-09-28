"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@/lib/logger";

interface City3DBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface City3DBoundaryState {
  failed: boolean;
}

export class City3DBoundary extends Component<City3DBoundaryProps, City3DBoundaryState> {
  override state: City3DBoundaryState = { failed: false };

  static getDerivedStateFromError(): City3DBoundaryState {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("city_3d_failed", {
      reason: error.message,
      digest: info.componentStack?.slice(0, 180),
    });
  }

  override render(): ReactNode {
    if (this.state.failed) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
