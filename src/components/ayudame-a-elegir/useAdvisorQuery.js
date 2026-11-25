"use client";

import { useMemo, useSyncExternalStore } from "react";
import { DEFAULT_UNIT } from "@/lib/tankUnits";
import { ANSWER_OPTIONS } from "@/lib/speciesAdvisor";
import { elegir, faq, howWeChoose, questions, ui } from "@/lib/elegirData";
import { elegirEn } from "@/lib/elegirEn";

// Las respuestas viajan en la URL para poder compartir los resultados:
// ?l=60&exp=iniciando&agua=blanda&meta=comunidad. Igual que en Armonía Acuática, `l` son
// siempre litros, &u=gal dice que el campo muestra galones y &lang=en pone todo en inglés.
// &s es la semilla del azar de las propuestas (speciesAdvisor.js). Cambia solo cuando cambia
// una respuesta (litros, experiencia, parámetros u objetivo) y cuando la persona ya vio todas
// las opciones (AdvisorResults.js). Ir atrás y volver, recargar la página o abrir un enlace
// compartido muestra las mismas propuestas.
const URL_EVENT = "elegir:url";
export const MAX_LITERS = 2000;

const COPY = { es: { elegir, questions, ui, faq, howWeChoose }, en: elegirEn };

const pick = (params, key) => {
  const value = params.get(key);
  return ANSWER_OPTIONS[key].includes(value) ? value : null;
};

function readQuery(search) {
  const params = new URLSearchParams(search);
  const liters = Number(params.get("l"));
  return {
    liters: liters > 0 && liters <= MAX_LITERS ? liters : null,
    unit: params.get("u") === "gal" ? "gal" : DEFAULT_UNIT,
    exp: pick(params, "exp"),
    agua: pick(params, "agua"),
    meta: pick(params, "meta"),
    lang: params.get("lang") === "en" ? "en" : "es",
    // Sin semilla (enlaces de antes), las propuestas salen siempre en el mismo orden
    seed: Number(params.get("s")) || 0,
  };
}

const ANSWER_KEYS = ["liters", "exp", "agua", "meta"];
export const newSeed = () => 1 + Math.floor(Math.random() * 999999);

function writeQuery({ liters, unit, exp, agua, meta, lang, seed }) {
  const params = new URLSearchParams();
  if (liters) params.set("l", liters);
  if (unit !== DEFAULT_UNIT) params.set("u", unit);
  if (exp) params.set("exp", exp);
  if (agua) params.set("agua", agua);
  if (meta) params.set("meta", meta);
  if (seed) params.set("s", seed);
  if (lang === "en") params.set("lang", lang);
  const query = params.toString();
  if (`?${query}` === window.location.search || (!query && !window.location.search)) return;
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  window.dispatchEvent(new Event(URL_EVENT));
}

const subscribe = onChange => {
  window.addEventListener(URL_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(URL_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
};

const getSearch = () => window.location.search;
// En el servidor no hay respuestas y todo va en español: es la versión que ve Google
const getServerSearch = () => "";

// Las respuestas, el idioma con sus textos y `update(cambios)` para escribirlas en la URL
export function useAdvisorQuery() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const query = useMemo(() => readQuery(search), [search]);
  // Si cambia una respuesta, cambia la semilla: otras propuestas al azar. Sin respuestas
  // (Empezar de nuevo), sin semilla.
  const update = changes => {
    const current = readQuery(window.location.search);
    const next = { ...current, ...changes };
    if (ANSWER_KEYS.some(key => key in changes && changes[key] !== current[key]))
      next.seed = ANSWER_KEYS.some(key => next[key]) ? newSeed() : 0;
    writeQuery(next);
  };
  return { ...query, copy: COPY[query.lang], update };
}
