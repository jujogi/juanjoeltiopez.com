"use client";

import { Box, HStack, Heading, Text, Icon, IconButton, Link, SimpleGrid } from "@chakra-ui/react";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";
import { GiTropicalFish, GiShrimp } from "react-icons/gi";
import NextLink from "next/link";
import Image from "next/image";
import { formatRange } from "@/lib/speciesData";
import { speciesPhotos } from "@/lib/speciesPhotos";
import { MAX_QTY } from "./useTankSelection";

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

// Ficha de una especie elegida: intro, parámetros y cantidad
export default function SelectedSpeciesCard({ species, qty, onQtyChange, onRemove }) {
  const photo = speciesPhotos[species.id];

  return (
    <Box
      as="article"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      overflow="hidden"
      position="relative"
    >
      {/* Siempre en la esquina superior derecha: sobre la foto cuando la hay */}
      <IconButton
        icon={<CloseIcon boxSize={2.5} />}
        aria-label={`Quitar ${species.name}`}
        onClick={onRemove}
        size="sm"
        isRound
        position="absolute"
        top={3}
        right={3}
        zIndex={1}
        bg="blackAlpha.700"
        color="white"
        _hover={{ bg: "blackAlpha.800" }}
      />
      {photo && (
        <Box position="relative" sx={{ aspectRatio: "16 / 9" }} bg="dark.bgAlt">
          <Image
            src={photo.src}
            alt={`${species.name} (${species.scientific})`}
            fill
            sizes="(max-width: 960px) 100vw, 600px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      )}
      <Box p={{ base: 4, md: 5 }}>
        {/* Sin foto, el botón de quitar queda sobre este encabezado: se le deja espacio */}
        <HStack spacing={3} align="start" minW={0} pr={photo ? 0 : 10}>
          {!photo && (
            <Icon
              as={species.type === "shrimp" ? GiShrimp : GiTropicalFish}
              aria-hidden="true"
              color="accent.cyan"
              boxSize={7}
              mt={1}
              flexShrink={0}
            />
          )}
          <Box minW={0}>
            <Heading as="h3" fontSize="lg" color="white">
              {species.name}
            </Heading>
            <Text fontSize="sm" color="dark.textSecondary" fontStyle="italic">
              {species.scientific}
            </Text>
          </Box>
        </HStack>

        <Text color="dark.textSecondary" fontSize="sm" lineHeight="1.6" mt={3}>
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

        <HStack
          justify="space-between"
          mt={4}
          pt={4}
          borderTop="1px"
          borderColor="dark.border"
          flexWrap="wrap"
          gap={2}
        >
          <Text fontSize="sm" color="dark.textSecondary">
            ¿Cuántos?
            {species.minGroup > 1 && ` Mínimo ${species.minGroup}`}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<MinusIcon boxSize={2.5} />}
              aria-label={`Menos ${species.name}`}
              onClick={() => onQtyChange(qty - 1)}
              isDisabled={qty <= 1}
              size="sm"
              variant="ghost"
              border="1px"
              borderColor="dark.border"
            />
            <Text minW={8} textAlign="center" fontWeight="700" color="white" aria-live="polite">
              {qty}
            </Text>
            <IconButton
              icon={<AddIcon boxSize={2.5} />}
              aria-label={`Más ${species.name}`}
              onClick={() => onQtyChange(qty + 1)}
              isDisabled={qty >= MAX_QTY}
              size="sm"
              variant="ghost"
              border="1px"
              borderColor="dark.border"
            />
          </HStack>
        </HStack>
        {photo && <PhotoCredit photo={photo} />}
      </Box>
    </Box>
  );
}
