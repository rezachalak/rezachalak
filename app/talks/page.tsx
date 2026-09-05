import type { Metadata } from "next";
import { PageHeader, Tag } from "@/components/ui";
import { contact, talks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Talks and community sessions on Kubernetes, Talos Linux, bare metal, and running platforms in air-gapped environments.",
};

export default function Talks() {
  return (
    <>
      <PageHeader
        index="03 / Talks"
        title="Talks"
        intro="Sessions I've given on running Kubernetes where it's hardest — on your own hardware, behind an air gap, with no room to improvise."
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {talks.map((t) => (
            <li key={t.title} className="bg-panel p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px]">
                <span className="text-accent">{t.date}</span>
                <span className="text-dim">·</span>
                <span className="text-muted">{t.event}</span>
                <span className="rounded border border-line bg-panel-2 px-2 py-0.5 text-[11px] text-dim">
                  {t.role}
                </span>
              </div>

              <h2 className="mt-4 max-w-3xl text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                {t.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                {t.abstract}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
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
