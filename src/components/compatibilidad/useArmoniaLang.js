"use client";

import { useSyncExternalStore } from "react";
import {
  checksExplained,
  compatibilidad,
  faq,
  litersCalculator,
  starterCombos,
  ui,
} from "@/lib/compatibilidadData";
import { armoniaEn } from "@/lib/compatibilidadEn";
import { whereToBuy } from "@/lib/speciesShops";
import { readLang, setLang, subscribe } from "./useTankSelection";

const COPY = {
  es: { compatibilidad, litersCalculator, starterCombos, checksExplained, faq, whereToBuy, ui },
  en: armoniaEn,
};

const getLang = () => readLang(window.location.search);
// En el servidor siempre es español: es la versión que ve Google
const getServerLang = () => "es";

// Idioma de la herramienta ("es" o "en") y sus textos. Viaja en la URL (&lang=en), así un
// enlace copiado en inglés se abre en inglés.
export function useArmoniaLang() {
  const lang = useSyncExternalStore(subscribe, getLang, getServerLang);
  return { lang, copy: COPY[lang], setLang };
}
