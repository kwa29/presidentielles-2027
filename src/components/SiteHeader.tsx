"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compact = pathname === "/jouer";

  return (
    <header className="relative z-20 border-b border-gold/15 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-bleu text-[10px] font-semibold tracking-[0.18em] text-gold-2">
            RF
          </span>
          <span>
            <span className="block font-[family-name:var(--font-display)] text-xl leading-none text-paper">
              {SITE_NAME}
            </span>
            {!compact && (
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
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
          className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-[0_8px_20px_rgba(201,164,92,0.25)] transition hover:bg-gold-2 sm:inline-flex"
        >
          Prendre le pouvoir
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-paper lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/15 bg-navy-2 px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-paper"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
