import { NextResponse } from "next/server";
import { getGitHubSnapshot } from "@/lib/github";

export async function GET() {
  const snapshot = await getGitHubSnapshot();
  return NextResponse.json(snapshot);
}
