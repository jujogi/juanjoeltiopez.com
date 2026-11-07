// Temas del blog: alimentan la home, el índice del blog y las páginas de categoría.
import { getAllPosts } from "./blogData";
import { slugifyHeading } from "./articleUtils";

// El orden define cómo aparecen en la home y en los filtros.
// seoTitle y keywords: lo que ve Google, centrado en lo que realmente tiene cada tema
const CATEGORY_INFO = [
  {
    name: "Cuidado de Peces",
    seoTitle: "Cuidado de peces de acuario",
    keywords:
      "cuidado de peces, pez betta, acuario para betta, peces de acuario, temperatura del acuario",
    description:
      "Lo que necesita tu pez para vivir bien y no solo sobrevivir: espacio, temperatura, alimentación y compañeros de acuario.",
  },
  {
    name: "Invertebrados",
    seoTitle: "Gambitas: cuidados y gambarios",
    keywords:
      "gambitas, gambas de acuario, neocaridinas, caridinas, gambario, cherry red, crystal red",
    description:
      "Gambitas Neocaridina y Caridina: parámetros, montaje del gambario, alimentación y cómo tener una colonia sana.",
  },
  {
    name: "Plantas",
    seoTitle: "Plantas acuáticas naturales",
    keywords:
      "plantas acuáticas, plantas naturales para acuario, acuario plantado, plantas para principiantes",
    description:
      "Adiós a las plantas de plástico: por qué usar plantas naturales, cuáles elegir si estás iniciando y cómo ayudan a la calidad del agua.",
  },
  {
    name: "Paisajismo acuático",
    seoTitle: "Paisajismo acuático y aquascaping",
    keywords: "paisajismo acuático, aquascaping, hardscape, acuario plantado, diseño de acuarios",
    description: "Hardscape, composición y cómo crear acuarios que parecen paisajes naturales.",
  },
  {
    name: "Agua y Parámetros",
    seoTitle: "Agua y parámetros del acuario",
    keywords:
      "agua de ósmosis inversa, agua de la llave, remineralización, parámetros del agua, GH y KH",
    description:
      "Calidad del agua: ósmosis inversa, agua de la llave, remineralización y los parámetros que de verdad importan.",
  },
  {
    name: "Mantenimiento",
    seoTitle: "Mantenimiento del acuario y filtro",
    keywords:
      "mantenimiento del acuario, cambios de agua, limpieza del filtro, algas en el acuario",
    description:
      "Rutinas de mantenimiento, cambios de agua, limpieza del filtro y cómo evitar las algas.",
  },
];

export const categorySlug = name => slugifyHeading(name);

export const categoryHref = name => `/blog/categoria/${categorySlug(name)}`;

// Un tema con un solo artículo es una página casi vacía: no se indexa ni va al sitemap
export const MIN_POSTS_TO_INDEX = 2;

// Solo devuelve categorías con al menos un artículo publicado
export function getCategories() {
  const posts = getAllPosts();
  const known = CATEGORY_INFO.map(c => c.name);
  const extra = [...new Set(posts.map(p => p.category))]
    .filter(name => !known.includes(name))
    .map(name => ({ name, description: "" }));

  return [...CATEGORY_INFO, ...extra]
    .map(info => {
      const categoryPosts = posts.filter(p => p.category === info.name);
      return {
        ...info,
        slug: categorySlug(info.name),
        href: categoryHref(info.name),
        count: categoryPosts.length,
        color: categoryPosts[0]?.categoryColor || "teal",
        image: categoryPosts[0]?.image,
      };
    })
    .filter(c => c.count > 0);
}

export function getCategoryBySlug(slug) {
  return getCategories().find(c => c.slug === slug);
}

export function getPostsByCategory(name) {
  return getAllPosts().filter(p => p.category === name);
}
