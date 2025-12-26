import { getProductBySlug, getAllProducts } from "@/lib/shopData";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  // Obtener la primera variante para el precio
  const defaultVariant = product.variants?.[0];
  const priceText = defaultVariant
    ? `$ ${defaultVariant.price.toLocaleString("es-CO")} COP`
    : "";

  // Keywords basadas en categorías, marca y características
  const categoryLabels = product.categories?.map(cat => cat.label) || [];
  const keywords = [
    product.name,
    product.brand,
    ...categoryLabels,
    ...product.features.slice(0, 3),
    "acuarios Colombia",
    "JuanJo El Tío Pez",
    "tienda acuarios Colombia",
    "productos acuarios Colombia",
    "acuariofilia Colombia",
  ].join(", ");

  return {
    title: `${product.name} | JuanJo El Tío Pez`,
    description: `${product.excerpt} ${priceText ? `Precio: ${priceText}.` : ""} ${product.brand ? `Marca: ${product.brand}.` : ""} Compra productos premium para acuarios en Colombia. Envíos a todo el país.`,
    keywords,
    robots: "index, follow",
    alternates: {
      canonical: `https://juanjoeltiopez.com/tienda/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - ${product.brand || "Tienda"}`,
      description: product.excerpt,
      url: `https://juanjoeltiopez.com/tienda/${product.slug}`,
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
      "geo.region": "CO",
      "geo.placename": "Colombia",
      "geo.position": "4.570868;-74.297333",
    },
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default async function ProductLayout({ children, params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return children;
  }

  const defaultVariant = product.variants?.[0];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: product.brand || "JuanJo El Tío Pez",
    },
    offers: {
      "@type": "Offer",
      price: defaultVariant?.price,
      priceCurrency: defaultVariant?.currency || "COP",
      availability:
        defaultVariant?.stock === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://juanjoeltiopez.com/tienda/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "JuanJo El Tío Pez",
      },
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "CO",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "CO",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    category: product.categories?.map(cat => cat.label).join(", "),
  };

  return (
    <>
      <Script
        id={`product-schema-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(productSchema)}
      </Script>
      {children}
    </>
  );
}
