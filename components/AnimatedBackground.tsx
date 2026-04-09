"use client";

import { motion } from "framer-motion";

const images = [
  "/bg-1.jpg",
  "/bg-2.jpg",
  "/bg-3.jpg",
  "/bg-1.jpg", // Duplicate for seamless loop
  "/bg-2.jpg",
  "/bg-3.jpg",
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated scrolling background */}
      <div className="relative h-full w-full">
        <motion.div
          className="flex h-full"
          animate={{
            x: [0, -50 * images.length / 2 + "%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / 3}vw` }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover grayscale opacity-20"
                style={{
                  filter: "grayscale(100%) brightness(0.3)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
    </div>
  );
}
