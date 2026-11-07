export const metadata = {
  alternates: { canonical: "/blog" },
  // Plantilla propia: un título simple aquí anulaba la plantilla raíz para todo /blog
  title: {
    default: "Guías y artículos sobre acuariofilia",
    template: "%s | JuanJo El Tío Pez",
  },
  description:
    "Artículos sobre acuariofilia, cuidado de peces, gambitas, plantas acuáticas y todo lo que necesitas saber para mantener tu acuario saludable y hermoso.",
  keywords:
    "guías de acuariofilia, blog de acuarios, cuidado de peces, gambitas, plantas acuáticas, acuario plantado, mantenimiento del acuario",
  openGraph: {
    title: "Guías y artículos sobre acuariofilia | JuanJo El Tío Pez",
    description:
      "Artículos sobre acuariofilia, cuidado de peces, gambitas, plantas acuáticas y todo lo que necesitas saber para mantener tu acuario saludable.",
    images: [
      { url: "/images/acuarios-plantados.jpg", alt: "Acuarios plantados de JuanJo El Tío Pez" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías y artículos sobre acuariofilia | JuanJo El Tío Pez",
    description:
      "Artículos sobre acuariofilia, cuidado de peces, gambitas, plantas acuáticas y todo lo que necesitas saber para mantener tu acuario saludable.",
    images: ["/images/acuarios-plantados.jpg"],
  },
};

export default function BlogLayout({ children }) {
  return children;
}
