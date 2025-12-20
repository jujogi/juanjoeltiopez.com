// Datos del blog - se reemplazará con Strapi más adelante
import bettaContent from "./posts/betta-content.js";
import gambitasContent from "./posts/gambitas-content.js";
import mantenimientoContent from "./posts/mantenimiento-content.js";
import caridinasContent from "./posts/caridinas-content.js";
import plantasContent from "./posts/plantas-content.js";
import paisajismoContent from "./posts/paisajismo-content.js";
import osmosisContent from "./posts/osmosis-content.js";

export const blogPosts = [
  {
    id: "1",
    title: "¿Tienes un Pez Betta? Todo lo que necesitas saber",
    slug: "cuidado-pez-betta",
    excerpt:
      "Los Betta son peces fascinantes pero necesitan un entorno adecuado para estar bien. ¡Recuerda que no es lo mismo vivir que sobrevivir!",
    content: bettaContent,
    category: "Cuidado de Peces",
    categoryColor: "blue",
    date: "2024-12-01T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/betta-acuario-1.jpg",
    coverImage: "/images/betta-acuario-2.jpg",
    videoIds: [
      "betta-taninos",
      "betta-feliz",
      "betta-acuario",
      "betta-hojas-almendro",
      "betta-botanicos",
      "betta-compatibles",
      "betta-entrena",
    ],
  },
  {
    id: "2",
    title: "Gambitas: Guía para principiantes",
    slug: "gambitas-acuario-cuidados",
    excerpt:
      "Las gambitas de acuario son diminutas criaturas llenas de carácter y ternura que pueden ser un verdadero espectáculo en tu acuario.",
    content: gambitasContent,
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2024-11-28T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/gambitas.jpg",
    coverImage: "/images/gambitas-2.jpg",
    videoIds: [
      "gambitas-5-consejos",
      "gambitas-alimento-premium",
      "gambitas-snacks",
      "gambitas-3-tips",
    ],
    productCards: [
      { position: "after-food", slug: "sl-aqua-spinach-powder" },
      { position: "after-planarias", slug: "sl-aqua-z1-cleaner" },
    ],
  },
  {
    id: "3",
    title: "Así debe ser el mantenimiento de tu acuario",
    slug: "mantenimiento-acuario-rutina",
    excerpt:
      "Mantener un acuario es mucho más que solo alimentar peces. Requiere cuidados regulares para asegurar que el ecosistema acuático funcione de la mejor manera.",
    content: mantenimientoContent,
    category: "Mantenimiento",
    categoryColor: "cyan",
    date: "2024-11-25T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/mantenimientos.jpg",
    coverImage: "/images/mantenimientos-2.jpg",
    videoIds: ["mantenimiento-algas", "mantenimiento-betta", "mantenimiento-plantado", "mantenimiento-filtro"],
  },
  {
    id: "4",
    title: "Cómo montar un gambario para caridinas",
    slug: "caridinas-gambario-montaje",
    excerpt:
      "Las caridinas son de las especies de gambas más fascinantes, pero requieren cuidados especiales. Aprende cómo montar un gambario ideal para ellas.",
    content: caridinasContent,
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2024-12-09T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "15 min lectura",
    image: "/images/gambario.jpg",
    coverImage: "/images/gambario.jpg",
    videoIds: [
      "caridinas-montaje",
      "caridinas-ciclado",
      "caridinas-microfauna",
      "caridinas-plantando",
      "caridinas-algas",
      "caridinas-primeros-inquilinos",
      "caridinas-pure-line",
      "caridinas-mudan",
      "caridinas-evolucion",
    ],
    productCards: [
      { position: "after-osmosis", slug: "saltyshrimp-bee-shrimp-gh" },
      { position: "after-bacteria", slug: "sl-aqua-magic-powder" },
    ],
  },
  {
    id: "5",
    title: "¿Por qué añadir plantas acuáticas al acuario?",
    slug: "plantas-naturales-acuario",
    excerpt:
      "Si aún decoras tu acuario con plantas de plástico, ¡es momento de hacer un cambio! Descubre por qué las plantas naturales son esenciales.",
    content: plantasContent,
    category: "Plantas",
    categoryColor: "green",
    date: "2024-12-08T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "8 min lectura",
    image: "/images/acuario-plantado.jpg",
    coverImage: "/images/acuario-plantado-2.jpg",
    videoIds: [
      "plantas-no-plastico",
      "plantas-montaje-betta",
      "plantas-adios-artificial",
      "plantas-anubias-bucephalandras",
      "betta-acuario",
    ],
  },
  {
    id: "6",
    title: "Paisajismo Acuático: Arte bajo el agua",
    slug: "paisajismo-acuatico-guia",
    excerpt:
      "El paisajismo acuático no es solo una ventana a lo natural, sino una forma de transmitir y sentir el arte. Aprende a crear ecosistemas armoniosos y visualmente deslumbrantes.",
    content: paisajismoContent,
    category: "Aquascaping",
    categoryColor: "purple",
    date: "2024-12-07T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/concurso.jpg",
    coverImage: "/images/concurso-2.jpg",
    videoIds: [
      "paisajismo-primer-concurso",
      "paisajismo-hardscape",
      "paisajismo-detalles",
      "paisajismo-ciclado",
      "paisajismo-peces",
      "paisajismo-nuevo",
    ],
  },
  {
    id: "7",
    title: "Agua de ósmosis inversa vs. agua de grifo",
    slug: "osmosis-inversa-vs-agua-grifo",
    excerpt:
      "El tipo de agua que utilizas en tu acuario plantado puede marcar una diferencia enorme. Descubre cuándo usar agua de ósmosis inversa y cuándo el agua de grifo es suficiente.",
    content: osmosisContent,
    category: "Agua y Parámetros",
    categoryColor: "blue",
    date: "2025-12-17T12:00:00Z",
    author: "Jesús - Kleiner Fish Aquarium",
    authorLink: "https://www.instagram.com/kleineraquarium/",
    isGuestAuthor: true,
    readTime: "8 min lectura",
    image: "/images/osmosis-grifo.jpg",
    coverImage: "/images/osmosis-grifo.jpg",
    videoIds: ["osmosis-filtro"],
    productCards: [
      { position: "after-remineralizacion", slug: "saltyshrimp-bee-shrimp-gh" },
    ],
  },
];

export function getAllPosts() {
  // Create a copy to avoid mutating the original array
  return [...blogPosts].sort((a, b) => {
    // Use string comparison for deterministic sorting
    if (b.date > a.date) return 1;
    if (b.date < a.date) return -1;
    return 0;
  });
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostById(id) {
  return blogPosts.find(post => post.id === id);
}
