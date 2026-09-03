"use client";

import Link from "next/link";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { FranceSilhouette } from "@/components/scene/FranceSilhouette";
import { useMinWidth } from "@/hooks/useMinWidth";
import { createInitialState, countryMood, getStats } from "@/lib/game";

const DOSSIER = [
  { label: "Déficit", value: "5,4 % du PIB", tone: "bad" },
  { label: "Dette", value: "116 % du PIB", tone: "warn" },
  { label: "Chômage", value: "7,5 %", tone: "warn" },
  { label: "Croissance", value: "0,9 %", tone: "warn" },
  { label: "Popularité", value: "52 / 100", tone: "warn" },
] as const;

const TONE_DOT: Record<string, string> = {
  good: "bg-good",
  warn: "bg-warn",
  bad: "bg-bad",
};

export function HomeHero() {
  const stats = getStats(createInitialState());
  const mood = countryMood(stats);
  const showScene = useMinWidth(768);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        {showScene ? (
          <div className="absolute inset-0 opacity-90">
            <SceneCanvas stats={stats} mood={mood} />
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center opacity-70">
            <FranceSilhouette className="h-[78%] w-[78%] max-w-lg" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/45 to-navy" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-4 pb-14 pt-12 sm:gap-10 sm:pb-20 sm:pt-16 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:pt-24">
        <div className="min-w-0">
          <p className="rise font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.28em]">
            Jeu gratuit · 10 décrets · 100 mesures · 5 courants
          </p>
          <h1 className="rise rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-[2.45rem] leading-[0.94] text-paper sm:text-5xl md:text-7xl">
            Vous êtes
            <span className="block text-gold-2">Président(e).</span>
            La France est
            <span className="block text-rouge">à bout.</span>
          </h1>
          <p className="rise rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Un quinquennat. Deux décisions par an. Cinq courants politiques
            frottés à la réalité des comptes. Inspiré de{" "}
            <em>La Bataille du Budget</em>, transposé à l&apos;Élysée.
          </p>
          <div className="rise rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/jouer" className="btn-primary w-full sm:w-auto">
              Prendre mes fonctions →
            </Link>
            <Link href="/comment-jouer" className="btn-ghost w-full sm:w-auto">
              Comment ça se joue
            </Link>
          </div>
        </div>
        <aside className="rise rise-delay-4 decree rounded-2xl p-5 sm:rounded-3xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a6d2e] sm:tracking-[0.22em]">
              Note de dossier · 1er tour 2027
            </p>
            <span className="rounded-full border border-[#c9a45c]/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8a6d2e]">
              Confidentiel
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {DOSSIER.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-[#c9a45c]/20 pb-2 font-mono text-sm text-ink last:border-0 last:pb-0"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[row.tone]}`}
                    aria-hidden
                  />
                  {row.label}
                </span>
                <span className="tabular-nums text-[#4d4333]">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-[#4d4333]">
            Bruxelles surveille. Les marchés aussi. Les Français sont fatigués
            des efforts. À vous de trancher.
          </p>
        </aside>
      </div>
    </section>
  );
}
