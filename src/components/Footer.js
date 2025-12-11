"use client";

import { Box, Container, Stack, Text, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="dark.bgAlt"
      color="dark.textSecondary"
      borderTop="1px"
      borderColor="dark.border"
      mt={20}
    >
      <Container
        as={Stack}
        maxW={"container.xl"}
        py={8}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text fontSize="sm">© 2025 JuanJo El Tío Pez. Todos los derechos reservados</Text>
        <Stack direction={"row"} spacing={6}>
          <Link href={"#"} fontSize="sm" _hover={{ color: "accent.cyan" }}>
            Privacidad
          </Link>
          <Link href={"#"} fontSize="sm" _hover={{ color: "accent.cyan" }}>
            Términos
          </Link>
          <Link href={"#"} fontSize="sm" _hover={{ color: "accent.cyan" }}>
            Contacto
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
