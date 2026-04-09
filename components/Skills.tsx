"use client";

import { motion } from "framer-motion";
import CinematicText from "./CinematicText";

export default function Skills() {
  const skillCollections = [
    {
      title: "Backend & Platforms",
      tagline: "Building reliable services, APIs, and scalable server-side systems.",
      skills: [
        "Spring Boot",
        "Node.js",
        "Python (Programming Language)",
        "PHP",
        "MySQL",
        "MongoDB",
        "Docker",
      ],
    },
    {
      title: "Frontend & Web",
      tagline: "Crafting responsive, clean, and modern user-facing applications.",
      skills: [
        "JavaScript",
        "React.js",
        "HTML5",
        "Cascading Style Sheets (CSS)",
      ],
    },
    {
      title: "Programming Foundations",
      tagline: "Strong problem-solving fundamentals and architecture-focused thinking.",
      skills: [
        "Java",
        "C++",
        "C (Programming Language)",
        "Object-Oriented Programming (OOP)",
        "Data Structures",
        "Performance Optimization",
        "System Architecture",
        "System Design",
      ],
    },
  ];

  const supportingSkills = [
    "Spring Boot",
    "Node.js",
    "MongoDB",
    "MySQL",
    "Python (Programming Language)",
    "JavaScript",
  ];

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden bg-black py-20">
      <div className="absolute inset-0 blur-[2px] scale-[1.02]">
        <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#f97316_1px,transparent_1px),linear-gradient(90deg,#f97316_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
      <div className="absolute inset-0 bg-black/10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="relative"
        >
          <p className="mb-3 text-center text-xs tracking-[0.28em] text-[#c9b9a1] uppercase">
            Technical Stack
          </p>
          <CinematicText
            text="Skills"
            as="h2"
            className="mb-5 text-center text-4xl font-bold text-[#c9b9a1] md:text-5xl"
            stagger={0.04}
            duration={1.2}
          />
          <p className="mx-auto mb-14 max-w-3xl text-center text-sm leading-relaxed text-[#c9b9a1] md:text-base">
            Tools and technologies I use to design resilient systems, deliver clean interfaces, and build products
            that feel fast, reliable, and polished.
          </p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            {skillCollections.map((collection, collectionIndex) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: collectionIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/65 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_16px_45px_rgba(249,115,22,0.14)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_22%_8%,rgba(249,115,22,0.2),transparent_38%)]" />
                <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-red-600" />

                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-[#c9b9a1]">{collection.title}</h3>
                  <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2 py-1 text-[10px] tracking-[0.16em] text-[#c9b9a1] uppercase">
                    0{collectionIndex + 1}
                  </span>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[#c9b9a1]">{collection.tagline}</p>

                <div className="flex flex-wrap gap-2">
                  {collection.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 * skillIndex }}
                      viewport={{ once: true }}
                      className="rounded-full border border-orange-900/70 bg-orange-950/30 px-3 py-1.5 text-sm font-medium text-[#c9b9a1]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true }}
            className="mx-auto mt-12 max-w-6xl rounded-2xl border border-gray-800 bg-gray-950/45 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-center text-xl font-bold text-[#c9b9a1]">
              Supporting Strengths
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {supportingSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-default rounded-full border border-gray-700 bg-black/35 px-4 py-2 text-sm font-medium text-[#c9b9a1] transition-colors hover:border-orange-500"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
