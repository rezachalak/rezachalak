import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui";
import { contact, posts, site } from "@/lib/content";


const linkIcon: Record<string, React.ReactNode> = {
  slides: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v4M8 20h8" />
    </svg>
  ),
  repo: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="m16 10 6-3v10l-6-3" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  ),
};

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

          {post.links && post.links.length > 0 && (
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                Resources
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {post.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md border border-line-2 bg-panel px-4 py-2.5 font-mono text-[13px] text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    {linkIcon[l.kind] ?? linkIcon.external}
                    {l.label}
                    <span aria-hidden className="text-dim">
                      &#8599;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
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
