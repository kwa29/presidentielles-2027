# Président(e) 2027

Jeu de stratégie politique **gratuit** : vous incarnez le président ou la présidente de la République pour le quinquennat 2027-2032.

Inspiré de *La Bataille du Budget* (Rayan Nezzar) — chaque décision a un prix, et le hasard s'en mêle — transposé à l'Élysée.

## Jouer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) puis [Jouer](http://localhost:3000/jouer).

## Contenu

- 5 tours = 1 quinquennat (2027-2031 joués, verdict en 2032)
- 100 mesures chiffrées, 5 courants politiques
- Retraites et TVA comme leviers dans chaque camp
- 8 indicateurs en temps réel (vert / orange / rouge)
- 30 événements conditionnels
- Journal de mandat + verdict composite
- Scène Three.js du conseil des ministres (France + 8 orbes)

## SEO / AEO

- Metadata Open Graph, sitemap, robots (crawlers IA autorisés)
- JSON-LD `VideoGame` + `WebSite`
- `public/llms.txt` et `public/llms-full.txt`
- Pages citables : `/comment-jouer`, `/mesures`, `/indicateurs`, `/a-propos`

## Tests

```bash
npm test          # unitaires (Vitest)
npm run test:e2e  # E2E (Playwright / Chromium)
npm run test:all  # les deux
```

```
NEXT_PUBLIC_SITE_URL=https://presidentielles-2027.fr
```
