import { getAllPosts } from "@/lib/blogData";
import { getCategories, MIN_POSTS_TO_INDEX } from "@/lib/categories";

export default function sitemap() {
  const baseUrl = "https://juanjoeltiopez.com";

  const posts = getAllPosts();

  const blogUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

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
      url: `${baseUrl}/asesoria`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compatibilidad-de-peces`,
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

  const categoryUrls = getCategories()
    .filter(category => category.count >= MIN_POSTS_TO_INDEX)
    .map(category => ({
      url: `${baseUrl}${category.href}`,
      lastModified: new Date(
        getAllPosts().find(p => p.category === category.name)?.date || Date.now()
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticUrls, ...categoryUrls, ...blogUrls];
}
