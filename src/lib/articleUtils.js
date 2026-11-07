// Utilidades para artículos: ids de encabezados y tabla de contenidos.

export function slugifyHeading(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Quita la sintaxis markdown en línea (**negrita**, *cursiva*, `código`, [links](url))
function stripInlineMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

// Devuelve los H2 del contenido markdown: [{ id, text }]
export function getHeadings(markdown = "") {
  return markdown
    .split("\n")
    .filter(line => /^##\s+/.test(line))
    .map(line => {
      const text = stripInlineMarkdown(line.replace(/^##\s+/, ""));
      return { id: slugifyHeading(text), text };
    });
}

// Extrae el texto plano de los children de React (para ids de encabezados)
export function childrenToText(children) {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children.props) return childrenToText(children.props.children);
  return "";
}
