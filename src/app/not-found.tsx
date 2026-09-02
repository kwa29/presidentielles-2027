import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.28em]">
        404 · Dossier introuvable
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-paper sm:text-5xl">
        Cette allée de l&apos;Élysée n&apos;existe pas.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy sm:w-auto"
      >
        Retour au palais
      </Link>
    </div>
  );
}
