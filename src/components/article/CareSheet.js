"use client";

import { Box, SimpleGrid, HStack, VStack, Text, Icon, Heading } from "@chakra-ui/react";
import {
  FaRulerCombined,
  FaThermometerHalf,
  FaTint,
  FaFlask,
  FaFish,
  FaHeartbeat,
  FaFilter,
  FaSyncAlt,
  FaLayerGroup,
  FaWater,
} from "react-icons/fa";

const ICONS = {
  volume: FaRulerCombined,
  temp: FaThermometerHalf,
  ph: FaTint,
  hardness: FaFlask,
  food: FaFish,
  lifespan: FaHeartbeat,
  filter: FaFilter,
  water: FaSyncAlt,
  substrate: FaLayerGroup,
};

// Ficha rápida de cuidados, al estilo de las fichas de especie
export default function CareSheet({ careSheet, level }) {
  if (!careSheet?.items?.length) return null;

  return (
    <Box
      as="aside"
      aria-label="Ficha rápida de cuidados"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      overflow="hidden"
    >
      <HStack
        justify="space-between"
        px={{ base: 4, md: 6 }}
        py={4}
        borderBottom="1px"
        borderColor="dark.border"
        bg="dark.surfaceRaised"
        flexWrap="wrap"
        gap={2}
      >
        <HStack spacing={3}>
          <Icon as={FaWater} color="accent.cyan" boxSize={5} />
          <VStack align="start" spacing={0}>
            <Heading as="h2" fontSize="lg" color="white">
              Ficha rápida
            </Heading>
            {careSheet.species && (
              <Text fontSize="sm" color="dark.textSecondary" fontStyle="italic">
                {careSheet.species}
              </Text>
            )}
          </VStack>
        </HStack>
        {level && (
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color={level === "Avanzado" ? "accent.sand" : "accent.cyan"}
          >
            Nivel: {level}
          </Text>
        )}
      </HStack>

      <SimpleGrid as="dl" columns={{ base: 2, md: 3 }} spacing={0}>
        {careSheet.items.map(item => (
          // Dentro de <dl> cada grupo solo puede tener <dt> y <dd>: el ícono va dentro del <dt>
          <Box
            key={item.label}
            position="relative"
            py={{ base: 4, md: 5 }}
            pr={{ base: 4, md: 5 }}
            pl={{ base: 10, md: 12 }}
            borderRight="1px"
            borderBottom="1px"
            borderColor="dark.border"
            // Los bordes del borde exterior quedan ocultos por overflow="hidden"
            mr="-1px"
            mb="-1px"
          >
            <Text
              as="dt"
              fontSize="xs"
              color="dark.textMuted"
              textTransform="uppercase"
              letterSpacing="0.06em"
            >
              <Icon
                as={ICONS[item.key] || FaTint}
                aria-hidden="true"
                color="accent.cyan"
                boxSize={4}
                position="absolute"
                left={{ base: 4, md: 5 }}
                top={{ base: 5, md: 6 }}
              />
              {item.label}
            </Text>
            <Text as="dd" fontSize={{ base: "sm", md: "md" }} fontWeight="600" color="white">
              {item.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
