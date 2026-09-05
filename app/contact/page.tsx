import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn, GitHub, and Instagram.`,
};

const channels = [
  {
    key: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Best for work. I read everything and reply to anything real.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: contact.linkedinHandle,
    href: contact.linkedin,
    note: "Roles, referrals, and the professional back-and-forth.",
  },
  {
    key: "github",
    label: "GitHub",
    value: contact.githubHandle,
    href: contact.github,
    note: "Code, Helm charts, and the things I break on weekends.",
  },
  {
    key: "instagram",
    label: "Instagram",
    value: contact.instagramHandle,
    href: contact.instagram,
    note: "DevOps notes, homelab shots, and Vienna at eye level.",
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        index="04 / Contact"
        title="Get in touch"
        intro="Four ways to reach me. Email is the one I check first — say what you're building and where it hurts, and skip the pleasantries if you like."
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.key}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex h-full flex-col gap-2 bg-panel p-7 transition-colors hover:bg-panel-2"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  {c.label}
                </span>
                <span className="break-all font-mono text-base text-accent transition-opacity group-hover:opacity-80">
                  {c.value}
                </span>
                <span className="mt-1 text-sm leading-relaxed text-muted">
                  {c.note}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          <div className="bg-panel px-6 py-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              Location
            </p>
            <p className="mt-2 text-sm text-fg">{site.location}</p>
            <p className="mt-1 text-sm text-dim">
              Central European Time · remote-friendly
            </p>
          </div>
          <div className="bg-panel px-6 py-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              Status
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-fg">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-accent" />
              Open to platform and infrastructure work
            </p>
            <p className="mt-1 text-sm text-dim">
              Typical reply within a couple of days.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
