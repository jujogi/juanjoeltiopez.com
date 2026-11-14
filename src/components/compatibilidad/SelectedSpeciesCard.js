"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  IconButton,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { formatRange } from "@/lib/speciesData";
import { speciesPhotos } from "@/lib/speciesPhotos";
import { MAX_QTY } from "./useTankSelection";
import SpeciesThumbnail from "./SpeciesThumbnail";

const facts = s => [
  { label: "Temperatura", value: formatRange(s.temp, " °C") },
  { label: "pH", value: formatRange(s.ph, "", 1) },
  { label: "GH", value: formatRange(s.gh) },
  { label: "Acuario mínimo", value: `${s.minLiters} L` },
];

// Crédito de la foto: las licencias Creative Commons exigen autor, licencia y enlace a la fuente
const PhotoCredit = ({ photo }) => (
  <Text fontSize="xs" color="dark.textMuted" mt={4}>
    Foto:{" "}
    {photo.source ? (
      <Link href={photo.source} isExternal color="dark.textMuted" textDecoration="underline">
        {photo.author || "Wikimedia Commons"}
      </Link>
    ) : (
      photo.author
    )}
    {photo.license && (
      <>
        {" · "}
        {photo.licenseUrl ? (
          <Link
            href={photo.licenseUrl}
            isExternal
            color="dark.textMuted"
            textDecoration="underline"
          >
            {photo.license}
          </Link>
        ) : (
          photo.license
        )}
      </>
    )}
    {photo.source && photo.author && " · vía Wikimedia Commons"}
  </Text>
);

const StepButton = props => (
  <IconButton size="sm" variant="ghost" border="1px" borderColor="dark.border" {...props} />
);

// Especie elegida, en formato compacto: foto, nombre y cantidad. La ficha completa
// (intro, parámetros y crédito de la foto) se abre con "Ver ficha".
export default function SelectedSpeciesCard({ species, qty, onQtyChange, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const photo = speciesPhotos[species.id];
  const detailsId = `ficha-${species.id}`;

  return (
    <Box
      as="article"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      overflow="hidden"
    >
      <Flex align="center" gap={3} p={3}>
        <SpeciesThumbnail species={species} w="88px" h="64px" />
        <Box flex="1" minW={0}>
          <Heading as="h4" fontFamily="body" fontSize="md" color="white" noOfLines={1}>
            {species.name}
          </Heading>
          <Text fontSize="sm" color="dark.textSecondary" fontStyle="italic" noOfLines={1}>
            {species.scientific}
          </Text>
        </Box>
        <IconButton
          icon={<CloseIcon boxSize={2.5} />}
          aria-label={`Quitar ${species.name}`}
          onClick={onRemove}
          size="sm"
          variant="ghost"
          color="dark.textSecondary"
          alignSelf="start"
        />
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        gap={3}
        px={3}
        py={2}
        borderTop="1px"
        borderColor="dark.border"
      >
        <Button
          size="sm"
          variant="link"
          color="accent.cyan"
          fontWeight="600"
          rightIcon={
            <ChevronDownIcon
              boxSize={5}
              transform={isOpen ? "rotate(180deg)" : undefined}
              transition="transform 0.2s ease"
            />
          }
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={() => setIsOpen(open => !open)}
        >
          {isOpen ? "Ocultar ficha" : "Ver ficha"}
        </Button>
        <HStack spacing={2}>
          {species.minGroup > 1 && (
            <Text fontSize="xs" color="dark.textMuted" mr={1}>
              Mínimo {species.minGroup}
            </Text>
          )}
          <StepButton
            icon={<MinusIcon boxSize={2.5} />}
            aria-label={`Menos ${species.name}`}
            onClick={() => onQtyChange(qty - 1)}
            isDisabled={qty <= 1}
          />
          <Text minW={7} textAlign="center" fontWeight="700" color="white" aria-live="polite">
            {qty}
          </Text>
          <StepButton
            icon={<AddIcon boxSize={2.5} />}
            aria-label={`Más ${species.name}`}
            onClick={() => onQtyChange(qty + 1)}
            isDisabled={qty >= MAX_QTY}
          />
        </HStack>
      </Flex>

      <Box
        id={detailsId}
        hidden={!isOpen}
        px={{ base: 3, md: 4 }}
        py={4}
        borderTop="1px"
        borderColor="dark.border"
        bg="dark.bgAlt"
      >
        <Text color="dark.textSecondary" fontSize="sm" lineHeight="1.6">
          {species.intro}{" "}
          {species.postSlug && (
            <Link as={NextLink} href={`/blog/${species.postSlug}`} color="accent.cyan">
              Lee la guía completa
            </Link>
          )}
        </Text>
        <SimpleGrid as="dl" columns={2} spacing={3} mt={4}>
          {facts(species).map(fact => (
            <Box key={fact.label}>
              <Text
                as="dt"
                fontSize="xs"
                color="dark.textMuted"
                textTransform="uppercase"
                letterSpacing="0.06em"
              >
                {fact.label}
              </Text>
              <Text as="dd" fontSize="sm" fontWeight="600" color="white">
                {fact.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        {photo && <PhotoCredit photo={photo} />}
      </Box>
    </Box>
  );
}
