// Página de enlaces para la bio de redes sociales: no se indexa en buscadores
export const metadata = {
  alternates: { canonical: "/me" },
  robots: { index: false, follow: true },
  title: "Links",
  description:
    "Encuentra todos los enlaces importantes de JuanJo El Tío Pez: Asesorías, Blog y redes sociales. Tu guía completa de acuariofilia.",
  openGraph: {
    title: "Links",
    description:
      "Encuentra todos los enlaces importantes de JuanJo El Tío Pez: Asesorías, Blog y redes sociales.",
    type: "website",
  },
};

export default function MeLayout({ children }) {
  return children;
}
