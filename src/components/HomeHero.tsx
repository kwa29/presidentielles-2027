"use client";

import Link from "next/link";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { createInitialState, countryMood, getStats } from "@/lib/game";

export function HomeHero() {
  const stats = getStats(createInitialState());
  const mood = countryMood(stats);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
        <SceneCanvas stats={stats} mood={mood} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/70 to-navy" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-4 pb-16 pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:pt-24">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            Jeu gratuit · 5 tours · 30 mesures · 14 événements
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-[0.95] text-paper md:text-7xl">
            Vous êtes
            <span className="block text-gold-2">Président(e).</span>
            La France est
            <span className="block text-rouge">à bout.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Président(e) 2027 est un jeu de stratégie politique : un
            quinquennat, une décision par an, huit indicateurs qui ne vous
            pardonneront rien. Inspiré de <em>La Bataille du Budget</em>,
            transposé à l&apos;Élysée.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/jouer"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_30px_rgba(201,164,92,0.28)]"
            >
              Prendre mes fonctions →
            </Link>
            <Link
              href="/comment-jouer"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold-2"
            >
              Comment ça se joue
            </Link>
          </div>
        </div>
        <aside className="decree rounded-3xl p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6d2e]">
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
