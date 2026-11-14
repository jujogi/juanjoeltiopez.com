"use client";

import { Box, Container, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import AsesoriaBand from "@/components/AsesoriaBand";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeading";
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
    <Text color="dark.textMuted" fontSize="sm" mt={4}>
      Esta es una guía para que planees tu acuario y no una garantía: cada pez tiene su propio
      temperamento. Siempre tienes que observar y tener un plan B.
    </Text>
  </Box>
);

export default function CompatibilidadView() {
  return (
    <Container maxW="container.xl" pt={{ base: 6, md: 10 }}>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Compatibilidad de peces" }]} />

      <Box as="header" maxW="760px" mt={{ base: 6, md: 8 }} mb={{ base: 10, md: 14 }}>
        <Eyebrow>Herramienta</Eyebrow>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          lineHeight="1.08"
          color="white"
          mt={4}
          mb={5}
        >
          {compatibilidad.title}
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
