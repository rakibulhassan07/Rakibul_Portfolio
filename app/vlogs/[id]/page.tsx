"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { VlogPost } from "@/types/vlog";

type ApiResponse = {
  data?: VlogPost;
  error?: string;
};

export default function VlogDetailsPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<VlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    let hasCachedData = false;

    try {
      const cachedDetail = sessionStorage.getItem(`vlog:detail:${params.id}`);
      const cachedPreview = sessionStorage.getItem(`vlog:preview:${params.id}`);
      const cachedRaw = cachedDetail || cachedPreview;

      if (cachedRaw) {
        const cachedData = JSON.parse(cachedRaw) as VlogPost;
        if (cachedData?.id || cachedData?.image || cachedData?.location) {
          setPost(cachedData);
          hasCachedData = true;
        }
      }
    } catch {
      // Ignore storage parse errors and continue API load.
    }

    setIsLoading(!hasCachedData);

    const loadPost = async () => {
      setError("");

      try {
        const response = await fetch(`/api/vlogs/${params.id}`, { cache: "no-store" });
        const body = (await response.json()) as ApiResponse;

        if (!response.ok || !body.data) {
          setError(body.error ?? "Tour not found");
          if (!hasCachedData) {
            setPost(null);
          }
          return;
        }

        setPost(body.data);

        try {
          sessionStorage.setItem(`vlog:detail:${params.id}`, JSON.stringify(body.data));
        } catch {
          // Ignore storage errors.
        }
      } catch {
        setError("Failed to load tour details");
        if (!hasCachedData) {
          setPost(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  const galleryImages = useMemo(() => {
    if (!post) return [];

    const images = (post.galleryImages ?? []).filter(Boolean);
    return Array.from(new Set(images)).slice(0, 6);
  }, [post]);

  const galleryContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04,
      },
    },
  };

  const galleryCardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-10 text-[#c9b9a1] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(249,115,22,0.24),transparent_35%),radial-gradient(circle_at_100%_20%,rgba(220,38,38,0.2),transparent_35%),radial-gradient(circle_at_55%_100%,rgba(234,88,12,0.16),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.88),rgba(0,0,0,0.58),rgba(0,0,0,0.9))]" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0.16, x: "-8%" }}
          animate={{ opacity: [0.1, 0.24, 0.1], x: ["-8%", "8%", "-8%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 h-72 w-full bg-gradient-to-r from-orange-500/12 via-transparent to-red-500/12 blur-2xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-[28px] border border-orange-500/25 bg-[#0d0d0d]/90 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-orange-300">Tour Gallery</span>
              </div>

              <h1 className="text-4xl font-semibold leading-tight text-[#ecdcc5] [font-family:Georgia,Times,'Times New Roman',serif] sm:text-5xl lg:text-6xl">
                {post?.location || "Travel Story"}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c9b9a1] sm:text-lg">
                {post?.description || "Cinematic moments from this destination."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-orange-500/35 bg-black/40 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-[#c9b9a1]">
                  {post?.date || "Unknown Date"}
                </span>
                <span className="rounded-full border border-red-500/35 bg-red-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-[#c9b9a1]">
                  6 Frames
                </span>
              </div>

              <div className="mt-7">
                <Link
                  href="/?fromVlogDetails=1#vlog"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500/45 bg-black/40 px-5 py-2.5 text-sm font-semibold text-orange-300 transition-all hover:-translate-y-0.5 hover:bg-orange-500/15"
                >
                  Back to Vlog
                  <span>↩</span>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden border-t border-orange-500/20 lg:min-h-full lg:border-l lg:border-t-0">
              {post?.image ? (
                <img
                  src={post.image}
                  alt={`${post?.location || "Tour"} cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/35 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.14em] text-orange-200">
                Hero Frame
              </div>
            </div>
          </div>
        </motion.section>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-orange-500/20 bg-[#0d0d0d]/80 p-8 text-center"
          >
            <p className="text-sm uppercase tracking-[0.14em] text-[#c9b9a1]">Loading tour photos...</p>
          </motion.div>
        ) : null}

        {!isLoading && error ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-500/40 bg-red-950/20 p-6"
          >
            <p className="font-semibold text-red-300">{error}</p>
          </motion.div>
        ) : null}

        {!isLoading && post ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.45 }}
              className="grid grid-cols-2 gap-3 rounded-2xl border border-orange-500/20 bg-[#0d0d0d]/80 p-4"
            >
              {[
                { label: "Frames", value: String(galleryImages.length) },
                { label: "Theme", value: "Travel" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-orange-500/20 bg-black/35 px-4 py-3 text-center"
                >
                  <p className="text-lg font-bold text-orange-400">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#c9b9a1]">{item.label}</p>
                </div>
              ))}
            </motion.div>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-[#eadbc3] [font-family:Georgia,Times,'Times New Roman',serif] sm:text-3xl">
                  Visual Storyboard
                </h2>
                <span className="rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#c9b9a1]">
                  Destination Moments
                </span>
              </div>

              {galleryImages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-700/70 bg-black/30 px-6 py-10 text-center">
                  <p className="text-sm text-[#b8a88a]">No images found for this tour yet.</p>
                </div>
              ) : (
                <motion.div
                  variants={galleryContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                  {galleryImages.map((imageUrl, index) => (
                    <motion.figure
                      key={`${imageUrl}-${index}`}
                      variants={galleryCardVariants}
                      whileHover={{ y: -5, scale: 1.012 }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      onClick={() => setActiveImage(imageUrl)}
                      className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-[#101010] p-2 shadow-[0_10px_28px_rgba(0,0,0,0.3)]"
                    >
                      <img
                        src={imageUrl}
                        alt={`${post.location} photo ${index + 1}`}
                        className="h-60 w-full rounded-xl object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-2 rounded-xl border border-orange-300/0 transition-all duration-300 group-hover:border-orange-300/30" />
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/35 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.14em] text-orange-200">
                        Frame {index + 1}
                      </div>
                    </motion.figure>
                  ))}
                </motion.div>
              )}
            </section>
          </>
        ) : null}

        <AnimatePresence>
          {activeImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 rounded-full border border-orange-500/40 bg-black/50 px-3 py-1.5 text-sm font-semibold text-orange-300 transition-colors hover:bg-orange-500/15"
              >
                Close
              </button>

              <motion.img
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={activeImage}
                alt={`${post?.location || "Tour"} full frame`}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[90vh] w-auto max-w-[95vw] rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
