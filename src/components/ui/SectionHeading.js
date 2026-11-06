"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

// Texto pequeño en mayúsculas sobre los títulos de sección
export const Eyebrow = ({ children, color = "accent.cyan", ...props }) => (
  <Text
    fontSize="xs"
    fontWeight="700"
    textTransform="uppercase"
    letterSpacing="0.12em"
    color={color}
    {...props}
  >
    {children}
  </Text>
);

// Encabezado de sección: eyebrow + H2 + acción opcional a la derecha
export const SectionHeader = ({ eyebrow, title, id, action, description, align = "start" }) => (
  <Flex
    justify="space-between"
    align={{ base: "start", md: "end" }}
    direction={{ base: "column", md: "row" }}
    gap={4}
    mb={{ base: 6, md: 8 }}
    textAlign={align === "center" ? "center" : undefined}
  >
    <Box
      flex="1"
      mx={align === "center" ? "auto" : undefined}
      maxW={align === "center" ? "2xl" : undefined}
    >
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
