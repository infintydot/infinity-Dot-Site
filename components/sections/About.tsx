"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  GraduationCap, 
  Droplets, 
  AudioLines, 
  Bot, 
  Sparkles, 
  MoveRight,
  Database,
  Laptop,
  Wifi,
  Cpu,
  Cloud,
  Smartphone,
  Server,
  Mic
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The icons that will pop out of the AI core
const AI_ICONS = [Database, Laptop, Wifi, Cpu, Cloud, Smartphone, Server, Mic];

export default function About() {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Refs for internal panel animations
  const textIntroRef = useRef<HTMLDivElement>(null);
  const edtechGraphRef = useRef<HTMLDivElement>(null);
  const waterRingRef = useRef<HTMLDivElement>(null);
  const aiIconsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Logic
      const track = trackRef.current;
      if (!track) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1,
        },
      });

      // Move the track to the left
      tl.to(track, {
        xPercent: -75,
        ease: "none",
        duration: 0.1,
      });

      // 2. Parallax Animations while scrolling
      tl.fromTo(textIntroRef.current, { scale: 1 }, { scale: 0.8, opacity: 0 }, 0.1);
      tl.fromTo(edtechGraphRef.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1 }, 0.15);
      tl.to(waterRingRef.current, { rotation: 180, scale: 1.2 }, 0.4);
      
      // 3. AI Icons "Pop Out" Animation
      const icons = gsap.utils.toArray('.ai-floating-icon', aiIconsRef.current);
      if (icons.length) {
        tl.fromTo(
          icons,
          { x: 0, y: 0, scale: 0, opacity: 0 }, // Start hidden in the exact center
          {
            // Read the pre-calculated coordinates from the HTML data-attributes
            x: (index, target) => parseFloat(target.getAttribute('data-x') || '0'),
            y: (index, target) => parseFloat(target.getAttribute('data-y') || '0'),
            scale: 1,
            opacity: 1,
            stagger: 0.05,       // Pop out one by one
            ease: "back.out(2)", // Bouncy elastic effect
          },
          0.7 // Triggers exactly when the 4th panel slides into view
        );
      }

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} id="company" className="relative w-full h-[700vh] bg-[#050505] text-white">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* The Track holding all 4 Panels */}
        <div ref={trackRef} className="flex h-full w-[400vw] will-change-transform items-center">
          
          {/* ================= PANEL 1: STARTUP NARRATIVE ================= */}
          <div className="relative w-screen h-full flex flex-col justify-center px-10 md:px-24">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            
            <div ref={textIntroRef} className="relative z-10 max-w-5xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-8">
                <Sparkles className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Agile Startup</span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                We Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">
                  Ecosystems.
                </span>
              </h2>
              <p className="mt-8 text-xl md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed">
                We aren't just building apps. From deep hardware IoT integrations to autonomous AI models, we are building the digital infrastructure of tomorrow.
              </p>
              
              <div className="mt-12 flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
                <span>Scroll to view projects</span>
                <MoveRight className="w-4 h-4 animate-bounce-x" />
              </div>
            </div>
          </div>

          {/* ================= PANEL 2: EDTECH PLATFORM ================= */}
          <div className="relative w-screen h-full flex items-center justify-center px-10 md:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
              <div>
                <h3 className="text-4xl md:text-6xl font-bold mb-6">EdTech Core</h3>
                <p className="text-lg text-white/60 font-light leading-relaxed max-w-md">
                  A comprehensive management and learning architecture designed to handle the complex infrastructure of modern educational institutes. 
                </p>
              </div>
              
              <div ref={edtechGraphRef} className="relative w-full aspect-square md:aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden p-6 flex flex-col gap-4">
                <div className="flex gap-4 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-white/20 rounded" />
                    <div className="h-3 w-1/4 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="flex-1 flex gap-4">
                  <div className="w-1/3 h-full bg-white/5 border border-white/10 rounded-xl" />
                  <div className="w-2/3 h-full flex flex-col gap-4">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex items-end p-4 gap-2">
                       {[40, 70, 45, 90, 65].map((h, i) => (
                         <div key={i} className="w-full bg-white/20 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }} />
                       ))}
                    </div>
                    <div className="h-1/3 bg-white/5 border border-white/10 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PANEL 3: WATER PURIFIER IoT ================= */}
          <div className="relative w-screen h-full flex items-center justify-center px-10 md:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
                  <div className="absolute w-20 h-20 bg-cyan-400/20 rounded-full flex items-center justify-center z-20 backdrop-blur-md border border-cyan-400/30">
                    <Droplets className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div ref={waterRingRef} className="absolute w-full h-full border border-cyan-400/20 rounded-[40%] animate-[spin_8s_linear_infinite]" />
                  <div className="absolute w-[80%] h-[80%] border border-cyan-400/10 rounded-[35%] animate-[spin_12s_linear_infinite_reverse]" />
                  <div className="absolute w-[60%] h-[60%] border border-cyan-400/30 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                </div>
              </div>

            </div>
          </div>

          {/* ================= PANEL 4: VOICE AI AGENTS ================= */}
          <div className="relative w-screen h-full flex items-center justify-center px-10 md:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
              <div>
                <h3 className="text-4xl md:text-6xl font-bold mb-6">Autonomous Voice AI</h3>
                <p className="text-lg text-white/60 font-light leading-relaxed max-w-md mb-8">
                  Training custom AI agents to handle human-like phone conversations, automate client call-handling, and intelligently schedule interviews without human intervention.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  Training active
                </div>
              </div>
              
              {/* CSS Graphic: The Expanding AI Node Network */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                
                {/* Glowing Core */}
                <div className="absolute w-40 h-40 bg-purple-600/20 rounded-full blur-2xl" />
                <div className="relative z-20 w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                
                {/* The Tech Nodes that shoot out */}
                <div ref={aiIconsRef} className="absolute inset-0 flex items-center justify-center z-10">
                  {AI_ICONS.map((Icon, i) => {
                    // Trigonometry to arrange icons in a perfect circle
                    const angle = (i / AI_ICONS.length) * Math.PI * 2;
                    const radius = 130; // How far they shoot out (in pixels)
                    const targetX = Math.cos(angle) * radius;
                    const targetY = Math.sin(angle) * radius;

                    return (
                      <div 
                        key={i}
                        data-x={targetX}
                        data-y={targetY}
                        className="ai-floating-icon absolute w-14 h-14 bg-[#0a0a0a] border border-purple-500/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                      >
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                    );
                  })}
                </div>

                {/* Decorative UI elements */}
                <div className="absolute top-10 right-10 flex items-center gap-2 text-white/30 font-mono text-[10px]">
                  <AudioLines className="w-3 h-3" /> Voice Synth Active
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}