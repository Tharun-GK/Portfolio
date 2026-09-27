"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("ui_error_boundary", {
      reason: error.message,
      digest: info.componentStack?.slice(0, 180),
    });
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="rounded-lg border border-[var(--border)] p-4">
          <h2 className="text-base font-semibold">This panel failed to load</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The rest of THARUN OS remains available. Refresh this view to try again.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}
