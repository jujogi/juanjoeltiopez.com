// Tiendas donde se consigue cada especie de /armonia-acuatica ("¿Dónde comprar…?" en la ficha).
// Son enlaces pagados o de alianza: la ficha los marca como patrocinados y salen con
// rel="sponsored", como pide Google para los enlaces comerciales.
// La ficha las agrupa por país y ciudad, porque la herramienta también la visitan fuera de
// Colombia (en inglés).
//
// Para sumar una tienda:
//   1. Agrégala en `shops` con su país (código ISO de dos letras: "CO", "MX", "US"…) y su
//      ciudad. El logo es opcional: /public/images/tiendas/ (fondo transparente, ~200 px de ancho).
//   2. En `speciesShops`, pon el id de la tienda en cada especie que vende. `url` es opcional:
//      el enlace directo a esa especie en la tienda; sin él se usa el enlace general de la tienda.
import { getWhatsAppLink } from "./whatsappUtils";

const UNIVERSO = "https://compreloadomicilio.com/co/tienda/eluniversodelospeces";

export const shops = {
  // "mi-tienda": { name: "Mi Tienda", logo: "/images/tiendas/mi-tienda.png", url: "https://…", country: "CO", city: "Medellín" },
  "el-universo-de-los-peces": {
    name: "El Universo de los Peces",
    logo: "/images/tiendas/el-universo-de-los-peces.png",
    url: UNIVERSO,
    country: "CO",
    city: "Cali",
  },
};

export const speciesShops = {
  betta: [
    {
      shop: "el-universo-de-los-peces",
      url: `${UNIVERSO}/producto/peces/pez-betta-macho-13329`,
    },
  ],
  "acara-azul": [
    {
      shop: "el-universo-de-los-peces",
      url: `${UNIVERSO}/producto/peces/pez-andinoacara-pulcher-azul-electrico-64546`,
    },
  ],
  escalar: [
    {
      shop: "el-universo-de-los-peces",
      url: `${UNIVERSO}/producto/peces/pez-escalar-pequeno-60504`,
    },
  ],
};

export const whereToBuy = {
  heading: name => `¿Dónde comprar ${name}?`,
  sponsored: "Tiendas aliadas",
  shopsInvite: name => `¿Tienes una tienda y vendes ${name}?`,
  shopsInviteCta: "Contáctame para aparecer aquí",
};

// Tiendas de una especie, ya con su enlace: [{ id, name, logo, country, city, url }]
export const getShopsFor = speciesId =>
  (speciesShops[speciesId] || [])
    .filter(entry => shops[entry.shop])
    .map(entry => ({
      id: entry.shop,
      ...shops[entry.shop],
      url: entry.url || shops[entry.shop].url,
    }));

// El nombre del país en el idioma de la herramienta ("CO" → "Colombia")
const countryName = (code, lang) => new Intl.DisplayNames([lang], { type: "region" }).of(code);

const byLabel = key => (a, b) => a[key].localeCompare(b[key], "es");

// Las tiendas de una especie agrupadas por país y ciudad, en orden alfabético:
// [{ country, countryName, cities: [{ city, shops: [...] }] }]
export function getShopsByPlace(speciesId, lang = "es") {
  const countries = [];
  for (const shop of getShopsFor(speciesId)) {
    let country = countries.find(c => c.country === shop.country);
    if (!country) {
      country = { country: shop.country, countryName: countryName(shop.country, lang), cities: [] };
      countries.push(country);
    }
    let city = country.cities.find(c => c.city === shop.city);
    if (!city) {
      city = { city: shop.city, shops: [] };
      country.cities.push(city);
    }
    city.shops.push(shop);
  }
  countries.sort(byLabel("countryName"));
  for (const country of countries) {
    country.cities.sort(byLabel("city"));
    for (const city of country.cities) city.shops.sort(byLabel("name"));
  }
  return countries;
}

export const getShopContactLink = speciesName =>
  getWhatsAppLink(
    `¡Hola JuanJo! Tengo una tienda y vendo ${speciesName}. Quiero aparecer en Armonía Acuática.`
  );
