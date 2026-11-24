// Unidades del acuario en Armonía Acuática: litros (la de siempre) o galones de EE. UU.
// El acuario se guarda siempre en litros (el `l` de la URL) y la unidad dice cómo se escribe y
// cómo se muestra. Cambiar de unidad conserva el número escrito (60 L → 60 gal), así que sí
// cambia el acuario (useTankSelection.js).

export const UNITS = ["l", "gal"];
export const DEFAULT_UNIT = "l";
export const LITERS_PER_GALLON = 3.78541;

// Tamaños comunes de un toque en cada unidad: cinco en cada una, para que la fila mida igual
export const VOLUME_PRESETS = {
  l: [20, 40, 60, 100, 200],
  gal: [10, 20, 40, 60, 75],
};

// Decimales al mostrar el acuario: en galones hacen falta dos para no perder precisión
const TANK_DECIMALS = { l: 1, gal: 2 };
// Margen, en unidades del último decimal, para los errores de coma flotante y de los litros
// guardados con 6 decimales (26.4 gal → 99.934824 L → 26.39999… gal no debe verse 26.39)
const EPSILON = 1e-3;

const roundDown = (value, decimals) => {
  const f = 10 ** decimals;
  return Math.floor(value * f + EPSILON) / f;
};
const roundUp = (value, decimals) => {
  const f = 10 ** decimals;
  return Math.ceil(value * f - EPSILON) / f;
};

// Lo que la persona escribe (en su unidad) → litros, con 6 decimales para la URL
export const toLiters = (value, unit) =>
  Math.round((unit === "gal" ? value * LITERS_PER_GALLON : value) * 1e6) / 1e6;

// El acuario en la unidad elegida, como número (el campo y los textos muestran este mismo
// valor). Se redondea hacia abajo: nunca parece más grande de lo que es.
export const tankInUnit = (liters, unit) =>
  roundDown(unit === "gal" ? liters / LITERS_PER_GALLON : liters, TANK_DECIMALS[unit]);

const short = unit => (unit === "gal" ? "gal" : "L");

// "60 L" o "26.42 gal"
export const formatTank = (liters, unit) => `${tankInUnit(liters, unit)} ${short(unit)}`;

// Lo que pide una especie o una combinación: "100 L" o "26.5 gal". En galones se redondea
// hacia arriba (con un decimal), salvo cuando sí cabe en el acuario: ahí nunca se muestra
// mayor que el acuario. Así el texto siempre coincide con el veredicto.
// tankLiters: el acuario, o null si no hay con qué comparar (la ficha sin litros)
export function formatNeeded(liters, unit, tankLiters = null) {
  if (unit !== "gal") return `${liters} L`;
  let value = roundUp(liters / LITERS_PER_GALLON, 1);
  if (tankLiters != null && liters <= tankLiters)
    value = Math.min(value, tankInUnit(tankLiters, unit));
  return `${value} gal`;
}
