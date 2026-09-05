import Link from "next/link";
import { contact, nav, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel no-print">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="dot-live h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-sm">{site.name}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.role} in {site.location}. Building platforms, pipelines, and the
              boring reliability underneath them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                Pages
              </h3>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { href: `mailto:${contact.email}`, label: "Email" },
                  { href: contact.linkedin, label: "LinkedIn" },
                  { href: contact.github, label: "GitHub" },
                  { href: contact.instagram, label: "Instagram" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex items-center gap-2">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-accent" />
            all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
