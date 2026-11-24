// Cómo el buscador de Armonía Acuática encuentra una especie a partir de lo que la persona
// escribe. Funciones puras, sin React: SpeciesSearch.js las usa y se pueden probar con node.
//
// Lo que la gente escribe de verdad (los eventos armonia_busqueda_sin_resultado) trae plurales
// ("escalares"), errores ("golfhis", "corridora"), cantidades ("4 guppy"), puntuación
// ("channa."), nombres en inglés ("ember", "ramshorn") y nombre + variedad ("molly dálmata").
// Todo eso tiene que encontrar la especie que ya tenemos.

import { getSpeciesById } from "./speciesData";

// Sin tildes ni mayúsculas: "neon" encuentra "Tetra neón"
export const normalize = text => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Lo que se busca: sin puntuación ni la cantidad del principio ("4 guppy" → "guppy"). Si la
// persona escribe varias especies ("neon, corydoras", "betta + gambitas", "monjitas y guppy"),
// se busca la última, la que está escribiendo.
export const cleanQuery = query => {
  const parts = normalize(query)
    .split(/[,+]|\s+y\s+|\s+y$/)
    .map(part =>
      part
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/^\s*\d+\s+/, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);
  return parts.at(-1) || "";
};

const wordsOf = text =>
  normalize(text)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

// Plural a singular: "escalares" → "escalar", "monjitas" → "monjita"
const singular = word =>
  word.length > 4 && word.endsWith("es")
    ? word.slice(0, -2)
    : word.length > 3 && word.endsWith("s")
      ? word.slice(0, -1)
      : word;

// Distancia de edición con trasposición ("gamabs" ↔ "gambas" es 1)
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

// Qué tan lejos está una palabra escrita de una palabra del nombre: 0 si es su comienzo (también
// en singular), 1 o 2 si tiene errores, null si no encaja. Los errores solo se aceptan desde 5
// letras (uno; dos desde 7): con palabras cortas casi todo quedaría a un error de distancia.
// Se compara con el comienzo de la palabra, por si la persona no ha terminado de escribir.
const wordDistance = (typed, word, allowErrors) => {
  if (word.startsWith(typed) || word.startsWith(singular(typed))) return 0;
  if (!allowErrors || typed.length < 5) return null;
  const allowed = typed.length >= 7 ? 2 : 1;
  const best = Math.min(
    ...[0, 1].map(extra => editDistance(typed, word.slice(0, typed.length + extra)))
  );
  return best <= allowed ? best : null;
};

// Cada palabra escrita tiene que encajar con alguna palabra del texto ("molly dalmata": Molly +
// dálmata). Devuelve la suma de los errores, o null si alguna no encaja.
function textDistance(typedWords, words, allowErrors) {
  let total = 0;
  for (const typed of typedWords) {
    const distances = words.map(w => wordDistance(typed, w, allowErrors)).filter(d => d !== null);
    if (!distances.length) return null;
    total += Math.min(...distances);
  }
  return total;
}

const startsWord = (text, term) => wordsOf(text).some(w => w.startsWith(term));
// "pez an" también tiene que encontrar "pez ángel": el texto completo o una de sus palabras
const startsText = (text, term) => normalize(text).startsWith(term) || startsWord(text, term);

export const NO_MATCH = 5;

// Animales que la gente busca y que la herramienta no compara: el buscador le explica que solo
// hay peces, gambitas y caracoles (en vez de "no tenemos esa especie todavía")
const NOT_FISH = [
  "ajolote",
  "axolotl",
  "tortuga",
  "turtle",
  "cangrejo",
  "crab",
  "triops",
  "rana",
  "frog",
];
export const isNotFish = term =>
  wordsOf(term).some(
    typed =>
      typed.length >= 3 && NOT_FISH.some(word => word.startsWith(typed) || typed.startsWith(word))
  );

// Qué tan bien encaja la especie s (en el idioma de la herramienta) con term (ya limpio):
// rank 0: el nombre empieza por el texto ("cor" → Corydoras) · 1: otro nombre de la especie
// (aliases en español o inglés, o el nombre en el otro idioma: "pez ángel" → Escalar)
// · 2: empieza una palabra del nombre científico o del grupo · 3: todas las palabras encajan,
// en plural, en otro orden o con errores ("golfhis" → Goldfish) · 4: aparece en medio de una
// palabra · 5: no coincide. errors: cuántos errores tuvo (desempata el rank 3). alias: el otro
// nombre que coincidió, para mostrarlo en la sugerencia.
export function matchSpecies(s, term) {
  const es = getSpeciesById(s.id, "es");
  const en = getSpeciesById(s.id, "en");
  const otherNames = [
    ...new Set([
      ...(s.aliases || []),
      ...(es.aliases || []),
      ...(en.aliases || []),
      es.name,
      en.name,
    ]),
  ].filter(name => name !== s.name);

  if (startsText(s.name, term)) return { rank: 0 };
  const alias = otherNames.find(a => startsText(a, term));
  if (alias) return { rank: 1, alias };
  if (startsWord(`${s.scientific} ${s.group} ${es.group}`, term)) return { rank: 2 };

  // Escrito todo junto o separado: "gold fish" → goldfish, "neo cari" → Neocaridinas
  const compact = term.replace(/ /g, "");
  const compactOf = text => normalize(text).replace(/[^a-z0-9]/g, "");
  if (compact.length >= 4) {
    if (compactOf(s.name).startsWith(compact)) return { rank: 3, errors: 0 };
    const joined = otherNames.find(a => compactOf(a).startsWith(compact));
    if (joined) return { rank: 3, errors: 0, alias: joined };
  }

  // Plurales y otro orden en nombre + científico; errores solo en los nombres comunes
  const typedWords = wordsOf(term);
  if (textDistance(typedWords, wordsOf(`${s.name} ${s.scientific}`), false) !== null)
    return { rank: 3, errors: 0 };
  let best = null;
  for (const name of [s.name, ...otherNames]) {
    const errors = textDistance(typedWords, wordsOf(`${s.name} ${name}`), true);
    if (errors !== null && (!best || errors < best.errors))
      best = { rank: 3, errors, alias: name === s.name ? undefined : name };
  }
  if (best) return best;

  // Dentro de una palabra, solo desde 4 letras: con menos casi todo coincide
  if (term.length < 4) return { rank: NO_MATCH };
  if (normalize(`${s.name} ${s.scientific}`).includes(term)) return { rank: 4 };
  const inside = otherNames.find(a => normalize(a).includes(term));
  return inside ? { rank: 4, alias: inside } : { rank: NO_MATCH };
}

// Las especies de list que encajan con term, de la que mejor encaja a la que menos
export const searchSpecies = (list, term) =>
  list
    .map(item => ({ item, ...matchSpecies(item, term) }))
    .filter(m => m.rank < NO_MATCH)
    // A igual rank, primero la de menos errores, y la que encajó por su nombre antes que por otro
    .sort(
      (a, b) =>
        a.rank - b.rank || (a.errors || 0) - (b.errors || 0) || Boolean(a.alias) - Boolean(b.alias)
    );
