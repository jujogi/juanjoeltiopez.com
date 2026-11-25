"use client";

import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";
import { getSpeciesById } from "@/lib/speciesData";
import { ELEGIR_PATH, elegir, elegirInvite } from "@/lib/elegirData";
import SpeciesThumbnail from "@/components/compatibilidad/SpeciesThumbnail";

// Invitación a "Ayúdame a elegir" desde la home, los artículos y Armonía Acuática. Misma forma
// que ArmoniaBand: texto a la izquierda, fotos y botón a la derecha. Siempre en español.
// trackingId: el nombre del botón en Analytics y la base del id del título
export default function ElegirBand({ trackingId }) {
  return (
    <Box
      as="aside"
      aria-labelledby={`${trackingId}-title`}
      lang="es"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      p={{ base: 5, md: 7 }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 5, md: 8 }} align="start">
        <Box flex="1">
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.1em"
            color="accent.cyan"
            mb={2}
          >
            {elegir.name}
          </Text>
          <Heading
            as="h2"
            id={`${trackingId}-title`}
            fontSize={{ base: "xl", md: "2xl" }}
            color="white"
            lineHeight="1.2"
            mb={3}
          >
            {elegirInvite.title}
          </Heading>
          <Text color="dark.textSecondary" lineHeight="1.6">
            {elegirInvite.text}
          </Text>
          <Text fontSize="xs" color="dark.textMuted" mt={3}>
            Fotos de Wikimedia Commons: los créditos están en la herramienta.
          </Text>
        </Box>
        <Box flexShrink={0}>
          <HStack spacing={-2} mb={4} aria-hidden="true">
            {elegirInvite.ids.map(id => (
              <Box key={id} border="2px" borderColor="dark.surface" rounded="full">
                <SpeciesThumbnail species={getSpeciesById(id)} w="44px" h="44px" rounded="full" />
              </Box>
            ))}
          </HStack>
          <Button
            as={NextLink}
            href={ELEGIR_PATH}
            rightIcon={<ArrowForwardIcon />}
            onClick={() => trackCtaClick(trackingId)}
            whiteSpace="normal"
            h="auto"
            py={3}
          >
            {elegirInvite.cta}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
