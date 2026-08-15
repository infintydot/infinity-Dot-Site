"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic, Search, Smartphone, Database, Cpu, Network } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  {
    id: "01",
    title: "Autonomous Voice Agents",
    short: "Voice AI",
    description: "Custom-trained conversational AI models capable of handling human-like phone calls, automating client interactions, and intelligently scheduling interviews in real-time.",
    tech: ["Voice Synth", "NLP", "Real-time Audio", "Local LLMs"],
    icon: Mic,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "02",
    title: "Intelligent Discovery Apps",
    short: "AI Search",
    description: "Smart applications built to 'find out'. We engineer semantic search engines and discovery apps that synthesize massive datasets into actionable insights instantly.",
    tech: ["Vector Databases", "RAG Architecture", "OpenAI", "Data Mining"],
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "03",
    title: "AI-Integrated Ecosystems",
    short: "Mobile AI",
    description: "We don't just build APIs; we build the interfaces. Seamless React Native and Flutter mobile applications deeply infused with agentic AI capabilities.",
    tech: ["React Native", "Flutter", "Edge AI", "WebSockets"],
    icon: Smartphone,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: "04",
    title: "High-Speed AI Infrastructure",
    short: "Backends",
    description: "The neural pathways of your product. Lightning-fast FastAPI and Python backends designed specifically to route, process, and execute AI logic without latency.",
    tech: ["FastAPI", "Python", "GPU Clusters", "Ollama"],
    icon: Database,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  }
];

// Helper hook for the Hacker/Decrypt text scramble effect
const useScrambleText = (text: string, isActive: boolean) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; // Controls speed of decryption
    }, 20);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return displayText;
};

export default function CapabilitiesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(0); // Default open first row
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    let isCursorVisible = false;

    const ctx = gsap.context(() => {
      // 1. Initial Page Reveal
      gsap.fromTo(
        ".cap-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power4.out" }
      );

      // 2. BULLETPROOF Cursor Logic (Using Global Bounding Box Tracker)
      const cursor = cursorRef.current;
      const container = containerRef.current;

      if (cursor && container) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        const handleGlobalMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          
          // Mathematically check if the mouse is INSIDE this specific section
          const isInside = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          );

          if (isInside) {
            // Move the cursor
            xTo(e.clientX);
            yTo(e.clientY);
            
            // Fade it in if it was hidden
            if (!isCursorVisible) {
              gsap.to(cursor, { opacity: 1, duration: 0.2 });
              isCursorVisible = true;
            }
          } else {
            // If the mouse leaves the section, INSTANTLY hide the custom cursor
            if (isCursorVisible) {
              gsap.to(cursor, { opacity: 0, duration: 0.2 });
              isCursorVisible = false;
            }
          }
        };

        // Attach to window so it tracks perfectly even during fast scrolling
        window.addEventListener("mousemove", handleGlobalMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleGlobalMouseMove);
        };
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Update cursor design state based on Accordion hover
  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, { scale: 3.5, backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)", duration: 0.4 });
      gsap.to(cursorLabelRef.current, { opacity: 1, scale: 1, duration: 0.3 });
    } else {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: "white", backdropFilter: "blur(0px)", border: "none", duration: 0.4 });
      gsap.to(cursorLabelRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
    }
  }, [isHovering]);

  return (
    <main 
      ref={containerRef} 
      // The cursor-none class hides the normal mouse ONLY inside this container
      className="relative w-full min-h-screen pt-40 pb-20 px-6 md:px-12 bg-[#050505] text-white overflow-hidden cursor-none"
    >
      {/* --- CUSTOM CURSOR --- */}
      {/* Notice opacity-0: It starts completely invisible until the math confirms you are inside the section */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-100 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference opacity-0"
      >
        <span ref={cursorLabelRef} className="opacity-0 scale-50 text-[3px] font-mono font-bold text-white tracking-widest text-center leading-none">
          INIT<br/>NODE
        </span>
      </div>

      <div className="relative z-10 max-w-[100rem] mx-auto flex flex-col h-full min-h-[80vh]">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="cap-header inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-mono uppercase tracking-widest">
              Infinity Intelligence
            </span>
          </div>
          <h1 className="cap-header text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Architecting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-white/50 to-white/20">
              Autonomous Systems.
            </span>
          </h1>
        </div>

        {/* --- INTERACTIVE AI ACCORDION --- */}
        <div 
          className="flex-1 flex flex-col w-full border-t border-white/10"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {CAPABILITIES.map((cap, index) => {
            const isActive = activeRow === index;
            const Icon = cap.icon;
            // Use custom hook for the active description text
            const scrambledDesc = useScrambleText(cap.description, isActive);

            return (
              <div 
                key={cap.id}
                onMouseEnter={() => setActiveRow(index)}
                className={`relative flex flex-col justify-center border-b border-white/10 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isActive ? "h-[500px] bg-white/[0.02]" : "h-[120px] hover:bg-white/[0.01]"
                }`}
              >
                {/* Number Indicator */}
                <span className={`absolute top-8 left-4 md:left-8 font-mono text-sm transition-colors duration-500 ${isActive ? cap.color : "text-white/20"}`}>
                  {cap.id}
                </span>

                {/* Massive Typography Title */}
                <h2 className={`absolute left-16 md:left-24 transition-all duration-700 font-black uppercase tracking-tighter ${
                  isActive 
                    ? "top-8 text-3xl md:text-5xl text-white" 
                    : "top-1/2 -translate-y-1/2 text-5xl md:text-7xl lg:text-8xl text-transparent WebkitTextStroke-1 WebkitTextStroke-white/30"
                }`}>
                  {isActive ? cap.title : cap.short}
                </h2>

                {/* --- EXPANDED CONTENT AREA --- */}
                <div 
                  className={`absolute top-24 left-16 md:left-24 right-4 md:right-8 bottom-8 flex flex-col md:flex-row gap-8 transition-opacity duration-500 delay-200 ${
                    isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                >
                  
                  {/* Left: Decrypting Text & Tech Stack */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
                    <p className="text-base md:text-xl font-light text-white/70 leading-relaxed font-mono">
                      {scrambledDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {cap.tech.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/50 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Dynamic CSS AI Graphics */}
                  <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center relative">
                    
                    {index === 0 && ( // Voice AI: Audio Waves
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className={`absolute w-64 h-64 rounded-full border border-purple-500/20 animate-ping opacity-20`} style={{ animationDuration: '3s' }} />
                        <div className={`absolute w-48 h-48 rounded-full border border-purple-500/40 animate-ping opacity-40`} style={{ animationDuration: '2s' }} />
                        <div className="relative z-10 w-24 h-24 rounded-full bg-purple-500/10 backdrop-blur-xl border border-purple-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                          <Mic className="w-8 h-8 text-purple-400 animate-pulse" />
                        </div>
                        {/* Audio Bars */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-1 bg-purple-500/30 rounded-full animate-pulse" style={{ height: `${Math.random() * 100 + 50}px`, animationDelay: `${i * 0.1}s`, transform: `translateX(${i % 2 === 0 ? '-' : ''}${Math.random() * 100 + 60}px)` }} />
                          ))}
                        </div>
                      </div>
                    )}

                    {index === 1 && ( // Discovery AI: Target/Scanner
                      <div className="relative w-64 h-64 flex items-center justify-center">
                        <div className="absolute w-full h-full border-2 border-dashed border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-full h-px bg-blue-500/50 animate-[pulse_2s_linear_infinite]" />
                        <div className="absolute h-full w-px bg-blue-500/50 animate-[pulse_2s_linear_infinite]" />
                        
                        {/* Floating data nodes */}
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                        ))}

                        <div className="relative z-10 w-16 h-16 bg-[#050505] border border-blue-500/50 flex items-center justify-center rounded shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                          <Search className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    )}

                    {index === 2 && ( // Ecosystems: Orbiting Mobile rings
                      <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
                        <div className="absolute w-72 h-72 border border-emerald-500/30 rounded-full transform rotate-x-60 animate-[spin_8s_linear_infinite]" />
                        <div className="absolute w-56 h-56 border border-emerald-500/40 rounded-full transform rotate-x-60 animate-[spin_6s_linear_infinite_reverse]" />
                        <div className="relative z-10 w-20 h-36 border-2 border-emerald-500/50 rounded-2xl bg-[#050505] p-2 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
                          <div className="w-full h-full border border-emerald-500/20 rounded-xl bg-emerald-500/5 flex items-center justify-center">
                            <Network className="w-6 h-6 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 3 && ( // Infrastructure: Data Streams
                      <div className="relative w-full max-w-sm h-48 bg-[#0a0a0a] border border-orange-500/30 rounded-xl p-4 flex gap-4 overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.15)]">
                        {[...Array(5)].map((_, col) => (
                          <div key={col} className="flex-1 flex flex-col gap-2">
                            {[...Array(6)].map((_, row) => (
                              <div 
                                key={row} 
                                className="w-full bg-orange-500/20 rounded-sm animate-pulse" 
                                style={{ 
                                  height: `${Math.random() * 20 + 10}px`, 
                                  animationDelay: `${Math.random() * 2}s`,
                                  opacity: Math.random() > 0.5 ? 1 : 0.2
                                }} 
                              />
                            ))}
                          </div>
                        ))}
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent" />
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}