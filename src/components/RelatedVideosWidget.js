"use client";

import { useState } from "react";
import { Box, VStack, HStack, Text, Heading, List, ListItem, Icon } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import PlatformToggle from "@/components/ui/PlatformToggle";
import PlayBadge from "@/components/ui/PlayBadge";
import { getVideosByIds } from "@/lib/videosData";

const VideoItem = ({ name, url, platform }) => {
  const link = platform === "tiktok" ? url.tiktok : url.instagram;

  return (
    <ListItem>
      <HStack
        as="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        spacing={3}
        p={3}
        bg="dark.bgAlt"
        rounded="md"
        border="1px"
        borderColor="dark.border"
        transition="background 0.2s"
        _hover={{ bg: "dark.surfaceRaised" }}
      >
        <PlayBadge />
        <Text flex="1" fontSize="xs" color="white" fontWeight="500" lineHeight="1.4">
          {name}
        </Text>
        <Icon as={FaExternalLinkAlt} color="dark.textMuted" boxSize={3} flexShrink={0} />
      </HStack>
    </ListItem>
  );
};

export default function RelatedVideosWidget({ videos, videoIds }) {
  const [platform, setPlatform] = useState("tiktok");

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
            Selecciona la plataforma de tu preferencia
          </Text>
        </Box>

        <PlatformToggle value={platform} onChange={setPlatform} w="full" />

        {/* Video List */}
        <List spacing={2} w="full">
          {videosList.map((video, index) => (
            <VideoItem
              key={video.id || index}
              name={video.name}
              url={video.url}
              platform={platform}
            />
          ))}
        </List>
      </VStack>
    </Box>
  );
}
