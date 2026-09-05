import type { Metadata } from "next";
import { PageHeader, SectionTitle, Tag } from "@/components/ui";
import {
  certifications,
  contact,
  education,
  experience,
  site,
  skills,
  talks,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `Résumé of ${site.name} — ${site.role} in ${site.location}. 9+ years of infrastructure, Kubernetes, GitOps, and platform engineering.`,
};

export default function About() {
  return (
    <>
      <PageHeader
        index="01 / About"
        title="Résumé"
        intro={site.summary}
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Identity block */}
        <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {[
            { k: "Role", v: site.role },
            { k: "Based in", v: site.location },
            { k: "Experience", v: "9+ years" },
          ].map((row) => (
            <div key={row.k} className="bg-panel px-5 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                {row.k}
              </dt>
              <dd className="mt-2 text-sm text-fg">{row.v}</dd>
            </div>
          ))}
        </dl>

        {/* Experience */}
        <div className="mt-20">
          <SectionTitle id="experience" meta={`${experience.length} roles`}>
            Experience
          </SectionTitle>

          <div className="space-y-12">
            {experience.map((job) => (
              <article
                key={`${job.company}-${job.period}`}
                className="grid gap-6 lg:grid-cols-[13rem_1fr]"
              >
                <div>
                  <p className="font-mono text-[13px] text-accent">{job.period}</p>
                  {job.meta && (
                    <p className="mt-1.5 font-mono text-[11px] text-dim">
                      {job.meta}
                    </p>
                  )}
                </div>

                <div className="border-l border-line pl-6 lg:pl-8">
                  <h3 className="text-xl font-medium tracking-tight">
                    {job.title}
                    <span className="text-dim"> @ </span>
                    {job.company}
                  </h3>
                  <p className="mt-2 text-sm italic text-dim">{job.blurb}</p>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20">
          <SectionTitle id="skills">Skills</SectionTitle>
          <div className="space-y-8">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  {s.group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & certifications */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle id="education">Education</SectionTitle>
            <div className="space-y-8">
              {education.map((e) => (
                <div key={e.title}>
                  <p className="font-mono text-[13px] text-accent">{e.date}</p>
                  <h3 className="mt-2 text-lg font-medium leading-snug">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{e.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.notes.map((n) => (
                      <li key={n} className="text-sm leading-relaxed text-dim">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle id="certifications">Certifications</SectionTitle>
            <ul className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="flex flex-wrap items-center justify-between gap-3 bg-panel px-5 py-4"
                >
                  <span className="text-sm text-fg">{c.name}</span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-warn">
                    <span className="h-1.5 w-1.5 rounded-full bg-warn" />
                    {c.status} · {c.date}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <SectionTitle id="volunteering">Volunteering</SectionTitle>
              {talks.map((t) => (
                <div key={t.title}>
                  <p className="font-mono text-[13px] text-accent">
                    {t.date}
                    <span className="text-dim"> · </span>
                    <span className="text-muted">
                      {t.role} at {t.event}
                    </span>
                  </p>
                  <p className="mt-2 text-sm italic leading-snug text-muted">
                    {t.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* References */}
        <div className="mt-20">
          <SectionTitle id="references">References</SectionTitle>
          <p className="text-sm text-muted">
            Available on request —{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-accent transition-opacity hover:opacity-80"
            >
              just ask
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
