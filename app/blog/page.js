import BlogIndexView from "@/components/blog/BlogIndexView";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blogData";
import { SITE_URL } from "@/lib/siteConfig";

export default function BlogPage() {
  const posts = getAllPosts();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías y artículos de acuariofilia",
    url: `${SITE_URL}/blog`,
    inLanguage: "es-CO",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <BlogIndexView />
    </>
  );
}
