"use client";

import { use, useState, useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  Badge,
  Divider,
  Button,
  Grid,
  GridItem,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/blogData";
import { formatDateLong } from "@/lib/dateUtils";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import RelatedPostsWidget from "@/components/RelatedPostsWidget";
import RelatedVideosWidget from "@/components/RelatedVideosWidget";
import AsesoriaWidget from "@/components/AsesoriaWidget";

const PostSkeleton = () => (
  <Container maxW={"container.xl"} py={12}>
    <Skeleton height="40px" width="150px" mb={6} />

    <Stack spacing={6} mb={8}>
      <Box>
        <Skeleton height="24px" width="120px" mb={4} />
        <Skeleton height="48px" width="80%" mb={4} />
        <Stack direction={"row"} spacing={4}>
          <Skeleton height="20px" width="100px" />
          <Skeleton height="20px" width="8px" />
          <Skeleton height="20px" width="150px" />
          <Skeleton height="20px" width="8px" />
          <Skeleton height="20px" width="80px" />
        </Stack>
      </Box>

      <Skeleton height={"400px"} rounded={"lg"} />
    </Stack>

    <Grid templateColumns={{ base: "1fr", lg: "7fr 3fr" }} gap={12}>
      <GridItem>
        <Stack spacing={6}>
          <Skeleton height="600px" rounded={"lg"} />
          <Divider borderColor="dark.border" />
          <Skeleton height="200px" rounded={"lg"} />
        </Stack>
      </GridItem>

      <GridItem>
        <VStack spacing={6} align="stretch">
          <Skeleton height="300px" rounded={"lg"} />
          <Skeleton height="300px" rounded={"lg"} />
        </VStack>
      </GridItem>
    </Grid>
  </Container>
);

export default function BlogPost({ params }) {
  const { slug } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  // Simular carga del backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms de delay para simular carga

    return () => clearTimeout(timer);
  }, [slug]);

  // Obtener posts relacionados (misma categoría, excluyendo el actual)
  const relatedPosts = allPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  // Si no hay suficientes posts de la misma categoría, completar con otros posts
  if (relatedPosts.length < 3) {
    const otherPosts = allPosts
      .filter(p => p.id !== post?.id && !relatedPosts.find(rp => rp.id === p.id))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }

  if (!post) {
    return (
      <Container maxW={"container.xl"} py={12}>
        <Heading>Post not found</Heading>
        <Button as={NextLink} href="/blog" mt={4} leftIcon={<ArrowBackIcon />}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <Container maxW={"container.xl"} py={12}>
      <Button as={NextLink} href="/blog" variant={"ghost"} leftIcon={<ArrowBackIcon />} mb={6}>
        Volver al Blog
      </Button>

      <Stack spacing={6} mb={8}>
        <Box>
          <Badge colorScheme={post.categoryColor || "cyan"} mb={4}>
            {post.category}
          </Badge>
          <Heading fontSize={"4xl"} mb={4} color="white">
            {post.title}
          </Heading>
          <Stack direction={"row"} spacing={4} color={"dark.textSecondary"} fontSize={"sm"}>
            <Text>{post.author}</Text>
            <Text>•</Text>
            <Text>{formatDateLong(post.date)}</Text>
            <Text>•</Text>
            <Text>{post.readTime}</Text>
          </Stack>
        </Box>

        <Box
          h={"400px"}
          bg={"dark.border"}
          rounded={"lg"}
          position={"relative"}
          overflow={"hidden"}
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
      </Stack>

      <Grid templateColumns={{ base: "1fr", lg: "7fr 3fr" }} gap={12}>
        <GridItem>
          <Stack spacing={6}>
            <Box
              className="blog-content"
              color="dark.text"
              sx={{
                "& h1": {
                  fontSize: "3xl",
                  fontWeight: "bold",
                  mb: 4,
                  mt: 8,
                  color: "white",
                },
                "& h2": {
                  fontSize: "2xl",
                  fontWeight: "bold",
                  mb: 3,
                  mt: 6,
                  color: "accent.cyan",
                },
                "& h3": {
                  fontSize: "xl",
                  fontWeight: "semibold",
                  mb: 2,
                  mt: 4,
                  color: "white",
                },
                "& p": {
                  mb: 4,
                  lineHeight: "tall",
                  color: "dark.text",
                },
                "& ul, & ol": {
                  mb: 4,
                  pl: 6,
                },
                "& li": {
                  mb: 2,
                  color: "dark.text",
                },
                "& strong": {
                  fontWeight: "bold",
                  color: "accent.cyan",
                },
                "& code": {
                  bg: "dark.surface",
                  px: 2,
                  py: 1,
                  rounded: "md",
                  fontSize: "sm",
                  color: "accent.cyan",
                },
              }}
            >
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </Box>

            <Divider borderColor="dark.border" />

            <Box bg="dark.surface" p={6} rounded={"lg"} border="1px" borderColor="dark.border">
              <Heading size={"md"} mb={2} color="white">
                ¿Te gustó este artículo?
              </Heading>
              <Text mb={4} color="dark.textSecondary">
                ¡Explora las otras guías y consejos de nuestro blog para convertirte en un mejor
                acuarista!
              </Text>
              <Button
                as={NextLink}
                href="/blog"
                bg="accent.cyan"
                color="white"
                _hover={{ bg: "accent.cyanHover" }}
              >
                Ver todos los artículos
              </Button>
            </Box>
          </Stack>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <VStack spacing={6} position={{ base: "relative", lg: "sticky" }} top={4} align="stretch">
            {post.videos && post.videos.length > 0 && <RelatedVideosWidget videos={post.videos} />}
            <AsesoriaWidget />
            <RelatedPostsWidget posts={relatedPosts} title="Artículos relacionados" />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
