"use client";

import { Box, Container, Stack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      bg="dark.bgAlt"
      color="dark.textSecondary"
      borderTop="1px"
      borderColor="dark.border"
      mt={20}
    >
      <Container maxW="container.xl" py={8}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize="sm">
            © 2025 JuanJo El Tío Pez. Todos los derechos reservados
          </Text>
          <Stack direction="row" spacing={6}>
            <Link as={NextLink} href="/terminos" fontSize="sm" _hover={{ color: "accent.cyan" }}>
              Términos y condiciones
            </Link>
            <Link
              href="https://ig.me/m/juanjoeltiopez"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              _hover={{ color: "accent.cyan" }}
            >
              Contacto
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
