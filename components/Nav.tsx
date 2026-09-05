"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

const [host, ...tld] = site.domain.split(".");

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Home">
          <span className="relative flex h-2.5 w-2.5">
            <span className="dot-live absolute inline-flex h-full w-full rounded-full bg-accent" />
          </span>
          <span className="font-mono text-sm tracking-tight">
            <span className="text-fg">{host}</span>
            <span className="text-dim">.{tld.join(".")}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 font-mono text-[13px] transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <span className="text-dim">/</span>
                {item.label.toLowerCase()}
              </Link>
            );
          })}
          </nav>
          <span className="mx-2 h-4 w-px bg-line" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-2 hover:text-fg"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-panel md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block border-b border-line px-5 py-3.5 font-mono text-sm ${
                pathname === item.href ? "text-accent" : "text-muted"
              }`}
            >
              <span className="text-dim">/</span>
              {item.label.toLowerCase()}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
