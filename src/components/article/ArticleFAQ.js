"use client";

import { Box, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// Preguntas frecuentes con <details>: el texto queda en el HTML (indexable) y es accesible
export default function ArticleFAQ({ faq }) {
  if (!faq?.length) return null;

  return (
    <Box as="section" aria-labelledby="preguntas-frecuentes">
      <Heading
        as="h2"
        id="preguntas-frecuentes"
        fontSize={{ base: "2xl", md: "3xl" }}
        color="white"
        mb={5}
      >
        Preguntas frecuentes
      </Heading>
      <VStack align="stretch" spacing={3}>
        {faq.map(item => (
          <Box
            as="details"
            key={item.q}
            bg="dark.surface"
            border="1px"
            borderColor="dark.border"
            rounded="lg"
            sx={{
              "&[open] .faq-chevron": { transform: "rotate(180deg)" },
              "&[open]": { borderColor: "accent.cyan" },
              "& summary::-webkit-details-marker": { display: "none" },
            }}
          >
            <Box
              as="summary"
              listStyleType="none"
              cursor="pointer"
              px={5}
              py={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={4}
              fontWeight="600"
              color="white"
              _hover={{ color: "accent.cyan" }}
            >
              {item.q}
              <Icon
                as={ChevronDownIcon}
                className="faq-chevron"
                boxSize={5}
                transition="transform 0.2s"
              />
            </Box>
            <Text px={5} pb={5} color="dark.textSecondary" lineHeight="tall">
              {item.a}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
