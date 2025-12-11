"use client";

import { useState, useMemo } from "react";
import { Box, VStack, HStack, Text, Heading, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaTiktok, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";

const VideoCard = ({ video, platform }) => {
  const link = platform === "tiktok" ? video.url.tiktok : video.url.instagram;

  // Si no hay link para la plataforma seleccionada, no mostrar
  if (!link) return null;

  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      p={4}
      bg="dark.surface"
      rounded="lg"
      border="1px"
      borderColor="dark.border"
      _hover={{
        borderColor: platform === "tiktok" ? "#000000" : "#E1306C",
        transform: "translateY(-4px)",
        transition: "all 0.3s",
      }}
      transition="all 0.3s"
      cursor="pointer"
      h="full"
    >
      <VStack spacing={3} align="center" h="full" justify="space-between">
        <Text fontSize="4xl">{video.emoji}</Text>
        <VStack spacing={1} flex="1" justify="center">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="600"
            textAlign="center"
            lineHeight="1.4"
            noOfLines={3}
          >
            {video.name}
          </Text>
          {video.postTitle && (
            <Text fontSize="xs" color="dark.textSecondary" textAlign="center" noOfLines={1}>
              {video.postTitle}
            </Text>
          )}
        </VStack>
        <HStack spacing={1} color="dark.textSecondary">
          <Icon as={FaExternalLinkAlt} boxSize={3} />
          <Text fontSize="xs">Ver video</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

// Función para obtener videos aleatorios de todos los posts
function getRandomVideos(posts, count = 6) {
  const allVideos = [];

  // Recopilar todos los videos de todos los posts
  posts.forEach(post => {
    if (post.videos && post.videos.length > 0) {
      post.videos.forEach(video => {
        allVideos.push({
          ...video,
          postTitle: post.title,
        });
      });
    }
  });

  // Mezclar aleatoriamente usando Fisher-Yates shuffle
  const shuffled = [...allVideos];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Retornar los primeros 'count' videos
  return shuffled.slice(0, count);
}

export default function FeaturedVideosWidget({ posts, count = 6 }) {
  const [platform, setPlatform] = useState("tiktok");

  // Memoize random videos to avoid reshuffling on every render
  const videos = useMemo(() => getRandomVideos(posts, count), [posts, count]);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Filtrar videos que tienen link para la plataforma seleccionada
  const availableVideos = videos.filter(video => {
    const link = platform === "tiktok" ? video.url.tiktok : video.url.instagram;
    return link && link !== "";
  });

  return (
    <Box
      bg="dark.bgAlt"
      rounded="lg"
      p={{ base: 6, md: 8 }}
      border="1px"
      borderColor="dark.border"
      w="full"
    >
      <VStack align="start" spacing={6} w="full">
        <HStack justify="space-between" w="full" flexWrap="wrap" gap={4}>
          <Heading fontSize={{ base: "xl", md: "2xl" }} color="white">
            Videos destacados
          </Heading>

          {/* Platform Toggle */}
          <HStack spacing={2}>
            <Button
              size="sm"
              fontSize="xs"
              bg={platform === "tiktok" ? "#000000" : "dark.surface"}
              color="white"
              border="1px"
              borderColor={platform === "tiktok" ? "#000000" : "dark.border"}
              _hover={{
                bg: "#000000",
                borderColor: "#000000",
              }}
              onClick={() => setPlatform("tiktok")}
              leftIcon={<Icon as={FaTiktok} boxSize={3} />}
            >
              TikTok
            </Button>
            <Button
              size="sm"
              fontSize="xs"
              bg={platform === "instagram" ? "#E1306C" : "dark.surface"}
              color="white"
              border="1px"
              borderColor={platform === "instagram" ? "#E1306C" : "dark.border"}
              _hover={{
                bg: "#E1306C",
                borderColor: "#E1306C",
              }}
              onClick={() => setPlatform("instagram")}
              leftIcon={<Icon as={FaInstagram} boxSize={3} />}
            >
              Instagram
            </Button>
          </HStack>
        </HStack>

        {/* Video Grid */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={4} w="full">
          {availableVideos.map((video, index) => (
            <VideoCard key={index} video={video} platform={platform} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
