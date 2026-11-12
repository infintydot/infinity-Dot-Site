import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import About from "@/components/sections/About";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Company | Infinity Dot",
  description:
    "Who we are, the products we build for clients, and the products we are building ourselves.",
};

export default function CompanyPage() {
  // Pulled from lib/data.ts so this page stays in sync with the portfolio
  const clientWork = projects.filter((p) => p.category !== "Own Product");
  const ownProducts = projects.filter((p) => p.category === "Own Product");

  return (
    <main className="relative w-full">
      {/* Intro */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:px-12">
        <div className="aurora-bg opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
              A product studio building software for real businesses.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/60">
              Infinity Dot designs and builds websites, web apps and internal
              tools for clients, from school management to fleet tracking. At
              the same time, we are building products of our own.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.15}>
              <div className="glass-panel h-full rounded-3xl p-8">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Client work
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  Websites and web apps we build for other businesses.
                </p>
                <ul className="mt-6 divide-y divide-white/5">
                  {clientWork.map((p) => (
                    <li
                      key={p.slug}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-white/80">{p.title}</span>
                      <span className="text-xs text-white/40">{p.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-panel h-full rounded-3xl p-8">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Our own products
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  Products we are building ourselves.
                </p>
                <ul className="mt-6 divide-y divide-white/5">
                  {ownProducts.map((p) => (
                    <li
                      key={p.slug}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-white/80">{p.title}</span>
                      <span className="text-xs text-white/40">{p.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The horizontal scroll story */}
      <About />

      {/* Closing call to action */}
      <section className="relative overflow-hidden bg-[#050505] px-6 py-32 md:px-12">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              Tell us what you want to build.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group relative mt-10 inline-block overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-background"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Start Project
              </span>
              <div className="absolute inset-0 translate-y-full rounded-full bg-primary transition-transform duration-300 ease-out group-hover:translate-y-0" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}