import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
      <span className="h-px w-6 bg-line-2" />
      {children}
    </div>
  );
}

export function PageHeader({
  index,
  title,
  intro,
}: {
  index: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Eyebrow>{index}</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      </div>
    </section>
  );
}

export function SectionTitle({
  id,
  children,
  meta,
}: {
  id?: string;
  children: ReactNode;
  meta?: string;
}) {
  return (
    <div
      id={id}
      className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-3"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-fg">
        {children}
      </h2>
      {meta && <span className="font-mono text-[11px] text-dim">{meta}</span>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line bg-panel-2 px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
