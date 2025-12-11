"use client";

import {
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import { getAllPosts } from "@/lib/blogData";
import NextLink from "next/link";
import SubscriptionSidebar from "@/components/SubscriptionSidebar";

const PostListItem = ({ post }) => {
  return (
    <Box
      as={NextLink}
      href={`/blog/${post.slug}`}
      display="block"
      py={4}
      borderBottom="1px"
      borderColor="dark.border"
      _hover={{ "& h3": { color: "accent.cyan" } }}
      transition="all 0.3s"
    >
      <Grid templateColumns={{ base: "1fr", md: "3fr 120px" }} gap={4}>
        <VStack align="start" spacing={2} order={{ base: 2, md: 1 }}>
          <Heading size="md" color="white" transition="color 0.3s">
            {post.title}
          </Heading>
          <Text color="dark.textSecondary" fontSize="sm" noOfLines={2}>
            {post.excerpt}
          </Text>
          <HStack spacing={3} fontSize="xs" color="dark.textSecondary">
            <Text>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <Text>•</Text>
            <Badge colorScheme={post.categoryColor || "cyan"} fontSize="9px">
              {post.category}
            </Badge>
            <Text>•</Text>
            <Text>{post.readTime}</Text>
          </HStack>
        </VStack>
        <Box
          bg="dark.border"
          h={{ base: "220px", md: "80px" }}
          w={{ base: "full", md: "120px" }}
          rounded="md"
          position="relative"
          overflow="hidden"
          order={{ base: 1, md: 2 }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 120px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container maxW={"container.xl"} py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
        <GridItem>
          <VStack align="start" spacing={4} mb={8}>
            <Heading fontSize={"4xl"} color="white">
              El Blog de Juanjo
            </Heading>
            <Text color="dark.textSecondary" fontSize={"lg"}>
              Guías, consejos y un poco de conocimiento para aplicar en este hobby
            </Text>
          </VStack>

          <VStack align="stretch" spacing={0}>
            {posts.map(post => (
              <PostListItem key={post.id} post={post} />
            ))}
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <Box position="sticky" top={4}>
            <SubscriptionSidebar />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}
