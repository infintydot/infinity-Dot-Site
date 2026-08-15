"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/animations/Reveal";
import { processSteps } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative w-full py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-20">
          <Reveal>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              How we work
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight tracking-tight">
              From brief to production.
            </h2>
          </Reveal>
        </div>

        <div ref={containerRef} className="relative pl-12 md:pl-16">
          {/* track */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-white/10" />
          {/* animated progress line */}
          <div
            ref={lineRef}
            style={{ transformOrigin: "top" }}
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent"
          />

          <div className="flex flex-col gap-16">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={0}>
                <div className="relative">
                  <div className="absolute -left-12 md:-left-16 top-0 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[10px] font-display font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-white/50 font-light leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
