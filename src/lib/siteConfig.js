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
  url: `${SITE_URL}/sobre-mi`,
  shortBio:
    "Acuarista colombiano y creador de contenido. Te comparto lo que me ha funcionado (y lo que no) con peces, gambitas y acuarios plantados. Mi misión: promover una acuariofilia responsable.",
};

export const absoluteUrl = path => (path?.startsWith("http") ? path : `${SITE_URL}${path || ""}`);

// Formatea seguidores como "116 mil"
export const formatFollowers = n =>
  n >= 1000 ? `${Math.floor(n / 1000).toLocaleString("es-CO")} mil` : n.toLocaleString("es-CO");

export const asesoria = {
  price: "$130.000 COP",
  priceValue: 130000,
  currency: "COP",
  duration: "60-80 minutos",
  followUpDays: 7,
};
