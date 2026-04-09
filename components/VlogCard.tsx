"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { VlogCardProps } from "@/types/vlog";

export default function VlogCard({
  id,
  image,
  location,
  description,
  date,
  index,
}: VlogCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isNavigating) return;

    setIsNavigating(true);

    try {
      sessionStorage.setItem(
        `vlog:preview:${id}`,
        JSON.stringify({ id, image, location, description, date, galleryImages: [] })
      );
    } catch {
      // Ignore session storage errors.
    }

    try {
      const response = await fetch(`/api/vlogs/${id}`, { cache: "no-store" });
      const body = (await response.json().catch(() => ({}))) as {
        data?: unknown;
      };

      if (response.ok && body.data) {
        try {
          sessionStorage.setItem(`vlog:detail:${id}`, JSON.stringify(body.data));
        } catch {
          // Ignore session storage errors.
        }
      }
    } catch {
      // Continue navigation even if prefetch fails.
    }

    router.push(`/vlogs/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer mb-6 break-inside-avoid"
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden h-[320px]">
          {!imageFailed ? (
            <motion.img
              src={image}
              alt={location}
              className="h-full w-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-950" />
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
            animate={{ opacity: isHovered ? 1 : 0.92 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
            animate={{ opacity: isHovered ? 0.45 : 0.25 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 mix-blend-overlay" />

          {/* Animated border glow on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-orange-500/0"
            animate={{
              borderColor: isHovered ? "rgba(249, 115, 22, 0.5)" : "rgba(249, 115, 22, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Date Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors ${
                isHovered
                  ? "border-orange-300/70 bg-orange-500/25 text-orange-100"
                  : "border-orange-500/30 bg-orange-500/20 text-orange-300"
              }`}
            >
              {date}
            </span>
          </motion.div>

          {/* Location */}
          <motion.h3
            animate={{
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-2 text-2xl font-bold text-[#d8cdbb] transition-colors [text-shadow:0_2px_10px_rgba(0,0,0,0.75)] md:text-3xl"
          >
            {location}
          </motion.h3>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4"
          >
            <Link
              href={`/vlogs/${id}`}
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all"
            >
              Explore
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {isNavigating ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/70 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-400/40 border-t-orange-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-200">
              Opening gallery...
            </p>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
