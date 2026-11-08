import JsonLd from "@/components/JsonLd";
import { asesoria, SITE_URL } from "@/lib/siteConfig";
import { faq } from "@/lib/asesoriaData";

export const metadata = {
  alternates: { canonical: "/asesoria" },
  title: "Asesorías personalizadas para tu acuario",
  description: `Sesión virtual 1 a 1 para resolver algas, plantas enfermas o parámetros inestables. Plan de acción personalizado y ${asesoria.followUp}. ${asesoria.price}.`,
  keywords:
    "asesoría acuarios plantados, consultoría acuarismo Colombia, asesoría acuario plantado Colombia, consultor acuarios plantados, problemas algas acuario, plantas acuario enfermas, parámetros inestables acuario, aquascaping Colombia, asesoría online acuarios, acuario plantado desde cero, mantenimiento acuario plantado, CO2 acuario plantas, peces enfermos acuario, diagnóstico acuario personalizado",
  openGraph: {
    title: "Asesorías personalizadas para tu acuario | JuanJo El Tío Pez",
    description: `Sesiones virtuales 1 a 1 para resolver problemas en tu acuario plantado. Plan personalizado + ${asesoria.followUp}. Atiendo toda Colombia.`,
    images: [
      {
        url: "/images/concurso-2.jpg",
        width: 1200,
        height: 630,
        alt: "JuanJo El Tío Pez - Asesoría Personalizada para Acuarios Plantados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesorías personalizadas para tu acuario | JuanJo El Tío Pez",
    description: `Sesiones virtuales 1 a 1 para resolver problemas en tu acuario plantado. Plan personalizado + ${asesoria.followUp}. ${asesoria.price}.`,
    images: ["/images/concurso-2.jpg"],
  },
};

// Datos estructurados renderizados en el servidor (antes se inyectaban con JS en el cliente)
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Asesoría Personalizada para Acuarios Plantados",
      description: `Sesión virtual 1 a 1 de ${asesoria.duration} para diagnosticar y resolver problemas en tu acuario plantado. Incluye plan de acción personalizado y ${asesoria.followUp}.`,
      url: `${SITE_URL}/asesoria`,
      provider: { "@id": `${SITE_URL}/#juanjo` },
      serviceType: "Consultoría de Acuarismo",
      category: "Asesoría online acuarios plantados",
      areaServed: { "@type": "Country", name: "Colombia" },
      offers: {
        "@type": "Offer",
        price: String(asesoria.priceValue),
        priceCurrency: asesoria.currency,
        description: `Sesión virtual 1 a 1 de ${asesoria.duration} + ${asesoria.followUp} incluidos`,
        availability: "https://schema.org/InStock",
      },
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

export default function AsesoriaLayout({ children }) {
  return (
    <>
      {children}
      <JsonLd data={schema} />
    </>
  );
}
