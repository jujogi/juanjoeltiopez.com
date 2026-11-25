// "Ayúdame a elegir" (/ayudame-a-elegir): arma acuarios completos a partir de cuatro
// respuestas. Función pura, sin React. Cada propuesta pasa por checkCompatibility, las mismas
// reglas de Armonía Acuática, así que al abrirla allá da el mismo veredicto.
import { getSpeciesById } from "./speciesData";
import { checkCompatibility } from "./compatibility";
import { LEVELS, ROLES } from "./advisorSpecies";

// Qué niveles de especie ve cada experiencia
const EXPERIENCE_LEVELS = {
  iniciando: ["facil"],
  algo: ["facil", "medio"],
  experto: ["facil", "medio", "experto"],
};

// Avisos de "cuidado" que aceptamos en una propuesta: ninguno para quien está iniciando
const MAX_CAUTIONS = { iniciando: 0, algo: 1, experto: 1 };

// Avisos que una especie base trae siempre y que aceptamos para cualquier experiencia. El
// Betta macho trae "depende de su temperamento" con cualquier pez: lo aceptamos y la
// propuesta lo muestra.
const BASE_CAUTIONS = { betta: 1 };

// El agua de la llave de cada respuesta. Una especie entra si este punto está dentro de sus
// rangos de pH y GH. "No sé" es un agua neutra: entran las que toleran un rango amplio.
const WATER = {
  blanda: { ph: 6.5, gh: 6 },
  dura: { ph: 7.5, gh: 14 },
  nose: { ph: 7.0, gh: 8 },
};

// Casi todas las ciudades de Colombia son tibias: sugerimos especies que viven bien en este
// rango (°C). En tierra fría, los resultados recomiendan calentador.
const TROPICAL = [25, 27];

// Los papeles (ROLES en advisorSpecies.js) de cada meta, en orden. El primero es la base de
// la propuesta y es obligatorio; los demás se agregan si encajan.
const GOALS = {
  comunidad: {
    slots: [["cardumen", "viviparos"], ["cardumen", "viviparos"], ["fondo"], ["limpieza"]],
  },
  protagonista: { slots: [["protagonista"], ["cardumen", "viviparos"], ["fondo"], ["limpieza"]] },
  gambario: { slots: [["gambas"], ["nano"], ["caracol"]] },
  grandes: { slots: [["grande"], ["cardumenGrande", "cardumen"], ["fondoGrande"]] },
};

export const ANSWER_OPTIONS = {
  exp: Object.keys(EXPERIENCE_LEVELS),
  agua: Object.keys(WATER),
  meta: Object.keys(GOALS),
};

// Los resultados muestran 3 y "Ver otras opciones" las demás
const MAX_PROPOSALS = 6;
// Papel que no cuenta para decir si dos propuestas son distintas. Los caracoles del gambario sí
// cuentan: ahí son parte de la propuesta.
const CLEANUP_ROLES = ["limpieza"];
// Hasta qué parte del acuario llenamos con la regla de 1 cm por litro: dejamos margen
const FILL = 0.8;
// Un cardumen crece hasta el doble de su grupo mínimo, si cabe
const GROWTH = 2;

const inRange = ([min, max], value) => min <= value && value <= max;

function fits(species, { exp, agua }) {
  const water = WATER[agua];
  return (
    EXPERIENCE_LEVELS[exp].includes(LEVELS[species.id]) &&
    inRange(species.ph, water.ph) &&
    inRange(species.gh, water.gh) &&
    species.temp[0] <= TROPICAL[1] &&
    species.temp[1] >= TROPICAL[0]
  );
}

// Centímetros de pez adulto (las gambitas y los caracoles no cuentan, igual que en Armonía)
export const stockingCm = selection =>
  selection.reduce((sum, { id, qty }) => {
    const s = getSpeciesById(id);
    return s.type === "fish" ? sum + s.sizeCm * qty : sum;
  }, 0);

function startQty(species, liters) {
  // Un caracol por cada 30 litros, de 1 a 3
  if (species.type === "snail") return Math.min(3, Math.max(1, Math.floor(liters / 30)));
  return species.maxCount ? Math.min(species.minGroup, species.maxCount) : species.minGroup;
}

const cautions = result => result.checks.filter(c => c.level === "caution").length;

function isAcceptable(selection, liters, maxCautions) {
  if (stockingCm(selection) > liters * FILL) return false;
  const result = checkCompatibility(selection, liters);
  return result.level !== "bad" && cautions(result) <= maxCautions;
}

// Generador de números al azar a partir de una semilla (mulberry32): la misma semilla da
// siempre el mismo orden, así un enlace compartido muestra las mismas propuestas
function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Las especies de unos papeles, mezcladas al azar (Fisher-Yates)
function shuffledPool(roles, random) {
  const ids = roles.flatMap(role => ROLES[role]);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

// ids: las especies de un papel, ya en el orden en que se prueban
const candidates = (ids, answers) =>
  ids
    .map(id => getSpeciesById(id))
    .filter(s => s && fits(s, answers) && s.minLiters <= answers.liters);

// Los cardúmenes crecen de a un pez, por turnos, mientras quepan
function grow(selection, liters) {
  const schools = selection.filter(e => {
    const s = getSpeciesById(e.id);
    return s.type === "fish" && s.minGroup >= 3;
  });
  let grew = true;
  while (grew) {
    grew = false;
    for (const entry of schools) {
      const s = getSpeciesById(entry.id);
      const cap = Math.min(s.minGroup * GROWTH, s.maxCount || Infinity);
      if (entry.qty < cap && stockingCm(selection) + s.sizeCm <= liters * FILL) {
        entry.qty += 1;
        grew = true;
      }
    }
  }
}

// Una propuesta a partir de su especie base. `used` son las especies de las propuestas
// anteriores: se prefieren otras, para que las opciones no se repitan.
// pools: las especies de cada papel (slots[i]), ya mezcladas
function buildProposal(base, slots, pools, answers, used, maxCautions) {
  const { liters } = answers;
  const selection = [{ id: base.id, qty: startQty(base, liters), role: slots[0][0] }];

  slots.slice(1).forEach((roles, i) => {
    const options = candidates(pools[i + 1], answers)
      .filter(s => !selection.some(e => e.id === s.id))
      // Con un pez territorial (el Betta macho) nada de peces muy coloridos ni gambitas:
      // JuanJo no lo recomienda en esta herramienta, aunque en Armonía sea solo un "cuidado"
      .filter(s => !(base.territorial && (s.colorful || s.type === "shrimp")))
      .sort((a, b) => used.has(a.id) - used.has(b.id));
    for (const s of options) {
      const entry = {
        id: s.id,
        qty: startQty(s, liters),
        role: roles.find(r => ROLES[r].includes(s.id)),
      };
      if (isAcceptable([...selection, entry], liters, maxCautions)) {
        selection.push(entry);
        break;
      }
    }
  });

  grow(selection, liters);
  return selection;
}

// Por qué no hubo propuestas: el acuario es pequeño para esa meta (con los litros que pediría
// la especie base más pequeña), o el agua o la experiencia no dejan ninguna
function noResultReason(slots, answers) {
  const pool = slots[0].flatMap(role => ROLES[role]).map(id => getSpeciesById(id));
  const fitting = pool.filter(s => fits(s, answers));
  if (fitting.length) return { type: "tank", liters: Math.min(...fitting.map(s => s.minLiters)) };
  const levels = EXPERIENCE_LEVELS[answers.exp];
  if (pool.some(s => levels.includes(LEVELS[s.id]))) return { type: "water" };
  return { type: "experience" };
}

// answers: { liters, exp, agua, meta } (exp, agua y meta: las claves de ANSWER_OPTIONS)
// Devuelve { proposals, reason }. Cada propuesta es { selection: [{ id, qty, role }], stocking }
// (stocking: qué parte del acuario ocupa, de 0 a 1). reason solo viene si no hay propuestas.
// seed: la semilla del azar (viaja en la URL). Cada papel se prueba en un orden al azar, así no
// siempre aconsejamos lo mismo.
export function suggestTanks(answers, seed = 0) {
  const { slots } = GOALS[answers.meta];
  const maxCautions = MAX_CAUTIONS[answers.exp];
  const random = seededRandom(seed);
  const pools = slots.map(roles => shuffledPool(roles, random));
  const bases = candidates(pools[0], answers).filter(s =>
    isAcceptable([{ id: s.id, qty: startQty(s, answers.liters) }], answers.liters, maxCautions)
  );

  const proposals = [];
  const used = new Set();
  const seen = new Set();
  // Con pocas especies base se repite la base y cambian las demás
  for (let i = 0; proposals.length < MAX_PROPOSALS && i < bases.length * MAX_PROPOSALS; i++) {
    const base = bases[i % bases.length];
    const allowed = Math.max(maxCautions, BASE_CAUTIONS[base.id] || 0);
    const selection = buildProposal(base, slots, pools, answers, used, allowed);
    // Dos propuestas con los mismos peces principales cuentan como la misma, aunque estén en
    // otro orden (neón + arlequín = arlequín + neón) o cambie el equipo de limpieza
    const key = selection
      .filter(e => !CLEANUP_ROLES.includes(e.role))
      .map(e => e.id)
      .sort()
      .join(",");
    selection.forEach(e => used.add(e.id));
    if (seen.has(key)) continue;
    seen.add(key);
    proposals.push({ selection, stocking: stockingCm(selection) / answers.liters });
  }

  return proposals.length ? { proposals } : { proposals, reason: noResultReason(slots, answers) };
}
