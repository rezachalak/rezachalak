import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionTitle } from "@/components/ui";
import { contact, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kubernetes platform engineering, GitOps delivery, cloud cost optimization, observability, air-gapped infrastructure, and AI agents in production.",
};

const engagements = [
  {
    name: "Build",
    detail:
      "A platform from scratch — cluster, networking, storage, delivery pipeline, and the runbooks to operate it.",
  },
  {
    name: "Migrate",
    detail:
      "Move what already runs: Swarm to Kubernetes, VMs to EKS/AKS, or a cloud bill to something defensible.",
  },
  {
    name: "Review",
    detail:
      "A focused audit of an existing setup — reliability gaps, cost leaks, supply-chain risk — with a prioritized plan.",
  },
];

export default function Services() {
  return (
    <>
      <PageHeader
        index="02 / Services"
        title="Services"
        intro="Six areas where I do the most useful work. Most engagements combine a few of them — the goal is always the same: fewer manual steps between a commit and production, and fewer surprises after it."
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
          {services.map((s) => (
            <article key={s.id} className="bg-panel p-7 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-accent">{s.id}</span>
                <h2 className="text-xl font-medium tracking-tight">{s.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {s.summary}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 font-mono text-[13px] leading-relaxed text-dim"
                  >
                    <span className="text-accent">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <SectionTitle meta="how we start">Ways to work together</SectionTitle>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {engagements.map((e, i) => (
              <div key={e.name} className="bg-panel px-6 py-7">
                <span className="font-mono text-[11px] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-medium">{e.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-line bg-panel p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Not sure which one you need?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Describe the setup and what hurts about it. If it isn&apos;t something I
            should take on, I&apos;ll say so and point you somewhere better.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-ink transition-opacity hover:opacity-90"
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
      </div>
    </>
  );
}
