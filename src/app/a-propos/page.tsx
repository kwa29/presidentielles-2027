import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Prose } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Président(e) 2027 est un jeu gratuit inspiré de La Bataille du Budget (Rayan Nezzar), où l'on incarne le président ou la présidente de la République pour le quinquennat 2027-2032.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Le dossier"
        title="À propos de Président(e) 2027"
        lede="Un jeu indépendant, gratuit, un peu cruel, conçu pour faire sentir le poids d'un décret — pas pour prédire l'élection."
        crumbs={[{ name: "À propos", path: "/a-propos" }]}
      />
      <Prose>
        <h2>D&apos;où vient le jeu ?</h2>
        <p>
          Président(e) 2027 est un jeu de stratégie politique gratuit inspiré
          de <em>La Bataille du Budget</em>, le jeu de Rayan Nezzar. L&apos;original
          place le joueur dans l&apos;arbitrage budgétaire. Ici, le même
          principe — chaque décision a un prix, et le hasard s&apos;en mêle —
          est transposé au rôle de Président(e) de la République pour le
          quinquennat 2027-2032. Le jeu n&apos;est affilié ni à une campagne,
          ni à un parti, ni à une institution. Il n&apos;est pas un simulateur
          macroéconomique officiel : les 100 mesures et les 30 événements
          utilisent des ordres de grandeur simplifiés, assumés comme ludiques
          et pédagogiques.
        </p>

        <h2>Pourquoi c&apos;est gratuit</h2>
        <p>
          Président(e) 2027 est entièrement gratuit : pas de compte, pas de
          premium, pas de paywall. L&apos;ambition est de rendre jouable, et un
          peu drôle, le vertige d&apos;un mandat — l&apos;idée qu&apos;on ne
          peut pas tout avoir, que la rue, Bruxelles et les marchés ne
          signent pas les mêmes décrets, et qu&apos;un quinquennat tient
          souvent à dix arbitrages mal dormis. Si le jeu circule, tant mieux.
          S&apos;il fait débattre autour d&apos;une table, encore mieux.
        </p>

        <h2>Ce que le jeu n&apos;est pas</h2>
        <p>
          Ce n&apos;est pas un pronostic électoral, ni un programme, ni une
          prise de position. Les mesures (retraites, TVA, SMIC, police, Europe,
          immigration) existent comme dilemmes de campagne frottés à la
          réalité, pas comme consignes. Les cinq courants — extrême gauche,
          gauche, centre, droite, extrême droite — servent à faire entendre
          des propositions reconnaissables, pas à désigner un vainqueur. Les
          chiffres de départ (déficit 5,4 % du PIB, dette 116 %, chômage 7,5 %)
          sont un point de fiction ancré dans un ordre de grandeur
          contemporain, pas une prévision pour 2027.
        </p>

        <p>
          <Link href="/mentions-legales">Mentions légales</Link>
          {" · "}
          <Link href="/jouer">Jouer</Link>
        </p>
      </Prose>
    </>
  );
}
