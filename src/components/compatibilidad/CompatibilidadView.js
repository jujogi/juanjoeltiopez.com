"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaExclamationTriangle, FaGlobeAmericas } from "react-icons/fa";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import AsesoriaBand from "@/components/AsesoriaBand";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { trackArmonia } from "@/lib/gtm";
import CompatibilityTool from "./CompatibilityTool";
import { useArmoniaLang } from "./useArmoniaLang";

const HowItWorks = ({ checksExplained, copy }) => (
  <Box as="section" aria-labelledby="como-funciona">
    <SectionHeader eyebrow={copy.eyebrow} id="como-funciona" title={copy.title} />
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
          {copy.disclaimerTitle}
        </Text>
        <Text color="dark.textSecondary" lineHeight="1.6">
          {copy.disclaimer}
        </Text>
      </Box>
    </HStack>
  </Box>
);

export default function CompatibilidadView() {
  const { lang, copy, setLang } = useArmoniaLang();
  const { compatibilidad, ui } = copy;

  const switchLang = () => {
    const next = lang === "en" ? "es" : "en";
    trackArmonia("idioma", { idioma: next });
    setLang(next);
  };

  return (
    <Container maxW="container.xl" pt={{ base: 6, md: 10 }} lang={lang}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
        <Breadcrumbs items={[{ label: ui.home, href: "/" }, { label: compatibilidad.name }]} />
        {/* El botón está escrito en el idioma al que lleva */}
        <Button
          size="sm"
          variant="ghost"
          border="1px"
          borderColor="dark.border"
          leftIcon={<Icon as={FaGlobeAmericas} aria-hidden="true" />}
          lang={lang === "en" ? "es" : "en"}
          whiteSpace="normal"
          textAlign="left"
          h="auto"
          py={2}
          onClick={switchLang}
        >
          {ui.languageSwitch}
        </Button>
      </Flex>

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
        <HowItWorks checksExplained={copy.checksExplained} copy={ui.howItWorks} />
        <Box maxW="860px">
          <ArticleFAQ faq={copy.faq} title={ui.faqTitle} />
        </Box>
        {/* Las asesorías son en español: el bloque no se traduce */}
        <Box lang="es">
          <AsesoriaBand trackingId="compatibilidad_asesoria_band" />
        </Box>
      </Box>
    </Container>
  );
}
