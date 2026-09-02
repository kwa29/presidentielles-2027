"use client";

import { isPositiveImpact, STAT_META } from "@/lib/game/stats";
import { CURRENT_META } from "@/lib/game/currents";
import type { Measure, StatKey } from "@/lib/game/types";

export function MeasureCard({
  measure,
  onChoose,
  disabled,
}: {
  measure: Measure;
  onChoose: (measure: Measure) => void;
  disabled?: boolean;
}) {
  const current = CURRENT_META[measure.current];

  return (
    <button
      type="button"
      data-testid="measure-card"
      data-measure-id={measure.id}
      data-current={measure.current}
      disabled={disabled}
      onClick={() => onChoose(measure)}
      className="decree group relative flex h-full min-w-0 flex-col rounded-2xl border-l-4 p-4 text-left transition [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold disabled:cursor-not-allowed disabled:opacity-60"
      style={{ borderLeftColor: current.accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="min-w-0 font-mono text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em]"
          style={{ color: current.accent }}
        >
          {current.label}
        </p>
        <span className="shrink-0 rounded-full border border-[#c9a45c]/50 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-[#8a6d2e]">
          {measure.cat}
        </span>
      </div>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl leading-tight text-ink sm:text-2xl xl:text-xl">
        {measure.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4d4333]">
        {measure.desc}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.entries(measure.fx) as [StatKey, number][]).map(([key, value]) => (
          <span
            key={key}
            className={`rounded-full px-2 py-1 font-mono text-[10px] font-semibold ${
              isPositiveImpact(key, value)
                ? "bg-[#d9f5e8] text-[#1f7a52]"
                : "bg-[#f8d7da] text-[#9b2330]"
            }`}
          >
            {STAT_META[key].short} {value > 0 ? "+" : ""}
            {value}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-flex items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#8a6d2e] group-hover:text-ink">
        Signer le décret →
      </span>
    </button>
  );
}
