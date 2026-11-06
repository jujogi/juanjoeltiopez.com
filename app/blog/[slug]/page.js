import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blogData";
import { SITE_URL, absoluteUrl } from "@/lib/siteConfig";
import JsonLd from "@/components/JsonLd";
import ArticleView from "@/components/article/ArticleView";

// Componente de servidor: el artículo completo llega en el HTML inicial (indexable)
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [absoluteUrl(post.coverImage || post.image)],
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: "es-CO",
        articleSection: post.category,
        mainEntityOfPage: url,
        author: post.isGuestAuthor
          ? {
              "@type": "Person",
              name: post.author,
              ...(post.authorLink && { url: post.authorLink }),
            }
          : { "@id": `${SITE_URL}/#juanjo` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      ...(post.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faq.map(item => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <ArticleView slug={post.slug} />
    </>
  );
}

export const dynamicParams = false;
