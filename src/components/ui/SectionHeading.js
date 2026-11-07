"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

// Texto pequeño en mayúsculas sobre los títulos de sección
export const Eyebrow = ({ children, ...props }) => (
  <Text
    fontSize="xs"
    fontWeight="700"
    textTransform="uppercase"
    letterSpacing="0.12em"
    color="accent.cyan"
    {...props}
  >
    {children}
  </Text>
);

// Encabezado de sección: eyebrow + H2 + acción opcional a la derecha
export const SectionHeader = ({ eyebrow, title, id, action, description }) => (
  <Flex
    justify="space-between"
    align={{ base: "start", md: "end" }}
    direction={{ base: "column", md: "row" }}
    gap={4}
    mb={{ base: 6, md: 8 }}
  >
    <Box flex="1">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h2" id={id} fontSize={{ base: "2xl", md: "4xl" }} color="white" mt={2}>
        {title}
      </Heading>
      {description && (
        <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} mt={3}>
          {description}
        </Text>
      )}
    </Box>
    {action}
  </Flex>
);
