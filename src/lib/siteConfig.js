// Datos globales del sitio: usados en metadata, JSON-LD y componentes de autor.
export const SITE_URL = "https://juanjoeltiopez.com";
export const SITE_NAME = "JuanJo El Tío Pez";

export const socialProfiles = {
  tiktok: {
    label: "TikTok",
    followers: 89968,
    url: "https://www.tiktok.com/@juanjoeltiopez",
  },
  instagram: {
    label: "Instagram",
    followers: 26843,
    url: "https://www.instagram.com/juanjoeltiopez/",
  },
};

export const totalFollowers = Object.values(socialProfiles).reduce(
  (sum, profile) => sum + profile.followers,
  0
);

export const mainAuthor = {
  name: SITE_NAME,
  image: "/images/juanjoeltiopez.jpg",
  // Versión pequeña para los avatares redondos (la foto completa pesa 68 KB)
  avatar: "/images/juanjoeltiopez-avatar.jpg",
  url: `${SITE_URL}/sobre-mi`,
  shortBio:
    "Acuarista colombiano desde 2020 y creador de contenido. Te comparto lo que me ha funcionado (y lo que no) con peces, gambitas y acuarios plantados. Mi misión: promover una acuariofilia responsable.",
  // Concursos internacionales de paisajismo acuático en los que ha participado
  contests: [
    { name: "IAPLC (International Aquatic Plants Layout Contest)", year: 2026, rank: 1191 },
    { name: "Chihiros International Aquatic Design Contest", year: 2024, rank: 536 },
  ],
};

export const contestsText = mainAuthor.contests
  .map(c => `${c.name} ${c.year}, puesto ${c.rank}`)
  .join(" · ");

export const absoluteUrl = path => (path?.startsWith("http") ? path : `${SITE_URL}${path || ""}`);

// Formatea seguidores como "116 mil"
export const formatFollowers = n =>
  n >= 1000 ? `${Math.floor(n / 1000).toLocaleString("es-CO")} mil` : n.toLocaleString("es-CO");

// Datos de la asesoría: cambia aquí el precio, la duración o el seguimiento
// y se actualizan en todo el sitio (páginas, metadatos, datos estructurados y llms.txt)
const ASESORIA_PRICE_COP = 120000;
const ASESORIA_MINUTES = 60;
const ASESORIA_FOLLOW_UP_DAYS = 7;

export const asesoria = {
  priceValue: ASESORIA_PRICE_COP,
  currency: "COP",
  price: `$${ASESORIA_PRICE_COP.toLocaleString("es-CO")} COP`,
  durationMinutes: ASESORIA_MINUTES,
  duration: `${ASESORIA_MINUTES} minutos`,
  durationShort: `${ASESORIA_MINUTES} min`,
  followUpDays: ASESORIA_FOLLOW_UP_DAYS,
  followUp: `${ASESORIA_FOLLOW_UP_DAYS} días de seguimiento`,
};
