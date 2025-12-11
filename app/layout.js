import { Providers } from "@/components/Providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "JuanJo El Tío Pez - Tu Guía de Acuarismo",
  description:
    "Consejos expertos, guías y conocimientos para el hobby del acuarismo. Aprende sobre el cuidado de peces, mantenimiento de acuarios y crea ecosistemas acuáticos prósperos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3KZVFC4CS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-Y3KZVFC4CS');
            `,
          }}
        />

        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
