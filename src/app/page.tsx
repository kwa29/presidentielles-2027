import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { GAME_FACTS } from "@/lib/game";
import { CURRENT_META, CURRENT_ORDER } from "@/lib/game/currents";
import { STAT_META, STAT_ORDER } from "@/lib/game/stats";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Jeu gratuit du quinquennat 2027-2032`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          Le mandat
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-paper sm:text-4xl">
          Qu&apos;est-ce que Président(e) 2027 ?
        </h2>
        <div className="gold-rule mt-5 max-w-[8rem]" />
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          Vous incarnez le président ou la présidente pour 2027-2032. Chaque
          année, deux conseils : cinq mesures — une par courant politique —
          sont tirées parmi {GAME_FACTS.measures} décrets, et vous n&apos;en
          signez qu&apos;une. Dix signatures pour le quinquennat. Retraites et
          TVA servent de modulateurs. Huit indicateurs évoluent en temps réel.
          Trente événements réagissent à l&apos;état du pays. À la fin : un
          verdict.
        </p>

        <dl className="mt-10 grid gap-6 border-y border-gold/15 py-8 sm:grid-cols-3">
          {[
            [
              String(GAME_FACTS.turns),
              "décrets",
              "Deux décisions par an pendant cinq ans.",
            ],
            [
              String(GAME_FACTS.measures),
              "mesures",
              "Cinq courants, retraites et TVA inclus.",
            ],
            [
              String(GAME_FACTS.events),
              "événements",
              "Le hasard s'en mêle, comme dans la vraie vie.",
            ],
          ].map(([num, unit, text]) => (
            <div key={unit}>
              <dt className="font-[family-name:var(--font-display)] text-4xl text-gold-2 sm:text-5xl">
                {num}
                <span className="ml-2 text-xl text-muted sm:text-2xl">
                  {unit}
                </span>
              </dt>
              <dd className="mt-2 text-sm text-muted">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          L&apos;hémicycle
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-paper sm:text-4xl">
          Cinq courants, une réalité
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Chaque année, deux conseils des ministres. Cinq décrets sur la table,
          une signature à chaque fois. Signer, c&apos;est frotter une promesse
          de campagne aux comptes, à la rue et à Bruxelles.
        </p>
        <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
          {CURRENT_ORDER.map((current) => {
            const meta = CURRENT_META[current];
            return (
              <article
                key={current}
                className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
              >
                <p
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: meta.accent }}
                >
                  {meta.short}
                  <span className="mt-1 block font-sans text-sm font-normal tracking-normal text-paper sm:hidden">
                    {meta.label}
                  </span>
                </p>
                <div>
                  <h3 className="hidden text-lg text-paper sm:block">
                    {meta.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted sm:mt-1">
                    {meta.blurb}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          Tableau de bord
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-paper sm:text-4xl">
          Les 8 indicateurs suivis en temps réel
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Chaque indicateur a un seuil vert, orange et rouge. L&apos;objectif
          n&apos;est pas de tout maximiser : austérité et popularité tirent
          rarement dans le même sens.
        </p>
        <ul className="mt-6 grid gap-3 sm:hidden">
          {STAT_ORDER.map((key) => {
            const meta = STAT_META[key];
            return (
              <li key={key} className="panel rounded-2xl p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {meta.unit} ·{" "}
                  {meta.good === "low" ? "Plus bas = mieux" : "Plus haut = mieux"}
                </p>
                <h3 className="mt-1 text-lg text-paper">{meta.label}</h3>
                <p className="mt-1 text-sm text-muted">{meta.description}</p>
              </li>
            );
          })}
        </ul>
        <div className="table-scroll panel mt-6 hidden rounded-2xl sm:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-2/80 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              <tr>
                <th className="px-4 py-3.5">Indicateur</th>
                <th className="px-4 py-3.5">Unité</th>
                <th className="px-4 py-3.5">Sens</th>
                <th className="px-4 py-3.5">Ce qu&apos;il dit</th>
              </tr>
            </thead>
            <tbody>
              {STAT_ORDER.map((key) => {
                const meta = STAT_META[key];
                return (
                  <tr
                    key={key}
                    className="border-t border-white/8 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3.5 text-paper">{meta.label}</td>
                    <td className="px-4 py-3.5 text-muted">{meta.unit}</td>
                    <td className="px-4 py-3.5 text-muted">
                      {meta.good === "low"
                        ? "Plus bas = mieux"
                        : "Plus haut = mieux"}
                    </td>
                    <td className="px-4 py-3.5 text-muted">
                      {meta.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <Link href="/indicateurs" className="link-gold text-sm">
            Lire le détail des seuils →
          </Link>
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-14 sm:py-16 md:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,164,92,0.08),_transparent_65%)]" />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            Le verdict
          </p>
          <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-3xl text-paper sm:text-4xl">
            Comment se termine un quinquennat ?
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Un score composite sur 100. Au moins 75 : mandat réussi. Entre 45
            et 74 : mitigé. Sous 45 : échec. Gratuit, sans compte, en quelques
            minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/jouer" className="btn-primary w-full sm:w-auto">
              Tenter le quinquennat →
            </Link>
            <Link href="/comment-jouer" className="btn-ghost w-full sm:w-auto">
              Lire les règles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
