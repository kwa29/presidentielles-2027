import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";
import { STAT_META, STAT_ORDER } from "@/lib/game/stats";

export const metadata: Metadata = {
  title: "Les 8 indicateurs",
  description:
    "Déficit, dette, chômage, croissance, popularité, sécurité, cohésion sociale et rayonnement international : seuils vert, orange et rouge de Président(e) 2027.",
  alternates: { canonical: "/indicateurs" },
};

export default function IndicatorsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tableau de bord"
        title="Les 8 indicateurs du pays"
        lede="Le code couleur n'est pas décoratif : c'est lui qui décide si la rue, Bruxelles ou les marchés vous tombent dessus."
        crumbs={[{ name: "Indicateurs", path: "/indicateurs" }]}
      />
      <Prose>
        <h2>Comment lire le tableau de bord ?</h2>
        <p>
          Président(e) 2027 suit huit indicateurs en temps réel. Quatre sont
          des grandeurs économiques classiques — déficit en % du PIB, dette en
          % du PIB, chômage en %, croissance en %. Quatre sont des indices de
          0 à 100 : popularité, sécurité, cohésion sociale, rayonnement
          international. Un indicateur « bas = mieux » (déficit, dette,
          chômage) passe au vert sous son seuil cible, à l&apos;orange dans une
          zone intermédiaire, au rouge au-delà. Un indicateur « haut = mieux »
          fait l&apos;inverse. La dette augmente aussi mécaniquement avec le
          déficit : un pays qui reste à 5 % de déficit voit sa dette dériver,
          même sans nouvelle folie budgétaire.
        </p>

        <h2>Seuils vert / orange / rouge</h2>
        <div className="table-scroll">
          <table>
          <thead>
            <tr>
              <th>Indicateur</th>
              <th>Vert</th>
              <th>Orange</th>
              <th>Rouge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Déficit</td>
              <td>≤ 3 % PIB</td>
              <td>≤ 5 % PIB</td>
              <td>&gt; 5 % PIB</td>
            </tr>
            <tr>
              <td>Dette</td>
              <td>≤ 100 % PIB</td>
              <td>≤ 120 % PIB</td>
              <td>&gt; 120 % PIB</td>
            </tr>
            <tr>
              <td>Chômage</td>
              <td>≤ 6 %</td>
              <td>≤ 8 %</td>
              <td>&gt; 8 %</td>
            </tr>
            <tr>
              <td>Croissance</td>
              <td>≥ 1,2 %</td>
              <td>≥ 0,5 %</td>
              <td>&lt; 0,5 %</td>
            </tr>
            <tr>
              <td>Indices /100</td>
              <td>≥ 60</td>
              <td>≥ 40</td>
              <td>&lt; 40</td>
            </tr>
          </tbody>
          </table>
        </div>

        {STAT_ORDER.map((key) => (
          <section key={key}>
            <h3>{STAT_META[key].label}</h3>
            <p>{STAT_META[key].description}</p>
          </section>
        ))}

        <h2>Comment le score final est calculé</h2>
        <p>
          Le score composite de fin de mandat vaut au maximum 100 points : 15
          pour le déficit, 12 pour la dette, 12 pour le chômage, 12 pour la
          croissance, 15 pour la popularité, 12 pour la sécurité, 12 pour la
          cohésion, 10 pour le rayonnement. Chaque indicateur donne la totalité
          de ses points s&apos;il est dans le vert « politique » (plus exigeant
          que le simple orange), la moitié s&apos;il est passable, zéro s&apos;il
          a décroché. Un mandat réussi demande 75 points, un mandat mitigé 45,
          en dessous c&apos;est l&apos;échec.
        </p>

        <p>
          <Link href="/jouer">Voir les indicateurs bouger en jeu →</Link>
        </p>
      </Prose>
    </>
  );
}
