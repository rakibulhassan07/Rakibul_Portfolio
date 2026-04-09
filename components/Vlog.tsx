"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import CinematicText from "./CinematicText";
import VlogCard from "./VlogCard";
import type { VlogPost } from "@/types/vlog";

export default function Vlog() {
  const [isPaused, setIsPaused] = useState(false);
  const [liveVlogs, setLiveVlogs] = useState<VlogPost[]>([]);

  const loadVlogs = useCallback(async () => {
    try {
      const response = await fetch("/api/vlogs", { cache: "no-store" });
      if (!response.ok) return;

      const body = (await response.json()) as { data?: VlogPost[] };
      if (!body.data) return;

      setLiveVlogs(
        body.data.map((post, index) => ({
          ...post,
          id: post.id || String(index + 1),
          date: post.date || "Unknown Date",
        }))
      );
    } catch {
      // Keep existing data when API is temporarily unavailable.
    }
  }, []);

  useEffect(() => {
    loadVlogs();

    const intervalId = window.setInterval(() => {
      loadVlogs();
    }, 5000);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadVlogs();
      }
    };

    const onStorageUpdate = (event: StorageEvent) => {
      if (event.key === "vlog:lastUpdated") {
        loadVlogs();
      }
    };

    const onLocalUpdate = () => {
      loadVlogs();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("storage", onStorageUpdate);
    window.addEventListener("vlog:updated", onLocalUpdate);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("storage", onStorageUpdate);
      window.removeEventListener("vlog:updated", onLocalUpdate);
    };
  }, [loadVlogs]);

  const displayedVlogs = liveVlogs;
  const shouldLoopMarquee = displayedVlogs.length > 1;
  const marqueeVlogs = shouldLoopMarquee
    ? [...displayedVlogs, ...displayedVlogs]
    : displayedVlogs;

  return (
    <section id="vlog" className="min-h-screen py-20 bg-black relative overflow-hidden">
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
        >
          <div className="max-w-5xl mx-auto mb-14">
            <div className="mb-4 flex justify-center">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs tracking-[0.22em] text-[#c9b9a1] uppercase">
                Travel Archive
              </span>
            </div>

            <CinematicText
              text="Vlog"
              as="h2"
              className="text-4xl md:text-6xl font-bold text-center mb-4 text-orange-500"
              stagger={0.04}
              duration={1.2}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
              className="text-center text-[#c9b9a1] text-lg md:text-xl"
            >
              My Travel Moments
            </motion.p>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
              className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-6 rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: false }}
              className="mt-6 text-center text-sm md:text-base text-[#c9b9a1]"
            >
              Places I have visited: <span className="text-orange-500 font-semibold">{displayedVlogs.length}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false }}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <div className="group relative overflow-hidden rounded-xl border border-orange-500/25 bg-gray-950/60 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-orange-500/80 to-red-600/80" />
                <p className="text-lg font-bold text-orange-400">{displayedVlogs.length}</p>
                <p className="mt-1 text-xs tracking-[0.16em] text-[#c9b9a1] uppercase">Places</p>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-orange-500/25 bg-gray-950/60 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-orange-500/80 to-red-600/80" />
                <p className="text-lg font-bold text-orange-400">{displayedVlogs.length > 0 ? "Live" : "Waiting"}</p>
                <p className="mt-1 text-xs tracking-[0.16em] text-[#c9b9a1] uppercase">Data Status</p>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-orange-500/25 bg-gray-950/60 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-orange-500/80 to-red-600/80" />
                <p className="text-lg font-bold text-orange-400">Supabase</p>
                <p className="mt-1 text-xs tracking-[0.16em] text-[#c9b9a1] uppercase">Source</p>
              </div>
            </motion.div>
          </div>

          <div className="relative rounded-3xl border border-gray-800/90 bg-gray-950/55 p-4 sm:p-5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-20 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-20 bg-gradient-to-l from-black via-black/70 to-transparent" />

            <div className="mb-4 flex items-center justify-between px-1 sm:px-2">
              <p className="text-xs tracking-[0.18em] text-[#c9b9a1] uppercase">Cinematic Stream</p>
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] text-[#c9b9a1] uppercase">
                {shouldLoopMarquee ? (isPaused ? "Paused" : "Auto Run") : "Single Post"}
              </span>
            </div>

            {displayedVlogs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-700/70 bg-black/30 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-orange-400">No vlog posts yet</p>
                <p className="mt-2 text-sm text-[#c9b9a1]">
                  Add posts from the admin panel at /rakib07 to show them here.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-800/60 bg-black/35 p-2">
                <div
                  className={`${shouldLoopMarquee ? "vlog-marquee-track" : ""} flex w-max gap-6`}
                  style={
                    shouldLoopMarquee
                      ? { animationPlayState: isPaused ? "paused" : "running" }
                      : undefined
                  }
                >
                  {marqueeVlogs.map((vlog, index) => (
                    <div
                      key={`${vlog.id}-${index}`}
                      className="w-[84vw] sm:w-[320px] md:w-[340px] lg:w-[350px] shrink-0"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <VlogCard
                        image={vlog.image}
                        location={vlog.location}
                        description={vlog.description}
                        date={vlog.date}
                        index={index % displayedVlogs.length}
                        tall={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes vlogMarquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .vlog-marquee-track {
              animation: vlogMarquee 24s linear infinite;
              will-change: transform;
            }
          `}</style>

        </motion.div>
      </div>
    </section>
  );
}
