import { Providers } from "@/components/Providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://juanjoeltiopez.com"),
  title: {
    default: "Inicio | JuanJo El Tío Pez",
    template: "%s | JuanJo El Tío Pez",
  },
  description:
    "Aprende a cuidar y disfrutar de tu acuario como nunca antes. Peces, consejos, cuidados y toda la inspiración que necesitas para tus proyectos acuáticos. Tienda especializada en Colombia con productos premium para acuariofilia.",
  keywords:
    "JuanJo El Tío Pez, acuarios Colombia, peces tropicales, gambarios, plantas acuáticas, cuidado de peces, acuarios naturales, acuarismo Colombia, consejos acuarios, vida acuática, peces de agua dulce, acuarios sostenibles, gambas, tienda acuarios Colombia, acuariofilia Colombia",
  authors: [{ name: "JuanJo El Tío Pez" }],
  creator: "JuanJo El Tío Pez",
  publisher: "JuanJo El Tío Pez",
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
    url: "https://juanjoeltiopez.com",
    siteName: "JuanJo El Tío Pez",
    title: "JuanJo El Tío Pez – Acuariofilia para todos en Colombia",
    description:
      "Aprende a cuidar y disfrutar de tu acuario como nunca antes. Peces, consejos, cuidados y toda la inspiración que necesitas para tus proyectos acuáticos. Tienda especializada en Colombia.",
  },
  other: {
    "geo.region": "CO",
    "geo.placename": "Colombia",
    "geo.position": "4.570868;-74.297333",
  },
  verification: {
    google: "b98XGVguumJBgcv1mNA4la_3PktBBr9F7X-3BiTkZys",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ overflowX: "hidden" }}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>

        {/* JSON-LD Structured Data for Organization */}
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JuanJo El Tío Pez",
            description:
              "Tienda especializada en acuariofilia con productos premium para acuarios, peces tropicales, gambas y plantas acuáticas en Colombia.",
            url: "https://juanjoeltiopez.com",
            logo: "https://juanjoeltiopez.com/images/favicon.png",
            image: "https://juanjoeltiopez.com/images/favicon.png",
            address: {
              "@type": "PostalAddress",
              addressCountry: "CO",
              addressLocality: "Colombia",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 4.570868,
              longitude: -74.297333,
            },
            areaServed: {
              "@type": "Country",
              name: "Colombia",
            },
            priceRange: "$$",
            currenciesAccepted: "COP",
            sameAs: [],
          })}
        </Script>

        {/* Google Analytics - loaded after hydration */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3KZVFC4CS"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
