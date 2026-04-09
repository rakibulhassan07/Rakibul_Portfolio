"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second (faster)
    const interval = 20; // Update every 20ms for smooth animation
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Wait a brief moment at 100% before completing
        setTimeout(() => {
          onComplete();
        }, 150);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black">
      {/* Loading percentage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-7xl md:text-9xl font-bold text-[#c9b9a1] mb-8">
          {progress}%
        </div>
        
        {/* Loading bar */}
        <div className="w-64 md:w-96 h-1 bg-gray-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-[#c9b9a1] text-sm tracking-[0.3em] uppercase"
        >
          Loading
        </motion.p>
      </motion.div>

      {/* Animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-20 flex space-x-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#c9b9a1] rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Optional: Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, #c9b9a1 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
