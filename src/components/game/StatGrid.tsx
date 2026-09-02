"use client";

import { motion } from "motion/react";
import { evalTone, formatStat, STAT_META, STAT_ORDER } from "@/lib/game/stats";
import type { GameStats, Impacts, StatKey } from "@/lib/game/types";

const TONE: Record<string, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
};

const BAR: Record<string, string> = {
  good: "bg-good",
  warn: "bg-warn",
  bad: "bg-bad",
};

function widthFor(key: StatKey, value: number) {
  const meta = STAT_META[key];
  if (meta.max) return Math.max(0, Math.min(100, value));
  if (key === "deficit") return Math.max(0, Math.min(100, (10 - value) * 10));
  if (key === "dette") return Math.max(0, Math.min(100, 140 - value));
  if (key === "chomage") return Math.max(0, Math.min(100, (12 - value) * 10));
  return Math.max(0, Math.min(100, value * 20));
}

export function StatGrid({
  stats,
  deltas,
}: {
  stats: GameStats;
  deltas?: Impacts;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {STAT_ORDER.map((key) => {
        const tone = evalTone(key, stats[key]);
        const delta = deltas?.[key];
        return (
          <article
            key={key}
            className="rounded-xl border border-white/8 bg-navy-2/80 px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {STAT_META[key].short}
              </p>
              {delta ? (
                <span
                  className={`font-mono text-[10px] ${
                    (STAT_META[key].good === "low" ? delta < 0 : delta > 0)
                      ? "text-good"
                      : "text-bad"
                  }`}
                >
                  {delta > 0 ? "+" : ""}
                  {delta}
                </span>
              ) : null}
            </div>
            <p className={`mt-1 font-mono text-xl font-semibold ${TONE[tone]}`}>
              {formatStat(key, stats[key])}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
              <motion.div
                className={`h-full ${BAR[tone]}`}
                animate={{ width: `${widthFor(key, stats[key])}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ToneLegend() {
  return (
    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
      <span className="text-good">Vert</span> dans les clous ·{" "}
      <span className="text-warn">Orange</span> sous tension ·{" "}
      <span className="text-bad">Rouge</span> alerte
    </p>
  );
}
