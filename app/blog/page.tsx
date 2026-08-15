import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <main className="relative w-full min-h-screen pt-40 pb-32 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal>
          <span className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
            Blog
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight">
            Notes from the build.
          </h1>
        </Reveal>

        <div className="mt-16 flex flex-col divide-y divide-white/10">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={0.08 * i}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-wide">
                    <span>{post.category}</span>
                    <span>&middot;</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="mt-2 text-2xl font-display font-semibold text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-white/50 font-light max-w-xl">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
