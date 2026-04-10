"use client";

import { useEffect, useMemo, useState } from "react";
import type { VlogPost } from "@/types/vlog";

type UploadApiResponse = {
  data?: {
    url?: string;
    display_url?: string;
  };
  error?: string | { message?: string };
  success?: boolean;
};

type FormState = {
  location: string;
  description: string;
  image: string;
  date: string;
  galleryImages: string[];
};

const initialForm: FormState = {
  location: "",
  description: "",
  image: "",
  date: "",
  galleryImages: ["", "", "", "", "", ""],
};

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface BlogAdminPanelProps {
  adminPassword: string;
  onLogout: () => void;
}

interface DragDropImageFieldProps {
  label: string;
  value: string;
  required?: boolean;
  isUploading?: boolean;
  onFileSelected: (file: File) => void;
  onClear?: () => void;
}

function DragDropImageField({
  label,
  value,
  required,
  isUploading,
  onFileSelected,
  onClear,
}: DragDropImageFieldProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const pickFirstFile = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    onFileSelected(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-[#b8a88a]">{label}</p>
        {value && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-red-300 transition-colors hover:text-red-200"
          >
            Remove
          </button>
        ) : null}
      </div>

      <label
        onDragOver={(event) => {
          event.preventDefault();
          if (!isUploading) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          if (isUploading) return;
          pickFirstFile(event.dataTransfer.files);
        }}
        className={`flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-3 text-center transition-colors ${
          isDragOver
            ? "border-orange-400 bg-orange-500/10"
            : "border-gray-700 bg-black/35 hover:border-orange-500/45"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          onChange={(event) => pickFirstFile(event.target.files)}
          required={required && !value}
        />
        <span className="text-sm text-[#c9b9a1]">
          {isUploading ? "Uploading..." : "Drag and drop image or click"}
        </span>
        <span className="mt-1 text-xs text-[#9f9074]">Original image uploads to ImgBB</span>
      </label>

      <input
        value={value}
        readOnly
        className="w-full rounded-lg border border-gray-800 bg-black/60 px-4 py-3 text-[#9f9074] outline-none"
        placeholder="Image link will be generated automatically"
      />

      {value ? (
        <div className="flex h-24 w-full items-center justify-center rounded-lg border border-gray-800 bg-black/45 p-1">
          <img
            src={value}
            alt={`${label} preview`}
            className="max-h-full max-w-full rounded object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function BlogAdminPanel({ adminPassword, onLogout }: BlogAdminPanelProps) {
  const [posts, setPosts] = useState<VlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [uploadingSlots, setUploadingSlots] = useState<Record<string, boolean>>({});

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);
  const isAnyUploadInProgress = useMemo(
    () => Object.values(uploadingSlots).some(Boolean),
    [uploadingSlots]
  );

  const notifyVlogUpdated = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("vlog:lastUpdated", Date.now().toString());
    window.dispatchEvent(new Event("vlog:updated"));
  };

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/vlogs", { cache: "no-store" });
      const body = (await res.json()) as { data?: VlogPost[]; error?: string };
      if (!res.ok) {
        setMessage(body.error ?? "Failed to load posts");
        return;
      }
      setPosts(body.data ?? []);
    } catch {
      setMessage("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setUploadingSlots({});
  };

  const setUploadingState = (slot: string, uploading: boolean) => {
    setUploadingSlots((prev) => ({ ...prev, [slot]: uploading }));
  };

  const uploadImage = async (slot: string, file: File, onSuccess: (url: string) => void) => {
    setUploadingState(slot, true);
    setMessage("");

    try {
      const publicApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!publicApiKey) {
        setMessage("Missing NEXT_PUBLIC_IMGBB_API_KEY in environment variables.");
        return;
      }

      const payload = new FormData();
      payload.append("image", file);
      payload.append("name", file.name.replace(/\.[^/.]+$/, ""));

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(publicApiKey)}`, {
        method: "POST",
        body: payload,
      });

      const body = (await res.json().catch(() => ({}))) as UploadApiResponse;
      if (!res.ok || !body.success || !body.data?.url) {
        setMessage(typeof body.error === "string" ? body.error : body.error?.message ?? "Failed to upload image");
        return;
      }

      onSuccess(body.data.url);
      setMessage("Image uploaded successfully.");
    } catch {
      setMessage("Failed to upload image");
    } finally {
      setUploadingState(slot, false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const endpoint = isEditing ? `/api/vlogs/${editingId}` : "/api/vlogs";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(form),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMessage(body.error ?? "Failed to save post");
        return;
      }

      setMessage(isEditing ? "Post updated" : "Post added");
      resetForm();
      await loadPosts();
      notifyVlogUpdated();
    } catch {
      setMessage("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEdit = (post: VlogPost) => {
    const loadEditData = async () => {
      setMessage("");
      try {
        const res = await fetch(`/api/vlogs/${post.id}`, { cache: "no-store" });
        const body = (await res.json().catch(() => ({}))) as {
          data?: VlogPost;
          error?: string;
        };

        if (!res.ok || !body.data) {
          setMessage(body.error ?? "Failed to load post details");
          return;
        }

        const gallery = [...(body.data.galleryImages ?? [])].slice(0, 6);
        while (gallery.length < 6) {
          gallery.push("");
        }

        setEditingId(body.data.id);
        setForm({
          location: body.data.location,
          description: body.data.description,
          image: body.data.image,
          date: toDateInputValue(body.data.date),
          galleryImages: gallery,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setMessage("Failed to load post details");
      }
    };

    loadEditData();
  };

  const onDelete = async (id: string) => {
    const shouldDelete = window.confirm("Delete this post?");
    if (!shouldDelete) return;

    setMessage("");
    try {
      const res = await fetch(`/api/vlogs/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMessage(body.error ?? "Failed to delete post");
        return;
      }

      setMessage("Post deleted");
      await loadPosts();
      notifyVlogUpdated();
    } catch {
      setMessage("Failed to delete post");
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-[#c9b9a1]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">Blog Admin Panel</h1>
            <p className="text-sm text-[#b8a88a]">Manage vlog posts and preview them live on your portfolio.</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg border border-orange-500/40 px-4 py-2 text-sm text-orange-400 transition-colors hover:bg-orange-500/10"
          >
            Logout
          </button>
        </div>

        <section className="rounded-2xl border border-gray-800 bg-gray-950/65 p-6">
          <h2 className="mb-4 text-xl font-semibold text-[#c9b9a1]">{isEditing ? "Edit Post" : "Add New Post"}</h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              className="rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="Location / Title"
              required
            />
            <DragDropImageField
              label="Hero Image"
              value={form.image}
              required
              isUploading={Boolean(uploadingSlots.hero)}
              onFileSelected={(file) =>
                uploadImage("hero", file, (url) => setForm((prev) => ({ ...prev, image: url })))
              }
              onClear={() => setForm((prev) => ({ ...prev, image: "" }))}
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="rounded-lg border border-gray-800 bg-black/60 px-4 py-3 pr-10 text-[#c9b9a1] outline-none [color-scheme:dark] focus:border-orange-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:[filter:invert(58%)_sepia(87%)_saturate(1490%)_hue-rotate(354deg)_brightness(101%)_contrast(101%)]"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="md:col-span-2 min-h-[110px] rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="Description"
              required
            />

            <div className="md:col-span-2 grid grid-cols-1 gap-3 md:grid-cols-2">
              {form.galleryImages.map((value, index) => (
                <DragDropImageField
                  key={index}
                  label={`Vlog Image ${index + 1}`}
                  value={value}
                  isUploading={Boolean(uploadingSlots[`gallery-${index}`])}
                  onFileSelected={(file) =>
                    uploadImage(`gallery-${index}`, file, (url) =>
                      setForm((prev) => {
                        const nextImages = [...prev.galleryImages];
                        nextImages[index] = url;
                        return { ...prev, galleryImages: nextImages };
                      })
                    )
                  }
                  onClear={() =>
                    setForm((prev) => {
                      const nextImages = [...prev.galleryImages];
                      nextImages[index] = "";
                      return { ...prev, galleryImages: nextImages };
                    })
                  }
                />
              ))}
            </div>

            <p className="md:col-span-2 text-xs text-[#9f9074]">
              Drag and drop or click to upload original images. URLs are generated automatically.
            </p>

            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting || isAnyUploadInProgress}
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
              >
                {isSubmitting
                  ? "Saving..."
                  : isAnyUploadInProgress
                    ? "Uploading..."
                    : isEditing
                      ? "Update Post"
                      : "Add Post"}
              </button>
              {isEditing ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-700 px-5 py-2.5"
                >
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>
          {message ? <p className="mt-4 text-sm text-orange-300">{message}</p> : null}
        </section>

        <section className="rounded-2xl border border-gray-800 bg-gray-950/65 p-6">
          <h2 className="mb-4 text-xl font-semibold text-[#c9b9a1]">Manage Posts</h2>
          {isLoading ? (
            <p className="text-sm text-[#b8a88a]">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-[#b8a88a]">No posts yet. Add your first blog post above.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-gray-800 bg-black/40 p-4 md:flex md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-[#c9b9a1]">{post.location}</p>
                    <p className="text-sm text-[#b8a88a] line-clamp-2">{post.description}</p>
                    <p className="text-xs text-orange-400">{post.date || "No date"}</p>
                  </div>
                  <div className="mt-3 flex gap-2 md:mt-0">
                    <button
                      onClick={() => onEdit(post)}
                      className="rounded-md border border-orange-500/40 px-3 py-1.5 text-sm text-orange-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
