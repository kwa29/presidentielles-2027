import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, getSiteUrl } from "./site";

export function jsonLdGraph() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#org`,
        name: SITE_NAME,
        url,
        description: SITE_DESCRIPTION,
        slogan: SITE_TAGLINE,
        inLanguage: "fr-FR",
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-FR",
        publisher: { "@id": `${url}/#org` },
      },
      {
        "@type": "VideoGame",
        "@id": `${url}/#game`,
        name: SITE_NAME,
        alternateName: [
          "Elysée 2027",
          "Jeu présidentielle 2027",
          "Président 2027",
        ],
        url,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-FR",
        genre: ["Strategy", "Simulation", "Educational"],
        playMode: "SinglePlayer",
        gamePlatform: "Web browser",
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        numberOfPlayers: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 1,
        },
        publisher: { "@id": `${url}/#org` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}
