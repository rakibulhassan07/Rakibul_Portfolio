"use client";

import { motion } from "framer-motion";
import CinematicText from "./CinematicText";

interface HeroSectionProps {
  name?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const images = [
  "https://i.ibb.co/MkBBkdd0/bg-1.jpg",
  "https://i.ibb.co/BHT5Whbt/20260321-162222.png",
  "https://i.ibb.co/mC3jwcCy/bg-3.jpg", 
  "https://i.ibb.co/MkBBkdd0/bg-1.jpg",
  "https://i.ibb.co/BHT5Whbt/20260321-162222.png",
  "https://i.ibb.co/mC3jwcCy/bg-3.jpg",
  
];

export default function HeroSection({
  name = "Hi, I'm",
  title1 = "Rakibul Hassan",
  title2 = "undergraduate Student",
  subtitle = "Passionate about building dynamic, user-friendly web applications with seamless front-end and back-end integration. Always eager to learn and contribute to innovative tech solutions",
  buttonText = "View My Work",
  onButtonClick,
}: HeroSectionProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default: scroll to projects section
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div className="relative h-full w-full">
          <motion.div
            className="flex h-full absolute"
            style={{ width: "200%" }}
            animate={{
              x: [0, "-50%"],
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
                style={{ width: "33.33vw" }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover object-center grayscale opacity-60"
                  style={{
                    filter: "grayscale(100%) contrast(1.1) brightness(0.6)",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Greeting text - subtle and elegant */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="text-sm sm:text-base md:text-lg font-medium tracking-[0.3em] uppercase text-orange-500/80 mb-4 md:mb-6"
          >
            {name}
          </motion.p>

          {/* Main heading with professional typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="block text-[#cca66e] mb-2 md:mb-4 font-light">
                {title1}
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-red-600 bg-clip-text text-transparent font-extrabold">
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle with better readability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeOut",
            }}
            className="mb-10 md:mb-12 text-base sm:text-lg md:text-xl lg:text-2xl text-[#c9b9a1] font-light leading-relaxed max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.button
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 sm:px-10 sm:py-5 sm:text-lg"
              onClick={handleButtonClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={buttonText}
            >
              <span className="relative z-10">{buttonText}</span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </motion.button>

            {/* Secondary CTA */}
            <motion.a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-500/30 px-8 py-4 text-base font-semibold text-orange-500 backdrop-blur-sm transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 sm:px-10 sm:py-5 sm:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.5,
              ease: "easeOut",
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="text-xs text-[#c9b9a1]/60 uppercase tracking-widest">Scroll</span>
              <div className="w-6 h-10 border-2 border-orange-500/30 rounded-full flex justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-2 bg-orange-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
