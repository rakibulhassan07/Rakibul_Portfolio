"use client";

import { useEffect, useMemo, useState } from "react";
import type { VlogPost } from "@/types/vlog";

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

export default function BlogAdminPanel({ adminPassword, onLogout }: BlogAdminPanelProps) {
  const [posts, setPosts] = useState<VlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

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
            <input
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
              className="rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="Image URL"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none focus:border-orange-500"
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
                <input
                  key={index}
                  value={value}
                  onChange={(e) =>
                    setForm((prev) => {
                      const nextImages = [...prev.galleryImages];
                      nextImages[index] = e.target.value;
                      return { ...prev, galleryImages: nextImages };
                    })
                  }
                  className="rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none focus:border-orange-500"
                  placeholder={`Tour image ${index + 1} URL`}
                />
              ))}
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Add Post"}
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
