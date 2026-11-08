import { Fraunces, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, socialProfiles, mainAuthor, absoluteUrl } from "@/lib/siteConfig";
import Script from "next/script";

const headingFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const DEFAULT_OG_IMAGE = "/images/acuarios-paisajismo.jpg";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JuanJo El Tío Pez | Acuariofilia responsable en Colombia",
    template: "%s | JuanJo El Tío Pez",
  },
  description:
    "Guías prácticas de acuariofilia: peces Betta, gambitas, acuarios plantados y calidad del agua. Aprende a cuidar tu acuario con JuanJo El Tío Pez.",
  keywords:
    "JuanJo El Tío Pez, acuarios Colombia, peces tropicales, gambarios, plantas acuáticas, cuidado de peces, acuarios naturales, acuarismo Colombia, consejos acuarios, vida acuática, peces de agua dulce, acuarios sostenibles, gambas, acuariofilia Colombia",
  authors: [{ name: SITE_NAME, url: mainAuthor.url }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "JuanJo El Tío Pez – Acuariofilia responsable en Colombia",
    description:
      "Guías prácticas de acuariofilia: peces Betta, gambitas, acuarios plantados, calidad del agua y mantenimiento.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Acuario plantado de JuanJo El Tío Pez" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  other: {
    "geo.region": "CO",
    "geo.placename": "Colombia",
  },
  verification: {
    google: "b98XGVguumJBgcv1mNA4la_3PktBBr9F7X-3BiTkZys",
  },
};

export const viewport = {
  themeColor: "#06171f",
};

const sameAs = Object.values(socialProfiles).map(p => p.url);

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/images/favicon.png"),
      description:
        "Contenido y asesorías de acuariofilia responsable: peces tropicales, gambitas y acuarios plantados en Colombia.",
      areaServed: { "@type": "Country", name: "Colombia" },
      sameAs,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#juanjo`,
      name: SITE_NAME,
      url: mainAuthor.url,
      image: absoluteUrl(mainAuthor.image),
      description: mainAuthor.shortBio,
      knowsAbout: [
        "Acuariofilia",
        "Peces Betta",
        "Gambas de agua dulce",
        "Acuarios plantados",
        "Aquascaping",
        "Parámetros del agua",
      ],
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning style={{ overflowX: "clip" }}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>

        {/* Datos estructurados del sitio: al final del body para no alterar la hidratación */}
        <JsonLd data={siteSchema} />

        {/* Google Analytics: se carga cuando la página ya terminó de cargar, para no frenarla */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3KZVFC4CS"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y3KZVFC4CS');
          `}
        </Script>
      </body>
    </html>
  );
}
