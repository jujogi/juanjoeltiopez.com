import { getPostBySlug, getAllPosts } from "@/lib/blogData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no encontrado | JuanJo El Tío Pez 🐠",
    };
  }

  return {
    title: `${post.title} | JuanJo El Tío Pez 🐠`,
    description: post.excerpt,
    keywords: `${post.category}, ${post.title}, acuarios, JuanJo El Tío Pez, cuidado de peces, acuariofilia`,
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
      locale: "es_ES",
      type: "article",
      publishedTime: post.date,
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
