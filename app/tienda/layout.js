export const metadata = {
  title: "Tienda",
  description:
    "Productos premium para acuarios: alimento para gambitas, sustratos especializados, acondicionadores de agua y más. Todo lo que necesitas para el cuidado de tu acuario.",
  keywords:
    "tienda acuarios, productos acuariofilia, alimento gambitas, GlasGarten, Salty Shrimp, productos premium acuarios, tienda online acuarios Colombia",
  openGraph: {
    title: "Tienda | JuanJo El Tío Pez",
    description:
      "Productos premium para acuarios: alimento para gambitas, sustratos, acondicionadores y más. Calidad garantizada para el cuidado de tu acuario.",
    url: "https://juanjoeltiopez.com/tienda",
    siteName: "JuanJo El Tío Pez",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda | JuanJo El Tío Pez",
    description:
      "Productos premium para acuarios: alimento para gambitas, sustratos, acondicionadores y más.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://juanjoeltiopez.com/tienda",
  },
};

export default function ShopLayout({ children }) {
  return children;
}
