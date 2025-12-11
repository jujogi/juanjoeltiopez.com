"use client";

import { Box, VStack, Heading, Text, HStack, Badge } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";

const RelatedPostItem = ({ post }) => {
  return (
    <Box
      as={NextLink}
      href={`/blog/${post.slug}`}
      display="block"
      w="full"
      p={3}
      bg="dark.bgAlt"
      rounded="md"
      border="1px"
      borderColor="dark.border"
      _hover={{
        borderColor: "accent.cyan",
        transform: "translateY(-2px)",
        transition: "all 0.3s",
      }}
      transition="all 0.3s"
      cursor="pointer"
    >
      <HStack spacing={3} align="start">
        <Box
          position="relative"
          w="80px"
          h="60px"
          flexShrink={0}
          rounded="md"
          overflow="hidden"
          bg="dark.border"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="80px"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <VStack align="start" spacing={1} flex="1">
          <Text fontSize="sm" fontWeight="600" color="white" noOfLines={2} lineHeight="1.3">
            {post.title}
          </Text>
          <HStack spacing={2}>
            <Badge colorScheme={post.categoryColor || "cyan"} fontSize="9px">
              {post.category}
            </Badge>
            <Text fontSize="xs" color="dark.textSecondary">
              {post.readTime}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default function RelatedPostsWidget({ posts, title = "Artículos relacionados" }) {
  return (
    <Box bg="dark.surface" rounded="lg" p={6} border="1px" borderColor="dark.border" w="full">
      <VStack align="start" spacing={4} w="full">
        <Heading fontSize="xl" color="white">
          {title}
        </Heading>

        <VStack spacing={3} w="full">
          {posts.map(post => (
            <RelatedPostItem key={post.id} post={post} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
