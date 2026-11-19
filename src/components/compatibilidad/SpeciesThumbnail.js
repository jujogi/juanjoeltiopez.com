"use client";

import { Flex, Icon } from "@chakra-ui/react";
import { GiTropicalFish, GiShrimp, GiSnail } from "react-icons/gi";

const TYPE_ICONS = { fish: GiTropicalFish, shrimp: GiShrimp, snail: GiSnail };
import Image from "next/image";
import { speciesPhotos } from "@/lib/speciesPhotos";

// Foto pequeña de la especie; si no tiene foto, un ícono de pez o gamba.
// Es decorativa (alt vacío): el nombre de la especie siempre va escrito al lado.
export default function SpeciesThumbnail({ species, w = "64px", h = "44px", rounded = "md" }) {
  const photo = speciesPhotos[species.id];

  return (
    <Flex
      position="relative"
      w={w}
      h={h}
      flexShrink={0}
      rounded={rounded}
      overflow="hidden"
      bg="dark.bgAlt"
      align="center"
      justify="center"
    >
      {photo ? (
        <Image src={photo.src} alt="" fill sizes="128px" style={{ objectFit: "cover" }} />
      ) : (
        <Icon
          as={TYPE_ICONS[species.type] || GiTropicalFish}
          aria-hidden="true"
          color="accent.cyan"
          boxSize={6}
        />
      )}
    </Flex>
  );
}
