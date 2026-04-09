"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VlogCard from "./VlogCard";
import CinematicText from "./CinematicText";
import type { VlogPost } from "@/types/vlog";
import { vlogData } from "./Vlog";

export default function VlogSection() {
  const [vlogPosts, setVlogPosts] = useState<VlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllVlogs, setShowAllVlogs] = useState(false);

  const initialVisibleCount = 3;
  const visiblePosts = showAllVlogs ? vlogPosts : vlogPosts.slice(0, initialVisibleCount);

  useEffect(() => {
    setIsLoading(true);
    setVlogPosts(
      vlogData.map((post, index) => ({
        ...post,
        id: String(index + 1),
      }))
    );
    setIsLoading(false);
  }, []);

  return (
    <section id="vlog" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
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
              viewport={{ once: true }}
              className="text-[#c9b9a1] text-lg md:text-xl"
            >
              My Travel Moments
            </motion.p>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-6 rounded-full"
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-[#c9b9a1] text-lg">Loading travel moments...</p>
              </div>
            </div>
          )}

          {/* Masonry Grid Layout with CSS Columns */}
          {!isLoading && vlogPosts.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {visiblePosts.map((post, index) => (
                <VlogCard
                  key={post.id}
                  image={post.image}
                  location={post.location}
                  description={post.description}
                  date={post.date}
                  index={index}
                  tall={showAllVlogs ? post.tall : false}
                />
              ))}
            </div>
          )}

          {/* View More Button - Only show if we have posts */}
          {!isLoading && vlogPosts.length > initialVisibleCount && !showAllVlogs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                onClick={() => setShowAllVlogs(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View All Vlogs</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </motion.div>
          )}

          {/* Stats Section - Only show if we have posts */}
          {!isLoading && vlogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
            >
              {[
                { label: "Posts", value: vlogPosts.length.toString() },
                { label: "Countries", value: "12+" },
                { label: "Adventures", value: "100+" },
                { label: "Memories", value: "∞" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-950/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#c9b9a1] text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
