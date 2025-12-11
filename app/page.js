"use client";

import {
  Container,
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blogData";
import SubscriptionSidebar from "@/components/SubscriptionSidebar";
import SocialMediaWidget from "@/components/SocialMediaWidget";
import FeaturedVideosWidget from "@/components/FeaturedVideosWidget";

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
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </Text>
            <Text>•</Text>
            <Badge colorScheme={post.categoryColor || "cyan"} fontSize="9px">
              {post.category}
            </Badge>
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

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 6);

  // Featured post sobre JuanJo el Tío Pez
  const aboutJuanJo = {
    title: "Conoce a JuanJo el Tío Pez",
    excerpt:
      "Desde que nació Juanjo el Tío Pez, la misión siempre ha sido la misma: promover una acuariofilia responsable y consciente. Comparto tips sencillos, experiencia real y productos que realmente ayudan, para que disfrutes al 100% de este maravilloso hobby.",
    image: "/images/juanjoeltiopez.jpg",
    date: "",
    readTime: "",
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* Featured Post - Acerca de JuanJo - 100% ancho */}
      <Box mb={8}>
        <Box
          as={NextLink}
          href="/sobre-mi"
          display="block"
          bg="dark.surface"
          rounded="lg"
          overflow="hidden"
          border="1px"
          borderColor="dark.border"
          _hover={{ borderColor: "accent.cyan", cursor: "pointer" }}
          transition="all 0.3s"
        >
          <Grid templateColumns={{ base: "1fr", md: "2fr 3fr" }} gap={0}>
            <Box
              bg="dark.border"
              h={{ base: "200px", md: "full" }}
              minH="340px"
              position="relative"
              overflow="hidden"
            >
              <Image
                src={aboutJuanJo.image}
                alt={aboutJuanJo.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box p={8}>
              <VStack align="start" spacing={4}>
                <Badge colorScheme="purple" fontSize="9px">
                  Acerca de
                </Badge>
                <Heading size="lg" color="white" lineHeight="1.3">
                  {aboutJuanJo.title}
                </Heading>
                <Text color="dark.textSecondary" lineHeight="tall">
                  {aboutJuanJo.excerpt}
                </Text>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
        <GridItem>
          {/* Tabs */}
          <HStack spacing={6} mb={6} borderBottom="1px" borderColor="dark.border" pb={2}>
            <Text
              fontSize="sm"
              fontWeight="600"
              color="white"
              borderBottom="2px"
              borderColor="white"
              pb={2}
              mb={-2}
            >
              Recientes
            </Text>
          </HStack>

          {/* Post List */}
          <VStack align="stretch" spacing={0}>
            {recentPosts.map(post => (
              <PostListItem key={post.id} post={post} />
            ))}
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <VStack spacing={6} position="sticky" top={4}>
            <SocialMediaWidget />
            <SubscriptionSidebar />
          </VStack>
        </GridItem>
      </Grid>

      {/* Featured Videos Widget - 100% width */}
      <Box mt={12}>
        <FeaturedVideosWidget posts={posts} count={6} />
      </Box>
    </Container>
  );
}
