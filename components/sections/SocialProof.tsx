"use client";

import { Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/lib/data";

export default function SocialProof() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16 max-w-2xl">
          <Reveal>
            <span className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
              Client feedback
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight tracking-tight">
              Trusted by teams who ship.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * i}>
              <div className="h-full p-8 rounded-3xl glass-panel flex flex-col gap-6">
                <Quote className="w-8 h-8 text-primary/60" />
                <p className="text-white/70 font-light leading-relaxed flex-1">
                  “{t.quote}”
                </p>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-white/40 text-sm">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
