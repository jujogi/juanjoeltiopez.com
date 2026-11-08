"use client";

import { Box, Text } from "@chakra-ui/react";

// Respuesta directa al inicio del artículo, para quien busca el dato rápido
export default function QuickAnswer({ summary }) {
  if (!summary) return null;

  return (
    <Box
      as="section"
      aria-label="En pocas palabras"
      borderLeft="4px"
      borderColor="accent.cyan"
      bg="dark.surface"
      rounded="md"
      px={{ base: 5, md: 6 }}
      py={5}
    >
      <Text
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="accent.cyan"
        mb={2}
      >
        En pocas palabras
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="dark.text" lineHeight="1.7">
        {summary}
      </Text>
    </Box>
  );
}
