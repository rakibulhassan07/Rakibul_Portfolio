"use client";

import { motion } from "framer-motion";
import CinematicText from "./CinematicText";
import AdvancedCinematicText from "./AdvancedCinematicText";

export default function About() {
  // Set your profile image path here (example: "/profile.jpg").
  const profileImage = "https://i.ibb.co/1tGQBbQ6/about2.jpg";

  return (
    <section id="about" className="min-h-screen py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 blur-[2px] scale-[1.02]">
        <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#f97316_1px,transparent_1px),linear-gradient(90deg,#f97316_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
      <div className="absolute inset-0 bg-black/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title with Cinematic Animation */}
          <CinematicText
            text="About Me"
            as="h2"
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-orange-500"
            stagger={0.04}
            duration={1.2}
          />

          <div className="relative rounded-3xl border border-gray-800/90 bg-gray-950/55 backdrop-blur-xl p-3 md:p-4 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
            <div className="rounded-2xl border border-orange-900/40 bg-gradient-to-br from-gray-950/90 via-black to-gray-950/90 p-7 md:p-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-orange-500 to-transparent" />
                  <span className="text-xs tracking-[0.26em] text-orange-300 uppercase">
                    Engineering Journey
                  </span>
                </div>
                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] tracking-[0.18em] text-[#f0c08d] uppercase">
                  Build. Solve. Evolve.
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-10">
                <div className="space-y-4">
                  <div className="relative rounded-2xl border border-orange-500/25 bg-black/40 p-3">
                    <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center px-4">
                          <p className="text-orange-400 text-sm font-semibold tracking-wide">Your Photo Here</p>
                          <p className="text-[#b8a88a] text-xs mt-2">Set profileImage in About.tsx</p>
                        </div>
                      )}
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-orange-500/20" />
                  </div>

                  <div className="rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3">
                    <p className="text-[11px] tracking-[0.2em] text-orange-300 uppercase">Quick Identity</p>
                    <p className="text-[#c9b9a1] text-sm mt-1">Computer Science Undergraduate Student</p>
                  </div>
                </div>

                <div className="space-y-6 text-[#c9b9a1]">
              <AdvancedCinematicText
                as="p"
                className="text-lg leading-relaxed"
                animationType="fade-up"
                splitBy="word"
                stagger={0.03}
                duration={0.8}
                delay={0.2}
              >
                Welcome to my portfolio! I am a dedicated Computer Science professional with expertise in developing robust web applications, proficient in both frontend and backend technologies. I possess a strong foundation in database management systems, artificial intelligence, system design, software architecture, and data structures and algorithms.
              </AdvancedCinematicText>

              <AdvancedCinematicText
                as="p"
                className="text-lg leading-relaxed"
                animationType="fade-up"
                splitBy="word"
                stagger={0.03}
                duration={0.8}
                delay={0.3}
              >
                My journey in technology commenced with a curiosity about the mechanisms behind modern systems, which has evolved into a committed pursuit of building efficient and impactful software solutions. I embrace complex challenges and am committed to continuous learning and growth within the dynamic field of computer science.
              </AdvancedCinematicText>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
