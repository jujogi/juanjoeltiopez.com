"use client";

import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";
import { getSpeciesById } from "@/lib/speciesData";
import { compatibilidad, armoniaInvite, armoniaHref } from "@/lib/compatibilidadData";
import SpeciesThumbnail from "@/components/compatibilidad/SpeciesThumbnail";

// Invitación a usar Armonía Acuática desde un artículo.
// speciesIds: especies del artículo; si vienen, el enlace abre la herramienta con ellas ya elegidas.
export default function ArmoniaBand({ speciesIds, trackingId = "articulo_armonia" }) {
  const ids = speciesIds?.length ? speciesIds : armoniaInvite.defaultIds;

  return (
    <Box
      as="aside"
      aria-labelledby={`${trackingId}-title`}
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
            {compatibilidad.name}
          </Text>
          <Heading
            as="h2"
            id={`${trackingId}-title`}
            fontSize={{ base: "xl", md: "2xl" }}
            color="white"
            lineHeight="1.2"
            mb={3}
          >
            {armoniaInvite.title}
          </Heading>
          <Text color="dark.textSecondary" lineHeight="1.6">
            {armoniaInvite.text}
          </Text>
        </Box>
        <Box flexShrink={0}>
          <HStack spacing={-2} mb={4} aria-hidden="true">
            {ids.map(id => (
              <Box key={id} border="2px" borderColor="dark.surface" rounded="full">
                <SpeciesThumbnail species={getSpeciesById(id)} w="44px" h="44px" rounded="full" />
              </Box>
            ))}
          </HStack>
          <Button
            as={NextLink}
            href={armoniaHref(speciesIds)}
            rightIcon={<ArrowForwardIcon />}
            onClick={() => trackCtaClick(trackingId)}
            whiteSpace="normal"
            h="auto"
            py={3}
          >
            {armoniaInvite.cta}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
