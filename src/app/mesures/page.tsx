import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";
import { CURRENT_META, CURRENT_ORDER } from "@/lib/game/currents";
import { MEASURES } from "@/lib/game/measures";
import { STAT_META, isPositiveImpact } from "@/lib/game/stats";
import type { Current, StatKey } from "@/lib/game/types";

export const metadata: Metadata = {
  title: "Les 100 mesures du quinquennat",
  description:
    "Catalogue des 100 mesures chiffrées de Président(e) 2027, réparties en cinq courants politiques — extrême gauche, gauche, centre, droite, extrême droite — avec retraites et TVA comme leviers.",
  alternates: { canonical: "/mesures" },
};

export default function MeasuresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Corpus du jeu"
        title="Les 100 mesures chiffrées"
        lede="Chaque décret frotte une promesse de campagne à la réalité des comptes. Retraites et TVA reviennent dans chaque camp, tordues dans un sens différent. Aucun n'est neutre."
        crumbs={[{ name: "Les 100 mesures", path: "/mesures" }]}
      />
      <Prose>
        <h2>Comment sont construites les mesures ?</h2>
        <p>
          Président(e) 2027 contient exactement 100 mesures jouables, vingt par
          courant politique : extrême gauche, gauche, centre, droite, extrême
          droite. À chaque conseil des ministres, le jeu tire une mesure encore
          inutilisée dans chacun des cinq courants. Deux conseils par année,
          dix signatures pour le quinquennat. Le joueur n&apos;en signe
          qu&apos;une à chaque fois. Une mesure déjà signée ne revient pas.
          Les effets sont
          volontairement caricaturaux et pédagogiques : ils n&apos;ont pas
          vocation à prédire un vrai budget de l&apos;État. Ils servent à
          rendre visible le trade-off — ce que coûte une retraite à 60 ans, ce
          que rapporte un point de TVA, ce que pèse une préférence nationale.
        </p>

        {CURRENT_ORDER.map((current: Current) => {
          const group = MEASURES.filter((m) => m.current === current);
          const meta = CURRENT_META[current];
          return (
            <section key={current}>
              <h2>
                {meta.label}{" "}
                <span className="text-base text-gold">({group.length})</span>
              </h2>
              <p>{meta.blurb}</p>
              {group.map((measure) => (
                <article key={measure.id} className="mt-6">
                  <h3>
                    {measure.title}{" "}
                    <span className="text-sm font-normal text-gold">
                      {measure.cat}
                    </span>
                  </h3>
                  <p>{measure.desc}</p>
                  <p>
                    {(Object.entries(measure.fx) as [StatKey, number][])
                      .map(([key, value]) => {
                        const label = STAT_META[key].short;
                        const sign = value > 0 ? "+" : "";
                        const tone = isPositiveImpact(key, value)
                          ? "favorable"
                          : "défavorable";
                        return `${label} ${sign}${value} (${tone})`;
                      })
                      .join(" · ")}
                  </p>
                </article>
              ))}
            </section>
          );
        })}

        <p>
          <Link href="/jouer">Signer un premier décret →</Link>
        </p>
      </Prose>
    </>
  );
}
