"use client";

import { Box, Grid, Heading, Text, HStack, Badge, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import { trackBlogClick } from "@/lib/gtm";

const PostMeta = ({ post }) => (
  <HStack spacing={2} flexWrap="wrap">
    <Badge colorScheme={post.categoryColor || "teal"} fontSize="10px">
      {post.category}
    </Badge>
    {post.level && (
      <Text fontSize="xs" color="dark.textMuted">
        {post.level}
      </Text>
    )}
  </HStack>
);

const cardStyles = {
  bg: "dark.surface",
  border: "1px",
  borderColor: "dark.border",
  rounded: "xl",
  overflow: "hidden",
  transition: "border-color 0.2s, transform 0.2s",
  _hover: { borderColor: "accent.cyan", transform: "translateY(-3px)" },
  sx: { "&:hover img": { transform: "scale(1.03)" } },
};

const imageStyle = { objectFit: "cover", transition: "transform 0.4s ease" };

// Tarjeta de artículo con imagen
export default function PostCard({ post, headingLevel = "h3", priority = false }) {
  return (
    <LinkBox as="article" {...cardStyles} h="full" display="flex" flexDirection="column">
      <Box position="relative" sx={{ aspectRatio: "16 / 10" }} bg="dark.border" overflow="hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={imageStyle}
          priority={priority}
        />
      </Box>
      <Box p={5} display="flex" flexDirection="column" gap={3} flex="1">
        <PostMeta post={post} />
        <Heading as={headingLevel} fontSize="xl" color="white" lineHeight="1.25">
          <LinkOverlay
            as={NextLink}
            href={`/blog/${post.slug}`}
            onClick={() => trackBlogClick(post.title)}
          >
            {post.title}
          </LinkOverlay>
        </Heading>
        <Text color="dark.textSecondary" fontSize="sm" noOfLines={2}>
          {post.excerpt}
        </Text>
        <Text fontSize="xs" color="dark.textMuted" mt="auto">
          {post.readTime}
        </Text>
      </Box>
    </LinkBox>
  );
}

// Tarjeta grande y horizontal para la guía destacada
export function FeaturedPostCard({ post, headingLevel = "h3", label = "Guía destacada" }) {
  return (
    <LinkBox as="article" {...cardStyles}>
      <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}>
        <Box
          position="relative"
          minH={{ base: "220px", md: "360px" }}
          bg="dark.border"
          overflow="hidden"
        >
          <Image
            src={post.coverImage || post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            style={imageStyle}
            priority
          />
        </Box>
        <Box
          p={{ base: 6, md: 10 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={4}
        >
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.1em"
            color="accent.sand"
          >
            {label}
          </Text>
          <Heading
            as={headingLevel}
            fontSize={{ base: "2xl", md: "3xl" }}
            color="white"
            lineHeight="1.15"
          >
            <LinkOverlay
              as={NextLink}
              href={`/blog/${post.slug}`}
              onClick={() => trackBlogClick(post.title)}
            >
              {post.title}
            </LinkOverlay>
          </Heading>
          <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} noOfLines={3}>
            {post.excerpt}
          </Text>
          <PostMeta post={post} />
          <HStack color="accent.cyan" fontWeight="600" fontSize="sm" spacing={2}>
            <Text>Leer la guía · {post.readTime}</Text>
            <ArrowForwardIcon />
          </HStack>
        </Box>
      </Grid>
    </LinkBox>
  );
}
