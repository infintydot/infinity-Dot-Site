"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { projects } from "@/lib/data";

export default function PortfolioPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="relative w-full min-h-screen pt-40 pb-32 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Our work
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight max-w-3xl">
            Every product we ship earns its place here.
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-primary text-white"
                  : "glass-panel text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={0.06 * i}>
              <div className="group relative h-80 rounded-3xl glass-panel overflow-hidden p-8 flex flex-col justify-end hover:bg-white/[0.04] transition-colors duration-500">
                <div className="absolute inset-0 aurora-bg opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                <span className="relative text-xs uppercase tracking-widest text-white/40">
                  {project.category}
                </span>
                <h3 className="relative mt-2 text-2xl font-display font-semibold text-white">
                  {project.title}
                </h3>
                <p className="relative mt-2 text-sm text-white/50 font-light leading-relaxed">
                  {project.description}
                </p>
                <div className="relative flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
