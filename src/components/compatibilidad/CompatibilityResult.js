"use client";

import { Box, Flex, HStack, Heading, Text, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const LEVELS = {
  ok: { icon: FaCheckCircle, color: "accent.cyan", title: "Sí, pueden vivir juntas" },
  caution: {
    icon: FaExclamationTriangle,
    color: "accent.sand",
    title: "Pueden vivir juntas, pero con cuidado",
  },
  bad: { icon: FaTimesCircle, color: "red.300", title: "No te lo recomendamos" },
};

const SHARED_LABELS = [
  { key: "temp", label: "Temperatura" },
  { key: "ph", label: "pH" },
  { key: "gh", label: "GH" },
];

// Veredicto con sus razones. result viene de checkCompatibility()
export default function CompatibilityResult({ result, speciesCount }) {
  const verdict = LEVELS[result.level];
  const isSingle = speciesCount === 1;
  const title =
    isSingle && result.level === "ok" ? "Agrega otra especie para compararlas" : verdict.title;

  const tiles = [
    ...SHARED_LABELS.map(({ key, label }) => ({
      label,
      value: result.shared[key] || "No coinciden",
      isMissing: !result.shared[key],
    })),
    { label: "Acuario mínimo", value: `${result.minLiters} L` },
  ];

  return (
    <Box
      role="status"
      aria-live="polite"
      bg="dark.surface"
      border="1px"
      borderColor={verdict.color}
      rounded="xl"
      overflow="hidden"
    >
      <Flex
        align="center"
        gap={3}
        px={{ base: 4, md: 6 }}
        py={4}
        bg="dark.surfaceRaised"
        borderBottom="1px"
        borderColor="dark.border"
      >
        <Icon as={verdict.icon} aria-hidden="true" color={verdict.color} boxSize={6} />
        <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} color="white">
          {title}
        </Heading>
      </Flex>

      <Box px={{ base: 4, md: 6 }} py={5}>
        <Text fontSize="sm" color="dark.textSecondary" mb={3}>
          {isSingle ? "Lo que necesita:" : "El agua que les sirve a todas:"}
        </Text>
        <SimpleGrid as="dl" columns={{ base: 2, md: 4 }} spacing={3}>
          {tiles.map(tile => (
            <Box key={tile.label} bg="dark.bgAlt" rounded="lg" px={3} py={3}>
              <Text
                as="dt"
                fontSize="xs"
                color="dark.textMuted"
                textTransform="uppercase"
                letterSpacing="0.06em"
              >
                {tile.label}
              </Text>
              <Text
                as="dd"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="700"
                color={tile.isMissing ? "red.300" : "white"}
              >
                {tile.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <VStack as="ul" align="stretch" spacing={4} mt={6} listStyleType="none">
          {result.checks.map(check => (
            <HStack as="li" key={check.title} align="start" spacing={3}>
              <Icon
                as={LEVELS[check.level].icon}
                aria-hidden="true"
                color={LEVELS[check.level].color}
                boxSize={4}
                mt={1}
                flexShrink={0}
              />
              <Box>
                <Text fontWeight="600" color="white">
                  {check.title}
                </Text>
                <Text fontSize="sm" color="dark.textSecondary" lineHeight="1.6">
                  {check.detail}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
