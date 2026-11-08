"use client";

import { Box, VStack, HStack, Text, Heading, List, ListItem, Button, Icon } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { getVideosByIds } from "@/lib/videosData";
import { trackVideoClick } from "@/lib/gtm";

const PLATFORMS = [
  { key: "tiktok", label: "TikTok", icon: FaTiktok },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
];

// Cada video muestra sus dos enlaces, sin selector oculto: se ve a dónde lleva cada botón
const VideoItem = ({ video }) => (
  <ListItem bg="dark.bgAlt" rounded="md" border="1px" borderColor="dark.border" p={3}>
    <Text fontSize="sm" color="white" fontWeight="500" lineHeight="1.4" mb={2.5}>
      {video.name}
    </Text>
    <HStack spacing={2}>
      {PLATFORMS.filter(p => video.url?.[p.key]).map(p => (
        <Button
          key={p.key}
          as="a"
          href={video.url[p.key]}
          target="_blank"
          rel="noopener noreferrer"
          size="xs"
          variant="outline"
          borderColor="dark.border"
          color="dark.textSecondary"
          _hover={{ color: "white", bg: "dark.surfaceRaised" }}
          leftIcon={<Icon as={p.icon} boxSize={3} />}
          aria-label={`Ver "${video.name}" en ${p.label}`}
          onClick={() => trackVideoClick(video.name)}
        >
          {p.label}
        </Button>
      ))}
    </HStack>
  </ListItem>
);

export default function RelatedVideosWidget({ videos, videoIds }) {
  // Si se pasan videoIds, buscar los videos
  const videosList = videoIds ? getVideosByIds(videoIds) : videos;

  if (!videosList || videosList.length === 0) {
    return null;
  }

  return (
    <Box bg="dark.surface" rounded="lg" p={5} border="1px" borderColor="dark.border" w="full">
      <VStack align="start" spacing={3} w="full">
        <Box>
          <Heading fontSize="lg" color="white">
            Videos relacionados
          </Heading>
          <Text fontSize="xs" color="dark.textSecondary" mt={1}>
            Míralos en TikTok o Instagram
          </Text>
        </Box>

        <List spacing={2} w="full">
          {videosList.map((video, index) => (
            <VideoItem key={video.id || index} video={video} />
          ))}
        </List>
      </VStack>
    </Box>
  );
}
