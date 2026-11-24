"use client";

import { HStack, IconButton, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import SpeciesThumbnail from "./SpeciesThumbnail";
import { useArmoniaLang } from "./useArmoniaLang";

// Las especies que se están comparando: foto, cantidad y nombre, cada una con su botón para
// quitarla. entries: [{ species, qty }]
export default function SpeciesPills({ entries, onRemove, ...props }) {
  const { copy } = useArmoniaLang();
  const t = copy.ui.result;

  return (
    <Wrap as="ul" spacing={2} listStyleType="none" aria-label={t.comparing} {...props}>
      {entries.map(({ species, qty }) => (
        <WrapItem as="li" key={species.id}>
          {/* En el celular van más compactas para que quepan dos por línea */}
          <HStack
            spacing={{ base: 1, md: 2 }}
            bg="dark.bgAlt"
            border="1px"
            borderColor="dark.border"
            rounded="full"
            p={{ base: 0.5, md: 1 }}
          >
            <SpeciesThumbnail
              species={species}
              w={{ base: "24px", md: "32px" }}
              h={{ base: "24px", md: "32px" }}
              rounded="full"
            />
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="600" color="white">
              {qty > 1 && `${qty} × `}
              {species.name}
            </Text>
            <IconButton
              icon={<CloseIcon boxSize={2} />}
              aria-label={t.remove(species.name)}
              onClick={() => onRemove(species.id)}
              size="xs"
              minW={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              // Se ve pequeño para que quepan dos píldoras por línea, pero se toca en 32 px
              position="relative"
              _after={{ content: '""', position: "absolute", inset: { base: "-6px", md: "-4px" } }}
              isRound
              variant="ghost"
              color="dark.textSecondary"
            />
          </HStack>
        </WrapItem>
      ))}
    </Wrap>
  );
}
