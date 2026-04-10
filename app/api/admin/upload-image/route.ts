import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/adminAuth";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const adminPassword = request.headers.get("x-admin-password") || "";
  if (!isValidPassword(adminPassword)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing IMGBB_API_KEY in environment variables." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image is too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const imgbbBody = new FormData();
    imgbbBody.append("image", base64Image);
    imgbbBody.append("name", file.name.replace(/\.[^/.]+$/, ""));

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: imgbbBody,
      }
    );

    const body = (await response.json().catch(() => ({}))) as {
      data?: { url?: string; display_url?: string };
      error?: { message?: string };
      success?: boolean;
    };

    if (!response.ok || !body.success || !body.data?.url) {
      return NextResponse.json(
        { error: body.error?.message ?? "ImgBB upload failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        url: body.data.url,
        displayUrl: body.data.display_url ?? body.data.url,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
