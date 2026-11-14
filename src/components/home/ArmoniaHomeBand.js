"use client";

import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";
import { species, getSpeciesById } from "@/lib/speciesData";
import { checkCompatibility } from "@/lib/compatibility";
import {
  COMPATIBILIDAD_PATH,
  compatibilidad,
  armoniaHome,
  armoniaHref,
  starterCombos,
} from "@/lib/compatibilidadData";
import { LEVELS } from "@/components/compatibilidad/levels";
import SpeciesThumbnail from "@/components/compatibilidad/SpeciesThumbnail";

const TRACKING_ID = "home_armonia";

// Vista previa con un resultado real: el mismo que da la herramienta para ese ejemplo
const Preview = () => {
  const { liters, selection } = armoniaHome.example;
  const result = checkCompatibility(selection, liters);
  const verdict = LEVELS[result.level];

  return (
    <Box bg="dark.bg" border="1px" borderColor="dark.border" rounded="xl" overflow="hidden">
      <HStack
        spacing={3}
        px={5}
        py={4}
        bg="dark.surfaceRaised"
        borderBottom="1px"
        borderColor="dark.border"
      >
        <Icon as={verdict.icon} aria-hidden="true" color={verdict.color} boxSize={5} />
        <Text fontFamily="heading" fontSize="lg" fontWeight="600" color="white">
          {verdict.title}
        </Text>
      </HStack>
      <Box px={5} py={4}>
        <Wrap spacing={2} mb={4}>
          {selection.map(({ id, qty }) => {
            const item = getSpeciesById(id);
            return (
              <HStack
                key={id}
                spacing={2}
                bg="dark.bgAlt"
                border="1px"
                borderColor="dark.border"
                rounded="full"
                p={1}
                pr={3}
              >
                <SpeciesThumbnail species={item} w="32px" h="32px" rounded="full" />
                <Text fontSize="sm" fontWeight="600" color="white">
                  {qty > 1 && `${qty} × `}
                  {item.name}
                </Text>
              </HStack>
            );
          })}
        </Wrap>
        <VStack as="ul" align="stretch" spacing={2} listStyleType="none">
          {result.checks.map(check => (
            <HStack as="li" key={check.title} spacing={2} align="start">
              <Icon
                as={LEVELS[check.level].icon}
                aria-hidden="true"
                color={LEVELS[check.level].color}
                boxSize={3.5}
                mt={1}
                flexShrink={0}
              />
              <Text fontSize="sm" color="dark.text">
                {check.title}
              </Text>
            </HStack>
          ))}
        </VStack>
        <Text fontSize="xs" color="dark.textMuted" mt={4}>
          Ejemplo en un acuario de {liters} L. Fotos de Wikimedia Commons: los créditos están en{" "}
          <Link
            as={NextLink}
            href={COMPATIBILIDAD_PATH}
            color="dark.textMuted"
            textDecoration="underline"
          >
            la herramienta
          </Link>
          .
        </Text>
      </Box>
    </Box>
  );
};

// Bloque de la home que invita a usar Armonía Acuática
export default function ArmoniaHomeBand() {
  return (
    <Box
      as="section"
      aria-labelledby="armonia-home-title"
      rounded="2xl"
      border="1px"
      borderColor="dark.border"
      bgGradient="linear(to-br, dark.surfaceRaised, dark.bgAlt)"
      p={{ base: 6, md: 12 }}
    >
      <Grid
        templateColumns={{ base: "minmax(0, 1fr)", lg: "1.2fr 1fr" }}
        gap={{ base: 8, lg: 12 }}
        alignItems="center"
      >
        <Box>
          <Text
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.1em"
            color="accent.cyan"
            mb={3}
          >
            Nuevo · {compatibilidad.name}
          </Text>
          <Heading
            as="h2"
            id="armonia-home-title"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="white"
            lineHeight="1.15"
            mb={4}
          >
            {armoniaHome.title}
          </Heading>
          <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} maxW="52ch" mb={5}>
            {armoniaHome.text.replace("{count}", species.length)}
          </Text>
          <VStack align="stretch" spacing={2} mb={6}>
            {armoniaHome.features.map(feature => (
              <HStack key={feature} spacing={3} align="start">
                <Icon
                  as={FaCheckCircle}
                  aria-hidden="true"
                  color="accent.cyan"
                  boxSize={4}
                  mt={1}
                />
                <Text color="dark.text">{feature}</Text>
              </HStack>
            ))}
          </VStack>
          <Button
            as={NextLink}
            href={COMPATIBILIDAD_PATH}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => trackCtaClick(TRACKING_ID)}
            whiteSpace="normal"
            h="auto"
            py={3.5}
          >
            {armoniaHome.cta}
          </Button>
          <Text fontSize="sm" color="dark.textSecondary" mt={6} mb={2}>
            {armoniaHome.combosLabel}
          </Text>
          <Wrap spacing={2}>
            {starterCombos.map(combo => (
              <Link
                key={combo.label}
                as={NextLink}
                href={armoniaHref(combo.ids)}
                onClick={() => trackCtaClick(`${TRACKING_ID}_combo`)}
                px={4}
                py={1.5}
                rounded="full"
                fontSize="sm"
                fontWeight="600"
                border="1px"
                borderColor="dark.border"
                bg="dark.surface"
                color="dark.text"
                _hover={{ borderColor: "accent.cyan", color: "accent.cyan" }}
              >
                {combo.label}
              </Link>
            ))}
          </Wrap>
        </Box>
        <Preview />
      </Grid>
    </Box>
  );
}
