"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compact = pathname === "/jouer";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-20 border-b border-gold/15 bg-navy/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 md:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 bg-bleu text-[10px] font-semibold tracking-[0.18em] text-gold-2">
            RF
          </span>
          <span className="min-w-0">
            <span className="block font-[family-name:var(--font-display)] text-[1.05rem] leading-tight text-paper sm:text-xl sm:leading-none">
              {SITE_NAME}
            </span>
            {!compact && (
              <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-gold sm:block sm:tracking-[0.22em]">
                Quinquennat 2027-2032
              </span>
            )}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-gold/15 text-gold-2"
                    : "text-muted hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/jouer"
          className="hidden min-h-11 items-center rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-[0_8px_20px_rgba(201,164,92,0.25)] transition hover:bg-gold-2 sm:inline-flex"
        >
          Prendre le pouvoir
        </Link>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-paper lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-lg leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div
          id="site-mobile-nav"
          className="border-t border-gold/15 bg-navy-2 px-4 py-3 lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block min-h-11 py-3 text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/jouer"
            className="mt-1 mb-2 flex min-h-11 items-center justify-center rounded-full bg-gold px-4 py-3 text-sm font-semibold text-navy"
          >
            Prendre le pouvoir
          </Link>
        </div>
      )}
    </header>
  );
}
