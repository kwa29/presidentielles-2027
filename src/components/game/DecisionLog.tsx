"use client";

import type { LogEntry } from "@/lib/game/types";

export function DecisionLog({ entries }: { entries: LogEntry[] }) {
  if (entries.length === 0) {
    return (
      <aside className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-muted">
        Le journal du mandat est encore vierge. La première décision s&apos;y
        inscrira.
      </aside>
    );
  }

  return (
    <aside className="max-h-56 overflow-y-auto rounded-2xl border border-white/8 bg-black/25 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold sm:tracking-[0.22em]">
        Journal du mandat
      </p>
      <ul className="mt-3 space-y-2">
        {entries.map((entry, index) => (
          <li
            key={`${entry.year}-${entry.kind}-${index}`}
            className="border-b border-dashed border-white/8 pb-2 text-sm last:border-0 last:pb-0"
          >
            <span className="mr-2 shrink-0 font-mono text-[10px] text-gold">
              {entry.year}
            </span>
            <span className={entry.kind === "event" ? "text-warn" : "text-paper"}>
              {entry.kind === "event" ? "⚡ " : "📌 "}
              {entry.text}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
