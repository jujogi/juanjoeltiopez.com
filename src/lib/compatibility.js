// Reglas de la herramienta de compatibilidad. Función pura: recibe la selección
// y los litros, devuelve un veredicto con sus razones.
import { getSpeciesById, formatRange } from "./speciesData";

// De mejor a peor: el veredicto general es el peor de todas las revisiones
const LEVEL_ORDER = ["ok", "caution", "bad"];

// Regla orientativa de ocupación: 1 litro por cada centímetro de pez adulto
const LITERS_PER_CM = 1;
const OVERSTOCK_BAD_RATIO = 1.5;

const PARAMETERS = [
  { key: "temp", label: "temperatura", unit: " °C", digits: 0 },
  { key: "ph", label: "pH", unit: "", digits: 1 },
  { key: "gh", label: "GH", unit: "", digits: 0 },
];

// Rango que comparten todas las especies, y las dos que lo limitan
function sharedRange(list, key) {
  const lowest = list.reduce((a, b) => (b[key][0] > a[key][0] ? b : a));
  const highest = list.reduce((a, b) => (b[key][1] < a[key][1] ? b : a));
  return { min: lowest[key][0], max: highest[key][1], lowest, highest };
}

function parameterChecks(list) {
  const checks = [];
  const shared = {};

  for (const { key, label, unit, digits } of PARAMETERS) {
    const { min, max, lowest, highest } = sharedRange(list, key);
    const needs = `${lowest.name}: ${formatRange(lowest[key], unit, digits)}. ${highest.name}: ${formatRange(highest[key], unit, digits)}`;
    const single = `${min.toFixed(digits)}${unit}`;

    if (min > max) {
      shared[key] = null;
      checks.push({
        level: "bad",
        title: `No comparten ${label}`,
        detail: `${needs}. No hay un valor que les sirva a los dos.`,
      });
    } else if (min === max) {
      shared[key] = single;
      checks.push({
        level: "caution",
        title: `Margen muy estrecho de ${label}`,
        detail: `${needs}. Solo coinciden en ${single}: tendrías que mantenerlo muy estable.`,
      });
    } else {
      shared[key] = formatRange([min, max], unit, digits);
    }
  }

  // Coincidir en un solo punto en varios parámetros es, en la práctica, no coincidir
  if (checks.filter(c => c.level === "caution").length > 1) {
    checks.push({
      level: "bad",
      title: "Casi no comparten parámetros",
      detail:
        "Apenas coinciden en un punto en más de un parámetro. Alguna de las dos va a sobrevivir en vez de vivir bien.",
    });
  }

  if (list.length > 1 && checks.length === 0) {
    checks.push({
      level: "ok",
      title: "Comparten parámetros",
      detail: `Les sirve la misma agua: ${shared.temp}, pH ${shared.ph} y GH ${shared.gh}.`,
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

function tankChecks(entries, liters) {
  // Sin litros (se llega desde un artículo con especies ya elegidas) no hay acuario que revisar
  if (!liters) return [];
  const checks = [];

  for (const { species } of entries) {
    if (species.minLiters > liters) {
      checks.push({
        level: "bad",
        title: `El acuario es pequeño para ${species.name}`,
        detail: `Necesita mínimo ${species.minLiters} L y tu acuario tiene ${liters} L.`,
      });
    }
  }

  const stocking = stockingLiters(entries);

  if (stocking > liters) {
    checks.push({
      level: stocking > liters * OVERSTOCK_BAD_RATIO ? "bad" : "caution",
      title: "Son muchos peces para ese acuario",
      detail: `Con la regla de 1 litro por centímetro de pez adulto, esa cantidad pide unos ${stocking} L y tu acuario tiene ${liters} L. Baja la cantidad o piensa en un acuario más grande: entre más grande, mejor.`,
    });
  } else if (checks.length === 0) {
    checks.push({
      level: "ok",
      title: "Caben en tu acuario",
      detail: `Esa combinación pide mínimo ${neededLiters(entries)} L y tu acuario tiene ${liters} L.`,
    });
  }

  return checks;
}

function groupChecks(entries) {
  const checks = [];

  for (const { species, qty } of entries) {
    if (species.maxCount && qty > species.maxCount) {
      checks.push({
        level: "bad",
        title: `Solo ${species.maxCount} ${species.name} por acuario`,
        detail: "Es territorial: dos machos en el mismo acuario se pelean.",
      });
    } else if (qty < species.minGroup) {
      checks.push({
        level: "caution",
        title: `${species.name}: mejor en grupo de ${species.minGroup} o más`,
        detail: `Pusiste ${qty}. En grupos pequeños viven estresados y se esconden: no es lo mismo vivir que sobrevivir.`,
      });
    }
  }

  return checks;
}

const names = items =>
  new Intl.ListFormat("es", { type: "conjunction" }).format(items.map(s => s.name));

// Lo que una especie (a) les hace a las demás. Cada regla sale una sola vez y nombra a todas
// las afectadas: así no se repite el mismo aviso por cada pareja.
function behaviourChecks(a, others) {
  const checks = [];
  const fish = others.filter(b => b.type === "fish");
  const add = (level, affected, title, detail) => {
    if (affected.length) checks.push({ level, title, detail: detail(names(affected)) });
  };

  if (a.finNipper) {
    add(
      "bad",
      fish.filter(b => b.longFins),
      `${a.name} muerde aletas`,
      n => `Los peces de aletas largas terminan mordidos y estresados. No lo juntes con ${n}.`
    );
  }

  // Peces territoriales como el Betta: entre más se parezca el otro a un rival, peor
  if (a.territorial) {
    const gouramis = fish.filter(b => b.labyrinth);
    const longFinned = fish.filter(b => b.longFins && !b.labyrinth);
    const colorful = fish.filter(b => b.colorful && !b.longFins && !b.labyrinth);
    const rest = fish.filter(b => !b.labyrinth && !b.longFins && !b.colorful && !b.finNipper);

    add(
      "bad",
      gouramis,
      `${a.name} no tolera a los guramis`,
      n => `Son parientes y los ve como otro macho: se van a pelear. No lo juntes con ${n}.`
    );
    add(
      "bad",
      longFinned,
      `${a.name} ataca peces de aletas o colas largas`,
      n =>
        `Los confunde con otro macho por sus aletas y los persigue y ataca. No lo juntes con ${n}.`
    );
    add(
      "caution",
      colorful,
      `${a.name} puede perseguir peces coloridos`,
      n =>
        `Algunos ${a.name} ven los colores muy vivos como un rival. Con ${n} funciona mejor en acuarios grandes y con muchas plantas, y solo si tu pez es tranquilo.`
    );
    add(
      "caution",
      rest,
      `Depende del temperamento de tu ${a.name}`,
      n =>
        `Con ${n} no hay aletas largas ni colores que lo provoquen, pero cada ${a.name} tiene su propio temperamento. Obsérvalo los primeros días y ten un plan B por si los persigue.`
    );
  }

  if (a.speciesOnly) {
    add(
      "bad",
      fish,
      `${a.name}: mejor en un acuario solo para su especie`,
      n => `${a.speciesOnly} No lo juntes con ${n}.`
    );
  }

  if (a.eatsUnderCm) {
    const prey = fish.filter(b => b.sizeCm < a.eatsUnderCm);
    add(
      "bad",
      prey,
      `${a.name} se puede comer a ${names(prey)}`,
      () =>
        `De adulto mide unos ${a.sizeCm} cm: los peces de menos de ${a.eatsUnderCm} cm le caben en la boca.`
    );
  }

  return checks;
}

// Reglas entre especies del mismo tipo: se revisan una vez sobre toda la selección
function rivalryChecks(list) {
  const checks = [];
  const gouramis = list.filter(s => s.labyrinth && !s.territorial);
  const dwarfCichlids = list.filter(s => s.bottomTerritory);

  if (gouramis.length > 1) {
    checks.push({
      level: "caution",
      title: "Guramis distintos pueden pelear",
      detail: `${names(gouramis)} son parientes y los machos se ven como rivales. Solo en acuarios grandes y con muchas plantas que corten la vista.`,
    });
  }

  if (dwarfCichlids.length > 1) {
    checks.push({
      level: "caution",
      title: "Los cíclidos enanos compiten por el fondo",
      detail: `${names(dwarfCichlids)} defienden territorio en la misma zona. Necesitas un acuario largo, de 100 L o más, con cuevas y plantas para que cada uno tenga su espacio.`,
    });
  }

  return checks;
}

// Peces que se comen las gambitas: un solo aviso que nombra a todos los que lo hacen
function shrimpChecks(list) {
  const checks = [];
  const fish = list.filter(s => s.type === "fish");
  const shrimp = list.filter(s => s.type === "shrimp");
  const breeding = shrimp.filter(s => s.breedsInTank !== false);
  const eatAdults = fish.filter(s => s.shrimpRisk === "adultas");
  const eatFry = fish.filter(s => s.shrimpRisk === "crias");
  const plural = items => items.length > 1;

  if (shrimp.length && eatAdults.length) {
    checks.push({
      level: "bad",
      title: `${names(eatAdults)} se ${plural(eatAdults) ? "comen" : "come"} las gambas`,
      detail: `Las ${plural(eatAdults) ? "ven" : "ve"} como alimento, incluso a las adultas. No ${plural(eatAdults) ? "los" : "lo"} juntes con ${names(shrimp)}.`,
    });
  }

  if (breeding.length && eatFry.length) {
    checks.push({
      level: "caution",
      title: `${names(eatFry)} se ${plural(eatFry) ? "pueden" : "puede"} comer las crías`,
      detail: `Lo más probable es que se ${plural(eatFry) ? "coman" : "coma"} muchas crías de ${names(breeding)}. Las adultas, en un acuario bien plantado, normalmente logran esconderse: entre más musgos y plantas tengas, mejor.`,
    });
  }

  return checks;
}

// selection: [{ id, qty }] · liters: litros del acuario, o null si todavía no se saben
export function checkCompatibility(selection, liters) {
  const entries = selection
    .map(({ id, qty }) => ({ species: getSpeciesById(id), qty }))
    .filter(e => e.species);
  if (entries.length === 0) return null;

  const list = entries.map(e => e.species);
  const { checks: paramChecks, shared } = parameterChecks(list);

  const pairChecks = [
    ...list.flatMap(a =>
      behaviourChecks(
        a,
        list.filter(b => b.id !== a.id)
      )
    ),
    ...rivalryChecks(list),
    ...shrimpChecks(list),
  ];

  const checks = [
    ...paramChecks,
    ...pairChecks,
    ...groupChecks(entries),
    ...tankChecks(entries, liters),
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
export function fitWithTank(selection, liters, id) {
  const known = new Set(checkCompatibility(selection, liters)?.checks.map(c => c.title));
  const candidate = { id, qty: getSpeciesById(id).minGroup };
  const added = checkCompatibility([...selection, candidate], liters).checks.filter(
    c => !known.has(c.title)
  );
  // Ya vienen ordenados de peor a mejor
  return added[0]?.level || "ok";
}
