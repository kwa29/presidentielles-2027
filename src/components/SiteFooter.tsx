import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-gold/15 bg-navy/90 px-4 py-12 pb-[max(2.75rem,env(safe-area-inset-bottom))] text-center text-sm text-muted">
      <div className="gold-rule mx-auto mb-8 max-w-xs opacity-70" />
      <p className="font-[family-name:var(--font-display)] text-xl text-gold-2">
        {SITE_NAME}
      </p>
      <p className="mx-auto mt-3 max-w-2xl leading-relaxed">
        Jeu gratuit et indépendant. Chiffres simplifiés à but ludique et
        pédagogique, non contractuels. Inspiré de{" "}
        <em>La Bataille du Budget</em> (Rayan Nezzar), transposé au rôle de
        Président(e) de la République.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link href="/comment-jouer" className="link-gold">
          Comment jouer
        </Link>
        <Link href="/mesures" className="link-gold">
          Les 100 mesures
        </Link>
        <Link href="/a-propos" className="link-gold">
          À propos
        </Link>
        <Link href="/mentions-legales" className="link-gold">
          Mentions légales
        </Link>
        <Link href="/llms.txt" className="link-gold">
          llms.txt
        </Link>
      </div>
    </footer>
  );
}
