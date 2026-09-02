import type { Metadata } from "next";
import { PageIntro, Prose } from "@/components/PageIntro";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${SITE_NAME}, jeu de stratégie politique gratuit.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalPage() {
  return (
    <>
      <PageIntro
        eyebrow="Journal officiel du jeu"
        title="Mentions légales"
        lede="Un jeu indépendant. Des chiffres de salon. Aucune affiliation institutionnelle."
        crumbs={[{ name: "Mentions légales", path: "/mentions-legales" }]}
      />
      <Prose>
        <h2>Éditeur</h2>
        <p>
          {SITE_NAME} est un jeu web indépendant, publié à l&apos;adresse{" "}
          {getSiteUrl()}. Le projet est entièrement gratuit. Les contenus
          (règles, mesures, événements, textes) sont fournis à titre ludique et
          pédagogique.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le jeu s&apos;inspire de l&apos;esprit de <em>La Bataille du
          Budget</em> (Rayan Nezzar) sans en reproduire les assets, la marque
          ou le code. Toute référence à des institutions (Élysée, Bercy,
          Bruxelles) relève du décor. Les noms de personnalités publiques
          n&apos;apparaissent pas comme personnages jouables.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le jeu se joue dans le navigateur. Aucun compte n&apos;est requis.
          Aucune donnée de partie n&apos;est envoyée à un serveur pour le
          gameplay. Si un hébergeur collecte des logs techniques (adresse IP,
          user-agent) pour la sécurité, ils restent sous sa politique de
          confidentialité.
        </p>

        <h2>Avertissement</h2>
        <p>
          Les indicateurs et les effets des mesures sont simplifiés. Ils ne
          constituent ni un conseil économique, ni une prévision, ni un
          programme politique.
        </p>
      </Prose>
    </>
  );
}
