import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Comment jouer",
  description:
    "Règles de Président(e) 2027 : cinq années, deux décrets par an, cinq courants politiques, 100 mesures, retraites et TVA, huit indicateurs, trente événements.",
  alternates: { canonical: "/comment-jouer" },
};

export default function HowToPlayPage() {
  return (
    <>
      <PageIntro
        eyebrow="Règles du jeu"
        title="Comment jouer à Président(e) 2027"
        lede="Un quinquennat tient en dix signatures. Chaque clic frotte une promesse de candidat — retraites, TVA, frontières, SMIC — à la réalité des comptes."
        crumbs={[{ name: "Comment jouer", path: "/comment-jouer" }]}
      />
      <Prose>
        <h2>Quel est le but du jeu ?</h2>
        <p>
          Le but de Président(e) 2027 est de redresser la France en cinq ans,
          de 2027 à 2032, en signant deux mesures par an. Le joueur gagne si le
          score composite de fin de mandat atteint 75 points sur 100 : déficit
          maîtrisé, croissance qui repart, popularité et cohésion encore
          vivantes. Un score entre 45 et 74 produit un mandat mitigé. Sous 45,
          le quinquennat est un échec. Le jeu ne demande aucun compte, aucun
          paiement, aucune application : il se joue dans le navigateur, en
          français, en une vingtaine de minutes.
        </p>

        <h2>Comment se déroule un tour ?</h2>
        <ol>
          <li>
            Cinq mesures sont tirées, une par courant politique : extrême
            gauche, gauche, centre, droite, extrême droite. Le corpus compte
            100 décrets. Deux conseils par année, donc deux tirages. Retraites
            et TVA reviennent dans chaque camp, avec un calibrage différent.
          </li>
          <li>
            Vous en signez une. Ses effets s&apos;appliquent immédiatement aux
            huit indicateurs, affichés en vert, orange ou rouge.
          </li>
          <li>
            Un événement se déclenche. Certains sont conditionnels (grève si
            cohésion &lt; 45, dégradation de note si dette &gt; 118, émeutes si
            sécurité &lt; 45). D&apos;autres peuvent arriver quoi qu&apos;il
            arrive : scandale ministériel, choc énergétique, canicule.
          </li>
          <li>
            Le journal du mandat consigne la décision et l&apos;événement.
            Deux décrets par année, jusqu&apos;à 2032.
          </li>
        </ol>

        <h2>Pourquoi chaque décision a un prix</h2>
        <p>
          Président(e) 2027 reprend l&apos;esprit de <em>La Bataille du
          Budget</em> de Rayan Nezzar : aucune mesure n&apos;est un cadeau. Une
          austérité qui fait baisser le déficit fait aussi chuter la
          popularité. Une retraite à 60 ans électrise la rue et vide Bercy. Un
          point de TVA supplémentaire remplit les caisses et pèse sur le
          caddie. Un recrutement de policiers rassure l&apos;opinion mais
          creuse le budget. Le jeu n&apos;est pas un simulateur officiel : les
          chiffres sont simplifiés, assumés comme ludiques, et calibrés pour
          forcer l&apos;arbitrage plutôt que la solution magique.
        </p>

        <h2>Comment obtenir un mandat réussi</h2>
        <p>
          Un mandat réussi exige de ne pas laisser un indicateur pourrir trop
          longtemps : une cohésion sous 45 invite la grève, une dette au-delà
          de 118 invite les agences de notation, une popularité sous 35 invite
          la motion de censure. Les événements éligibles sont tirés au hasard
          parmi ceux dont la condition est vraie, donc un pays déjà fragile
          s&apos;enfonce plus vite. La stratégie gagnante n&apos;est pas
          l&apos;orthodoxie budgétaire pure, ni le « tout social » : c&apos;est
          l&apos;équilibre, année après année, en acceptant de payer le prix de
          chaque décret.
        </p>

        <p>
          <Link href="/jouer">Prendre mes fonctions →</Link>
        </p>
      </Prose>
    </>
  );
}
