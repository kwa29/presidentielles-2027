"use client";

import { isPositiveImpact, STAT_META } from "@/lib/game/stats";
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
  return (
    <button
      type="button"
      data-testid="measure-card"
      data-measure-id={measure.id}
      disabled={disabled}
      onClick={() => onChoose(measure)}
      className="decree group relative flex h-full min-w-0 flex-col rounded-2xl p-4 text-left outline-offset-2 transition duration-200 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_22px_44px_rgba(0,0,0,0.28)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a6540] sm:tracking-[0.18em]">
        {measure.cat}
      </p>
      <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-xl leading-tight text-ink sm:text-2xl xl:text-[1.35rem]">
        {measure.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4d4333]">
        {measure.desc}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.entries(measure.fx) as [StatKey, number][]).map(([key, value]) => (
          <span
            key={key}
            className={`rounded-full px-2 py-1 font-mono text-[10px] font-semibold tabular-nums ${
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
      <span className="mt-4 inline-flex items-center gap-1.5 border-t border-[#c9a45c]/25 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8a6d2e] transition group-hover:text-ink">
        Signer le décret
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </button>
  );
}
