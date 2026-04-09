import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/adminAuth";
import { createServerClient } from "@/utils/supabase/server";

const normalizeGalleryImages = (galleryImages?: string[]) => {
  return (galleryImages ?? [])
    .map((image) => image.trim())
    .filter(Boolean)
    .slice(0, 6);
};

const isMissingVlogImagesTableError = (error: { message?: string } | null) => {
  if (!error?.message) return false;
  return (
    error.message.includes("public.vlog_images") &&
    error.message.toLowerCase().includes("schema cache")
  );
};

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("vlogs")
    .select("id, location, description, image_url, visit_date, tall, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const posts = (data ?? []).map((row) => ({
    id: String(row.id),
    location: row.location,
    description: row.description,
    image: row.image_url,
    date: row.visit_date,
    tall: Boolean(row.tall),
    created_at: row.created_at,
  }));

  return NextResponse.json({ data: posts });
}

export async function POST(request: NextRequest) {
  const adminPassword = request.headers.get("x-admin-password") || "";

  if (!isValidPassword(adminPassword)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      location?: string;
      description?: string;
      image?: string;
      date?: string;
      tall?: boolean;
      galleryImages?: string[];
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
      .insert({
        location: body.location,
        description: body.description,
        image_url: body.image,
        visit_date: body.date || null,
        tall: Boolean(body.tall),
      })
      .select("id, location, description, image_url, visit_date, tall, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message +
            " (If this persists, set SUPABASE_SERVICE_ROLE_KEY and run SUPABASE_BLOG_SETUP.sql)",
        },
        { status: 500 }
      );
    }

    const galleryImages = normalizeGalleryImages(body.galleryImages);
    if (galleryImages.length > 0) {
      const { error: galleryError } = await supabase.from("vlog_images").insert(
        galleryImages.map((imageUrl, index) => ({
          vlog_id: data.id,
          image_url: imageUrl,
          position: index + 1,
        }))
      );

      if (galleryError && !isMissingVlogImagesTableError(galleryError)) {
        return NextResponse.json({ error: galleryError.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      data: {
        id: String(data.id),
        location: data.location,
        description: data.description,
        image: data.image_url,
        date: data.visit_date,
        galleryImages,
        tall: Boolean(data.tall),
        created_at: data.created_at,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to create vlog" }, { status: 500 });
  }
}
