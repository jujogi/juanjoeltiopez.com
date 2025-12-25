/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },

  // Compresión
  compress: true,

  // Redirecciones permanentes (301) para mantener SEO
  async redirects() {
    return [
      // Redirección de index.html a homepage
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Redirecciones de /shop/ a /tienda/
      {
        source: "/shop/:slug*",
        destination: "/tienda/:slug*",
        permanent: true,
      },
      // Redirecciones con .html
      {
        source: "/pez-betta.html",
        destination: "/blog/cuidado-pez-betta",
        permanent: true,
      },
      {
        source: "/mantenimientos.html",
        destination: "/blog/mantenimiento-acuario-rutina",
        permanent: true,
      },
      {
        source: "/acuario-plantado.html",
        destination: "/blog/plantas-naturales-acuario",
        permanent: true,
      },
      {
        source: "/videos.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/gambario-caridinas.html",
        destination: "/blog/caridinas-gambario-montaje",
        permanent: true,
      },
      {
        source: "/gambitas.html",
        destination: "/blog/gambitas-acuario-cuidados",
        permanent: true,
      },
      // Redirecciones sin .html (por si acaso)
      {
        source: "/pez-betta",
        destination: "/blog/cuidado-pez-betta",
        permanent: true,
      },
      {
        source: "/mantenimientos",
        destination: "/blog/mantenimiento-acuario-rutina",
        permanent: true,
      },
      {
        source: "/acuario-plantado",
        destination: "/blog/plantas-naturales-acuario",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/gambario-caridinas",
        destination: "/blog/caridinas-gambario-montaje",
        permanent: true,
      },
      {
        source: "/gambitas",
        destination: "/blog/gambitas-acuario-cuidados",
        permanent: true,
      },
    ];
  },

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      // Cache estático agresivo para assets
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Configuración de producción
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;
