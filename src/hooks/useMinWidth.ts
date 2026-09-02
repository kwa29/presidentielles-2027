"use client";

import { useEffect, useState } from "react";

export function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${px}px)`);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [px]);

  return matches;
}
