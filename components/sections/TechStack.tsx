"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/animations/Reveal";
import { techStack } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RING_CONFIG = {
  1: { radius: 120, duration: 30, size: "w-[240px] h-[240px]" },
  2: { radius: 190, duration: 45, size: "w-[380px] h-[380px]" },
  3: { radius: 260, duration: 60, size: "w-[520px] h-[520px]" },
} as const;

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    if (!section || !orbit) return;

    const ctx = gsap.context(() => {
      // Fade + scale the whole orbit in on scroll
      gsap.fromTo(
        orbit,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      // Continuous independent ring rotation, counter-rotating labels so text stays upright
      const rings = orbit.querySelectorAll<HTMLElement>("[data-ring]");
      rings.forEach((ring) => {
        const ringId = Number(ring.dataset.ring) as 1 | 2 | 3;
        const direction = ringId % 2 === 0 ? 1 : -1;
        const tween = gsap.to(ring, {
          rotation: 360 * direction,
          duration: RING_CONFIG[ringId].duration,
          repeat: -1,
          ease: "none",
        });

        const items = ring.querySelectorAll<HTMLElement>("[data-chip-inner]");
        gsap.to(items, {
          rotation: -360 * direction,
          duration: RING_CONFIG[ringId].duration,
          repeat: -1,
          ease: "none",
        });

        return () => tween.kill();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const byRing = (ring: 1 | 2 | 3) => techStack.filter((t) => t.ring === ring);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal>
            <span className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
              Technologies
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white leading-tight tracking-tight">
              Boring where it counts. Sharp everywhere else.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/50 font-light leading-relaxed max-w-md">
              We pick proven infrastructure for the parts that must never
              break, and modern tooling for everything that should move fast.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center py-12">
          <div
            ref={orbitRef}
            className="relative w-[520px] h-[520px] max-w-full aspect-square flex items-center justify-center"
          >
            {/* center core */}
            <div className="absolute w-20 h-20 rounded-full glass-panel flex items-center justify-center z-20">
              <span className="text-2xl font-display font-bold text-white">
                ∞
              </span>
            </div>

            {([1, 2, 3] as const).map((ringId) => {
              const items = byRing(ringId);
              const { radius, size } = RING_CONFIG[ringId];
              return (
                <div
                  key={ringId}
                  data-ring={ringId}
                  className={`absolute rounded-full border border-white/10 ${size}`}
                >
                  {items.map((item, i) => {
                    const angle = (360 / items.length) * i;
                    return (
                      <div
                        key={item.name}
                        data-chip
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                        }}
                      >
                        <div data-chip-inner>
                          <span className="whitespace-nowrap px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-white/80">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
