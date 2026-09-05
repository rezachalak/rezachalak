import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          No route to host
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          That page isn&apos;t in the routing table. Nothing is on fire — this one
          just never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md border border-line-2 px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          ← back home
        </Link>
      </div>
    </section>
  );
}
