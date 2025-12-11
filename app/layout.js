import { Providers } from "@/components/Providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://juanjoeltiopez.com"),
  title: {
    default: "JuanJo El Tío Pez",
    template: "%s | JuanJo El Tío Pez",
  },
  description:
    "Aprende a cuidar y disfrutar de tu acuario como nunca antes. Peces, consejos, cuidados y toda la inspiración que necesitas para tus proyectos acuáticos",
  keywords:
    "JuanJo El Tío Pez, acuarios, peces tropicales, gambarios, plantas acuáticas, cuidado de peces, acuarios naturales, acuarismo, consejos acuarios, vida acuática, peces de agua dulce, acuarios sostenibles, gambas",
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
    locale: "es_ES",
    url: "https://juanjoeltiopez.com",
    siteName: "JuanJo El Tío Pez",
    title: "JuanJo El Tío Pez 🐠 - Tu Guía de Acuarismo",
    description:
      "Aprende a cuidar y disfrutar de tu acuario como nunca antes. Peces, consejos, cuidados y toda la inspiración que necesitas para tus proyectos acuáticos",
  },
  twitter: {
    card: "summary_large_image",
    title: "JuanJo El Tío Pez 🐠 - Tu Guía de Acuarismo",
    description:
      "Aprende a cuidar y disfrutar de tu acuario como nunca antes. Peces, consejos, cuidados y toda la inspiración que necesitas para tus proyectos acuáticos",
    creator: "@juanjoeltiopez",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>

        {/* Google Analytics - loaded after hydration */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3KZVFC4CS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
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
