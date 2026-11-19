// Reglas de la herramienta de compatibilidad. Función pura: recibe la selección, los litros
// y el idioma, devuelve un veredicto con sus razones. Los textos están en compatibilityMessages.js.
import { getSpeciesById, formatRange } from "./speciesData";
import { compatibilityMessages } from "./compatibilityMessages";
import { formatNeeded, formatTank } from "./tankUnits";

// De mejor a peor: el veredicto general es el peor de todas las revisiones
const LEVEL_ORDER = ["ok", "caution", "bad"];

// Regla orientativa de ocupación: 1 litro por cada centímetro de pez adulto
const LITERS_PER_CM = 1;
const OVERSTOCK_BAD_RATIO = 1.5;
// Acuario mínimo para dos o más cíclidos enanos que defienden el fondo
const BOTTOM_RIVALS_MIN_LITERS = 100;

const PARAMETERS = [
  { key: "temp", unit: " °C", digits: 0 },
  { key: "ph", unit: "", digits: 1 },
  { key: "gh", unit: "", digits: 0 },
];

// Rango que comparten todas las especies, y las dos que lo limitan
function sharedRange(list, key) {
  const lowest = list.reduce((a, b) => (b[key][0] > a[key][0] ? b : a));
  const highest = list.reduce((a, b) => (b[key][1] < a[key][1] ? b : a));
  return { min: lowest[key][0], max: highest[key][1], lowest, highest };
}

function parameterChecks(list, t) {
  const checks = [];
  const shared = {};

  for (const { key, unit, digits } of PARAMETERS) {
    const label = t.parameterLabels[key];
    const { min, max, lowest, highest } = sharedRange(list, key);
    const needs = `${lowest.name}: ${formatRange(lowest[key], unit, digits)}. ${highest.name}: ${formatRange(highest[key], unit, digits)}`;
    const single = `${min.toFixed(digits)}${unit}`;

    if (min > max) {
      shared[key] = null;
      checks.push({
        level: "bad",
        title: t.noOverlap.title(label),
        detail: t.noOverlap.detail(needs),
      });
    } else if (min === max) {
      shared[key] = single;
      checks.push({
        level: "caution",
        title: t.narrowOverlap.title(label),
        detail: t.narrowOverlap.detail(needs, single),
      });
    } else {
      shared[key] = formatRange([min, max], unit, digits);
    }
  }

  // Coincidir en un solo punto en varios parámetros es, en la práctica, no coincidir
  if (checks.filter(c => c.level === "caution").length > 1) {
    checks.push({
      level: "bad",
      title: t.barelyShared.title(),
      detail: t.barelyShared.detail(),
    });
  }

  if (list.length > 1 && checks.length === 0) {
    checks.push({
      level: "ok",
      title: t.shared.title(),
      detail: t.shared.detail(shared),
    });
  }

  return { checks, shared };
}

// Litros que pide la regla de ocupación. Las gambitas no cuentan: su carga biológica es mínima
const stockingLiters = entries =>
  Math.ceil(
    entries
      .filter(e => e.species.type === "fish")
      .reduce((sum, e) => sum + e.qty * e.species.sizeCm, 0) * LITERS_PER_CM
  );

// Lo que de verdad pide la selección: el acuario mínimo de la especie más exigente o la regla
// de ocupación, lo que sea mayor (un solo pez globo de 2.5 cm no vive en 3 L)
const neededLiters = entries =>
  Math.max(stockingLiters(entries), ...entries.map(e => e.species.minLiters));

// vol: litros → texto en la unidad elegida ("60 L" o "16 gal")
function tankChecks(entries, liters, t, vol) {
  // Sin litros (se llega desde un artículo con especies ya elegidas) no hay acuario que revisar
  if (!liters) return [];
  const checks = [];

  for (const { species } of entries) {
    if (species.minLiters > liters) {
      checks.push({
        level: "bad",
        title: t.tankTooSmall.title(species.name),
        detail: t.tankTooSmall.detail(vol(species.minLiters, true), vol(liters)),
      });
    }
  }

  const stocking = stockingLiters(entries);

  if (stocking > liters) {
    checks.push({
      level: stocking > liters * OVERSTOCK_BAD_RATIO ? "bad" : "caution",
      title: t.overstocked.title(),
      detail: t.overstocked.detail(vol(stocking, true), vol(liters)),
    });
  } else if (checks.length === 0) {
    checks.push({
      level: "ok",
      title: t.fits.title(),
      detail: t.fits.detail(vol(neededLiters(entries), true), vol(liters)),
    });
  }

  return checks;
}

function groupChecks(entries, t) {
  const checks = [];

  for (const { species, qty } of entries) {
    if (species.maxCount && qty > species.maxCount) {
      checks.push({
        level: "bad",
        title: t.maxCount.title(species.maxCount, species.name),
        detail: t.maxCount.detail(),
      });
    } else if (
      species.unstableGroup &&
      qty >= species.unstableGroup[0] &&
      qty <= species.unstableGroup[1]
    ) {
      checks.push({
        level: "caution",
        title: t.unstableGroup.title(species.name, species.unstableGroup[1] + 1),
        detail: t.unstableGroup.detail(qty),
      });
    } else if (qty < species.minGroup) {
      checks.push({
        level: "caution",
        title: t.smallGroup.title(species.name, species.minGroup),
        detail: t.smallGroup.detail(qty),
      });
    }
  }

  return checks;
}

// "Tetra neón, Guppy y Platy" / "Neon tetra, Guppy, and Platy"
const listNames = lang => items =>
  new Intl.ListFormat(lang, { type: "conjunction" }).format(items.map(s => s.name));

// Lo que una especie (a) les hace a las demás. Cada regla sale una sola vez y nombra a todas
// las afectadas: así no se repite el mismo aviso por cada pareja.
function behaviourChecks(a, others, t, names) {
  const checks = [];
  const fish = others.filter(b => b.type === "fish");
  const add = (level, affected, title, detail) => {
    if (affected.length) checks.push({ level, title, detail: detail(names(affected)) });
  };

  if (a.finNipper) {
    add(
      "bad",
      fish.filter(b => b.longFins),
      t.finNipper.title(a.name),
      t.finNipper.detail
    );
  }

  // Peces territoriales como el Betta: entre más se parezca el otro a un rival, peor
  if (a.territorial) {
    // La hembra de su misma especie no es un gurami más: tiene su propio aviso
    const mates = fish.filter(b => b.scientific === a.scientific);
    const gouramis = fish.filter(b => b.labyrinth && !mates.includes(b));
    const longFinned = fish.filter(b => b.longFins && !b.labyrinth);
    const colorful = fish.filter(b => b.colorful && !b.longFins && !b.labyrinth);
    const rest = fish.filter(b => !b.labyrinth && !b.longFins && !b.colorful && !b.finNipper);

    add("bad", mates, t.mates.title(a.name, names(mates)), t.mates.detail);
    add("bad", gouramis, t.gouramis.title(a.name), t.gouramis.detail);
    add("bad", longFinned, t.longFins.title(a.name), t.longFins.detail);
    add("caution", colorful, t.colorful.title(a.name), n => t.colorful.detail(a.name, n));
    add("caution", rest, t.temperament.title(a.name), n => t.temperament.detail(a.name, n));
  }

  if (a.speciesOnly) {
    add("bad", fish, t.speciesOnly.title(a.name), n => t.speciesOnly.detail(a.speciesOnly, n));
  }

  if (a.eatsUnderCm) {
    const prey = fish.filter(b => b.sizeCm < a.eatsUnderCm);
    add("bad", prey, t.eatsSmallFish.title(a.name, names(prey)), () =>
      t.eatsSmallFish.detail(a.sizeCm, a.eatsUnderCm)
    );
  }

  return checks;
}

// Reglas entre especies del mismo tipo: se revisan una vez sobre toda la selección
function rivalryChecks(list, t, names, vol) {
  const checks = [];
  const gouramis = list.filter(s => s.labyrinth && !s.territorial);
  const dwarfCichlids = list.filter(s => s.bottomTerritory);

  if (gouramis.length > 1) {
    checks.push({
      level: "caution",
      title: t.labyrinthRivals.title(),
      detail: t.labyrinthRivals.detail(names(gouramis)),
    });
  }

  if (dwarfCichlids.length > 1) {
    checks.push({
      level: "caution",
      title: t.bottomRivals.title(),
      detail: t.bottomRivals.detail(names(dwarfCichlids), vol(BOTTOM_RIVALS_MIN_LITERS, true)),
    });
  }

  return checks;
}

// Lo que se come a las gambitas (peces, y el caracol Helena a las crías): un solo aviso que
// nombra a todos los que lo hacen
function shrimpChecks(list, t, names) {
  const checks = [];
  const predators = list.filter(s => s.type !== "shrimp");
  const shrimp = list.filter(s => s.type === "shrimp");
  const breeding = shrimp.filter(s => s.breedsInTank !== false);
  const eatAdults = predators.filter(s => s.shrimpRisk === "adultas");
  const eatFry = predators.filter(s => s.shrimpRisk === "crias");
  const plural = items => items.length > 1;

  if (shrimp.length && eatAdults.length) {
    checks.push({
      level: "bad",
      title: t.eatShrimp.title(names(eatAdults), plural(eatAdults)),
      detail: t.eatShrimp.detail(plural(eatAdults), names(shrimp)),
    });
  }

  if (breeding.length && eatFry.length) {
    checks.push({
      level: "caution",
      title: t.eatShrimpFry.title(names(eatFry), plural(eatFry)),
      detail: t.eatShrimpFry.detail(plural(eatFry), names(breeding)),
    });
  }

  return checks;
}

// Lo que se come a los caracoles (peces y el caracol Helena): un aviso para los que se comen
// cualquier caracol y otro para los que solo se comen los pequeños (smallSnail)
function snailChecks(list, t, names) {
  const checks = [];
  const snails = list.filter(s => s.type === "snail");
  const plural = items => items.length > 1;
  const add = (risk, isPrey, message) => {
    // Nadie se come a sí mismo: la Helena sola no cuenta como presa ni como cazadora
    const eaters = list.filter(s => s.snailRisk === risk && snails.some(p => p !== s && isPrey(p)));
    const prey = snails.filter(p => isPrey(p) && eaters.some(e => e !== p));
    if (eaters.length && prey.length) {
      checks.push({
        level: "bad",
        title: message.title(names(eaters), plural(eaters)),
        detail: message.detail(plural(eaters), names(prey)),
      });
    }
  };

  add("todos", () => true, t.eatSnails);
  add("pequenos", p => p.smallSnail, t.eatSmallSnails);
  return checks;
}

// selection: [{ id, qty }] · liters: litros del acuario, o null si todavía no se saben
// lang: "es" o "en", el idioma de los nombres y los avisos · unit: "l" o "gal", la unidad en
// que se muestran los volúmenes de los avisos (las cuentas siempre son en litros)
export function checkCompatibility(selection, liters, lang = "es", unit = "l") {
  const t = compatibilityMessages[lang] || compatibilityMessages.es;
  const names = listNames(lang);
  // vol(litros) → el acuario ("60 L") · vol(litros, true) → lo que se pide, comparado con el
  // acuario para que el texto nunca contradiga el veredicto
  const vol = (value, isNeeded = false) =>
    isNeeded ? formatNeeded(value, unit, liters) : formatTank(value, unit);
  const entries = selection
    .map(({ id, qty }) => ({ species: getSpeciesById(id, lang), qty }))
    .filter(e => e.species);
  if (entries.length === 0) return null;

  const list = entries.map(e => e.species);
  const { checks: paramChecks, shared } = parameterChecks(list, t);

  const pairChecks = [
    ...list.flatMap(a =>
      behaviourChecks(
        a,
        list.filter(b => b.id !== a.id),
        t,
        names
      )
    ),
    ...rivalryChecks(list, t, names, vol),
    ...shrimpChecks(list, t, names),
    ...snailChecks(list, t, names),
  ];

  const checks = [
    ...paramChecks,
    ...pairChecks,
    ...groupChecks(entries, t),
    ...tankChecks(entries, liters, t, vol),
  ].sort((a, b) => LEVEL_ORDER.indexOf(b.level) - LEVEL_ORDER.indexOf(a.level));

  return {
    level: checks[0]?.level || "ok",
    checks,
    shared,
    liters,
    neededLiters: neededLiters(entries),
  };
}

// Cómo encajaría una especie más en el acuario actual: el peor nivel entre los avisos nuevos
// que traería. Sirve para marcar las sugerencias del buscador antes de elegirlas.
// Un aviso cuenta como nuevo si cambia su título o su detalle: los avisos que nombran a todas
// las afectadas ("X se come los caracoles") conservan el título y suman la especie al detalle.
export function fitWithTank(selection, liters, id) {
  const key = c => `${c.title}\n${c.detail}`;
  const known = new Set(checkCompatibility(selection, liters)?.checks.map(key));
  const candidate = { id, qty: getSpeciesById(id).minGroup };
  const added = checkCompatibility([...selection, candidate], liters).checks.filter(
    c => !known.has(key(c))
  );
  // Ya vienen ordenados de peor a mejor
  return added[0]?.level || "ok";
}
