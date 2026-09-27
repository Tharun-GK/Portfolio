export type AnalyticsEventName =
  | "portfolio_open"
  | "project_open"
  | "architecture_open"
  | "use_case_open"
  | "resume_open"
  | "github_open"
  | "contact_open"
  | "command_search"
  | "city_open";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  path?: string;
  projectSlug?: string;
}

export function track(event: AnalyticsEvent): void {
  try {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    void event;
  } catch {
    // Analytics must never block rendering.
  }
}
