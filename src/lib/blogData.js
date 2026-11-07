// Datos del blog - se reemplazará con Strapi más adelante
import bettaContent from "./posts/betta-content.js";
import gambitasContent from "./posts/gambitas-content.js";
import mantenimientoContent from "./posts/mantenimiento-content.js";
import caridinasContent from "./posts/caridinas-content.js";
import plantasContent from "./posts/plantas-content.js";
import paisajismoContent from "./posts/paisajismo-content.js";
import osmosisContent from "./posts/osmosis-content.js";
import filtroMantenimientoContent from "./posts/filtro-mantenimiento-content.js";

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
    level: "Principiante",
    careSheet: {
      species: "Betta splendens",
      items: [
        { key: "volume", label: "Acuario mínimo", value: "15 L (ideal 20+)" },
        { key: "temp", label: "Temperatura", value: "24–28 °C" },
        { key: "ph", label: "pH", value: "6.5–7.5" },
        { key: "hardness", label: "GH / KH", value: "5–15 / 3–8" },
        { key: "food", label: "Alimentación", value: "2–3 pellets, 1–2 veces/día" },
        { key: "lifespan", label: "Esperanza de vida", value: "3–5 años o más" },
      ],
    },
    faq: [
      {
        q: "¿Cuántos litros necesita un pez Betta?",
        a: "Mínimo 15 litros, idealmente 20 o más. Evita las peceras pequeñas tipo \"betteras\": un acuario largo le da espacio para nadar, explorar y ejercitarse.",
      },
      {
        q: "¿El Betta necesita calentador?",
        a: "Sí. Es un pez tropical y necesita el agua estable entre 24 y 28 °C. Sin calentador solo sobrevive, no vive bien: la temperatura baja le causa letargo y enfermedades.",
      },
      {
        q: "¿Cuántas veces al día debo alimentar a mi Betta?",
        a: "2–3 pellets, 1–2 veces al día, con un día de ayuno a la semana. Su estómago es casi del tamaño de su ojo, así que la sobrealimentación es el error más común.",
      },
      {
        q: "¿Con qué peces puede vivir un Betta?",
        a: "Con peces de fondo pacíficos como Corydoras u Otocinclus, caracoles y rasboras. Evita otros Bettas, peces de aletas largas como los guppys y peces mordedores de aletas.",
      },
    ],
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
    date: "2026-06-15T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/gambitas.jpg",
    coverImage: "/images/gambitas-2.jpg",
    level: "Principiante",
    careSheet: {
      species: "Neocaridina davidi",
      items: [
        { key: "volume", label: "Acuario mínimo", value: "20 L" },
        { key: "temp", label: "Temperatura", value: "24–26 °C" },
        { key: "ph", label: "pH", value: "6.5–7.5" },
        { key: "hardness", label: "GH", value: "6–8" },
        { key: "filter", label: "Filtro", value: "Esponja" },
        { key: "water", label: "Cambios de agua", value: "10–20% semanal" },
      ],
    },
    faq: [
      {
        q: "¿Qué gambitas son mejores para principiantes?",
        a: "Las Neocaridinas (Cherry Red, Bloody Mary, Blue Velvet, Yellow Fire): son resistentes, se reproducen con facilidad y toleran un rango de parámetros más amplio que las Caridinas.",
      },
      {
        q: "¿Cuántos litros necesitan las gambitas?",
        a: "Al menos 20 litros. Cuanto más grande sea el acuario, más fácil es mantener los parámetros estables.",
      },
      {
        q: "¿Qué filtro usar en un gambario?",
        a: "Un filtro de esponja: es eficiente biológicamente y no succiona las crías. Si usas un filtro canister o de cascada, cubre la entrada con una malla fina o una esponja de pre-filtro.",
      },
      {
        q: "¿Cada cuánto debo alimentar a mis gambitas?",
        a: "¡A mis gambas las alimento cada 2 días y en muy pequeñas cantidades! Ellas también se alimentan del biofilm y las algas que hay en el acuario, así que no hace falta más.",
      },
    ],
    videoIds: [
      "mantenimiento-gambario-neocaridinas",
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
    videoIds: [
      "mantenimiento-algas",
      "mantenimiento-betta",
      "mantenimiento-plantado",
      "mantenimiento-filtro",
    ],
    relatedPostSlugs: ["mantenimiento-filtro-algas"],
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
    level: "Avanzado",
    careSheet: {
      species: "Caridina sp. (Crystal Red, Taiwan Bee)",
      items: [
        { key: "ph", label: "pH", value: "5.5–6.5" },
        { key: "hardness", label: "GH", value: "4–6" },
        { key: "hardness", label: "KH", value: "Bajo" },
        { key: "water", label: "Agua", value: "Ósmosis + sales" },
        { key: "substrate", label: "Sustrato", value: "Activo" },
      ],
    },
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
    title: "Paisajismo acuático: Arte bajo el agua",
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
    productCards: [{ position: "after-remineralizacion", slug: "saltyshrimp-bee-shrimp-gh" }],
  },
  {
    id: "8",
    title: "¿Algas? El problema podría estar en tu filtro",
    slug: "mantenimiento-filtro-algas",
    excerpt:
      "Muchos acuaristas son estrictos con el mantenimiento pero ignoran el filtro. Descubre por qué un filtro saturado es la causa principal de la aparición de algas en tu acuario.",
    content: filtroMantenimientoContent,
    category: "Mantenimiento",
    categoryColor: "cyan",
    date: "2026-01-01T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "8 min lectura",
    image: "/images/mantenimiento-filtro/filtro-cascada.jpg",
    coverImage: "/images/acuarios-paisajismo.jpg",
    videoIds: ["mantenimiento-filtro"],
    relatedPostSlugs: ["mantenimiento-acuario-rutina"],
    productCards: [{ position: "after-bacteria", slug: "sl-aqua-magic-powder" }],
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
