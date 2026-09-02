import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-gold/15 bg-navy px-4 py-10 text-center text-sm text-muted">
      <p className="font-[family-name:var(--font-display)] text-lg text-gold-2">
        {SITE_NAME}
      </p>
      <p className="mx-auto mt-3 max-w-2xl leading-relaxed">
        Jeu gratuit et indépendant. Chiffres simplifiés à but ludique et
        pédagogique, non contractuels. Inspiré de{" "}
        <em>La Bataille du Budget</em> (Rayan Nezzar), transposé au rôle de
        Président(e) de la République.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <Link href="/comment-jouer" className="hover:text-gold-2">
          Comment jouer
        </Link>
        <Link href="/a-propos" className="hover:text-gold-2">
          À propos
        </Link>
        <Link href="/mentions-legales" className="hover:text-gold-2">
          Mentions légales
        </Link>
        <Link href="/llms.txt" className="hover:text-gold-2">
          llms.txt
        </Link>
      </div>
    </footer>
  );
}
