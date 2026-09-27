import { NextResponse } from "next/server";
import { getActivityRepository } from "@/lib/repositories/static-activity-repository";

export async function GET() {
  const items = await getActivityRepository().getAllActivities();
  return NextResponse.json({ activities: items });
}
