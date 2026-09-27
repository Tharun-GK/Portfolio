import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/service";

export async function POST() {
  const provider = getAIProvider();

  if (!provider.isAvailable()) {
    return NextResponse.json(
      {
        ok: false,
        error: "AI services are unavailable. The portfolio remains fully usable without them.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { ok: false, error: "AI request handling is not enabled in this phase." },
    { status: 501 },
  );
}
