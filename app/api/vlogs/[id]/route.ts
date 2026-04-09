import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/adminAuth";
import { createServerClient } from "@/utils/supabase/server";

const isAuthorized = (request: NextRequest) => {
  const adminPassword = request.headers.get("x-admin-password") || "";
  return isValidPassword(adminPassword);
};

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as {
      location?: string;
      description?: string;
      image?: string;
      date?: string;
      tall?: boolean;
    };

    if (!body.location || !body.description || !body.image) {
      return NextResponse.json(
        { error: "location, description, and image are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient({ admin: true });
    const { data, error } = await supabase
      .from("vlogs")
      .update({
        location: body.location,
        description: body.description,
        image_url: body.image,
        visit_date: body.date || null,
        tall: Boolean(body.tall),
      })
      .eq("id", id)
      .select("id, location, description, image_url, visit_date, tall, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: {
        id: String(data.id),
        location: data.location,
        description: data.description,
        image: data.image_url,
        date: data.visit_date,
        tall: Boolean(data.tall),
        created_at: data.created_at,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to update vlog" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(_request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = createServerClient({ admin: true });
  const { error } = await supabase.from("vlogs").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
