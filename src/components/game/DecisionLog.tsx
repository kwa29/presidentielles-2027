"use client";

import type { LogEntry } from "@/lib/game/types";

export function DecisionLog({ entries }: { entries: LogEntry[] }) {
  if (entries.length === 0) {
    return (
      <aside className="panel rounded-2xl p-4 text-sm text-muted">
        Le journal du mandat est encore vierge. La première décision s&apos;y
        inscrira.
      </aside>
    );
  }

  return (
    <aside className="panel max-h-56 overflow-y-auto rounded-2xl p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold sm:tracking-[0.22em]">
        Journal du mandat
      </p>
      <ul className="mt-3 space-y-2.5">
        {entries.map((entry, index) => (
          <li
            key={`${entry.year}-${entry.kind}-${index}`}
            className="flex gap-3 border-b border-dashed border-white/8 pb-2.5 text-sm last:border-0 last:pb-0"
          >
            <span className="shrink-0 pt-0.5 font-mono text-[10px] text-gold">
              {entry.year}
            </span>
            <span className="min-w-0">
              <span
                className={`mr-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                  entry.kind === "event" ? "text-warn" : "text-muted"
                }`}
              >
                {entry.kind === "event" ? "Flash" : "Décret"}
              </span>
              <span
                className={
                  entry.kind === "event" ? "text-warn/95" : "text-paper"
                }
              >
                {entry.text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
