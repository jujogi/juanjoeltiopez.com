"use client";

import { AspectRatio, Box, Flex, Icon } from "@chakra-ui/react";
import { GiShrimp, GiSnail, GiTropicalFish } from "react-icons/gi";
import Image from "next/image";
import { speciesPhotos } from "@/lib/speciesPhotos";

const TYPE_ICONS = { fish: GiTropicalFish, shrimp: GiShrimp, snail: GiSnail };

// La foto de la especie en las tarjetas de resultados, a todo el ancho de su mosaico, con la
// cantidad en una esquina ("× 10"). ratio: su proporción. Sin foto, un ícono de pez, gamba o
// caracol. La foto es decorativa (alt vacío): el nombre va escrito debajo.
export default function SpeciesPhoto({ species, qty, ratio = 4 / 3 }) {
  const photo = speciesPhotos[species.id];

  return (
    <AspectRatio ratio={ratio} rounded="lg" overflow="hidden" bg="dark.bgAlt">
      <Box>
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Flex w="full" h="full" align="center" justify="center">
            <Icon
              as={TYPE_ICONS[species.type] || GiTropicalFish}
              aria-hidden="true"
              color="accent.cyan"
              boxSize={10}
            />
          </Flex>
        )}
        <Box
          position="absolute"
          top={2}
          right={2}
          px={2.5}
          py={0.5}
          rounded="full"
          bg="water.950"
          color="white"
          fontSize="sm"
          fontWeight="700"
        >
          × {qty}
        </Box>
      </Box>
    </AspectRatio>
  );
}
