import { NextResponse } from "next/server";

const CONTACT_EMAIL = "rakibulhassan5523@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const payload = new URLSearchParams({
      name,
      email,
      subject,
      message,
      _captcha: "false",
      _template: "table",
    });

    const upstreamResponse = await fetch(
      `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: payload.toString(),
        cache: "no-store",
      }
    );

    const upstreamJson = await upstreamResponse
      .json()
      .catch(() => ({ message: "Mail service response parse failed." }));

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          message:
            upstreamJson?.message ||
            "Mail service rejected the request. Check FormSubmit activation email once.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unable to process request right now." },
      { status: 500 }
    );
  }
}
