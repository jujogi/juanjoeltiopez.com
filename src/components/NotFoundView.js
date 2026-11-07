"use client";

import { Container, Heading, Text, Button, Stack, Icon } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GiFishbone } from "react-icons/gi";
import NextLink from "next/link";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFoundView() {
  return (
    <Container maxW="container.md" py={{ base: 20, md: 32 }} textAlign="center">
      <Icon as={GiFishbone} boxSize={{ base: 16, md: 20 }} color="accent.cyan" />
      <Eyebrow mt={6}>Error 404</Eyebrow>
      <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} color="white" mt={3}>
        Esta página no existe
      </Heading>
      <Text
        color="dark.textSecondary"
        fontSize={{ base: "md", md: "lg" }}
        mt={4}
        maxW="lg"
        mx="auto"
      >
        Puede que el enlace esté mal escrito o que la página ya no esté. Pero tranqui, aquí tienes
        las guías para seguir aprendiendo.
      </Text>
      <Stack direction="row" wrap="wrap" spacing={3} justify="center" mt={8}>
        <Button as={NextLink} href="/blog" size="lg" rightIcon={<ArrowForwardIcon />}>
          Ver las guías
        </Button>
        <Button
          as={NextLink}
          href="/"
          size="lg"
          variant="outline"
          borderColor="dark.border"
          color="white"
          _hover={{ color: "accent.cyan" }}
        >
          Volver al inicio
        </Button>
      </Stack>
    </Container>
  );
}
