"use client";

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Stack,
  SimpleGrid,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaWhatsapp, FaVideo, FaClock, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  GiAlgae,
  GiFallingLeaf,
  GiTropicalFish,
  GiTestTubes,
  GiAquarium,
  GiSpanner,
} from "react-icons/gi";
import Image from "next/image";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeading";
import { getAllTestimonials } from "@/lib/testimonialsData";
import { situations, steps, includes, faq } from "@/lib/asesoriaData";
import { asesoria, mainAuthor } from "@/lib/siteConfig";
import { trackCtaClick } from "@/lib/gtm";
import { getWhatsAppAsesoriaLink } from "@/lib/whatsappUtils";

const QUICK_FACTS = [
  { icon: FaVideo, title: "100% Virtual" },
  { icon: FaClock, title: asesoria.duration },
  { icon: FaCheckCircle, title: asesoria.followUp },
];

// Botón verde de WhatsApp: se mantiene el color de la marca para que se reconozca
const WhatsAppButton = ({ trackingId, children = "Agenda tu sesión ahora", ...props }) => (
  <Button
    as="a"
    href={getWhatsAppAsesoriaLink()}
    target="_blank"
    rel="noopener noreferrer"
    size="lg"
    bg="#25D366"
    color="#04141a"
    leftIcon={<Icon as={FaWhatsapp} boxSize={5} />}
    _hover={{ bg: "#3ee07c" }}
    onClick={() => trackCtaClick(trackingId)}
    whiteSpace="normal"
    h="auto"
    py={3.5}
    px={7}
    {...props}
  >
    {children}
  </Button>
);

const Section = ({ children, ...props }) => (
  <Box as="section" mb={{ base: 20, md: 28 }} {...props}>
    {children}
  </Box>
);

// 1. Portada: quién, qué y cuánto, en una sola vista
const Hero = () => (
  <Box
    as="section"
    aria-labelledby="asesoria-title"
    pt={{ base: 6, md: 10 }}
    pb={{ base: 16, md: 24 }}
  >
    <Container maxW="container.xl">
      <Breadcrumbs
        items={[{ label: "Inicio", href: "/" }, { label: "Asesorías personalizadas" }]}
      />
      <Grid
        templateColumns={{ base: "minmax(0, 1fr)", lg: "1.1fr 1fr" }}
        gap={{ base: 10, lg: 16 }}
        alignItems="center"
        mt={{ base: 6, md: 10 }}
      >
        <GridItem>
          <Eyebrow>Asesorías personalizadas</Eyebrow>
          <Heading
            as="h1"
            id="asesoria-title"
            fontSize={{ base: "4xl", md: "5xl" }}
            lineHeight="1.08"
            color="white"
            mt={4}
            mb={5}
          >
            Asesoría personalizada para tu acuario plantado
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="dark.textSecondary"
            lineHeight="1.6"
            mb={8}
          >
            ¡Resuelve problemas persistentes, optimiza tu montaje y lleva tu acuario al siguiente
            nivel!
          </Text>
          <Stack direction="row" wrap="wrap" spacing={4} align="center" mb={8}>
            <WhatsAppButton trackingId="asesoria_hero_whatsapp" />
            <Button
              as="a"
              href="#como-funciona"
              size="lg"
              variant="ghost"
              color="dark.text"
              rightIcon={<ArrowDownIcon />}
            >
              ¿Cómo funciona?
            </Button>
          </Stack>
          <HStack
            spacing={{ base: 4, md: 6 }}
            flexWrap="wrap"
            color="dark.textSecondary"
            fontSize="sm"
          >
            {QUICK_FACTS.map(f => (
              <HStack key={f.title} spacing={2}>
                <Icon as={f.icon} color="accent.cyan" />
                <Text>{f.title}</Text>
              </HStack>
            ))}
          </HStack>
        </GridItem>

        <GridItem position="relative">
          <Box
            position="relative"
            rounded="2xl"
            overflow="hidden"
            border="1px"
            borderColor="dark.border"
            sx={{ aspectRatio: "6 / 5" }}
            boxShadow="0 30px 80px -20px rgba(0, 0, 0, 0.6)"
          >
            <Image
              src={mainAuthor.image}
              alt="JuanJo El Tío Pez explicando un acuario plantado"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 560px"
              style={{ objectFit: "cover", objectPosition: "30% center" }}
            />
          </Box>
          <Box
            position="absolute"
            right={{ base: 3, md: -6 }}
            bottom={{ base: 3, md: -6 }}
            bg="dark.surface"
            border="1px"
            borderColor="dark.border"
            rounded="xl"
            px={5}
            py={3}
            boxShadow="0 12px 30px rgba(0, 0, 0, 0.45)"
          >
            <Text fontFamily="heading" fontSize="2xl" color="white" lineHeight="1.1">
              {asesoria.price}
            </Text>
            <Text fontSize="xs" color="dark.textMuted">
              por sesión virtual
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  </Box>
);

// 2. Situaciones como lista de síntomas: un ícono por problema, como una ficha de diagnóstico
const SITUATION_ICONS = {
  algae: GiAlgae,
  plants: GiFallingLeaf,
  fish: GiTropicalFish,
  params: GiTestTubes,
  setup: GiAquarium,
  maintenance: GiSpanner,
};

const SituationCard = ({ situation }) => (
  <Box
    as="li"
    listStyleType="none"
    bg="dark.surface"
    border="1px"
    borderColor="dark.border"
    rounded="xl"
    p={{ base: 5, md: 6 }}
  >
    <Flex
      w={12}
      h={12}
      rounded="lg"
      bg="rgba(62, 207, 158, 0.1)"
      align="center"
      justify="center"
      mb={4}
    >
      <Icon as={SITUATION_ICONS[situation.icon]} color="accent.cyan" boxSize={7} />
    </Flex>
    <Heading as="h3" fontSize="lg" color="white" mb={2} lineHeight="1.25">
      {situation.title}
    </Heading>
    <Text fontSize="sm" color="dark.textSecondary" lineHeight="tall">
      {situation.description}
    </Text>
  </Box>
);

const Situations = () => (
  <Grid
    templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
    gap={{ base: 8, lg: 14 }}
    alignItems="start"
  >
    {/* Columna fija: el título y la acción quedan a la vista mientras se recorren los síntomas */}
    <Box position={{ lg: "sticky" }} top={{ lg: 28 }}>
      <Eyebrow>¿Es para ti?</Eyebrow>
      <Heading
        as="h2"
        id="situaciones"
        fontSize={{ base: "2xl", md: "4xl" }}
        color="white"
        mt={2}
        mb={4}
        lineHeight="1.15"
      >
        ¿Te identificas con alguna de estas situaciones?
      </Heading>
      <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} mb={8}>
        El contenido gratuito que comparto en redes y en esta página resuelve muchos casos. Pero si
        tu acuario tiene problemas persistentes o necesitas una solución específica, una asesoría
        personalizada es la forma más rápida de obtener resultados.
      </Text>
      <Box display={{ base: "none", lg: "block" }}>
        <WhatsAppButton trackingId="asesoria_situaciones_whatsapp" />
      </Box>
    </Box>
    <SimpleGrid as="ul" columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
      {situations.map(s => (
        <SituationCard key={s.title} situation={s} />
      ))}
    </SimpleGrid>
  </Grid>
);

// 3. Línea de tiempo de 3 pasos
const Steps = () => (
  <Grid
    as="ol"
    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
    gap={{ base: 8, md: 10 }}
    listStyleType="none"
    position="relative"
  >
    {/* Línea que une los pasos en escritorio */}
    <Box
      display={{ base: "none", md: "block" }}
      position="absolute"
      top="24px"
      left="24px"
      right="calc(33% - 24px)"
      h="1px"
      bg="dark.border"
      aria-hidden="true"
    />
    {steps.map((step, i) => (
      <Box as="li" key={step.title} position="relative">
        <Flex
          w={12}
          h={12}
          rounded="full"
          bg="dark.bg"
          border="1px"
          borderColor="accent.cyan"
          color="accent.cyan"
          align="center"
          justify="center"
          fontFamily="heading"
          fontSize="xl"
          mb={5}
          position="relative"
        >
          {i + 1}
        </Flex>
        <Heading as="h3" fontSize="xl" color="white" mb={2}>
          {step.title}
        </Heading>
        <Text color="dark.textSecondary">{step.description}</Text>
      </Box>
    ))}
  </Grid>
);

export default function AsesoriaView() {
  const testimonials = getAllTestimonials();

  return (
    <>
      <Hero />

      <Container maxW="container.xl">
        {/* ¿Te identificas? */}
        <Section aria-labelledby="situaciones">
          <Situations />
        </Section>

        {/* Cómo funciona */}
        <Section
          id="como-funciona"
          aria-labelledby="como-funciona-title"
          sx={{ scrollMarginTop: "96px" }}
        >
          <SectionHeader
            eyebrow="Paso a paso"
            title="¿Cómo funciona la asesoría?"
            id="como-funciona-title"
            description="En 3 pasos tendrás un plan para resolver tu situación."
          />
          <Steps />
        </Section>

        {/* Qué incluye, junto a una foto */}
        <Section aria-labelledby="incluye">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 8, lg: 16 }}
            alignItems="center"
          >
            <Box
              position="relative"
              rounded="2xl"
              overflow="hidden"
              border="1px"
              borderColor="dark.border"
              sx={{ aspectRatio: { base: "16 / 10", lg: "4 / 3" } }}
              order={{ base: 2, lg: 1 }}
            >
              <Image
                src="/images/concurso-2.jpg"
                alt="Acuario plantado de concurso montado por JuanJo El Tío Pez"
                fill
                sizes="(max-width: 960px) 100vw, 600px"
                style={{ objectFit: "cover", objectPosition: "45% center" }}
              />
            </Box>
            <Box order={{ base: 1, lg: 2 }}>
              <Eyebrow>Tu sesión</Eyebrow>
              <Heading
                as="h2"
                id="incluye"
                fontSize={{ base: "2xl", md: "4xl" }}
                color="white"
                mt={2}
                mb={3}
              >
                Qué incluye tu sesión de asesoría
              </Heading>
              <Text color="dark.textSecondary" fontSize={{ base: "md", md: "lg" }} mb={8}>
                No es solo una videollamada. Es una sesión completa de diagnóstico, planificación y
                seguimiento.
              </Text>
              <VStack as="ul" align="stretch" spacing={4} listStyleType="none">
                {includes.map(item => (
                  <HStack as="li" key={item.title} spacing={3} align="start">
                    <Icon as={FaCheckCircle} color="accent.cyan" mt={1} flexShrink={0} />
                    <Text color="dark.text" fontSize={{ base: "md", md: "lg" }}>
                      {item.title}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Grid>
        </Section>

        {/* Precio + compromiso */}
        <Section aria-labelledby="precio">
          <Box
            maxW="3xl"
            mx="auto"
            textAlign="center"
            rounded="2xl"
            border="1px"
            borderColor="accent.cyan"
            bgGradient="linear(to-br, dark.surfaceRaised, dark.bgAlt)"
            px={{ base: 6, md: 12 }}
            py={{ base: 10, md: 14 }}
          >
            <Eyebrow>Precio</Eyebrow>
            <Heading
              as="h2"
              id="precio"
              fontSize={{ base: "xl", md: "2xl" }}
              color="white"
              mt={2}
              mb={5}
            >
              Inversión en tu asesoría personalizada
            </Heading>
            <Text
              fontFamily="heading"
              fontSize={{ base: "5xl", md: "6xl" }}
              color="white"
              lineHeight="1"
            >
              {asesoria.price}
            </Text>
            <Text color="dark.textSecondary" mt={3} mb={8}>
              por sesión virtual · Pago único. Incluye {asesoria.followUp}.
            </Text>
            <WhatsAppButton trackingId="agendar_sesion_instagram" />
            <HStack
              spacing={3}
              justify="center"
              align="start"
              mt={8}
              pt={6}
              borderTop="1px"
              borderColor="dark.border"
              textAlign="left"
            >
              <Icon as={FaShieldAlt} color="accent.sand" boxSize={5} mt={0.5} flexShrink={0} />
              <Text fontSize="sm" color="dark.textSecondary">
                <Text as="span" color="white" fontWeight="600">
                  Mi compromiso contigo:{" "}
                </Text>
                si al finalizar la sesión sientes que no aprendiste nada nuevo, te devuelvo tu
                dinero. Sin preguntas, sin complicaciones.
              </Text>
            </HStack>
          </Box>
        </Section>

        {/* Testimonios */}
        <Section aria-label="Testimonios">
          <TestimonialsCarousel testimonials={testimonials} />
        </Section>

        {/* Preguntas frecuentes */}
        <Section maxW="3xl" mx="auto">
          <ArticleFAQ faq={faq} />
        </Section>

        {/* CTA final sobre foto */}
        <Box
          as="section"
          aria-labelledby="cta-final"
          position="relative"
          rounded="2xl"
          overflow="hidden"
          border="1px"
          borderColor="dark.border"
        >
          <Image
            src="/images/acuarios-plantados.jpg"
            alt=""
            fill
            sizes="1200px"
            style={{ objectFit: "cover" }}
          />
          <Box position="absolute" inset={0} bg="rgba(4, 20, 26, 0.8)" />
          <VStack
            position="relative"
            spacing={5}
            textAlign="center"
            px={{ base: 6, md: 12 }}
            py={{ base: 14, md: 24 }}
          >
            <Heading
              as="h2"
              id="cta-final"
              fontSize={{ base: "2xl", md: "4xl" }}
              color="white"
              maxW="2xl"
            >
              ¿Listo para resolver el problema de tu acuario?
            </Heading>
            <Text color="dark.text" fontSize={{ base: "md", md: "lg" }} maxW="xl">
              Agenda tu sesión personalizada y obtén un diagnóstico preciso + plan de acción
              específico para tu caso
            </Text>
            <WhatsAppButton trackingId="contactar_instagram" />
            <Text fontSize="xs" color="dark.textMuted">
              Cupos limitados por mes para mantener la calidad del servicio
            </Text>
          </VStack>
        </Box>
      </Container>
    </>
  );
}
