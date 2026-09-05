import Link from "next/link";
import { Eyebrow, SectionTitle, Tag } from "@/components/ui";
import {
  contact,
  experience,
  posts,
  services,
  site,
  stats,
} from "@/lib/content";

const layers = [
  {
    id: "L4",
    name: "Delivery",
    detail: "ArgoCD · FluxCD · GitLab CI · Helm",
    note: "Every environment reconciled from git.",
  },
  {
    id: "L3",
    name: "Platform",
    detail: "Kubernetes · Talos · EKS · AKS · Cilium",
    note: "Immutable nodes, declarative clusters.",
  },
  {
    id: "L2",
    name: "Reliability",
    detail: "Prometheus · Grafana · OpenTelemetry · Velero",
    note: "Signals first, then defined RTO/RPO.",
  },
  {
    id: "L1",
    name: "Foundation",
    detail: "Linux · Terraform · Ansible · pfSense",
    note: "Bare metal, air-gapped racks, and cloud alike.",
  },
];

export default function Home() {
  const current = experience[0];
  const post = posts[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
          <div className="scanline trace h-px w-1/3" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <Eyebrow>
            <span className="flex items-center gap-2">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-accent" />
              Available for platform work
            </span>
          </Eyebrow>

          <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-accent sm:text-base">
            {site.role}
            <span className="text-dim"> · </span>
            <span className="text-muted">{site.location}</span>
          </p>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Read the résumé
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-line-2 px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>
          </div>

          {/* status strip */}
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-panel px-5 py-5">
                <dt className="font-mono text-2xl text-fg sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-dim">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Stack ────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionTitle meta="top to bottom">The stack I run</SectionTitle>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
            {layers.map((l) => (
              <div
                key={l.id}
                className="group grid gap-2 bg-panel px-5 py-6 transition-colors hover:bg-panel-2 sm:grid-cols-[4.5rem_11rem_1fr] sm:items-baseline sm:gap-6 sm:px-7"
              >
                <span className="font-mono text-xs text-accent">{l.id}</span>
                <span className="text-base font-medium text-fg">{l.name}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-mono text-[13px] text-muted">
                    {l.detail}
                  </span>
                  <span className="text-sm text-dim">{l.note}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionTitle meta={`${services.length} areas`}>
            What I do
          </SectionTitle>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.id}
                className="flex flex-col gap-3 bg-panel p-6 transition-colors hover:bg-panel-2"
              >
                <span className="font-mono text-[11px] text-dim">{s.id}</span>
                <h3 className="text-lg font-medium leading-snug text-fg">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.summary}</p>
              </article>
            ))}
          </div>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
          >
            All services <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ── Now / Talk ───────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionTitle meta="current">Where I am now</SectionTitle>
            <p className="font-mono text-sm text-accent">{current.period}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight">
              {current.title}
              <span className="text-dim"> @ </span>
              {current.company}
            </h3>
            <p className="mt-3 text-sm text-dim">{current.meta}</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
            >
              Full history <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-14 lg:mt-0">
            <SectionTitle meta="writing">Latest post</SectionTitle>
            <p className="font-mono text-sm text-accent">
              {post.date}
              <span className="text-dim"> · </span>
              <span className="text-muted">{post.readingTime}</span>
            </p>
            <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-accent"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
            >
              All posts <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Got a cluster to build, a migration to survive, or a bill to cut?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            I&apos;m based in Vienna and work with teams anywhere. Send me the
            problem — I&apos;ll tell you honestly whether I&apos;m the right person
            for it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              {contact.email}
            </a>
            <Link
              href="/contact"
              className="font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              other channels →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
