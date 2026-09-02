"use client";

import Link from "next/link";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { FranceSilhouette } from "@/components/scene/FranceSilhouette";
import { useMinWidth } from "@/hooks/useMinWidth";
import { createInitialState, countryMood, getStats } from "@/lib/game";

export function HomeHero() {
  const stats = getStats(createInitialState());
  const mood = countryMood(stats);
  const showScene = useMinWidth(768);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        {showScene ? (
          <div className="absolute inset-0 opacity-80">
            <SceneCanvas stats={stats} mood={mood} />
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center opacity-50">
            <FranceSilhouette className="h-[70%] w-[70%] max-w-md" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/15 via-navy/55 to-navy" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-4 pb-12 pt-10 sm:gap-10 sm:pb-16 sm:pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:pt-24">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.28em]">
            Jeu gratuit · 5 tours · 100 mesures · 5 courants
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[2.35rem] leading-[0.95] text-paper sm:text-5xl md:text-7xl">
            Vous êtes
            <span className="block text-gold-2">Président(e).</span>
            La France est
            <span className="block text-rouge">à bout.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Président(e) 2027 est un jeu de stratégie politique : un
            quinquennat, une décision par an, cinq courants qui se frottent à
            la réalité des comptes. Inspiré de <em>La Bataille du Budget</em>,
            transposé à l&apos;Élysée.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/jouer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy shadow-[0_10px_30px_rgba(201,164,92,0.28)]"
            >
              Prendre mes fonctions →
            </Link>
            <Link
              href="/comment-jouer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/40 px-6 py-3 text-center text-sm text-gold-2"
            >
              Comment ça se joue
            </Link>
          </div>
        </div>
        <aside className="decree rounded-2xl p-5 sm:rounded-3xl sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a6d2e] sm:tracking-[0.22em]">
            Note de dossier · 1er tour 2027
          </p>
          <ul className="mt-4 space-y-2 font-mono text-sm text-ink">
            <li>Déficit · 5,4 % du PIB</li>
            <li>Dette · 116 % du PIB</li>
            <li>Chômage · 7,5 %</li>
            <li>Croissance · 0,9 %</li>
            <li>Popularité · 52 / 100</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[#4d4333]">
            Bruxelles surveille. Les marchés aussi. Les Français sont fatigués
            des efforts. À vous de trancher.
          </p>
        </aside>
      </div>
    </section>
  );
}
