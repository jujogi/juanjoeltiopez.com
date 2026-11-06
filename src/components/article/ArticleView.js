"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  Badge,
  Grid,
  GridItem,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/blogData";
import { getAllProducts } from "@/lib/shopData";
import { formatDateLong } from "@/lib/dateUtils";
import { getHeadings } from "@/lib/articleUtils";
import { mainAuthor } from "@/lib/siteConfig";
import { categoryHref } from "@/lib/categories";
import Breadcrumbs from "./Breadcrumbs";
import CareSheet from "./CareSheet";
import TableOfContents from "./TableOfContents";
import ArticleBody from "./ArticleBody";
import ArticleFAQ from "./ArticleFAQ";
import AuthorBox from "./AuthorBox";
import PostCard from "@/components/PostCard";
import RelatedVideosWidget from "@/components/RelatedVideosWidget";
import AsesoriaWidget from "@/components/AsesoriaWidget";

function getRelatedPosts(post, allPosts, count = 3) {
  const explicit = (post.relatedPostSlugs || [])
    .map(slug => allPosts.find(p => p.slug === slug))
    .filter(Boolean);
  const sameCategory = allPosts.filter(p => p.category === post.category);
  const rest = allPosts;
  const seen = new Set([post.slug]);
  return [...explicit, ...sameCategory, ...rest]
    .filter(p => (seen.has(p.slug) ? false : seen.add(p.slug)))
    .slice(0, count);
}

export default function ArticleView({ slug }) {
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  const products = getAllProducts();
  const headings = getHeadings(post.content);
  const relatedPosts = getRelatedPosts(post, allPosts);
  const updated = post.updated && post.updated !== post.date ? post.updated : null;

  return (
    <Box as="article">
      {/* Cabecera */}
      <Container maxW="container.xl" pt={{ base: 6, md: 10 }}>
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category, href: categoryHref(post.category) },
          ]}
        />

        <Box maxW="860px" mt={{ base: 6, md: 8 }}>
          <HStack spacing={3} mb={4} flexWrap="wrap">
            <Badge colorScheme={post.categoryColor || "teal"}>{post.category}</Badge>
            {post.level && (
              <Text fontSize="sm" color="dark.textSecondary">
                Nivel:{" "}
                <Text as="span" color="white" fontWeight="600">
                  {post.level}
                </Text>
              </Text>
            )}
          </HStack>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight={1.1}
            color="white"
            mb={5}
          >
            {post.title}
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="dark.textSecondary"
            lineHeight="1.6"
            mb={6}
          >
            {post.excerpt}
          </Text>

          <HStack spacing={3} color="dark.textSecondary" fontSize="sm" flexWrap="wrap">
            <Avatar
              size="sm"
              name={post.author}
              src={post.isGuestAuthor ? undefined : mainAuthor.image}
              bg="accent.cyan"
              color="water.950"
            />
            <Text color="white" fontWeight="600">
              {post.author}
            </Text>
            <Text aria-hidden="true">·</Text>
            <Text as="time" dateTime={post.date}>
              {formatDateLong(post.date)}
            </Text>
            {updated && (
              <>
                <Text aria-hidden="true">·</Text>
                <Text>
                  Actualizado: <time dateTime={updated}>{formatDateLong(updated)}</time>
                </Text>
              </>
            )}
            <Text aria-hidden="true">·</Text>
            <Text>{post.readTime}</Text>
          </HStack>
        </Box>

        <Box
          position="relative"
          mt={{ base: 6, md: 10 }}
          h={{ base: "240px", md: "460px" }}
          rounded="2xl"
          overflow="hidden"
          bg="dark.border"
        >
          <Image
            src={post.coverImage || post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
      </Container>

      {/* Cuerpo + barra lateral */}
      <Container maxW="container.xl" mt={{ base: 8, md: 12 }}>
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) 320px" }}
          gap={{ base: 10, lg: 16 }}
        >
          <GridItem minW={0}>
            <VStack align="stretch" spacing={10}>
              {post.careSheet && <CareSheet careSheet={post.careSheet} level={post.level} />}

              {/* Índice en móvil */}
              {headings.length >= 2 && (
                <Box
                  display={{ base: "block", lg: "none" }}
                  bg="dark.bgAlt"
                  border="1px"
                  borderColor="dark.border"
                  rounded="xl"
                  p={5}
                >
                  <TableOfContents headings={headings} />
                </Box>
              )}

              <ArticleBody post={post} products={products} />

              {post.faq?.length > 0 && (
                <Box maxW="68ch">
                  <ArticleFAQ faq={post.faq} />
                </Box>
              )}

              <Box maxW="68ch">
                <AuthorBox post={post} />
              </Box>
            </VStack>
          </GridItem>

          <GridItem as="aside" aria-label="Contenido relacionado" minW={0}>
            <VStack spacing={6} align="stretch" h="full">
              {post.videoIds?.length > 0 && <RelatedVideosWidget videoIds={post.videoIds} />}
              <AsesoriaWidget />
              {/* El índice queda fijo mientras se lee el resto del artículo */}
              <Box display={{ base: "none", lg: "block" }} position="sticky" top={6} pt={2}>
                <TableOfContents headings={headings} />
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Sigue aprendiendo */}
      {relatedPosts.length > 0 && (
        <Container maxW="container.xl" mt={{ base: 14, md: 20 }}>
          <Divider borderColor="dark.border" mb={{ base: 10, md: 14 }} />
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color="white" mb={8}>
            Sigue aprendiendo
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {relatedPosts.map(p => (
              <PostCard key={p.slug} post={p} />
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
