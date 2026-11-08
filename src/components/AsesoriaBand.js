"use client";

import { Box, Grid, Heading, Text, VStack, HStack, Icon, Button } from "@chakra-ui/react";
import { FaVideo, FaClipboardList, FaComments } from "react-icons/fa";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";
import { asesoria } from "@/lib/siteConfig";

const FEATURES = [
  { icon: FaVideo, text: `Sesión virtual de ${asesoria.durationShort}` },
  { icon: FaClipboardList, text: "Plan de acción personalizado" },
  { icon: FaComments, text: `Seguimiento durante ${asesoria.followUpDays} días` },
];

// Franja de llamada a la acción para las asesorías personalizadas
export default function AsesoriaBand({ trackingId = "asesoria_band" }) {
  return (
    <Box
      as="section"
      aria-labelledby={`${trackingId}-title`}
      rounded="2xl"
      border="1px"
      borderColor="dark.border"
      bgGradient="linear(to-br, dark.surfaceRaised, dark.bgAlt)"
      p={{ base: 6, md: 12 }}
      position="relative"
      overflow="hidden"
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }}
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
            Asesorías personalizadas
          </Text>
          <Heading
            as="h2"
            id={`${trackingId}-title`}
            fontSize={{ base: "2xl", md: "4xl" }}
            color="white"
            lineHeight="1.15"
            mb={4}
          >
            ¿Tu acuario tiene un problema que no has podido resolver?
          </Heading>
          <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} maxW="52ch">
            Algas que vuelven, plantas que no crecen, parámetros inestables o un montaje desde cero:
            revisamos tu caso juntos y sales con un plan claro.
          </Text>
        </Box>

        <VStack
          align="stretch"
          spacing={5}
          bg="dark.bg"
          border="1px"
          borderColor="dark.border"
          rounded="xl"
          p={{ base: 5, md: 7 }}
        >
          <VStack align="stretch" spacing={3}>
            {FEATURES.map(f => (
              <HStack key={f.text} spacing={3}>
                <Icon as={f.icon} color="accent.cyan" boxSize={4} />
                <Text color="dark.text">{f.text}</Text>
              </HStack>
            ))}
          </VStack>
          <Box borderTop="1px" borderColor="dark.border" pt={4}>
            <Text fontFamily="heading" fontSize="3xl" fontWeight="600" color="white">
              {asesoria.price}
            </Text>
            <Text fontSize="sm" color="dark.textMuted">
              por sesión
            </Text>
          </Box>
          <Button
            as={NextLink}
            href="/asesoria"
            size="lg"
            onClick={() => trackCtaClick(trackingId)}
          >
            Conocer más
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
}
