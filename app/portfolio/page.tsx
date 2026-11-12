"use client";

import {
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Animated scenes: one small "live" graphic per project                      */
/*  Each one hints at what the product actually does.                          */
/*  Colors come from the `tone` text class via currentColor.                   */
/* -------------------------------------------------------------------------- */

/** Education CRM: attendance bars rising and falling */
function EduScene() {
  const bars = [40, 62, 48, 80, 58, 92, 70];
  return (
    <div className="flex h-24 items-end gap-2">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-4 rounded-t-md bg-current opacity-70"
          initial={{ height: 8 }}
          animate={{ height: [h * 0.45, h, h * 0.6] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.18,
          }}
        />
      ))}
    </div>
  );
}

/** Construction: a skyline that builds itself floor by floor */
function ConstructionScene() {
  const heights = [46, 78, 60, 96, 70, 86];
  const widths = ["w-8", "w-10", "w-7", "w-11", "w-9", "w-8"];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className={`${widths[i]} rounded-t-sm bg-current opacity-60`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 7px, rgba(0,0,0,0.35) 7px 9px)",
          }}
          initial={{ height: 0 }}
          animate={{ height: h }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.12 }}
        />
      ))}
    </div>
  );
}

/** E-waste transport: a route being drawn with a lorry moving along it */
function LogisticsScene() {
  const reduce = useReducedMotion();
  const route =
    "M12 96 C 52 96, 62 34, 104 42 S 164 102, 194 62 S 224 26, 232 24";
  const stops: [number, number][] = [
    [12, 96],
    [104, 42],
    [194, 62],
    [232, 24],
  ];
  return (
    <svg
      viewBox="0 0 240 120"
      className="h-28 w-full max-w-[260px]"
      fill="none"
      aria-hidden
    >
      <path
        d={route}
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeWidth={2}
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      <motion.path
        d={route}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0.6,
        }}
      />
      {stops.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r={4} fill="currentColor" />
      ))}
      {!reduce && (
        <circle r={6} fill="#fff">
          <animateMotion
            dur="4.6s"
            repeatCount="indefinite"
            path={route}
            keyPoints="0;1;1"
            keyTimes="0;0.87;1"
            calcMode="linear"
          />
        </circle>
      )}
    </svg>
  );
}

/** Voice AI: a live waveform, like a call being picked up */
function VoiceScene() {
  const levels = [
    0.3, 0.55, 0.8, 0.45, 1, 0.65, 0.35, 0.9, 0.5, 0.75, 0.4, 0.95, 0.6, 0.3,
    0.7, 0.45, 0.25,
  ];
  return (
    <div className="flex h-24 items-center gap-1">
      {levels.map((l, i) => (
        <motion.span
          key={i}
          className="h-20 w-1.5 rounded-full bg-current opacity-80"
          initial={{ scaleY: 0.1 }}
          animate={{ scaleY: [l, Math.min(1, l + 0.45), l * 0.55, l] }}
          transition={{
            duration: 1.2 + (i % 5) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

/** Car wash: bubbles floating up with a sparkle */
function CarWashScene() {
  const bubbles = [
    { x: 8, s: 10, d: 0, t: 4.2 },
    { x: 20, s: 16, d: 1.2, t: 5 },
    { x: 33, s: 8, d: 0.6, t: 3.8 },
    { x: 46, s: 20, d: 2, t: 5.4 },
    { x: 58, s: 12, d: 0.3, t: 4.4 },
    { x: 70, s: 18, d: 1.6, t: 5.2 },
    { x: 82, s: 9, d: 0.9, t: 3.9 },
    { x: 92, s: 14, d: 2.4, t: 4.8 },
  ];
  return (
    <div className="relative h-24 w-full max-w-[260px]">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full border border-current"
          style={{ left: `${b.x}%`, width: b.s, height: b.s }}
          animate={{ y: [0, -96], opacity: [0, 0.9, 0] }}
          transition={{
            duration: b.t,
            delay: b.d,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-9 w-9" />
      </motion.div>
    </div>
  );
}

/** Fallback for any project without its own scene */
function RingsScene() {
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-full w-full rounded-full border border-current"
          animate={{ scale: [0.3, 1], opacity: [0.8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i,
          }}
        />
      ))}
      <span className="h-3 w-3 rounded-full bg-current" />
    </div>
  );
}

/** Scene + color per project slug (slugs must match lib/data.ts) */
const scenes: Record<string, { Scene: ComponentType; tone: string }> = {
  "tenses-edu-solutions": { Scene: EduScene, tone: "text-primary" },
  "sathya-construction": { Scene: ConstructionScene, tone: "text-accent" },
  "e-waste-transportation": { Scene: LogisticsScene, tone: "text-secondary" },
  "voice-ai-interview-assistant": { Scene: VoiceScene, tone: "text-primary" },
  "car-wash-crm": { Scene: CarWashScene, tone: "text-secondary" },
};

/* -------------------------------------------------------------------------- */
/*  Project card: 3D tilt + cursor spotlight + live scene                      */
/* -------------------------------------------------------------------------- */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 160,
    damping: 18,
  });
  const sx = useTransform(mx, (v) => `${v * 100}%`);
  const sy = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${sx} ${sy}, rgba(255,255,255,0.10), transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const { Scene, tone } = scenes[project.slug] ?? {
    Scene: RingsScene,
    tone: "text-primary",
  };
  const live = project.status === "Live";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-3xl p-3 glass-panel"
      >
        {/* cursor spotlight */}
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* live scene */}
        <div
          className={`relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] ${tone}`}
        >
          <div className="absolute -bottom-10 h-32 w-32 rounded-full bg-current opacity-20 blur-3xl" />
          <Scene />

          <span
            className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur ${
              live
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-amber-500/15 text-amber-400"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              {live && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
            </span>
            {project.status}
          </span>

          <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/40 transition-all duration-300 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* content */}
        <div className="px-3 pb-3 pt-5">
          <span className="text-xs text-white/40">{project.category}</span>
          <h3 className="mt-1 font-display text-2xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PortfolioPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const countFor = (cat: string) =>
    cat === "All"
      ? projects.length
      : projects.filter((p) => p.category === cat).length;

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen w-full overflow-hidden px-6 pb-32 pt-40 md:px-12">
        {/* background: aurora + drifting orbs */}
        <div className="aurora-bg opacity-20" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* hero: the one orchestrated page-load moment */}
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                Every product we ship
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto" }}
                initial={{ y: "110%" }}
                animate={{ y: 0, backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{
                  y: { duration: 0.9, ease: EASE, delay: 0.12 },
                  backgroundPosition: {
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              >
                earns its place here.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Client builds and our own products, from school management to fleet
            tracking.
          </motion.p>

          {/* filters with a sliding active pill */}
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {categories.map((cat) => {
              const selected = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    selected ? "text-white" : "glass-panel text-white/60 hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat}
                    <span
                      className={`rounded-full px-1.5 text-[11px] ${
                        selected ? "bg-white/20" : "bg-white/10"
                      }`}
                    >
                      {countFor(cat)}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* grid: cards animate in and out when filtering */}
          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </MotionConfig>
  );
}