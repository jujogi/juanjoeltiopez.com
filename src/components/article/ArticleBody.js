"use client";

import { Children } from "react";
import { Box, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { FaLightbulb, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading, childrenToText } from "@/lib/articleUtils";

// Párrafos que empiezan con "**Tip:**", "**Importante:**", etc. se muestran como avisos
const CALLOUT_TYPES = {
  tip: { icon: FaLightbulb, color: "accent.cyan", bg: "rgba(62, 207, 158, 0.08)" },
  warning: { icon: FaExclamationTriangle, color: "accent.sand", bg: "rgba(230, 200, 143, 0.08)" },
  note: { icon: FaInfoCircle, color: "accent.blue", bg: "rgba(108, 195, 230, 0.08)" },
};

const CALLOUT_LABELS = [
  [/^(tip|consejo)/i, "tip"],
  [/^(importante|cuidado|atención|advertencia)/i, "warning"],
  [/^(nota|recuerda)/i, "note"],
];

function getCalloutType(node) {
  const first = node?.children?.[0];
  if (!first) return null;
  if (first.type === "text" && first.value.trim().startsWith("⚠️")) return "warning";
  if (first.type === "element" && first.tagName === "strong") {
    const label = first.children?.[0]?.value || "";
    if (!label.trim().endsWith(":")) return null;
    // Un rótulo solo (p.ej. "**Importante:**" seguido de una lista) no es un aviso
    const hasBody = node.children.slice(1).some(c => c.type !== "text" || c.value.trim());
    if (!hasBody) return null;
    const match = CALLOUT_LABELS.find(([re]) => re.test(label.trim()));
    return match ? match[1] : null;
  }
  return null;
}

// El aviso ya muestra su ícono: se quita el emoji "⚠️" del inicio del texto para no repetirlo
const WARNING_EMOJI = /^\s*\u26A0\uFE0F?\s*/;
const stripWarningEmoji = children =>
  Children.map(children, (child, i) =>
    i === 0 && typeof child === "string" ? child.replace(WARNING_EMOJI, "") : child
  );

function isCaption(node) {
  return (
    node?.children?.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "em"
  );
}

const Callout = ({ type, children }) => {
  const style = CALLOUT_TYPES[type];
  return (
    <HStack
      role="note"
      align="start"
      spacing={3}
      my={6}
      p={{ base: 4, md: 5 }}
      bg={style.bg}
      borderLeft="3px solid"
      borderColor={style.color}
      roundedRight="lg"
      sx={{ "& strong": { color: style.color } }}
    >
      <Icon as={style.icon} color={style.color} boxSize={4} mt={1.5} flexShrink={0} />
      <Text as="div" m={0}>
        {children}
      </Text>
    </HStack>
  );
};

const markdownComponents = {
  // Las tablas se desplazan dentro de su caja en móvil, sin ensanchar la página
  table: ({ children }) => (
    <Box
      className="table-wrap"
      overflowX="auto"
      tabIndex={0}
      role="region"
      aria-label="Tabla comparativa"
    >
      <table>{children}</table>
    </Box>
  ),
  h2: ({ children }) => {
    const id = slugifyHeading(childrenToText(children));
    return (
      <Heading as="h2" id={id} className="article-h2">
        <a href={`#${id}`}>{children}</a>
      </Heading>
    );
  },
  h3: ({ children }) => <Heading as="h3">{children}</Heading>,
  p: ({ node, children }) => {
    const type = getCalloutType(node);
    if (type) return <Callout type={type}>{stripWarningEmoji(children)}</Callout>;
    if (isCaption(node)) {
      return (
        <Text as="p" className="caption">
          {children}
        </Text>
      );
    }
    return <p>{children}</p>;
  },
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <NextLink href={href}>{children}</NextLink>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => <img src={src} alt={alt || ""} loading="lazy" decoding="async" />,
};

// Tipografía de lectura: ~68 caracteres por línea, 18px, interlineado amplio
export const proseStyles = {
  maxW: "68ch",
  fontSize: { base: "17px", md: "18px" },
  lineHeight: 1.75,
  color: "dark.text",
  "& > * + *, & > div > * + *": { mt: 0 },
  "& p": { mb: 5 },
  "& .article-h2": {
    fontSize: { base: "2xl", md: "3xl" },
    color: "accent.cyan",
    mt: { base: 10, md: 14 },
    mb: 4,
    lineHeight: 1.2,
    scrollMarginTop: "88px",
  },
  "& .article-h2 a": { color: "inherit", textDecoration: "none" },
  "& .article-h2 a:hover": { color: "accent.cyanHover" },
  "& h3": {
    fontSize: { base: "xl", md: "2xl" },
    color: "accent.cyan",
    mt: 8,
    mb: 3,
  },
  "& ul, & ol": { mb: 5, pl: 6 },
  "& li": { mb: 2, pl: 1 },
  "& li::marker": { color: "accent.cyan" },
  "& strong": { fontWeight: "700", color: "white" },
  "& a": {
    color: "accent.cyan",
    textDecoration: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "3px",
  },
  "& a:hover": { color: "accent.cyanHover" },
  "& img": {
    w: "full",
    h: "auto",
    rounded: "xl",
    my: 6,
    border: "1px solid",
    borderColor: "dark.border",
  },
  "& .caption": {
    fontSize: "sm",
    color: "dark.textMuted",
    mt: -3,
    mb: 8,
    textAlign: "center",
    lineHeight: 1.5,
  },
  "& .caption em": { fontStyle: "normal" },
  "& blockquote": {
    borderLeft: "3px solid",
    borderColor: "accent.cyan",
    pl: 5,
    my: 6,
    color: "dark.textSecondary",
    fontStyle: "italic",
  },
  "& code": {
    bg: "dark.surface",
    px: 1.5,
    py: 0.5,
    rounded: "md",
    fontSize: "0.9em",
    color: "accent.cyan",
  },
  "& hr": { borderColor: "dark.border", my: 10 },
  "& .table-wrap": {
    my: 6,
    border: "1px solid",
    borderColor: "dark.border",
    rounded: "xl",
  },
  "& table": { w: "full", borderCollapse: "collapse", fontSize: "md", lineHeight: 1.5 },
  "& th, & td": {
    textAlign: "left",
    verticalAlign: "top",
    px: 4,
    py: 3,
    borderBottom: "1px solid",
    borderColor: "dark.border",
    minW: "140px",
  },
  "& th": { bg: "dark.surface", color: "white", fontWeight: "700" },
  "& tbody tr:last-of-type td": { borderBottom: "none" },
  "& td:first-of-type": { color: "white", fontWeight: "600" },
};

const Markdown = ({ children }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
    {children}
  </ReactMarkdown>
);

export default function ArticleBody({ post }) {
  return (
    <Box className="article-body" sx={proseStyles}>
      <Markdown>{post.content || ""}</Markdown>
    </Box>
  );
}
