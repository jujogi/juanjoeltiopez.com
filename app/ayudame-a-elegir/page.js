import JsonLd from "@/components/JsonLd";
import ElegirView from "@/components/ayudame-a-elegir/ElegirView";
import { SITE_URL } from "@/lib/siteConfig";
import { ELEGIR_PATH, elegir, faq } from "@/lib/elegirData";

const DESCRIPTION =
  "¿No sabes qué peces poner en tu acuario? Responde cuatro preguntas y te sugerimos acuarios completos, con especies compatibles y en la cantidad justa para el tamaño de tu acuario.";

export const metadata = {
  alternates: { canonical: ELEGIR_PATH },
  title: `${elegir.name}: ${elegir.tagline.toLowerCase()}`,
  description: DESCRIPTION,
  keywords:
    "qué peces poner en mi acuario, peces para acuario pequeño, peces para principiantes, cuántos peces por litro, peces compatibles, acuario comunitario, gambario, betta",
  openGraph: {
    title: `${elegir.name} | JuanJo El Tío Pez`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${elegir.name} | JuanJo El Tío Pez`,
    description: DESCRIPTION,
  },
};

// Datos estructurados renderizados en el servidor (la herramienta como aplicación web + FAQ)
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: elegir.name,
      alternateName: elegir.tagline,
      description: DESCRIPTION,
      url: `${SITE_URL}${ELEGIR_PATH}`,
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

// Componente de servidor: el contenido llega completo en el HTML inicial
export default function ElegirPage() {
  return (
    <>
      <ElegirView />
      <JsonLd data={schema} />
    </>
  );
}
