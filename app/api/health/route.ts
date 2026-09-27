import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "tharun-os",
    time: new Date().toISOString(),
  });
}
