"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV, SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compact = pathname === "/jouer";
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-gold/15 bg-navy/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 md:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 bg-bleu text-[10px] font-semibold tracking-[0.18em] text-gold-2 transition group-hover:border-gold">
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

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navigation principale">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2.5 py-1.5 text-sm transition ${
                  active
                    ? "bg-gold/15 text-gold-2"
                    : "text-muted hover:bg-white/5 hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/jouer"
            className="hidden min-h-11 items-center rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-[0_8px_20px_rgba(201,164,92,0.25)] transition hover:bg-gold-2 sm:inline-flex"
          >
            Prendre le pouvoir
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-paper transition hover:border-gold/60 hover:bg-white/5 xl:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-lg leading-none" aria-hidden>
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id={menuId}
          className="border-t border-gold/15 bg-navy-2/98 px-4 py-4 backdrop-blur-xl xl:hidden"
        >
          <nav className="flex flex-col" aria-label="Menu mobile">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block min-h-11 border-b border-white/5 py-3 text-base ${
                    active ? "text-gold-2" : "text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/jouer"
            className="btn-primary mt-4 w-full"
          >
            Prendre le pouvoir
          </Link>
        </div>
      )}
    </header>
  );
}
