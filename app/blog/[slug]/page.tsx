import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui";
import { contact, posts, site } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.dateISO,
      authors: [site.name],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/blog"
            className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
          >
            ← all posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px]">
            <time dateTime={post.dateISO} className="text-accent">
              {post.date}
            </time>
            <span className="text-dim">·</span>
            <span className="text-muted">{post.readingTime}</span>
            {post.event && (
              <span className="rounded border border-line bg-panel-2 px-2 py-0.5 text-[11px] text-dim">
                {post.event}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        {post.sections.map((s, i) => (
          <section key={i} className={i === 0 ? "" : "mt-12"}>
            {s.heading && (
              <h2 className="mb-5 flex items-baseline gap-3 text-xl font-medium tracking-tight sm:text-2xl">
                <span className="font-mono text-[13px] text-accent">
                  {String(i).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
            )}

            {s.body?.map((para) => (
              <p
                key={para}
                className="mt-4 text-[15px] leading-[1.75] text-muted first:mt-0"
              >
                {para}
              </p>
            ))}

            {s.list && (
              <ul className="mt-6 space-y-3">
                {s.list.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-[1.7] text-muted"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {s.code && (
              <pre className="rail mt-6 overflow-x-auto rounded-lg border border-line bg-panel p-5">
                <code className="font-mono text-[13px] leading-relaxed text-fg">
                  {s.code.content}
                </code>
              </pre>
            )}

            {s.callout && (
              <p className="mt-6 border-l-2 border-accent bg-panel py-4 pl-5 pr-4 text-[15px] leading-[1.7] text-fg">
                {s.callout}
              </p>
            )}
          </section>
        ))}

        <footer className="mt-16 border-t border-line pt-8">
          <p className="text-sm leading-relaxed text-muted">
            Questions, corrections, or war stories of your own?{" "}
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(post.title)}`}
              className="text-accent transition-opacity hover:opacity-80"
            >
              Email me
            </a>
            .
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
          >
            ← all posts
          </Link>
        </footer>
      </div>
    </article>
  );
}
