"use client";

import { Box, Heading, Text, Button, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaVideo, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";

export default function AsesoriaWidget() {
  const handleConocerMasClick = () => {
    trackCtaClick("conocer_mas_asesoria");
  };

  return (
    <Box position="relative" w="full">
      <Box
        bg="dark.surface"
        rounded="lg"
        p={6}
        border="2px"
        borderColor="accent.cyan"
        position="relative"
        w="full"
      >
        <VStack align="start" spacing={4}>
          <Box>
            <Heading size="md" color="white" mb={2}>
              ¿Necesitas ayuda personalizada?
            </Heading>
            <Text color="dark.textSecondary" fontSize="sm" lineHeight="tall">
              Agenda una sesión 1 a 1 para resolver los problemas específicos de tu acuario
            </Text>
          </Box>

          {/* Features */}
          <VStack align="start" spacing={2} w="full">
            <HStack spacing={2}>
              <Icon as={FaVideo} color="accent.cyan" boxSize={4} />
              <Text color="dark.text" fontSize="sm">
                Sesión virtual de 60-80 min
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="accent.cyan" boxSize={4} />
              <Text color="dark.text" fontSize="sm">
                Plan de acción personalizado
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCheckCircle} color="accent.cyan" boxSize={4} />
              <Text color="dark.text" fontSize="sm">
                Seguimiento durante 7 días
              </Text>
            </HStack>
          </VStack>

          {/* Precio */}
          <Box w="full" textAlign="center" py={3} borderTop="1px" borderColor="dark.border">
            <Heading size="lg" color="accent.cyan" mb={1}>
              $130.000 COP
            </Heading>
            <Text color="dark.textSecondary" fontSize="xs">
              por sesión
            </Text>
          </Box>

          {/* CTA Button */}
          <Button
            as={NextLink}
            href="/asesoria"
            w="full"
            bg="accent.cyan"
            color="white"
            _hover={{ bg: "accent.cyanHover", transform: "translateY(-2px)" }}
            transition="all 0.3s"
            size="md"
            onClick={handleConocerMasClick}
          >
            Conocer más
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
