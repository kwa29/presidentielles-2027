export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
        404 · Dossier introuvable
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-paper">
        Cette allée de l&apos;Élysée n&apos;existe pas.
      </h1>
      <a href="/" className="mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy">
        Retour au palais
      </a>
    </div>
  );
}
