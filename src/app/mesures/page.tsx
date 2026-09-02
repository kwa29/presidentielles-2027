import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";
import { MEASURES, PILLAR_META } from "@/lib/game/measures";
import { STAT_META, isPositiveImpact } from "@/lib/game/stats";
import type { Pillar, StatKey } from "@/lib/game/types";

export const metadata: Metadata = {
  title: "Les 30 mesures du quinquennat",
  description:
    "Catalogue des 30 mesures chiffrées de Président(e) 2027, réparties en quatre piliers : Économie, Sécurité, Social et International.",
  alternates: { canonical: "/mesures" },
};

const ORDER: Pillar[] = ["economie", "securite", "social", "international"];

export default function MeasuresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Corpus du jeu"
        title="Les 30 mesures chiffrées"
        lede="Chaque décret a un effet immédiat sur le déficit, la dette, le chômage, la croissance, la popularité, la sécurité, la cohésion ou le rayonnement. Aucun n'est neutre."
        crumbs={[{ name: "Les 30 mesures", path: "/mesures" }]}
      />
      <Prose>
        <h2>Comment sont construites les mesures ?</h2>
        <p>
          Président(e) 2027 contient exactement 30 mesures jouables, réparties
          en quatre piliers : Économie & Budget, Sécurité & Ordre public,
          Social & Cohésion, International & Rayonnement. À chaque année du
          quinquennat, le jeu tire quatre mesures encore inutilisées et le
          joueur n&apos;en signe qu&apos;une. Une mesure déjà signée ne revient
          pas. Les effets sont volontairement caricaturaux et pédagogiques :
          ils n&apos;ont pas vocation à prédire un vrai budget de l&apos;État.
          Ils servent à rendre visible le trade-off politique — ce que coûte
          une réforme populaire, ce que rapporte une austérité, ce que pèse un
          réarmement.
        </p>

        {ORDER.map((pillar) => {
          const group = MEASURES.filter((m) => m.pillar === pillar);
          const meta = PILLAR_META[pillar];
          return (
            <section key={pillar}>
              <h2>
                {meta.label}{" "}
                <span className="text-base text-gold">({group.length})</span>
              </h2>
              <p>{meta.blurb}</p>
              {group.map((measure) => (
                <article key={measure.id} className="mt-6">
                  <h3>{measure.title}</h3>
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
