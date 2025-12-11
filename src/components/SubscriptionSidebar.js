"use client";

import { Box, Heading, Text, VStack, Input, Button, Stack, Avatar, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SubscriptionSidebar() {
  return (
    <VStack spacing={8} align="stretch">
      {/* Subscription Box */}
      <Box bg="dark.surface" p={6} rounded="lg" border="1px" borderColor="dark.border">
        <Heading size="sm" mb={2} color="white">
          JuanJo El Tío Pez
        </Heading>
        <Text fontSize="sm" color="dark.textSecondary" mb={4}>
          Boletín semanal con consejos, guías y secretos sobre el cuidado de acuarios. Aprende todo
          sobre peces, plantas y mantenimiento.
        </Text>
        <Stack spacing={3}>
          <Input
            placeholder="Escribe tu email..."
            bg="dark.bg"
            border="1px"
            borderColor="dark.border"
            _placeholder={{ color: "dark.textSecondary" }}
            _hover={{ borderColor: "dark.border" }}
            _focus={{ borderColor: "accent.cyan", boxShadow: "none" }}
          />
          <Button
            bg="accent.cyan"
            color="white"
            _hover={{ bg: "accent.cyanHover" }}
            w="full"
            disabled
          >
            Próximamente
          </Button>
        </Stack>
      </Box>

      {/* Recommendations */}
      <Box>
        <HStack justify="space-between" mb={4}>
          <Heading size="sm" color="white">
            Recomendaciones
          </Heading>
          <Text
            as={NextLink}
            href="/blog"
            fontSize="xs"
            color="dark.textSecondary"
            _hover={{ color: "accent.cyan", cursor: "pointer" }}
          >
            VER TODO
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch">
          <HStack spacing={3}>
            <Avatar size="sm" name="Gambarios" bg="orange" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color="white">
                Gambarios
              </Text>
              <Text fontSize="xs" color="dark.textSecondary">
                Tutoriales
              </Text>
            </Box>
          </HStack>
          <HStack spacing={3}>
            <Avatar size="sm" name="Acuarios Plantados" bg="accent.cyan" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color="white">
                Acuarios Plantados
              </Text>
              <Text fontSize="xs" color="dark.textSecondary">
                Guía Completa
              </Text>
            </Box>
          </HStack>
          <HStack spacing={3}>
            <Avatar size="sm" name="Cuidado de Bettas" bg="accent.blue" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color="white">
                Cuidado de Bettas
              </Text>
              <Text fontSize="xs" color="dark.textSecondary">
                Todo sobre Bettas
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
