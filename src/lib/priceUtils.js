// Utilidad para formatear precios en pesos colombianos

export function formatPrice(price, currency = "$") {
  // Para pesos colombianos, formatear sin decimales y con separadores de miles
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return `${currency} ${formattedPrice}`;
}
