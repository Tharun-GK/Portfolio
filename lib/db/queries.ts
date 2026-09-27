import { getActivityRepository } from "@/lib/repositories/static-activity-repository";
import { getProjectRepository } from "@/lib/repositories/static-project-repository";

/**
 * Query façade. UI and API routes depend on repositories, not on Prisma or local files.
 */
export const queries = {
  projects: getProjectRepository(),
  activities: getActivityRepository(),
};
