"use client";

import { useEffect, useState } from "react";

export function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const sync = () => setMatches(window.innerWidth >= px);
    sync();
    window.addEventListener("resize", sync);
    const media = window.matchMedia(`(min-width: ${px}px)`);
    media.addEventListener("change", sync);
    return () => {
      window.removeEventListener("resize", sync);
      media.removeEventListener("change", sync);
    };
  }, [px]);

  return matches;
}
