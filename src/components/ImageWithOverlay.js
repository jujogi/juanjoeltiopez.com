"use client";

import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function ImageWithOverlay({ imageSrc, description, alt }) {
  return (
    <Box overflow="hidden" rounded="lg" border="1px" borderColor="dark.border" w="full">
      <Box position="relative" h={{ base: "300px", md: "400px" }} w="full">
        <Image
          src={imageSrc}
          alt={alt || "Imagen inspiracional"}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          style={{ objectFit: "cover" }}
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7), transparent)"
          p={6}
        >
          <Text
            color="white"
            fontSize={{ base: "lg" }}
            fontWeight="500"
            lineHeight="6"
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
