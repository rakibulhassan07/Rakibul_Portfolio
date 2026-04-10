import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/adminAuth";
import { createServerClient } from "@/utils/supabase/server";

const normalizeImageUrl = (value?: string) => (value ?? "").trim();

const normalizeGalleryImages = (galleryImages?: string[], heroImage?: string) => {
  const hero = normalizeImageUrl(heroImage);
  return (galleryImages ?? [])
    .map((image) => image.trim())
    .filter(Boolean)
    .filter((image) => image !== hero)
    .slice(0, 6);
};

const isMissingVlogImagesTableError = (error: { message?: string } | null) => {
  if (!error?.message) return false;
  return (
    error.message.includes("public.vlog_images") &&
    error.message.toLowerCase().includes("schema cache")
  );
};

const isAuthorized = (request: NextRequest) => {
  const adminPassword = request.headers.get("x-admin-password") || "";
  return isValidPassword(adminPassword);
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("vlogs")
    .select("id, location, description, image_url, visit_date, tall, created_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const { data: galleryRows, error: galleryError } = await supabase
    .from("vlog_images")
    .select("image_url, position")
    .eq("vlog_id", id)
    .order("position", { ascending: true });

  if (galleryError && !isMissingVlogImagesTableError(galleryError)) {
    return NextResponse.json({ error: galleryError.message }, { status: 500 });
  }

  return NextResponse.json({
    data: {
      id: String(data.id),
      location: data.location,
      description: data.description,
      image: data.image_url,
      date: data.visit_date,
      galleryImages: normalizeGalleryImages(
        (galleryRows ?? []).map((row) => row.image_url),
        data.image_url
      ),
      tall: Boolean(data.tall),
      created_at: data.created_at,
    },
  });
}

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

    const galleryImages = normalizeGalleryImages(body.galleryImages, body.image);

    const { error: deleteGalleryError } = await supabase
      .from("vlog_images")
      .delete()
      .eq("vlog_id", id);

    if (deleteGalleryError && !isMissingVlogImagesTableError(deleteGalleryError)) {
      return NextResponse.json({ error: deleteGalleryError.message }, { status: 500 });
    }

    if (galleryImages.length > 0) {
      const { error: galleryError } = await supabase.from("vlog_images").insert(
        galleryImages.map((imageUrl, index) => ({
          vlog_id: id,
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

  const { error: galleryError } = await supabase.from("vlog_images").delete().eq("vlog_id", id);
  if (galleryError && !isMissingVlogImagesTableError(galleryError)) {
    return NextResponse.json({ error: galleryError.message }, { status: 500 });
  }

  const { error } = await supabase.from("vlogs").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
