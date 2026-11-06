import { notFound } from "next/navigation";
import BlogIndexView from "@/components/blog/BlogIndexView";
import JsonLd from "@/components/JsonLd";
import { getCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getCategories().map(c => ({ categoria: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return { title: "Tema no encontrado" };

  const title = `${category.name}: guías de acuariofilia`;
  return {
    title,
    description: category.description,
    alternates: { canonical: `/blog/categoria/${category.slug}` },
    openGraph: {
      title: `${title} | JuanJo El Tío Pez`,
      description: category.description,
      url: `${SITE_URL}/blog/categoria/${category.slug}`,
      ...(category.image && { images: [{ url: category.image, alt: category.name }] }),
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const url = `${SITE_URL}/blog/categoria/${category.slug}`;
  const posts = getPostsByCategory(category.name);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: category.name,
        description: category.description,
        url,
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
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <BlogIndexView categorySlug={category.slug} />
    </>
  );
}
