"use client";

import { Box, Heading, Text, HStack, Badge, LinkBox, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { trackBlogClick } from "@/lib/gtm";

// Tarjeta de artículo con imagen; base para el rediseño del blog y la home
export default function PostCard({ post, headingLevel = "h3" }) {
  return (
    <LinkBox
      as="article"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      overflow="hidden"
      transition="border-color 0.2s, transform 0.2s"
      _hover={{ borderColor: "accent.cyan", transform: "translateY(-3px)" }}
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" sx={{ aspectRatio: "16 / 10" }} bg="dark.border">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box p={5} display="flex" flexDirection="column" gap={3} flex="1">
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
