import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata = {
  alternates: { canonical: "/sobre-mi" },
  title: "Sobre mí",
  description:
    "Conoce a JuanJo El Tío Pez. Promoviendo una acuariofilia responsable y consciente. Tips, experiencia real y productos que realmente ayudan para disfrutar al 100% de este hobby.",
  openGraph: {
    title: "¿Quién es JuanJo El Tío Pez?",
    description:
      "Promoviendo una acuariofilia responsable y consciente. Tips, experiencia real y productos que realmente ayudan para disfrutar al 100% de este hobby.",
    images: [{ url: "/images/juanjoeltiopez.jpg", width: 1200, height: 945 }],
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
