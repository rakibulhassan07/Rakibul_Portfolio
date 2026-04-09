"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { VlogCardProps } from "@/types/vlog";

export default function VlogCard({
  image,
  location,
  description,
  date,
  index,
}: VlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
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
              opacity: isHovered ? 1 : 0.8,
              x: isHovered ? 0 : -20,
            }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30">
              {date}
            </span>
          </motion.div>

          {/* Location */}
          <motion.h3
            animate={{
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            {location}
          </motion.h3>

          {/* Description - Slide up on hover */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-[#c9b9a1] text-sm md:text-base leading-relaxed max-w-md"
          >
            {description}
          </motion.p>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-2 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all">
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
            </span>
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
      </motion.div>
    </motion.div>
  );
}
