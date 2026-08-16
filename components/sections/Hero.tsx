"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveDownRight, Code2, Paintbrush } from "lucide-react";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AdvancedScrollHero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Load Animation
      const tlLoad = gsap.timeline();
      
      tlLoad.fromTo(
        ".hero-char",
        { y: 200, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }
      )
      .fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" },
        "-=0.8"
      )
      .fromTo(
        ".nav-element",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1"
      );

      // 2. Infinite Marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // 3. Scroll Zoom Animation
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1,
        },
      });

      tlScroll
        .to(dotRef.current, { scale: 50, duration: 2, ease: "power2.inOut" }, 0)
        .to(leftTextRef.current, { xPercent: -150, scale: 1.5, opacity: 0, duration: 2, ease: "power2.inOut" }, 0)
        .to(rightTextRef.current, { xPercent: 150, scale: 1.5, opacity: 0, duration: 2, ease: "power2.inOut" }, 0)
        .to(marqueeRef.current, { opacity: 0, duration: 1 }, 0)
        .fromTo(
          subContentRef.current,
          { scale: 0.5, opacity: 0, y: 100 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          1 // Starts halfway through the zoom
        );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (

    <section ref={triggerRef} className="relative w-full h-[300vh] bg-[#070707] text-white">
      
      {/* STICKY CONTAINER: Locks to the screen while you scroll down the track */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between px-[10vw]">
          <div className="w-px h-full bg-linear-to-b from-transparent via-white to-transparent" />
          <div className="w-px h-full bg-linear-to-b from-transparent via-white to-transparent" />
        </div>

        {/* Marquee Background */}
        <div className="absolute top-1/3 left-0 w-[200vw] -rotate-6 opacity-10 pointer-events-none mix-blend-overlay">
          <div ref={marqueeRef} className="flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter">
            <span>SOFTWARE ENGINEERING • DIGITAL ART • SAAS ARCHITECTURE • SOFTWARE ENGINEERING • DIGITAL ART •</span>
            <span>SOFTWARE ENGINEERING • DIGITAL ART • SAAS ARCHITECTURE • SOFTWARE ENGINEERING • DIGITAL ART •</span>
          </div>
        </div>

        {/* Header Nav */}
        {/* <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
          <span className="nav-element font-bold text-xl tracking-tight">infinity.</span>
          <div className="nav-element flex gap-2 items-center text-sm font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            System Active
          </div>
        </div> */}

        {/* 3D Perspective Container */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
          
          {/* The Expanding Center Dot */}
          <div
            ref={dotRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15vw] h-[15vw] bg-white rounded-full mix-blend-difference z-20 pointer-events-none"
          />

          {/* Massive Splitting Text */}
          <h1 className="relative z-30 flex text-[16vw] font-black uppercase tracking-tighter mix-blend-difference pointer-events-none" style={{ perspective: "1000px" }}>
            <div ref={leftTextRef} className="flex overflow-hidden">
              {["I", "N", "F", "I"].map((char, i) => (
                <span key={i} className="hero-char inline-block origin-bottom">{char}</span>
              ))}
            </div>
            
            <div ref={rightTextRef} className="flex overflow-hidden ml-[8vw] md:ml-[12vw]">
              {["N", "I", "T", "Y"].map((char, i) => (
                <span key={i} className="hero-char inline-block origin-bottom">{char}</span>
              ))}
            </div>
          </h1>

          {/* Sub-content revealed after the zoom */}
          <div
            ref={subContentRef}
            className="absolute z-40 flex flex-col items-center justify-center text-black w-full px-6 pointer-events-auto"
          >
            <div className="flex gap-4 mb-6">
               <div className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-full text-xs font-mono font-bold">
                 <Code2 className="w-4 h-4" /> Logic
               </div>
               <div className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-full text-xs font-mono font-bold bg-black text-white">
                 <Paintbrush className="w-4 h-4" /> Aesthetics
               </div>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-center max-w-4xl leading-[0.9]">
              We Engineer <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-600 to-black">
                Digital Realities.
              </span>
            </h2>
            
            <p className="mt-8 text-lg font-medium text-black/60 max-w-md text-center">
              Infinity dot bridges the gap between raw software power and immersive interactive art. 
            </p>

            <button className="mt-12 group flex items-center gap-4 px-8 py-4 bg-black text-white rounded-full hover:bg-black/80 transition-colors">
              <span className="font-bold uppercase tracking-widest text-sm">Scroll to Explore</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MoveDownRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 nav-element flex flex-col items-center gap-2 mix-blend-difference pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-white/30 overflow-hidden">
            <div className="w-full h-full bg-white animate-[scroll-line_1.5s_linear_infinite]" />
          </div>
        </div>

      </div>
    </section>
  );
}