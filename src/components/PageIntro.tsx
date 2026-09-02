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
      <header className="mx-auto max-w-3xl px-4 pb-8 pt-12 md:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-paper md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{lede}</p>
        <nav className="mt-4 text-xs text-muted" aria-label="Fil d'Ariane">
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
      <div className="space-y-5 text-base leading-relaxed text-muted [&_h2]:mt-12 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-3xl [&_h2]:text-paper [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-gold-2 [&_strong]:text-paper [&_a]:text-gold-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_table]:w-full [&_th]:text-left [&_th]:text-gold-2 [&_td]:border-t [&_td]:border-white/10 [&_td]:py-2">
        {children}
      </div>
    </div>
  );
}
