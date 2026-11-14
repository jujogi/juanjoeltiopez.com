"use client";

import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  Icon,
  IconButton,
  SimpleGrid,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { LEVELS } from "./levels";
import SpeciesThumbnail from "./SpeciesThumbnail";

const SHARED_LABELS = [
  { key: "temp", label: "Temperatura" },
  { key: "ph", label: "pH" },
  { key: "gh", label: "GH" },
];

// Especie que se está comparando: foto, cantidad y nombre, con su botón para quitarla
const SpeciesPill = ({ species, qty, onRemove }) => (
  <HStack spacing={2} bg="dark.bgAlt" border="1px" borderColor="dark.border" rounded="full" p={1}>
    <SpeciesThumbnail species={species} w="32px" h="32px" rounded="full" />
    <Text fontSize="sm" fontWeight="600" color="white">
      {qty > 1 && `${qty} × `}
      {species.name}
    </Text>
    <IconButton
      icon={<CloseIcon boxSize={2} />}
      aria-label={`Quitar ${species.name}`}
      onClick={onRemove}
      size="xs"
      isRound
      variant="ghost"
      color="dark.textSecondary"
    />
  </HStack>
);

// Barra de ocupación: cuánto del acuario pide la selección
const StockingBar = ({ needed, liters }) => {
  const ratio = needed / liters;
  const color = ratio <= 1 ? "accent.cyan" : ratio <= 1.5 ? "accent.sand" : "red.300";

  return (
    <Box mt={5}>
      <Flex justify="space-between" gap={3} fontSize="sm" mb={2} wrap="wrap">
        <Text color="dark.textSecondary">Ocupación del acuario</Text>
        <Text fontWeight="600" color="white">
          {ratio <= 1
            ? `Pide mínimo ${needed} L de tus ${liters} L`
            : `Pide ${needed} L y tienes ${liters} L`}
        </Text>
      </Flex>
      <Box aria-hidden="true" h="8px" bg="dark.bgAlt" rounded="full" overflow="hidden">
        <Box h="full" w={`${Math.min(ratio, 1) * 100}%`} bg={color} rounded="full" />
      </Box>
    </Box>
  );
};

// Veredicto con sus razones. result viene de checkCompatibility()
export default function CompatibilityResult({ result, entries, onRemove }) {
  const verdict = LEVELS[result.level];
  const isSingle = entries.length === 1;
  const title =
    isSingle && result.level === "ok" ? "Agrega otra especie para compararlas" : verdict.title;

  const tiles = [
    ...SHARED_LABELS.map(({ key, label }) => ({
      label,
      value: result.shared[key] || "No coinciden",
      isMissing: !result.shared[key],
    })),
    { label: "Acuario mínimo", value: `${result.neededLiters} L` },
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
        <Wrap
          as="ul"
          spacing={2}
          mb={5}
          listStyleType="none"
          aria-label="Especies que estás comparando"
        >
          {entries.map(({ species, qty }) => (
            <WrapItem as="li" key={species.id}>
              <SpeciesPill species={species} qty={qty} onRemove={() => onRemove(species.id)} />
            </WrapItem>
          ))}
        </Wrap>
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
        {result.liters && <StockingBar needed={result.neededLiters} liters={result.liters} />}

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
