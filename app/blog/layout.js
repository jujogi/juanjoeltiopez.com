export const metadata = {
  alternates: { canonical: "/blog" },
  // Plantilla propia: un título simple aquí anulaba la plantilla raíz para todo /blog
  title: {
    default: "Guías y artículos sobre acuariofilia",
    template: "%s | JuanJo El Tío Pez",
  },
  description:
    "Artículos sobre acuariofilia, cuidado de peces, gambitas, plantas acuáticas y todo lo que necesitas saber para mantener tu acuario saludable y hermoso.",
  openGraph: {
    title: "Guías y artículos sobre acuariofilia | JuanJo El Tío Pez",
    description:
      "Artículos sobre acuariofilia, cuidado de peces, gambitas, plantas acuáticas y todo lo que necesitas saber para mantener tu acuario saludable.",
  },
};

export default function BlogLayout({ children }) {
  return children;
}
