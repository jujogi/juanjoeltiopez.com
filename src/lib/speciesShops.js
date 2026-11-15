// Tiendas donde se consigue cada especie de /armonia-acuatica ("¿Dónde comprar…?" en la ficha).
// Son enlaces pagados o de alianza: la ficha los marca como patrocinados y salen con
// rel="sponsored", como pide Google para los enlaces comerciales.
//
// Para sumar una tienda:
//   1. Agrégala en `shops` con su logo en /public/images/tiendas/ (fondo transparente, ~200 px de ancho).
//   2. En `speciesShops`, pon el id de la tienda en cada especie que vende. `url` es opcional:
//      el enlace directo a esa especie en la tienda; sin él se usa el enlace general de la tienda.
import { getWhatsAppLink } from "./whatsappUtils";

export const shops = {
  // "mi-tienda": { name: "Mi Tienda", logo: "/images/tiendas/mi-tienda.png", url: "https://…", city: "Medellín" },
};

export const speciesShops = {
  // "tetra-neon": [{ shop: "mi-tienda", url: "https://…/tetra-neon" }],
};

export const whereToBuy = {
  heading: name => `¿Dónde comprar ${name}?`,
  sponsored: "Tiendas aliadas",
  shopsInvite: name => `¿Tienes una tienda y vendes ${name}?`,
  shopsInviteCta: "Contáctame para aparecer aquí",
};

// Tiendas de una especie, ya con su enlace: [{ id, name, logo, city, url }]
export const getShopsFor = speciesId =>
  (speciesShops[speciesId] || [])
    .filter(entry => shops[entry.shop])
    .map(entry => ({
      id: entry.shop,
      ...shops[entry.shop],
      url: entry.url || shops[entry.shop].url,
    }));

export const getShopContactLink = speciesName =>
  getWhatsAppLink(
    `¡Hola JuanJo! Tengo una tienda y vendo ${speciesName}. Quiero aparecer en Armonía Acuática.`
  );
