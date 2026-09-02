export const SITE_NAME = "Président(e) 2027";
export const SITE_TAGLINE = "Redresser et rehausser la France";
export const SITE_DESCRIPTION =
  "Président(e) 2027 est un jeu de stratégie politique gratuit : incarnez le président ou la présidente de la République pour un quinquennat (2027-2032), arbitrez 100 mesures issues de cinq courants politiques, modulez retraites et TVA, survivez à 14 événements, et voyez si la France tient jusqu'en 2032.";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://presidentielles-2027.fr"
  );
}

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/jouer", label: "Jouer" },
  { href: "/comment-jouer", label: "Comment jouer" },
  { href: "/mesures", label: "Les 100 mesures" },
  { href: "/indicateurs", label: "Indicateurs" },
  { href: "/a-propos", label: "À propos" },
] as const;
