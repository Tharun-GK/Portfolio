import { activities } from "@/data/activities";
import type { ActivityRepository } from "@/lib/repositories/activity-repository";
import type { Activity } from "@/types/activity";

export class StaticActivityRepository implements ActivityRepository {
  async getAllActivities(): Promise<Activity[]> {
    return [...activities].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getActivitiesByProject(slug: string): Promise<Activity[]> {
    return activities.filter((item) => item.relatedProjectSlug === slug);
  }
}

const staticActivityRepository = new StaticActivityRepository();

export function getActivityRepository(): ActivityRepository {
  return staticActivityRepository;
}
