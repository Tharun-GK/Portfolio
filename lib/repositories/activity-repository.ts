import type { Activity } from "@/types/activity";

export interface ActivityRepository {
  getAllActivities(): Promise<Activity[]>;
  getActivitiesByProject(slug: string): Promise<Activity[]>;
}
