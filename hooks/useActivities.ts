import { getActivityRepository } from "@/lib/repositories/static-activity-repository";
import type { Activity } from "@/types/activity";

export async function listActivities(): Promise<Activity[]> {
  return getActivityRepository().getAllActivities();
}
