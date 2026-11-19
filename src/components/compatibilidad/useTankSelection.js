"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getSpeciesById } from "@/lib/speciesData";
import { DEFAULT_UNIT, tankInUnit, toLiters } from "@/lib/tankUnits";

export const MAX_QTY = 50;
export const MAX_LITERS = 2000;

// La selección viaja en la URL para poder compartirla: ?l=60&p=tetra-neon:10,neocaridina:10
// `l` son siempre litros. Con &u=gal el acuario se escribe y se muestra en galones, pero se
// guarda en litros (?l=75.7082&u=gal): cambiar de unidad no cambia el acuario.
// Con &lang=en la herramienta se ve en inglés (useArmoniaLang.js).
export const readLang = search => (new URLSearchParams(search).get("lang") === "en" ? "en" : "es");

function readQuery(search) {
  const params = new URLSearchParams(search);
  const unit = params.get("u") === "gal" ? "gal" : DEFAULT_UNIT;
  const liters = Number(params.get("l"));
  const selection = (params.get("p") || "")
    .split(",")
    .map(part => {
      const [id, qty] = part.split(":");
      return { id, qty: Math.min(Math.max(Number(qty) || 1, 1), MAX_QTY) };
    })
    .filter(
      (entry, i, all) => getSpeciesById(entry.id) && all.findIndex(e => e.id === entry.id) === i
    );

  return {
    liters: liters > 0 && liters <= MAX_LITERS ? liters : null,
    unit,
    selection,
    lang: readLang(search),
  };
}

const URL_EVENT = "compatibilidad:url";

function writeQuery({ liters, unit, selection, lang }) {
  const params = new URLSearchParams();
  if (liters) params.set("l", liters);
  if (unit !== DEFAULT_UNIT) params.set("u", unit);
  if (selection.length) params.set("p", selection.map(e => `${e.id}:${e.qty}`).join(","));
  if (lang === "en") params.set("lang", lang);
  const query = params.toString().replace(/%3A/g, ":").replace(/%2C/g, ",");
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  window.dispatchEvent(new Event(URL_EVENT));
}

export const subscribe = onChange => {
  window.addEventListener(URL_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(URL_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

// Cada cambio parte de la URL actual, no de lo que se pintó: así dos clics seguidos no se pisan
const update = change => {
  const current = readQuery(window.location.search);
  writeQuery({ ...current, ...change(current) });
};

// size: el texto del campo, en la unidad elegida; se guarda convertido a litros
const setSize = size =>
  update(({ unit }) => ({ liters: Number(size) > 0 ? toLiters(Number(size), unit) : null }));

// Solo cambia cómo se ve: el acuario (los litros) sigue igual
const setUnit = unit => update(() => ({ unit }));

// Litros que ya vienen calculados (la calculadora), sin pasar por la unidad
const setLiters = liters => update(() => ({ liters }));

// Acepta una o varias especies; las que ya están no se repiten
const addSpecies = (...ids) =>
  update(({ selection }) => ({
    selection: [
      ...selection,
      ...ids
        .filter(id => !selection.some(e => e.id === id))
        .map(id => ({ id, qty: getSpeciesById(id).minGroup })),
    ],
  }));

const removeSpecies = id =>
  update(({ selection }) => ({ selection: selection.filter(e => e.id !== id) }));

const setQty = (id, qty) =>
  update(({ selection }) => ({
    selection: selection.map(e => (e.id === id ? { ...e, qty } : e)),
  }));

// Empezar de nuevo borra el acuario, no el idioma ni la unidad
const reset = () => update(() => ({ liters: null, selection: [] }));

export const setLang = lang => update(() => ({ lang }));

// Tamaño del acuario y especies elegidas. La URL es la única fuente de verdad: en el servidor
// está vacía y el navegador la lee al hidratar.
//   liters: el acuario en litros, para las reglas (null si no hay) · unit: "l" o "gal"
//   size: el texto del campo, el acuario en la unidad elegida ("" si no hay)
//   selection: [{ id, qty }]
export function useTankSelection() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const { liters, unit, selection } = useMemo(() => readQuery(search), [search]);
  const size = liters ? String(tankInUnit(liters, unit)) : "";

  return {
    size,
    unit,
    liters,
    selection,
    setSize,
    setUnit,
    setLiters,
    addSpecies,
    removeSpecies,
    setQty,
    reset,
  };
}
