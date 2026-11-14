"use client";

import { Box, Container, Heading, HStack, Icon, Text, SimpleGrid } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import AsesoriaBand from "@/components/AsesoriaBand";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { compatibilidad, checksExplained, faq } from "@/lib/compatibilidadData";
import CompatibilityTool from "./CompatibilityTool";

const HowItWorks = () => (
  <Box as="section" aria-labelledby="como-funciona">
    <SectionHeader eyebrow="¿Cómo funciona?" id="como-funciona" title="Lo que revisamos por ti" />
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {checksExplained.map(item => (
        <Box
          key={item.title}
          bg="dark.surface"
          border="1px"
          borderColor="dark.border"
          rounded="xl"
          p={{ base: 4, md: 6 }}
        >
          <Heading as="h3" fontSize="lg" color="white" mb={2}>
            {item.title}
          </Heading>
          <Text color="dark.textSecondary" lineHeight="1.6">
            {item.text}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
    <HStack
      role="note"
      align="start"
      spacing={3}
      mt={6}
      p={{ base: 4, md: 5 }}
      bg="dark.surface"
      border="1px"
      borderColor="accent.sand"
      rounded="xl"
    >
      <Icon
        as={FaExclamationTriangle}
        aria-hidden="true"
        color="accent.sand"
        boxSize={5}
        mt={0.5}
      />
      <Box>
        <Text fontWeight="700" color="white" mb={1}>
          Es solo una referencia
        </Text>
        <Text color="dark.textSecondary" lineHeight="1.6">
          Armamos esta herramienta con información disponible en internet y con nuestra experiencia,
          pero eso no significa que funcione en todos los casos: cada pez tiene su propio
          temperamento y cada acuario es diferente. Observa siempre a tus animales y ten un plan B
          por si hace falta separarlos.
        </Text>
      </Box>
    </HStack>
  </Box>
);

export default function CompatibilidadView() {
  return (
    <Container maxW="container.xl" pt={{ base: 6, md: 10 }}>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: compatibilidad.name }]} />

      <Box as="header" maxW="760px" mt={{ base: 6, md: 8 }} mb={{ base: 10, md: 14 }}>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          lineHeight="1.08"
          color="white"
          mt={4}
          mb={5}
        >
          {compatibilidad.name}
          {/* La frase que la gente busca también va dentro del H1 */}
          <Text
            as="span"
            display="block"
            fontFamily="body"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="600"
            letterSpacing="0"
            color="accent.cyan"
            mt={3}
          >
            {compatibilidad.tagline}
          </Text>
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} color="dark.textSecondary" lineHeight="1.6">
          {compatibilidad.lead}
        </Text>
      </Box>

      <CompatibilityTool />

      <Box
        mt={{ base: 20, md: 28 }}
        display="grid"
        gridTemplateColumns="minmax(0, 1fr)"
        gap={{ base: 20, md: 28 }}
      >
        <HowItWorks />
        <Box maxW="860px">
          <ArticleFAQ faq={faq} />
        </Box>
        <AsesoriaBand trackingId="compatibilidad_asesoria_band" />
      </Box>
    </Container>
  );
}
