import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Comment jouer",
  description:
    "Règles de Président(e) 2027 : cinq tours pour un quinquennat, quatre mesures tirées au hasard, huit indicateurs, quatorze événements, un verdict final.",
  alternates: { canonical: "/comment-jouer" },
};

export default function HowToPlayPage() {
  return (
    <>
      <PageIntro
        eyebrow="Règles du jeu"
        title="Comment jouer à Président(e) 2027"
        lede="Un quinquennat tient en cinq clics. Le piège, c'est que chacun de ces clics a un prix — et que le pays réagit sans vous demander votre avis."
        crumbs={[{ name: "Comment jouer", path: "/comment-jouer" }]}
      />
      <Prose>
        <h2>Quel est le but du jeu ?</h2>
        <p>
          Le but de Président(e) 2027 est de redresser la France en cinq ans,
          de 2027 à 2032, en signant une mesure par an. Le joueur gagne si le
          score composite de fin de mandat atteint 75 points sur 100 : déficit
          maîtrisé, croissance qui repart, popularité et cohésion encore
          vivantes. Un score entre 45 et 74 produit un mandat mitigé. Sous 45,
          le quinquennat est un échec. Le jeu ne demande aucun compte, aucun
          paiement, aucune application : il se joue dans le navigateur, en
          français, en une dizaine de minutes.
        </p>

        <h2>Comment se déroule un tour ?</h2>
        <ol>
          <li>
            Quatre mesures sont tirées au hasard parmi les 30 décrets encore
            disponibles. Chaque mesure appartient à l&apos;un des quatre
            piliers : Économie, Sécurité, Social, International.
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
            L&apos;année suivante s&apos;ouvre, jusqu&apos;à 2032.
          </li>
        </ol>

        <h2>Pourquoi chaque décision a un prix</h2>
        <p>
          Président(e) 2027 reprend l&apos;esprit de <em>La Bataille du
          Budget</em> de Rayan Nezzar : aucune mesure n&apos;est un cadeau. Une
          austérité qui fait baisser le déficit fait aussi chuter la
          popularité. Un recrutement de policiers rassure l&apos;opinion mais
          creuse Bercy. Un grand plan industriel dore le rayonnement et la
          croissance, puis aggrave le déficit. Le jeu n&apos;est pas un
          simulateur officiel : les chiffres sont simplifiés, assumés comme
          ludiques, et calibrés pour forcer l&apos;arbitrage plutôt que la
          solution magique.
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
