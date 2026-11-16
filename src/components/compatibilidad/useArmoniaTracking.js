"use client";

import { useEffect } from "react";
import { trackArmonia } from "@/lib/gtm";

const SEARCH_SETTLE_MS = 1200; // la persona dejó de escribir
const MAX_PARAM_LENGTH = 100; // límite de GA4 para el texto de un parámetro

// Registra lo que la gente busca y no encuentra: son las especies que faltan por agregar
export function useTrackNoResults(term, hasResults) {
  useEffect(() => {
    if (!term || hasResults) return;
    const timer = setTimeout(
      () => trackArmonia("busqueda_sin_resultado", { busqueda: term.slice(0, MAX_PARAM_LENGTH) }),
      SEARCH_SETTLE_MS
    );
    return () => clearTimeout(timer);
  }, [term, hasResults]);
}
