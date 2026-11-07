"use client";

import { Flex, Icon } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

// Círculo con ícono de reproducir para los enlaces a videos
export default function PlayBadge({ size = 8 }) {
  return (
    <Flex
      w={size}
      h={size}
      flexShrink={0}
      rounded="full"
      align="center"
      justify="center"
      bg="rgba(62, 207, 158, 0.12)"
      color="accent.cyan"
    >
      <Icon as={FaPlay} boxSize={size / 3.2} ml="2px" />
    </Flex>
  );
}
