import Script from "next/script";

export const metadata = {
  title: "Asesoría Personalizada para Acuarios Plantados | Consultoría Online",
  description:
    "Asesoría virtual 1 a 1 para acuarios plantados en Colombia. Resuelve problemas de algas, plantas enfermas y parámetros inestables. Plan de acción personalizado + seguimiento 7 días. $130.000 COP por sesión.",
  keywords:
    "asesoría acuarios plantados, consultoría acuarismo Colombia, asesoría acuario plantado Colombia, consultor acuarios plantados, problemas algas acuario, plantas acuario enfermas, parámetros inestables acuario, aquascaping Colombia, asesoría online acuarios, acuario plantado desde cero, mantenimiento acuario plantado, CO2 acuario plantas, peces enfermos acuario, diagnóstico acuario personalizado",
  openGraph: {
    title: "Asesoría Personalizada para Acuarios Plantados | JuanJo El Tío Pez",
    description:
      "Sesiones virtuales 1 a 1 para resolver problemas en tu acuario plantado. Plan personalizado + seguimiento 7 días. Atiendo toda Colombia.",
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
    title: "Asesoría Personalizada para Acuarios Plantados | JuanJo El Tío Pez",
    description:
      "Sesiones virtuales 1 a 1 para resolver problemas en tu acuario plantado. Plan personalizado + seguimiento 7 días. $130.000 COP.",
    images: ["/images/concurso-2.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Asesoría Personalizada para Acuarios Plantados",
  description:
    "Sesión virtual 1 a 1 de 60-80 minutos para diagnosticar y resolver problemas en tu acuario plantado. Incluye plan de acción personalizado y seguimiento de 7 días.",
  url: "https://juanjoeltiopez.com/asesoria",
  provider: {
    "@type": "Person",
    name: "JuanJo El Tío Pez",
    url: "https://juanjoeltiopez.com",
  },
  serviceType: "Consultoría de Acuarismo",
  category: "Asesoría online acuarios plantados",
  areaServed: {
    "@type": "Country",
    name: "Colombia",
  },
  offers: {
    "@type": "Offer",
    price: "130000",
    priceCurrency: "COP",
    description: "Sesión virtual 1 a 1 de 60-80 minutos + seguimiento 7 días incluido",
    availability: "https://schema.org/InStock",
  },
  serviceOutput: {
    "@type": "Thing",
    name: "Plan de acción personalizado para acuario plantado",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Una sesión es suficiente para resolver mi problema?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En la mayoría de casos, sí. Una sesión es suficiente para hacer un diagnóstico completo y entregarte un plan de acción que puedes implementar por tu cuenta. El seguimiento de 7 días está incluido para resolver dudas durante la implementación. Si después necesitas una segunda sesión de seguimiento, podemos coordinarla.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué debo preparar antes de la sesión?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Te recomiendo tener: (1) Fotos y videos recientes de tu acuario desde diferentes ángulos, (2) Parámetros del agua si los has medido (pH, GH, KH, NO3, PO4, etc.), (3) Lista de equipamiento que usas (filtro, luz, CO2, abonos), (4) Tus dudas o problemas principales anotados. No te preocupes si no tienes todo, trabajaremos con lo que tengas disponible.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué plataforma usamos para la videollamada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usualmente utilizamos Google Meet o Zoom. Si prefieres otra plataforma, podemos coordinar. Te envío el link de la videollamada una vez confirmado el pago.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo grabar la sesión?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "¡Sí! De hecho te lo recomiendo. Así puedes revisar las recomendaciones después sin tener que tomar notas durante toda la sesión. La mayoría de plataformas de videollamada tienen opción de grabación integrada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo realizo el pago?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Una vez nos contactemos por WhatsApp y confirmemos día y hora, te comparto los datos para transferencia bancaria o Nequi. El pago se realiza antes de la sesión. Una vez confirmado, recibes el link de la videollamada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofreces asesorías presenciales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Por el momento solo ofrezco sesiones virtuales. Esto me permite atender a acuaristas de todo el país (y otros países) sin limitaciones geográficas, y mantener un precio accesible para todos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si no puedo asistir a la sesión agendada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si necesitas cancelar o reprogramar, avísame con al menos 24 horas de anticipación y coordinamos una nueva fecha sin problema. Si no te presentas a la sesión sin avisar, no hay reembolso ni reprogramación.",
      },
    },
  ],
};

export default function AsesoriaLayout({ children }) {
  return (
    <>
      {children}
      <Script id="asesoria-service-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <Script id="asesoria-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
    </>
  );
}
