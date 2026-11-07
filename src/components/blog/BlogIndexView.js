"use client";

import { Box, Container, Heading, Text, SimpleGrid, Wrap, WrapItem, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { getAllPosts } from "@/lib/blogData";
import { getCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/categories";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import PostCard, { FeaturedPostCard } from "@/components/PostCard";
import AsesoriaBand from "@/components/AsesoriaBand";

const CategoryChip = ({ href, label, count, isActive }) => (
  <Link
    as={NextLink}
    href={href}
    aria-current={isActive ? "page" : undefined}
    display="inline-flex"
    alignItems="center"
    gap={2}
    px={4}
    py={2}
    rounded="full"
    fontSize="sm"
    fontWeight="600"
    border="1px"
    borderColor={isActive ? "accent.cyan" : "dark.border"}
    bg={isActive ? "accent.cyan" : "dark.surface"}
    color={isActive ? "water.950" : "dark.text"}
    _hover={{
      color: isActive ? "water.950" : "accent.cyan",
    }}
  >
    {label}
    <Text as="span" fontSize="xs" opacity={0.7}>
      {count}
    </Text>
  </Link>
);

// Índice del blog. Sin categorySlug muestra todo; con categorySlug, la página del tema.
export default function BlogIndexView({ categorySlug }) {
  const allPosts = getAllPosts();
  const categories = getCategories();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const posts = category ? getPostsByCategory(category.name) : allPosts;

  // En el índice general, el artículo más reciente va destacado
  const [featured, ...rest] = posts;
  const showFeatured = !category && posts.length > 3;
  const gridPosts = showFeatured ? rest : posts;

  const breadcrumbs = category
    ? [{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.name }]
    : [{ label: "Inicio", href: "/" }, { label: "Blog" }];

  return (
    <Container maxW="container.xl" pt={{ base: 6, md: 10 }}>
      <Breadcrumbs items={breadcrumbs} />

      <Box as="header" maxW="760px" mt={{ base: 6, md: 8 }} mb={{ base: 8, md: 10 }}>
        <Text
          fontSize="xs"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.12em"
          color="accent.cyan"
          mb={3}
        >
          {category ? "Tema" : "Blog"}
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          lineHeight="1.1"
          color="white"
          mb={4}
        >
          {category ? category.name : "Guías y artículos sobre acuariofilia"}
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} color="dark.textSecondary" lineHeight="1.6">
          {category
            ? category.description
            : "Guías, consejos y un poco de conocimiento para aplicar en este hobby."}
        </Text>
      </Box>

      {/* Los temas solo se listan en el índice general; dentro de un tema se vuelve con la ruta */}
      {!category && (
        <Box as="nav" aria-label="Temas del blog" mb={{ base: 8, md: 12 }}>
          <Wrap spacing={3}>
            <WrapItem>
              <CategoryChip href="/blog" label="Todas" count={allPosts.length} isActive />
            </WrapItem>
            {categories.map(c => (
              <WrapItem key={c.slug}>
                <CategoryChip href={c.href} label={c.name} count={c.count} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}

      {showFeatured && (
        <Box mb={{ base: 8, md: 10 }}>
          <FeaturedPostCard post={featured} headingLevel="h2" label="Lo más reciente" />
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={{ base: 16, md: 24 }}>
        {gridPosts.map(post => (
          <PostCard key={post.slug} post={post} headingLevel="h2" />
        ))}
      </SimpleGrid>

      <AsesoriaBand trackingId={category ? "categoria_asesoria_band" : "blog_asesoria_band"} />
    </Container>
  );
}
