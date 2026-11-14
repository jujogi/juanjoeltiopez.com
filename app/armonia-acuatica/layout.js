import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/siteConfig";
import { COMPATIBILIDAD_PATH, compatibilidad, faq } from "@/lib/compatibilidadData";

const DESCRIPTION =
  "Elige tus peces y gambitas y revisa si pueden vivir juntos: temperatura, pH, GH, litros y temperamento. Tetras, cíclidos, guramis, Betta y gambitas.";

export const metadata = {
  alternates: { canonical: COMPATIBILIDAD_PATH },
  title: compatibilidad.title,
  description: DESCRIPTION,
  keywords:
    "armonía acuática, compatibilidad de peces, peces compatibles, compatibilidad de peces de acuario, peces compatibles con gambas, peces compatibles con betta, tetras, rasboras, neocaridinas, caridinas, gambas sulawesi",
  openGraph: {
    title: `${compatibilidad.title} | JuanJo El Tío Pez`,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/acuario-plantado-2.jpg",
        width: 1200,
        height: 602,
        alt: "Acuario plantado de JuanJo El Tío Pez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${compatibilidad.title} | JuanJo El Tío Pez`,
    description: DESCRIPTION,
    images: ["/images/acuario-plantado-2.jpg"],
  },
};

// Datos estructurados renderizados en el servidor (Armonía Acuática como aplicación web + FAQ)
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: compatibilidad.name,
      alternateName: compatibilidad.tagline,
      description: DESCRIPTION,
      url: `${SITE_URL}${COMPATIBILIDAD_PATH}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
      author: { "@id": `${SITE_URL}/#juanjo` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function CompatibilidadLayout({ children }) {
  return (
    <>
      {children}
      <JsonLd data={schema} />
    </>
  );
}
