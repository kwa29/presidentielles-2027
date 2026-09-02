"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import {
  advanceYear,
  computeVerdict,
  countryMood,
  createInitialState,
  getStats,
  isMandateOver,
  pickCards,
  playTurn,
} from "@/lib/game";
import { TOTAL_TURNS } from "@/lib/game/types";
import type { GameEvent, GameState, Measure, Verdict } from "@/lib/game/types";
import { DecisionLog } from "./DecisionLog";
import { MeasureCard } from "./MeasureCard";
import { StatGrid, ToneLegend } from "./StatGrid";

type Phase = "briefing" | "choice" | "event" | "verdict";

const TICKER = [
  "AFP — Déficit à 5,4 % du PIB, Bruxelles s'impatiente",
  "Bercy — La dette flirte avec 116 % du PIB",
  "Place Beauvau — L'autorité de l'État est contestée",
  "Matignon — La cohésion sociale reste fragile",
  "Élysée — Un quinquennat, cinq décrets, zéro filet",
];

export function GameApp() {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [state, setState] = useState<GameState>(createInitialState);
  const [cards, setCards] = useState<Measure[]>([]);
  const [event, setEvent] = useState<GameEvent | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [locked, setLocked] = useState(false);

  const stats = getStats(state);
  const mood = countryMood(stats);
  const ticker = useMemo(() => [...TICKER, ...TICKER].join("  ·  "), []);

  function startMandate() {
    const next = createInitialState();
    setState(next);
    setCards(pickCards(next));
    setEvent(null);
    setVerdict(null);
    setPhase("choice");
  }

  function choose(measure: Measure) {
    if (locked) return;
    setLocked(true);
    const played = playTurn(state, measure);
    setState(played.state);
    setEvent(played.event);
    setPhase("event");
  }

  function continueAfterEvent() {
    if (isMandateOver(state)) {
      setVerdict(computeVerdict(state));
      setPhase("verdict");
      setLocked(false);
      return;
    }
    const next = advanceYear(state);
    setState(next);
    setCards(pickCards(next));
    setEvent(null);
    setPhase("choice");
    setLocked(false);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-x-0 top-0 h-[420px]">
          <SceneCanvas stats={stats} mood={mood} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/75 to-navy" />
      </div>

      <div className="ticker relative z-10 overflow-hidden border-b border-gold/15 bg-black/30 py-2">
        <p className="marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-gold-2">
          {ticker}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <AnimatePresence mode="wait">
          {phase === "briefing" && (
            <motion.section
              key="briefing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="decree mx-auto max-w-3xl rounded-3xl p-6 md:p-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8a6d2e]">
                Palais de l&apos;Élysée · 14 mai 2027
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink md:text-5xl">
                Vous prenez vos fonctions.
                <span className="block text-[#7a1d28]">La France ne vous attend pas.</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#3f3628]">
                France 2027 : déficit à 5,4 % du PIB, dette à 116 % du PIB,
                chômage à 7,5 %, croissance en berne, cohésion fragile,
                autorité de l&apos;État contestée. Cinq années. Une mesure par
                an, tirée parmi quatre décrets. Chaque décision a un prix — et
                le hasard s&apos;en mêle.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#4d4333] sm:grid-cols-2">
                <li>💶 Économie & Budget</li>
                <li>🛡️ Sécurité & Ordre public</li>
                <li>🤝 Social & Cohésion</li>
                <li>🌍 International & Rayonnement</li>
              </ul>
              <button
                type="button"
                onClick={startMandate}
                className="mt-8 rounded-full bg-bleu px-6 py-3 text-sm font-semibold text-paper shadow-[0_10px_24px_rgba(0,38,84,0.35)] transition hover:brightness-110"
              >
                Prendre mes fonctions →
              </button>
            </motion.section>
          )}

          {phase === "choice" && (
            <motion.section
              key={`choice-${state.year}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
                    Année {state.turn} / {TOTAL_TURNS}
                  </p>
                  <h1 className="font-[family-name:var(--font-display)] text-4xl text-paper md:text-5xl">
                    {state.year}
                  </h1>
                </div>
                <span className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-2">
                  Conseil des ministres
                </span>
              </div>

              <StatGrid stats={stats} deltas={state.lastDeltas} />
              <ToneLegend />

              <h2 className="mt-8 font-[family-name:var(--font-display)] text-3xl text-paper">
                Quelle mesure engagez-vous cette année ?
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {cards.map((measure) => (
                  <MeasureCard
                    key={measure.id}
                    measure={measure}
                    onChoose={choose}
                    disabled={locked}
                  />
                ))}
              </div>
              <div className="mt-6">
                <DecisionLog entries={state.log} />
              </div>
            </motion.section>
          )}

          {phase === "event" && event && (
            <motion.section
              key={`event-${state.year}-${event.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <StatGrid stats={stats} deltas={state.lastDeltas} />
              <article className="mt-6 overflow-hidden rounded-3xl border border-[#4a2233] bg-gradient-to-br from-[#2a1620] to-[#120b12] p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-warn">
                  Flash AFP · {state.year}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-paper md:text-4xl">
                  {event.text}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  Le pays réagit. Les indicateurs bougent. Vous n&apos;avez plus
                  qu&apos;à encaisser — puis à choisir la suite du mandat.
                </p>
                <button
                  type="button"
                  onClick={continueAfterEvent}
                  className="mt-6 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy"
                >
                  {isMandateOver(state)
                    ? "Lire le verdict du quinquennat →"
                    : "Passer à l'année suivante →"}
                </button>
              </article>
              <div className="mt-6">
                <DecisionLog entries={state.log} />
              </div>
            </motion.section>
          )}

          {phase === "verdict" && verdict && (
            <motion.section
              key="verdict"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="decree mx-auto max-w-3xl rounded-3xl p-6 md:p-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8a6d2e]">
                14 mai 2032 · Fin du quinquennat · Score {verdict.score}/100
              </p>
              <h1
                className={`mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight ${
                  verdict.kind === "success"
                    ? "text-[#1f7a52]"
                    : verdict.kind === "mixed"
                      ? "text-[#8a6d2e]"
                      : "text-[#9b2330]"
                }`}
              >
                {verdict.title}
              </h1>
              <p className="mt-2 text-lg italic text-[#6a5a38]">
                On vous appellera : {verdict.nickname}.
              </p>
              <p className="mt-5 text-base leading-relaxed text-[#3f3628]">
                {verdict.text}
              </p>
              <div className="mt-6">
                <StatGrid stats={stats} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startMandate}
                  className="rounded-full bg-bleu px-5 py-3 text-sm font-semibold text-paper"
                >
                  Rejouer un mandat →
                </button>
                <ShareButton verdict={verdict} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ShareButton({ verdict }: { verdict: Verdict }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `${verdict.title} (${verdict.score}/100) — ${verdict.nickname}. J'ai tenté de redresser la France sur Président(e) 2027.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Président(e) 2027", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-full border border-[#c9a45c] px-5 py-3 text-sm font-semibold text-ink"
    >
      {copied ? "Copié dans le journal !" : "Partager le verdict"}
    </button>
  );
}
