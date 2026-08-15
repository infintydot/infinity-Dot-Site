import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="relative w-full min-h-screen pt-40 pb-32 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex items-center gap-3 text-xs text-white/40 uppercase tracking-wide">
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
        </Reveal>

        <Reveal delay={0.15}>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-lg text-white/60 font-light leading-relaxed">
            {post.excerpt}
          </p>
          <p className="mt-6 text-white/40 font-light leading-relaxed">
            Full post content goes here — connect this route to your CMS or
            MDX source, and replace this placeholder body with the real
            article.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
