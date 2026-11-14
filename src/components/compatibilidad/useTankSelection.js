"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getSpeciesById } from "@/lib/speciesData";

export const MAX_QTY = 50;
export const MAX_LITERS = 2000;

// La selección viaja en la URL para poder compartirla: ?l=60&p=tetra-neon:10,neocaridina:10
function readQuery(search) {
  const params = new URLSearchParams(search);
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

  return { liters: liters > 0 && liters <= MAX_LITERS ? String(liters) : "", selection };
}

const URL_EVENT = "compatibilidad:url";

function writeQuery({ liters, selection }) {
  const params = new URLSearchParams();
  if (liters) params.set("l", liters);
  if (selection.length) params.set("p", selection.map(e => `${e.id}:${e.qty}`).join(","));
  const query = params.toString().replace(/%3A/g, ":").replace(/%2C/g, ",");
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
const getServerSearch = () => "";

// Cada cambio parte de la URL actual, no de lo que se pintó: así dos clics seguidos no se pisan
const update = change => {
  const current = readQuery(window.location.search);
  writeQuery({ ...current, ...change(current) });
};

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

const reset = () => writeQuery({ liters: "", selection: [] });

// Litros y especies elegidas. La URL es la única fuente de verdad: en el servidor está vacía
// y el navegador la lee al hidratar.
//   liters: texto del campo ("" si no hay) · selection: [{ id, qty }]
export function useTankSelection() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const { liters, selection } = useMemo(() => readQuery(search), [search]);

  return { liters, selection, setLiters, addSpecies, removeSpecies, setQty, reset };
}
