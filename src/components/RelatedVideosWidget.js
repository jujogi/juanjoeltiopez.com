"use client";

import { useState } from "react";
import { Box, VStack, HStack, Text, Heading, Button, List, ListItem, Icon } from "@chakra-ui/react";
import { FaTiktok, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";

const VideoItem = ({ name, url, emoji, platform }) => {
  const link = platform === "tiktok" ? url.tiktok : url.instagram;

  return (
    <ListItem>
      <Box
        as="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        display="block"
        p={3}
        bg="dark.bgAlt"
        rounded="md"
        border="1px"
        borderColor="dark.border"
        _hover={{
          borderColor: platform === "tiktok" ? "#000000" : "#E1306C",
          transform: "translateY(-2px)",
          transition: "all 0.3s",
        }}
        transition="all 0.3s"
        cursor="pointer"
      >
        <HStack spacing={2} align="center">
          <Text fontSize="xl" flexShrink={0}>
            {emoji}
          </Text>
          <VStack align="start" spacing={0} flex="1">
            <Text fontSize="xs" color="white" fontWeight="500" lineHeight="1.4">
              {name}
            </Text>
          </VStack>
          <Icon
            as={FaExternalLinkAlt}
            color="dark.textSecondary"
            boxSize={3}
            flexShrink={0}
            mt={0.5}
          />
        </HStack>
      </Box>
    </ListItem>
  );
};

export default function RelatedVideosWidget({ videos }) {
  const [platform, setPlatform] = useState("tiktok");

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <Box bg="dark.surface" rounded="lg" p={5} border="1px" borderColor="dark.border" w="full">
      <VStack align="start" spacing={3} w="full">
        <Heading fontSize="lg" color="white">
          Videos relacionados
        </Heading>

        {/* Platform Toggle */}
        <HStack spacing={2} w="full">
          <Button
            size="sm"
            flex="1"
            fontSize="xs"
            bg={platform === "tiktok" ? "#E1306C" : "dark.bgAlt"}
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
            flex="1"
            fontSize="xs"
            bg={platform === "instagram" ? "#E1306C" : "dark.bgAlt"}
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

        {/* Video List */}
        <List spacing={2} w="full">
          {videos.map((video, index) => (
            <VideoItem
              key={index}
              name={video.name}
              url={video.url}
              emoji={video.emoji}
              platform={platform}
            />
          ))}
        </List>
      </VStack>
    </Box>
  );
}
