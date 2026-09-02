import { METROPOLE, CORSE, outlineToSvgPath } from "./franceOutline";

export function FranceSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-1.55 -1.55 3.15 3.2"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="france-tricolore" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#002654" />
          <stop offset="48%" stopColor="#f6f1e6" />
          <stop offset="100%" stopColor="#ce1126" />
        </linearGradient>
      </defs>
      <path
        d={outlineToSvgPath(METROPOLE)}
        fill="url(#france-tricolore)"
        stroke="#e8d5a3"
        strokeWidth="0.025"
      />
      <path
        d={outlineToSvgPath(CORSE)}
        fill="#ce1126"
        stroke="#e8d5a3"
        strokeWidth="0.02"
      />
    </svg>
  );
}
