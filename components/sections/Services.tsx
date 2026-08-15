"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Smartphone, Cpu, Network, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle the glowing spotlight effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger entrance of the bento boxes
      gsap.fromTo(
        ".bento-box",
        { y: 100, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="relative w-full py-32 px-6 md:px-12 bg-[#050505] overflow-hidden"
    >
      <div className="relative z-10 max-w-[100rem] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-white/60 text-xs font-mono uppercase tracking-widest">
              Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mt-4">
            Every Layer of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">
              The Stack.
            </span>
          </h2>
        </div>

        {/* 
          THE BENTO GRID 
          Uses a custom spotlight overlay that tracks the mouse position across the entire grid
        */}
        <div 
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[320px] gap-4 group"
        >
          {/* Spotlight Gradient - Only visible on hover */}
          <div 
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 mix-blend-overlay"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`
            }}
          />

          {/* =========================================
              BOX 1: Full-Stack Web Architecture (Large)
              ========================================= */}
          <div className="bento-box relative md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group/box flex flex-col justify-between p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
            
            {/* CSS Graphic: React Code Editor */}
            <div className="relative w-full h-48 bg-[#050505] border border-white/10 rounded-xl overflow-hidden font-mono text-xs md:text-sm p-4 text-white/50 group-hover/box:border-white/20 transition-colors">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="opacity-70"><span className="text-blue-400">import</span> {`{ useState, useEffect }`} <span className="text-blue-400">from</span> 'react';</span>
                <span className="opacity-70"><span className="text-blue-400">import</span> {`{ InfinityAPI }`} <span className="text-blue-400">from</span> '@/lib/core';</span>
                <br />
                <span><span className="text-purple-400">export default function</span> <span className="text-yellow-300">App</span>() {`{`}</span>
                <span className="pl-4"><span className="text-purple-400">const</span> [system, setSystem] = <span className="text-yellow-300">useState</span>(<span className="text-blue-400">true</span>);</span>
                <span className="pl-4 mt-2 text-white/30">// High-performance DOM rendering</span>
                <span className="pl-4"><span className="text-purple-400">return</span> (</span>
                <span className="pl-8 text-cyan-400">&lt;Dashboard architecture={`{system}`} /&gt;</span>
                <span className="pl-4">);</span>
                <span>{`}`}</span>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover/box:text-blue-400 transition-colors">Web Architecture</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Production-grade, highly scalable web applications built for extreme performance. 
              </p>
            </div>
            
            <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-white/20 group-hover/box:text-white transition-colors group-hover/box:translate-x-1 group-hover/box:-translate-y-1" />
          </div>

          {/* =========================================
              BOX 2: Cross-Platform Mobile (Tall)
              ========================================= */}
          <div className="bento-box relative md:col-span-1 lg:col-span-1 row-span-2 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group/box p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
            
            {/* CSS Graphic: Mobile UI Stack */}
            <div className="relative w-full h-48 flex items-center justify-center perspective-[800px]">
              <div className="relative w-28 h-44 border border-white/20 rounded-2xl bg-black transform rotate-y-12 rotate-x-12 group-hover/box:rotate-y-0 group-hover/box:rotate-x-0 transition-transform duration-700 shadow-2xl flex flex-col p-2">
                {/* Simulated Flutter/React Native UI components */}
                <div className="w-full h-1/2 bg-white/10 rounded-xl mb-2" />
                <div className="w-3/4 h-3 bg-white/20 rounded-full mb-1" />
                <div className="w-1/2 h-3 bg-white/10 rounded-full" />
                
                {/* Floating Widget */}
                <div className="absolute -right-4 top-1/2 w-16 h-16 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-xl translate-z-12 group-hover/box:translate-x-2 transition-transform duration-700" />
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover/box:text-purple-400 transition-colors">Cross-Platform</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Native-feeling mobile ecosystems built simultaneously for iOS and Android.
              </p>
            </div>
          </div>

          {/* =========================================
              BOX 3: High-Speed Backend API (Standard)
              ========================================= */}
          <div className="bento-box relative md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group/box p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Network className="w-5 h-5 text-emerald-400" />
              </div>
              
              {/* CSS Graphic: API Pings */}
              <div className="flex items-end gap-1 h-8 opacity-50 group-hover/box:opacity-100 transition-opacity">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1.5 bg-emerald-500/50 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover/box:text-emerald-400 transition-colors">API & Backend</h3>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              Lightning-fast server architectures utilizing modern frameworks to process data instantly.
            </p>
          </div>

          {/* =========================================
              BOX 4: Autonomous Systems (Standard)
              ========================================= */}
          <div className="bento-box relative md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group/box p-8">
            <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-orange-400" />
              </div>
              
              {/* CSS Graphic: AI Node ping */}
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-orange-500/50 rounded-full" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover/box:text-orange-400 transition-colors">AI & Automation</h3>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              Custom-trained models and automated workflows that replace manual bottlenecks.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}