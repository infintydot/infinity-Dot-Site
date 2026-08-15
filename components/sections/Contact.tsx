"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function Contact() {
  return (
    <section className="relative w-full py-40 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-30" />
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <Reveal>
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
            Start a project
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent text-glow">
              infinite.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-white/50 font-light max-w-xl">
            Tell us what you&apos;re building. We&apos;ll reply within one
            business day with next steps, not a sales call.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href="/contact"
            className="group relative px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2 transition-all"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
