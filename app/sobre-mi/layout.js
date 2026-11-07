import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata = {
  alternates: { canonical: "/sobre-mi" },
  title: "Sobre mí",
  description:
    "Conoce a JuanJo El Tío Pez. Promoviendo una acuariofilia responsable y consciente. Tips y experiencia real para disfrutar al 100% de este hobby.",
  keywords:
    "JuanJo El Tío Pez, acuarista colombiano, creador de contenido acuariofilia, acuariofilia responsable",
  openGraph: {
    title: "¿Quién es JuanJo El Tío Pez?",
    description:
      "Promoviendo una acuariofilia responsable y consciente. Tips y experiencia real para disfrutar al 100% de este hobby.",
    images: [{ url: "/images/juanjoeltiopez.jpg", width: 1200, height: 945 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Quién es JuanJo El Tío Pez?",
    description:
      "Promoviendo una acuariofilia responsable y consciente. Tips y experiencia real para disfrutar al 100% de este hobby.",
    images: ["/images/juanjoeltiopez.jpg"],
  },
};

// ProfilePage apunta a la Person definida en el layout raíz
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/sobre-mi`,
  name: "¿Quién es JuanJo El Tío Pez?",
  mainEntity: { "@id": `${SITE_URL}/#juanjo` },
};

export default function SobreMiLayout({ children }) {
  return (
    <>
      {children}
      <JsonLd data={schema} />
    </>
  );
}
