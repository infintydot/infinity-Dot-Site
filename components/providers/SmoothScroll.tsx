"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9, // shorter tail so it stops "dragging" after you stop scrolling
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // lower this to 1 if scrolling still feels too fast
      touchMultiplier: 2,
    });

    // 1. Tell ScrollTrigger every time Lenis moves the page
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Let GSAP's ticker drive Lenis, so both run on the same clock
    //    (this replaces the separate requestAnimationFrame loop)
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    // 3. Don't let GSAP skip frames after a lag spike, which would
    //    make scroll-linked animations jump
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}