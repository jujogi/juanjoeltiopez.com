// Litros de agua de un acuario rectangular a partir de sus medidas.
//   length, width, height: centímetros (el alto, hasta donde llega el agua)
//   decorPercent: porcentaje del volumen que ocupan rocas, troncos y sustrato (0–100)
// Devuelve { total, water } en litros enteros; null si falta alguna medida.
export function tankVolume({ length, width, height, decorPercent = 0 }) {
  if (!(length > 0 && width > 0 && height > 0)) return null;
  const total = (length * width * height) / 1000;
  return {
    total: Math.round(total),
    water: Math.max(1, Math.round(total * (1 - decorPercent / 100))),
  };
}
