import { getPostBySlug, getAllPosts } from "@/lib/blogData";
import { getCategories } from "@/lib/categories";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

  // Palabras clave del tema del artículo, no genéricas de todo el sitio
  const topicKeywords = getCategories().find(c => c.name === post.category)?.keywords;

  return {
    title: `${post.title}`,
    description: post.excerpt,
    keywords: [topicKeywords, "JuanJo El Tío Pez"].filter(Boolean).join(", "),
    authors: [{ name: post.author }],
    robots: "index, follow",
    alternates: {
      canonical: `https://juanjoeltiopez.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://juanjoeltiopez.com/blog/${post.slug}`,
      siteName: "JuanJo El Tío Pez",
      locale: "es_CO",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage || post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || post.image],
    },
    other: {
      "geo.region": "CO",
      "geo.placename": "Colombia",
      "geo.position": "4.570868;-74.297333",
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ children }) {
  return children;
}
