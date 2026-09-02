"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { FranceSilhouette } from "@/components/scene/FranceSilhouette";
import { useMinWidth } from "@/hooks/useMinWidth";
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
import {
  CURRENT_META,
  getCurrentBreakdown,
  getDominantCurrent,
} from "@/lib/game/currents";
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
  "INSEE — Le chômage résiste autour de 7,5 %",
  "Banque de France — La croissance plafonne sous 1 %",
  "Bruxelles — Procédure pour déficit excessif toujours ouverte",
  "Assemblée — La majorité relative freine chaque réforme",
  "Sénat — Le bicaméralisme rallonge les calendriers budgétaires",
  "Cour des comptes — Alerte sur la trajectoire des finances publiques",
  "Conseil constitutionnel — Plusieurs textes sous surveillance",
  "Quai d'Orsay — Le poids diplomatique français sous pression",
  "OTAN — L'effort de défense reste un dossier brûlant",
  "Commission européenne — La règle des 3 % n'est pas oubliée",
  "CAC 40 — Les marchés scrutent chaque annonce de Bercy",
  "Moody's — La note souveraine française reste sous observation",
  "Eurogroupe — Paris doit présenter un plan crédible",
  "Hôpital public — Urgences saturées, personnel en tension",
  "Éducation nationale — Effectifs et attractivité du métier en débat",
  "Retraites — Le déficit du système revient sur la table",
  "Logement — La crise du parc abordable s'installe",
  "Agriculture — Colère rurale et négociations commerciales",
  "Énergie — Prix et souveraineté restent des leviers politiques",
  "Transports — Grèves et retards pèsent sur l'opinion",
  "Outre-mer — Demandes sociales et retards d'investissement",
  "Police — Sentiment d'insécurité en tête des sondages",
  "Justice — Délais et moyens saturent les juridictions",
  "Climat — Canicules et adaptation deviennent un enjeu de mandat",
  "Opinion — La popularité présidentielle oscille dès l'été 2027",
];

export function GameApp() {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [state, setState] = useState<GameState>(createInitialState);
  const [cards, setCards] = useState<Measure[]>([]);
  const [event, setEvent] = useState<GameEvent | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [locked, setLocked] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const stats = getStats(state);
  const mood = countryMood(stats);
  const ticker = useMemo(() => [...TICKER, ...TICKER].join("  ·  "), []);
  const showScene = useMinWidth(768);

  useEffect(() => {
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, state.year]);

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
      <div className="pointer-events-none absolute inset-0 z-0">
        {showScene ? (
          <div className="absolute inset-x-0 top-0 h-[300px] opacity-75 md:h-[400px]">
            <SceneCanvas stats={stats} mood={mood} />
          </div>
        ) : (
          <div className="absolute inset-x-0 top-0 grid h-[200px] place-items-center opacity-35">
            <FranceSilhouette className="h-[85%] w-auto" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/78 to-navy" />
      </div>

      <div className="ticker relative z-10 overflow-hidden border-b border-gold/15 bg-black/35 py-2">
        <p className="marquee whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-gold-2 sm:text-[11px] sm:tracking-[0.18em]">
          {ticker}
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:py-8 md:px-6 md:py-10"
      >
        <AnimatePresence mode="wait">
          {phase === "briefing" && (
            <motion.section
              key="briefing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="decree mx-auto max-w-3xl rounded-2xl p-5 sm:rounded-3xl sm:p-6 md:p-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a6d2e] sm:text-[11px] sm:tracking-[0.28em]">
                Palais de l&apos;Élysée · 14 mai 2027
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
                Vous prenez vos fonctions.
                <span className="block text-[#7a1d28]">
                  La France ne vous attend pas.
                </span>
              </h1>
              <div className="gold-rule my-5 max-w-[7rem] opacity-70" />
              <p className="text-base leading-relaxed text-[#3f3628]">
                France 2027 : déficit à 5,4 % du PIB, dette à 116 % du PIB,
                chômage à 7,5 %, croissance en berne. Cinq années. Chaque année,
                cinq décrets — un par courant, de l&apos;extrême gauche à
                l&apos;extrême droite. Vous n&apos;en signez qu&apos;un.
                Retraites et TVA ne sont jamais loin.
              </p>
              <button
                type="button"
                data-testid="start-mandate"
                onClick={startMandate}
                className="btn-navy mt-8 w-full sm:w-auto"
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
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.28em]"
                    data-testid="game-turn"
                  >
                    Année {state.turn} / {TOTAL_TURNS}
                  </p>
                  <h1
                    className="font-[family-name:var(--font-display)] text-4xl text-paper md:text-5xl"
                    data-testid="game-year"
                  >
                    {state.year}
                  </h1>
                  <div
                    className="progress-rail mt-3 w-40 sm:w-52"
                    aria-label={`Progression du mandat : année ${state.turn} sur ${TOTAL_TURNS}`}
                  >
                    {Array.from({ length: TOTAL_TURNS }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i + 1 < state.turn
                            ? "done"
                            : i + 1 === state.turn
                              ? "current"
                              : undefined
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className="rounded-full border border-gold/30 bg-navy-2/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-2 sm:text-[11px] sm:tracking-[0.18em]">
                  Conseil des ministres
                </span>
              </div>

              <StatGrid stats={stats} deltas={state.lastDeltas} />
              <ToneLegend />

              <h2 className="mt-8 font-[family-name:var(--font-display)] text-2xl text-paper sm:text-3xl">
                Quelle mesure engagez-vous cette année ?
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Cinq propositions sur la table. Une seule signature. Chaque
                décret a un prix.
              </p>
              <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-5">
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
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <StatGrid stats={stats} deltas={state.lastDeltas} />
              <article
                className="mt-6 overflow-hidden rounded-2xl border border-warn/30 bg-gradient-to-br from-[#2a1620] via-[#1a1018] to-[#120b12] p-5 shadow-[0_0_0_1px_rgba(227,179,65,0.08)] sm:rounded-3xl sm:p-6 md:p-8"
                data-testid="event-flash"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-warn/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-warn">
                    Breaking
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-warn/80 sm:text-[11px] sm:tracking-[0.22em]">
                    Flash AFP · {state.year}
                  </p>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-paper sm:text-3xl md:text-4xl">
                  {event.text}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  Le pays réagit. Les indicateurs bougent. Vous n&apos;avez plus
                  qu&apos;à encaisser — puis à choisir la suite du mandat.
                </p>
                <button
                  type="button"
                  data-testid="continue-mandate"
                  onClick={continueAfterEvent}
                  className="btn-primary mt-6 w-full sm:w-auto"
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
              data-testid="verdict"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="decree mx-auto max-w-3xl rounded-2xl p-5 sm:rounded-3xl sm:p-6 md:p-10"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8a6d2e] sm:text-[11px] sm:tracking-[0.28em]"
                data-testid="verdict-score"
              >
                14 mai 2032 · Fin du quinquennat · Score {verdict.score}/100
              </p>
              <h1
                className={`mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl ${
                  verdict.kind === "success"
                    ? "text-[#1f7a52]"
                    : verdict.kind === "mixed"
                      ? "text-[#8a6d2e]"
                      : "text-[#9b2330]"
                }`}
              >
                {verdict.title}
              </h1>
              <p className="mt-2 text-base italic text-[#6a5a38] sm:text-lg">
                On vous appellera : {verdict.nickname}.
              </p>
              <MajorityCurrent counts={state.currentCounts} />
              <div className="gold-rule my-5 max-w-[7rem] opacity-70" />
              <p className="text-base leading-relaxed text-[#3f3628]">
                {verdict.text}
              </p>
              <div className="mt-6">
                <StatGrid stats={stats} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  data-testid="replay-mandate"
                  onClick={startMandate}
                  className="btn-navy w-full sm:w-auto"
                >
                  Rejouer un mandat →
                </button>
                <ShareButton
                  verdict={verdict}
                  majorityLabel={
                    CURRENT_META[getDominantCurrent(state.currentCounts)].label
                  }
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MajorityCurrent({
  counts,
}: {
  counts: GameState["currentCounts"];
}) {
  const dominant = getDominantCurrent(counts);
  const meta = CURRENT_META[dominant];
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const majorityCount = counts[dominant];
  const breakdown = getCurrentBreakdown(counts);

  return (
    <div
      className="mt-5 rounded-2xl border border-[#c9a45c]/35 bg-white/35 p-4"
      data-testid="verdict-current"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a6d2e]">
        Courant majoritaire du mandat
      </p>
      <p
        className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight"
        style={{ color: meta.accent }}
      >
        {meta.label}
      </p>
      <p className="mt-1 text-sm text-[#4d4333]">
        {majorityCount} décret{majorityCount > 1 ? "s" : ""} sur {total} —{" "}
        {meta.blurb}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {breakdown.map((row) => (
          <li
            key={row.current}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a45c]/30 bg-white/50 px-2.5 py-1 font-mono text-[10px] text-[#4d4333]"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: row.accent }}
              aria-hidden
            />
            {row.label} · {row.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShareButton({
  verdict,
  majorityLabel,
}: {
  verdict: Verdict;
  majorityLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `${verdict.title} (${verdict.score}/100) — ${verdict.nickname}. Courant majoritaire : ${majorityLabel}. J'ai tenté de redresser la France sur Président(e) 2027.`;
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
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#c9a45c] px-5 py-3 text-sm font-semibold text-ink transition hover:bg-[#c9a45c]/12 sm:w-auto"
    >
      {copied ? "Copié dans le journal !" : "Partager le verdict"}
    </button>
  );
}
