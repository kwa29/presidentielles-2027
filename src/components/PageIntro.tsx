import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export function PageIntro({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, ...crumbs])} />
      <header className="mx-auto max-w-3xl px-4 pb-8 pt-8 sm:pt-12 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.28em]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-paper sm:text-4xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
        <nav className="mt-4 flex flex-wrap gap-x-1 text-xs text-muted" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-gold-2">
            {SITE_NAME}
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.path}>
              {" / "}
              <Link href={crumb.path} className="hover:text-gold-2">
                {crumb.name}
              </Link>
            </span>
          ))}
        </nav>
      </header>
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 md:px-6">
      <div className="space-y-5 text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:text-paper sm:[&_h2]:mt-12 sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:text-gold-2 sm:[&_h3]:text-xl [&_strong]:text-paper [&_a]:text-gold-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_.table-scroll]:-mx-4 [&_.table-scroll]:px-4 sm:[&_.table-scroll]:mx-0 sm:[&_.table-scroll]:px-0 [&_table]:w-full [&_table]:min-w-[28rem] [&_table]:text-sm [&_th]:pr-3 [&_th]:text-left [&_th]:text-gold-2 [&_td]:border-t [&_td]:border-white/10 [&_td]:py-2 [&_td]:pr-3">
        {children}
      </div>
    </div>
  );
}
