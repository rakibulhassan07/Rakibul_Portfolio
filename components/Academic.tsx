"use client";

import { motion } from "framer-motion";

export default function Academic() {
  const education = [
    {
      degree: "Bachelor of Computer Science and Engineering",
      institution: "United International University",
      period: "2022- 2026",
      description: "Specialized in Software Engineering and System Architecture",
      achievements: ["CGPA: running/4.0"],
      completed: false,
    },
    {
      degree: "Higher Secondary",
      institution: "Bandarban Cantonment Public School and College",
      period: "2018 - 2020",
      description: "Science",
      achievements: ["GPA: 5.0/5.0"],
      completed: true,
    },
    {
      degree: "Secondary",
      institution: "Chakaria Grammar School",
      period: "2016 - 2018",
      description: "Science",
      achievements: ["GPA: 5.0/5.0"],
      completed: true,
    },
  ];


  return (
    <section id="academic" className="relative min-h-screen overflow-hidden bg-black py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-5 text-center text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Academic Background
            </span>
          </h2>

          <p className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-[#c9b9a1] md:text-base">
            A focused journey in science and computing, building a strong foundation in software engineering,
            architecture, and analytical thinking.
          </p>

          <div className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-orange-500/20 bg-gray-950/60 p-4 text-center">
              <p className="text-xl font-bold text-orange-400">3+</p>
              <p className="mt-1 text-xs tracking-[0.14em] text-[#c9b9a1] uppercase">Degrees</p>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-gray-950/60 p-4 text-center">
              <p className="text-xl font-bold text-orange-400">2022</p>
              <p className="mt-1 text-xs tracking-[0.14em] text-[#c9b9a1] uppercase">Started CSE</p>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-gray-950/60 p-4 text-center">
              <p className="text-xl font-bold text-orange-400">2026</p>
              <p className="mt-1 text-xs tracking-[0.14em] text-[#c9b9a1] uppercase">Expected Grad</p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl space-y-12">
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-[#c9b9a1]">Education Timeline</h3>

              <div className="relative space-y-7">
                <div className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-orange-500/10 via-orange-500/50 to-orange-500/10" />

                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="relative ml-10 rounded-2xl border border-gray-800/90 bg-gray-950/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/45 hover:shadow-[0_10px_35px_rgba(249,115,22,0.18)] md:p-8"
                  >
                    <span className="absolute -left-[34px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-orange-500 bg-black shadow-[0_0_0_6px_rgba(249,115,22,0.15)]">
                      {edu.completed && (
                        <svg className="h-2.5 w-2.5 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.493-6.493a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>

                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h4 className="mb-2 text-xl font-bold text-[#c9b9a1]">{edu.degree}</h4>
                        <p className="font-medium text-orange-400">{edu.institution}</p>
                      </div>
                      <span className="inline-flex w-fit rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs tracking-[0.16em] text-[#c9b9a1] uppercase md:mt-1">
                        {edu.period}
                      </span>
                    </div>

                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[11px] tracking-[0.14em] text-[#c9b9a1] uppercase">
                      <span className={`h-2 w-2 rounded-full ${edu.completed ? "bg-orange-400" : "bg-orange-400/40"}`} />
                      {edu.completed ? "Completed" : "In Progress"}
                    </span>

                    <p className="mb-4 leading-relaxed text-[#c9b9a1]">{edu.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-orange-700/50 bg-orange-900/30 px-3 py-1 text-sm text-[#c9b9a1]"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
