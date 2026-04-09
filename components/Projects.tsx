"use client";

import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "Fluentask - Team Task Management",
      description:
        "Collaborative platform with team management, invitations, notifications, team chat, and Kanban task workflow with protected collaboration routes.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      tags: ["React", "Express", "MongoDB", "Firebase Auth", "Tailwind", "DaisyUI"],
      link: "https://github.com/rakibulhassan07/Fluentask",
    },
    {
      title: "Portfolio Website",
      description:
        "Modern, animated portfolio website with smooth scrolling, interactive components, and responsive design.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Real-time weather monitoring dashboard with interactive maps, forecasts, and historical data analysis.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      tags: ["React", "API Integration", "Chart.js"],
      link: "#",
    },
    {
      title: "Social Media App",
      description:
        "Feature-rich social platform with posts, comments, real-time chat, and content moderation.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      tags: ["Next.js", "Firebase", "TypeScript"],
      link: "#",
    },
    {
      title: "AI Content Generator",
      description:
        "AI-powered content creation tool leveraging GPT models for generating articles, social posts, and marketing copy.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      tags: ["Python", "OpenAI", "React", "FastAPI"],
      link: "#",
    },
  ];
  return (
    <section id="projects" className="relative min-h-screen overflow-hidden bg-black py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/4 h-96 w-96 rounded-full bg-orange-500/12 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[30rem] w-[30rem] rounded-full bg-red-600/12 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_26px,rgba(249,115,22,0.18)_26px,rgba(249,115,22,0.18)_27px)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(249,115,22,0.35)_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-3 flex justify-center">
            <span className="rounded-full border border-orange-500/35 bg-orange-500/10 px-4 py-1 text-xs tracking-[0.22em] text-[#c9b9a1] uppercase">
              Project Lab
            </span>
          </div>

          <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="mx-auto mb-14 max-w-3xl text-center text-[#c9b9a1]">
            Here are some of my recent projects that showcase my skills and
            expertise in web development and design.
          </p>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotate: 0 }}
                className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/65 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:shadow-[0_16px_45px_rgba(249,115,22,0.18)]"
              >
                <div className="relative h-52 overflow-hidden bg-gray-800">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950/95 via-gray-950/30 to-transparent" />
                  <div className="absolute right-4 top-4 z-20 rounded-full border border-orange-500/35 bg-black/45 px-3 py-1 text-[11px] tracking-[0.16em] text-[#c9b9a1] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-[#c9b9a1] transition-colors group-hover:text-orange-400">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-[#c9b9a1] line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full border border-orange-700/50 bg-orange-950/35 px-3 py-1 text-xs text-[#c9b9a1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group/link inline-flex items-center text-sm font-medium text-orange-400 transition-colors hover:text-[#c9b9a1]"
                  >
                    View Project
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
