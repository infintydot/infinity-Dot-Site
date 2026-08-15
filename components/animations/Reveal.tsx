"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, useful when rendering several Reveals in a loop */
  delay?: number;
  /** Pixels to travel on entry */
  y?: number;
  duration?: number;
  /** Fires once and never reverses (good for one-off hero-style moments) */
  once?: boolean;
}

/**
 * Wraps any block in a GSAP ScrollTrigger fade + rise reveal.
 * This is the base motion primitive used by every section below Hero,
 * so the whole site shares one consistent "premium reveal" feel.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
