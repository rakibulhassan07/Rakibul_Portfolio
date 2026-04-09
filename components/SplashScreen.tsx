"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before calling onStart
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Logo/Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="mb-12"
      >
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#c9b9a1] overflow-visible">
          <motion.div
            className="pointer-events-none absolute -inset-2 rounded-full border-2 border-orange-400/70 shadow-[0_0_18px_rgba(251,146,60,0.55)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-4 rounded-full border-[3px] border-t-orange-500 border-r-orange-400 border-l-transparent border-b-transparent shadow-[0_0_20px_rgba(249,115,22,0.45)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-6 rounded-full border border-orange-300/25"
            animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cat logo image - circular */}
          <img
            src="https://i.ibb.co/pj4Rtsyk/jpg.jpg"
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
          
          {/* Enhanced animated coffee smoke effect - MORE VISIBLE */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-8 md:w-5 md:h-10 bg-gradient-to-t from-[#c9b9a1]/60 via-[#c9b9a1]/40 to-transparent rounded-full blur-md"
                style={{
                  left: `${-12 + i * 5}px`,
                }}
                animate={{
                  y: [0, -40, -80],
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.2, 1.8],
                  x: [0, Math.sin(i * 1.5) * 15, Math.sin(i * 1.5) * 25],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* START Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "easeOut",
        }}
        onClick={handleStart}
        className="group relative px-16 py-4 border-2 border-[#c9b9a1] text-[#c9b9a1] text-lg font-semibold tracking-[0.3em] rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
      >
        {/* Hover background effect */}
        <span className="absolute inset-0 bg-[#c9b9a1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        
        {/* Button text */}
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          START
        </span>
      </motion.button>

      {/* Optional: Animated particles or decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#c9b9a1] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
