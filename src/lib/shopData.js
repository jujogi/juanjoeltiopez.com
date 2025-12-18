// Datos de la tienda - Productos disponibles
import shrimpLolliesContent from "./products/shrimp-lollies-content.js";
import spinachPowderContent from "./products/spinach-powder-content.js";
import z1CleanerContent from "./products/z1-cleaner-content.js";
import beeShrimpGhContent from "./products/bee-shrimp-gh-content.js";
import shrimpMineralGhkhContent from "./products/shrimp-mineral-ghkh-content.js";
import magicPowderContent from "./products/magic-powder-content.js";

export const products = [
  {
    id: "1",
    name: "GlasGarten Shrimp Lollies",
    slug: "glasgarten-shrimp-lollies",
    excerpt:
      "Palitos de comida premium para gambitas. 4 variedades deliciosas en cada caja. ¡Observa cómo tus camarones se reúnen para este festín!",
    content: shrimpLolliesContent,
    categories: [
      { label: "Alimento", color: "cyan" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "GlasGarten",
    images: [
      "/images/products/shrimp-lollies-1.jpg",
      "/images/products/shrimp-lollies-2.jpg",
      "/images/products/shrimp-lollies-3.jpg",
    ],
    features: [
      "4 variedades deliciosas",
      "Mínima contaminación del agua",
      "Hecho en Alemania",
      "Fácil de usar",
      "Para ~30 camarones por palito",
    ],
    videoIds: [
      "gambitas-snacks",
      "gambitas-alimento-premium",
      "gambitas-5-consejos",
      "gambitas-3-tips",
    ],
    // Variantes del producto (diferentes presentaciones/tamaños)
    variants: [
      {
        id: "1-8pack",
        name: "Caja de 8 palitos",
        price: 78000,
        currency: "$",
        stock: "in_stock", // in_stock, low_stock, out_of_stock
        sku: "GG-SL-8",
        specifications: {
          contenido: "8 palitos (2 de cada sabor)",
          origen: "Alemania",
        },
      },
    ],
    relatedProducts: [], // IDs de productos relacionados
  },
  {
    id: "2",
    name: "SL Aqua Spinach Powder",
    slug: "sl-aqua-spinach-powder",
    excerpt:
      "Alimento 100% natural de espinaca deshidratada para mejorar la coloración y salud de tus gambitas.",
    content: spinachPowderContent,
    categories: [
      { label: "Alimento", color: "cyan" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "SL Aqua",
    images: ["/images/products/spinach-powder-1.jpg"],
    features: [
      "100% espinaca natural",
      "Mejora la coloración",
      "Rico en nutrientes y vitaminas",
      "Favorece la reproducción",
    ],
    videoIds: ["spinach-powder", "gambitas-alimento-premium", "gambitas-5-consejos"],
    variants: [
      {
        id: "2-40g",
        name: "40 gramos",
        price: 108000,
        currency: "$",
        stock: "in_stock",
        sku: "SLA-SP-40",
        specifications: {
          contenido: "40 gramos",
          origen: "Taiwan",
          dosificación: "1 cucharadita por 20-30 camarones",
        },
      },
    ],
    relatedProducts: [],
  },
  {
    id: "3",
    name: "SL Aqua Z-1 Planarian & Hydra Cleaner",
    slug: "sl-aqua-z1-cleaner",
    excerpt:
      "Tratamiento especializado con extractos herbales para eliminar planarias e hidras de forma rápida y segura. Inofensivo para gambitas, peces y plantas.",
    content: z1CleanerContent,
    categories: [
      { label: "Tratamiento", color: "purple" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "SL Aqua",
    images: ["/images/products/z1-cleaner.jpg"],
    features: [
      "Extracto de hierbas naturales",
      "Elimina planarias e hidras",
      "Seguro para gambitas y peces",
      "No afecta el filtro biológico del acuario",
    ],
    videoIds: ["gambitas-5-consejos", "gambitas-3-tips", "gambitas-alimento-premium"],
    variants: [
      {
        id: "3-10g",
        name: "10 gramos",
        price: 108000,
        currency: "$",
        stock: "in_stock",
        sku: "SLA-Z1-10",
        specifications: {
          contenido: "10 gramos",
          origen: "Taiwan",
          dosificación: "2 cucharadas por 50 litros",
          tratamiento: "1 semana por ciclo",
        },
      },
    ],
    relatedProducts: [],
  },
  {
    id: "4",
    name: "SaltyShrimp Bee Shrimp Mineral GH+",
    slug: "saltyshrimp-bee-shrimp-gh",
    excerpt:
      "Remineralizador especialmente desarrollado para gambas caridinas. Aumenta GH sin afectar KH.",
    content: beeShrimpGhContent,
    categories: [
      { label: "Acondicionador", color: "blue" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "SaltyShrimp",
    images: ["/images/products/bee-shrimp-gh.jpg"],
    features: [
      "Aumenta GH sin afectar KH",
      "Ideal para gambas caridinas",
      "Minerales y oligoelementos esenciales",
      "Incluye cucharita medidora",
    ],
    videoIds: ["gambitas-5-consejos", "gambitas-3-tips", "gambitas-alimento-premium"],
    variants: [
      {
        id: "4-50g",
        name: "50 gramos",
        price: 45000,
        currency: "$",
        stock: "in_stock",
        sku: "SS-BSGH-50",
        specifications: {
          contenido: "50 gramos",
          origen: "Alemania",
        },
      },
      {
        id: "4-100g",
        name: "100 gramos",
        price: 85000,
        currency: "$",
        stock: "in_stock",
        sku: "SS-BSGH-100",
        specifications: {
          contenido: "100 gramos",
          origen: "Alemania",
        },
      },
    ],
    relatedProducts: [],
  },
  {
    id: "5",
    name: "SaltyShrimp Shrimp Mineral GH/KH+",
    slug: "saltyshrimp-shrimp-mineral-ghkh",
    excerpt:
      "Remineralizador especialmente desarrollado para gambas neocaridinas. Aumenta GH y KH.",
    content: shrimpMineralGhkhContent,
    categories: [
      { label: "Acondicionador", color: "blue" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "SaltyShrimp",
    images: ["/images/products/shrimp-mineral-ghkh.jpg"],
    features: [
      "Aumenta GH y KH",
      "Ideal para Neocaridina",
      "pH neutro estable",
      "Minerales completos",
      "Incluye cucharita medidora",
    ],
    videoIds: ["gambitas-5-consejos", "gambitas-3-tips", "gambitas-alimento-premium"],
    variants: [
      {
        id: "5-50g",
        name: "50 gramos",
        price: 60000,
        currency: "$",
        stock: "in_stock",
        sku: "SS-SMGHKH-50",
        specifications: {
          contenido: "50 gramos",
          origen: "Alemania",
        },
      },
      {
        id: "5-100g",
        name: "100 gramos",
        price: 110000,
        currency: "$",
        stock: "in_stock",
        sku: "SS-SMGHKH-100",
        specifications: {
          contenido: "100 gramos",
          origen: "Alemania",
        },
      },
    ],
    relatedProducts: [],
  },
  {
    id: "6",
    name: "SL Aqua Magic Powder",
    slug: "sl-aqua-magic-powder",
    excerpt:
      "Polvo de apoyo biológico para arrancar y mantener gambarios, favoreciendo la estabilidad del acuario y ayudando a mejorar la supervivencia de tus gambitas.",
    content: magicPowderContent,
    categories: [
      { label: "Acondicionador", color: "blue" },
      { label: "Invertebrados", color: "orange" },
      { label: "Gambitas", color: "pink" },
    ],
    brand: "SL Aqua",
    images: ["/images/products/magic-powder.jpg"],
    features: [
      "Apoyo biológico para el gambario",
      "Favorece el desarrollo de microfauna y bacterias beneficiosas",
      "Mejora la salud digestiva",
      "Ideal para acuarios y gambarios nuevos",
      "Aumenta tasa de supervivencia",
    ],
    videoIds: ["gambitas-5-consejos", "gambitas-3-tips", "gambitas-alimento-premium"],
    variants: [
      {
        id: "6-40g",
        name: "40 gramos",
        price: 138000,
        currency: "$",
        stock: "in_stock",
        sku: "SLA-MP-40",
        specifications: {
          contenido: "40 gramos",
          origen: "Taiwan",
        },
      },
    ],
    relatedProducts: [],
  },
];

export function getAllProducts() {
  return [...products].sort((a, b) => {
    // Ordenar por nombre por defecto
    return a.name.localeCompare(b.name);
  });
}

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(categoryLabel) {
  return products.filter(product => product.categories?.some(cat => cat.label === categoryLabel));
}

export function getAllCategories() {
  const categoriesSet = new Set();
  products.forEach(product => {
    product.categories?.forEach(cat => {
      categoriesSet.add(JSON.stringify(cat));
    });
  });
  return Array.from(categoriesSet).map(cat => JSON.parse(cat));
}

export function getInStockProducts() {
  return products.filter(product => product.stock === "in_stock");
}
