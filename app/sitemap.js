import { getAllPosts } from "@/lib/blogData";
import { getAllProducts } from "@/lib/shopData";

export default function sitemap() {
  const baseUrl = "https://juanjoeltiopez.com";

  // Obtener todos los posts y productos
  const posts = getAllPosts();
  const products = getAllProducts();

  // URLs de posts del blog
  const blogUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // URLs de productos
  const productUrls = products.map(product => ({
    url: `${baseUrl}/tienda/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // URLs estáticas principales
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/asesoria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...blogUrls, ...productUrls];
}
