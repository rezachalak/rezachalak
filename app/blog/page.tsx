import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Tag } from "@/components/ui";
import { contact, posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on Kubernetes, Talos Linux, bare metal, GitOps, and running platforms in air-gapped environments.",
};

export default function Blog() {
  return (
    <>
      <PageHeader
        index="03 / Blog"
        title="Blog"
        intro="Notes from running Kubernetes where it's hardest — on your own hardware, behind an air gap, with no room to improvise. Write-ups of talks, migrations, and the things that only show up in production."
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block bg-panel p-7 transition-colors hover:bg-panel-2 sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px]">
                  <time dateTime={p.dateISO} className="text-accent">
                    {p.date}
                  </time>
                  <span className="text-dim">·</span>
                  <span className="text-muted">{p.readingTime}</span>
                  {p.event && (
                    <span className="rounded border border-line bg-panel-2 px-2 py-0.5 text-[11px] text-dim">
                      {p.event}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 max-w-3xl text-2xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                  {p.title}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                  {p.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent">
                  Read post <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-14 rounded-lg border border-dashed border-line-2 bg-panel/50 p-8 sm:p-10">
          <h2 className="text-xl font-medium tracking-tight">
            Looking for a speaker?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            I speak about bare-metal Kubernetes, Talos, GitOps delivery, and what
            actually breaks in air-gapped deployments. Meetups and internal
            engineering sessions both welcome.
          </p>
          <a
            href={`mailto:${contact.email}?subject=Speaking%20invitation`}
            className="mt-6 inline-block rounded-md border border-line-2 px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Invite me to speak →
          </a>
        </div>
      </div>
    </>
  );
}
