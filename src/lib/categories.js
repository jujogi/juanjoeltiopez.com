// Temas del blog: alimentan la home, el índice del blog y las páginas de categoría.
import { getAllPosts } from "./blogData";
import { slugifyHeading } from "./articleUtils";

// El orden define cómo aparecen en la home y en los filtros
const CATEGORY_INFO = [
  {
    name: "Cuidado de Peces",
    description:
      "Cuidados reales para peces tropicales: espacio, temperatura, alimentación y compañeros de acuario, empezando por el pez Betta.",
  },
  {
    name: "Invertebrados",
    description:
      "Gambitas Neocaridina y Caridina: parámetros, montaje del gambario, alimentación y cómo mantener colonias sanas.",
  },
  {
    name: "Plantas",
    description:
      "Plantas acuáticas naturales: por qué usarlas, cuáles elegir para empezar y cómo ayudan a la calidad del agua.",
  },
  {
    name: "Aquascaping",
    description:
      "Paisajismo acuático: hardscape, composición y cómo crear acuarios que se ven como paisajes naturales.",
  },
  {
    name: "Agua y Parámetros",
    description:
      "Calidad del agua: ósmosis inversa, agua de grifo, remineralización y los parámetros que de verdad importan.",
  },
  {
    name: "Mantenimiento",
    description:
      "Rutinas de mantenimiento, cambios de agua, limpieza de filtros y cómo prevenir la aparición de algas.",
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
