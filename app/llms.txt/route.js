import { getAllPosts } from "@/lib/blogData";
import { getCategories, MIN_POSTS_TO_INDEX } from "@/lib/categories";
import {
  SITE_URL,
  SITE_NAME,
  asesoria,
  contestsText,
  mainAuthor,
  socialProfiles,
} from "@/lib/siteConfig";

// Resumen del sitio para asistentes de IA (formato llmstxt.org), generado con los mismos datos del sitio
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const topics = getCategories().filter(c => c.count >= MIN_POSTS_TO_INDEX);
  const social = Object.values(socialProfiles)
    .map(p => `- [${p.label}](${p.url})`)
    .join("\n");

  const text = `# ${SITE_NAME}

> ${mainAuthor.shortBio} Sitio en español, desde Colombia.

## Guías

${posts.map(p => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## Temas

${topics.map(c => `- [${c.name}](${SITE_URL}${c.href}): ${c.description}`).join("\n")}

## Asesorías personalizadas

- [Asesorías personalizadas](${SITE_URL}/asesoria): sesión virtual 1 a 1 de ${asesoria.duration} para resolver problemas de tu acuario (algas, plantas, peces enfermos, parámetros inestables). Incluye diagnóstico, plan de acción personalizado y ${asesoria.followUpDays} días de seguimiento. Precio: ${asesoria.price} por sesión.

## Sobre ${SITE_NAME}

- [Sobre mí](${SITE_URL}/sobre-mi): quién es ${SITE_NAME} y su misión de promover una acuariofilia responsable. Acuarista desde 2020; concursos: ${contestsText}.
${social}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
