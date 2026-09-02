import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { GAME_FACTS } from "@/lib/game";
import { PILLAR_META } from "@/lib/game/measures";
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

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-paper">
          Qu&apos;est-ce que Président(e) 2027 ?
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          Président(e) 2027 est un jeu de stratégie politique gratuit dans
          lequel le joueur incarne le président ou la présidente de la
          République française pour un mandat de cinq ans, de 2027 à 2032. Le
          jeu se déroule en cinq tours : chaque année, quatre mesures
          chiffrées sont tirées au hasard parmi un corpus de {GAME_FACTS.measures}{" "}
          décrets, et une seule peut être signée. Huit indicateurs — déficit,
          dette, chômage, croissance, popularité, sécurité, cohésion sociale et
          rayonnement international — évoluent en temps réel, avec un code
          couleur vert, orange ou rouge. Quatorze événements aléatoires
          réagissent à l&apos;état du pays : grève si la cohésion chute, émeutes
          si la sécurité s&apos;effondre, dégradation de note si la dette
          dérape. À la fin du quinquennat, un score composite livre un verdict
          : mandat réussi, mitigé, ou en échec.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["5 tours", "Un quinquennat entier, une décision par an."],
            [`${GAME_FACTS.measures} mesures`, "Quatre piliers, toutes chiffrées, jamais gratuites."],
            [`${GAME_FACTS.events} événements`, "Le hasard s'en mêle, comme dans la vraie vie."],
          ].map(([title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-gold/20 bg-navy-2 p-5"
            >
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-gold-2">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-paper">
          Les quatre piliers du mandat
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.values(PILLAR_META).map((pillar) => (
            <article
              key={pillar.seal}
              className="rounded-2xl border border-white/8 bg-navy-2 p-5"
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-gold">
                {pillar.seal}
              </p>
              <h3 className="mt-2 text-xl text-paper">{pillar.label}</h3>
              <p className="mt-1 text-sm text-muted">{pillar.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-paper">
          Les 8 indicateurs suivis en temps réel
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Chaque indicateur a un seuil vert, orange et rouge. L&apos;objectif
          n&apos;est pas de tout maximiser : austérité et popularité tirent
          rarement dans le même sens.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              <tr>
                <th className="px-4 py-3">Indicateur</th>
                <th className="px-4 py-3">Unité</th>
                <th className="px-4 py-3">Sens</th>
                <th className="px-4 py-3">Ce qu&apos;il dit</th>
              </tr>
            </thead>
            <tbody>
              {STAT_ORDER.map((key) => {
                const meta = STAT_META[key];
                return (
                  <tr key={key} className="border-t border-white/8">
                    <td className="px-4 py-3 text-paper">{meta.label}</td>
                    <td className="px-4 py-3 text-muted">{meta.unit}</td>
                    <td className="px-4 py-3 text-muted">
                      {meta.good === "low" ? "Plus bas = mieux" : "Plus haut = mieux"}
                    </td>
                    <td className="px-4 py-3 text-muted">{meta.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <Link href="/indicateurs" className="text-gold-2 hover:underline">
            Lire le détail des seuils →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-paper">
          Comment se termine un quinquennat ?
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          Le verdict de Président(e) 2027 repose sur un score composite sur 100
          points, calculé à partir des huit indicateurs en fin de mandat. Un
          score d&apos;au moins 75 donne un mandat réussi : réélection au
          premier tour, France redressée. Entre 45 et 74, le mandat est mitigé :
          le pays tient, mais l&apos;élection suivante est indécise. Sous 45, le
          mandat est un échec : déficit et dette ont filé, la cohésion s&apos;est
          délitée, le camp présidentiel est laminé. Le jeu est entièrement
          gratuit, sans compte ni publicité obligatoire, et se joue en quelques
          minutes dans le navigateur.
        </p>
        <div className="mt-8">
          <Link
            href="/jouer"
            className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
          >
            Tenter le quinquennat →
          </Link>
        </div>
      </section>
    </>
  );
}
