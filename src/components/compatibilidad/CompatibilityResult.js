"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  Icon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { formatNeeded, formatTank } from "@/lib/tankUnits";
import { LEVELS } from "./levels";
import SpeciesPills from "./SpeciesPills";
import { useArmoniaLang } from "./useArmoniaLang";

// Barra de ocupación: cuánto del acuario pide la selección
const StockingBar = ({ needed, liters, unit, copy }) => {
  const ratio = needed / liters;
  const neededText = formatNeeded(needed, unit, liters);
  const tankText = formatTank(liters, unit);
  const color = ratio <= 1 ? "accent.cyan" : ratio <= 1.5 ? "accent.sand" : "red.300";

  return (
    <Box mt={5}>
      <Flex justify="space-between" gap={3} fontSize="sm" mb={2} wrap="wrap">
        <Text color="dark.textSecondary">{copy.stocking}</Text>
        <Text fontWeight="600" color="white">
          {ratio <= 1
            ? copy.stockingFits(neededText, tankText)
            : copy.stockingOver(neededText, tankText)}
        </Text>
      </Flex>
      <Box aria-hidden="true" h="8px" bg="dark.bgAlt" rounded="full" overflow="hidden">
        <Box h="full" w={`${Math.min(ratio, 1) * 100}%`} bg={color} rounded="full" />
      </Box>
    </Box>
  );
};

// Veredicto con sus razones. result viene de checkCompatibility()
// unit: "l" o "gal", la unidad en que se muestran los volúmenes
// onChangeTank: lleva al paso del acuario, desde los avisos que se arreglan con más litros
export default function CompatibilityResult({ result, entries, unit, onRemove, onChangeTank }) {
  const { copy } = useArmoniaLang();
  const t = copy.ui.result;
  const verdict = LEVELS[result.level];
  const isSingle = entries.length === 1;
  const title =
    isSingle && result.level === "ok" ? t.addAnother : copy.ui.levels[result.level].title;

  const sharedLabels = [
    { key: "temp", label: t.temperature },
    { key: "ph", label: "pH" },
    { key: "gh", label: "GH" },
  ];
  const tiles = [
    ...sharedLabels.map(({ key, label }) => ({
      label,
      value: result.shared[key] || t.noMatch,
      isMissing: !result.shared[key],
    })),
    {
      label: t.minTank,
      value:
        result.neededLiters === null
          ? t.pond
          : formatNeeded(result.neededLiters, unit, result.liters),
    },
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

      <Box px={{ base: 3, md: 6 }} py={5}>
        <SpeciesPills entries={entries} onRemove={onRemove} mb={5} />
        <Text fontSize="sm" color="dark.textSecondary" mb={3}>
          {isSingle ? t.singleNeeds : t.sharedWater}
        </Text>
        <SimpleGrid as="dl" columns={{ base: 2, md: 4 }} spacing={3}>
          {tiles.map(tile => (
            <Box key={tile.label} bg="dark.bgAlt" rounded="lg" px={{ base: 2.5, md: 3 }} py={3}>
              {/* En mayúsculas, "TEMPERATURA" no cabe en el celular y se parte: ahí va normal */}
              <Text
                as="dt"
                fontSize="xs"
                color="dark.textMuted"
                textTransform={{ base: "none", md: "uppercase" }}
                letterSpacing={{ base: "0", md: "0.06em" }}
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
        {result.liters && result.neededLiters !== null && (
          <StockingBar needed={result.neededLiters} liters={result.liters} unit={unit} copy={t} />
        )}

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
                {check.aboutTank && (
                  <Button
                    size="sm"
                    variant="ghost"
                    border="1px"
                    borderColor="dark.border"
                    mt={2}
                    onClick={onChangeTank}
                  >
                    {t.changeTank(copy.ui.units[unit].name)}
                  </Button>
                )}
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
