"use client";

import { motion } from "motion/react";
import { evalTone, STAT_META, STAT_ORDER } from "@/lib/game/stats";
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

const TONE_RING: Record<string, string> = {
  good: "border-good/25",
  warn: "border-warn/25",
  bad: "border-bad/30",
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
        const meta = STAT_META[key];
        const tone = evalTone(key, stats[key]);
        const delta = deltas?.[key];
        return (
          <article
            key={key}
            className={`panel min-w-0 overflow-hidden rounded-xl border px-2.5 py-2 sm:px-3 sm:py-2.5 ${TONE_RING[tone]}`}
          >
            <div className="flex items-center justify-between gap-1">
              <p className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:text-[10px] sm:tracking-[0.18em]">
                {meta.short}
              </p>
              {delta ? (
                <motion.span
                  key={`${key}-${delta}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`shrink-0 font-mono text-[10px] font-semibold tabular-nums ${
                    (meta.good === "low" ? delta < 0 : delta > 0)
                      ? "text-good"
                      : "text-bad"
                  }`}
                >
                  {delta > 0 ? "+" : ""}
                  {delta}
                </motion.span>
              ) : null}
            </div>
            <p className="mt-1 flex min-w-0 items-baseline gap-1">
              <span
                className={`font-mono text-base font-semibold tabular-nums sm:text-xl ${TONE[tone]}`}
              >
                {stats[key].toFixed(meta.decimals)}
              </span>
              <span className="truncate font-mono text-[9px] text-muted sm:text-[10px]">
                {meta.unit}
              </span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
              <motion.div
                className={`h-full rounded-full ${BAR[tone]}`}
                animate={{ width: `${widthFor(key, stats[key])}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
    <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:tracking-[0.16em]">
      <span className="text-good">Vert</span> dans les clous ·{" "}
      <span className="text-warn">Orange</span> sous tension ·{" "}
      <span className="text-bad">Rouge</span> alerte
    </p>
  );
}
