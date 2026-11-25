"use client";

import { Box, Link, Text } from "@chakra-ui/react";
import { speciesPhotos } from "@/lib/speciesPhotos";

const CreditLink = ({ href, children }) =>
  href ? (
    <Link href={href} isExternal color="dark.textMuted" textDecoration="underline">
      {children}
    </Link>
  ) : (
    children
  );

// Créditos de las fotos de las propuestas que se ven: las licencias Creative Commons exigen
// autor, licencia y enlace a la fuente (igual que la ficha de Armonía Acuática). Va plegado.
// species: las especies de las tarjetas, en el idioma de la herramienta
export default function PhotoCredits({ species, copy }) {
  const credited = species.filter(s => speciesPhotos[s.id]);
  if (!credited.length) return null;

  return (
    <Box as="details" mt={6} fontSize="xs" color="dark.textMuted">
      <Box as="summary" cursor="pointer" w="fit-content">
        {copy.title}
      </Box>
      <Box as="ul" listStyleType="none" mt={2}>
        {credited.map(s => {
          const photo = speciesPhotos[s.id];
          return (
            <Text as="li" key={s.id} lineHeight="1.7">
              {s.name}:{" "}
              <CreditLink href={photo.source}>{photo.author || "Wikimedia Commons"}</CreditLink>
              {photo.license && (
                <>
                  {" · "}
                  <CreditLink href={photo.licenseUrl}>{photo.license}</CreditLink>
                </>
              )}
              {photo.source && photo.author && copy.viaCommons}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
