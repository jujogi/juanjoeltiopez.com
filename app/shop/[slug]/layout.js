import { getProductBySlug, getAllProducts } from "@/lib/shopData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | JuanJo El Tío Pez 🐠",
    };
  }

  // Obtener la primera variante para el precio
  const defaultVariant = product.variants?.[0];
  const priceText = defaultVariant
    ? `${defaultVariant.currency} ${defaultVariant.price.toLocaleString("es-CO")}`
    : "";

  // Keywords basadas en categorías, marca y características
  const categoryLabels = product.categories?.map(cat => cat.label) || [];
  const keywords = [
    product.name,
    product.brand,
    ...categoryLabels,
    ...product.features.slice(0, 3),
    "acuarios",
    "JuanJo El Tío Pez",
    "tienda acuarios Colombia",
  ].join(", ");

  return {
    title: `${product.name} | Tienda JuanJo El Tío Pez 🐠`,
    description: `${product.excerpt} ${priceText ? `Precio: ${priceText}.` : ""} ${product.brand ? `Marca: ${product.brand}.` : ""} Compra productos premium para acuarios.`,
    keywords,
    robots: "index, follow",
    alternates: {
      canonical: `https://juanjoeltiopez.com/shop/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - ${product.brand || "Tienda"}`,
      description: product.excerpt,
      url: `https://juanjoeltiopez.com/shop/${product.slug}`,
      siteName: "JuanJo El Tío Pez",
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.excerpt,
      images: [product.images[0]],
    },
    // Schema.org para productos
    other: {
      "product:price:amount": defaultVariant?.price,
      "product:price:currency": defaultVariant?.currency,
      "product:availability": defaultVariant?.stock === "in_stock" ? "in stock" : "out of stock",
      "product:brand": product.brand,
      "product:category": product.categories?.[0]?.label || "",
    },
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductLayout({ children }) {
  return children;
}
