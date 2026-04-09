import { NextResponse } from "next/server";
import { isValidPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };

    if (!body.password || !isValidPassword(body.password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to verify password" }, { status: 500 });
  }
}
