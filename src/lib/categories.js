// Temas del blog: alimentan la home, el índice del blog y las páginas de categoría.
import { getAllPosts } from "./blogData";
import { slugifyHeading } from "./articleUtils";

// El orden define cómo aparecen en la home y en los filtros
const CATEGORY_INFO = [
  {
    name: "Cuidado de Peces",
    description:
      "Lo que necesita tu pez para vivir bien y no solo sobrevivir: espacio, temperatura, alimentación y compañeros de acuario.",
  },
  {
    name: "Invertebrados",
    description:
      "Gambitas Neocaridina y Caridina: parámetros, montaje del gambario, alimentación y cómo tener una colonia sana.",
  },
  {
    name: "Plantas",
    description:
      "Adiós a las plantas de plástico: por qué usar plantas naturales, cuáles elegir si estás iniciando y cómo ayudan a la calidad del agua.",
  },
  {
    name: "Aquascaping",
    description:
      "Paisajismo acuático: hardscape, composición y cómo crear acuarios que parecen paisajes naturales.",
  },
  {
    name: "Agua y Parámetros",
    description:
      "Calidad del agua: ósmosis inversa, agua de la llave, remineralización y los parámetros que de verdad importan.",
  },
  {
    name: "Mantenimiento",
    description:
      "Rutinas de mantenimiento, cambios de agua, limpieza del filtro y cómo evitar las algas.",
  },
];

export const categorySlug = name => slugifyHeading(name);

export const categoryHref = name => `/blog/categoria/${categorySlug(name)}`;

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
