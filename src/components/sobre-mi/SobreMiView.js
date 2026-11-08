"use client";

import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  HStack,
  Stack,
  SimpleGrid,
  Icon,
  Flex,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { FaTiktok, FaInstagram, FaVideo, FaThumbsUp, FaHandsHelping } from "react-icons/fa";
import { GiTropicalFish, GiTestTubes, GiSprout } from "react-icons/gi";
import Image from "next/image";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import AsesoriaBand from "@/components/AsesoriaBand";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { mainAuthor, socialProfiles, formatFollowers } from "@/lib/siteConfig";

const SOCIAL_ICONS = { tiktok: FaTiktok, instagram: FaInstagram };

const TOPICS = [
  {
    icon: GiTropicalFish,
    title: "Cuidado responsable",
    description:
      "Las mejores recomendaciones para que tus peces, gambas, caracoles y plantas estén sanos.",
  },
  {
    icon: GiTestTubes,
    title: "Solución a problemas",
    description:
      "Guías prácticas para enfrentar algas, parámetros inestables y otros retos del acuario.",
  },
  {
    icon: FaVideo,
    title: "Contenido educativo",
    description:
      "Explicaciones sencillas, tips rápidos y demostraciones reales para aprender sin complicarte.",
  },
  {
    icon: FaThumbsUp,
    title: "Review de equipos y productos",
    description:
      "Opiniones honestas sobre filtros, luces, plantas, sustratos y accesorios que realmente funcionan.",
  },
  {
    icon: GiSprout,
    title: "Mantenimiento de acuarios plantados",
    description: "Rutinas, fertilización, poda y cuidados para mantener tus plantados.",
  },
  {
    icon: FaHandsHelping,
    title: "Comunidad y acompañamiento",
    description: "Un espacio para resolver dudas y crecer juntos en el hobby.",
  },
];

const Section = ({ children, ...props }) => (
  <Box as="section" mb={{ base: 20, md: 28 }} {...props}>
    {children}
  </Box>
);

const IconBadge = ({ icon }) => (
  <Flex
    w={11}
    h={11}
    flexShrink={0}
    rounded="xl"
    align="center"
    justify="center"
    bg="rgba(62, 207, 158, 0.12)"
    color="accent.cyan"
  >
    <Icon as={icon} boxSize={5} />
  </Flex>
);

// 1. Portada: foto, nombre y redes
const Hero = () => (
  <Box
    as="section"
    aria-labelledby="sobre-mi-title"
    pt={{ base: 6, md: 10 }}
    pb={{ base: 16, md: 24 }}
  >
    <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Sobre mí" }]} />
    <Grid
      templateColumns={{ base: "1fr", lg: "1.05fr 1fr" }}
      gap={{ base: 10, lg: 16 }}
      alignItems="center"
      mt={{ base: 6, md: 10 }}
    >
      <Box>
        <Eyebrow>Sobre mí</Eyebrow>
        <Heading
          as="h1"
          id="sobre-mi-title"
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          lineHeight="1.05"
          color="white"
          mt={3}
        >
          ¿Quién es JuanJo{" "}
          <Text as="span" whiteSpace="nowrap">
            <Text as="span" color="accent.cyan" fontStyle="italic">
              El Tío Pez
            </Text>
            ?
          </Text>
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} color="dark.textSecondary" mt={6} maxW="xl">
          Exploremos el fascinante mundo de la acuariofilia: peces, gambitas, consejos y toda la
          inspiración para tus proyectos acuáticos.
        </Text>

        <Stack direction={{ base: "column", md: "row" }} spacing={3} mt={8}>
          {Object.entries(socialProfiles).map(([key, profile]) => (
            <Button
              key={key}
              as="a"
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="outline"
              borderColor="dark.border"
              color="white"
              justifyContent="flex-start"
              h="auto"
              py={3}
              leftIcon={<Icon as={SOCIAL_ICONS[key]} boxSize={5} color="accent.cyan" />}
              _hover={{ bg: "dark.surface" }}
            >
              <Box textAlign="left">
                <Text fontSize="md" lineHeight="1.2">
                  {profile.label}
                </Text>
                <Text fontSize="xs" color="dark.textMuted" fontWeight="500">
                  +{formatFollowers(profile.followers)} seguidores
                </Text>
              </Box>
            </Button>
          ))}
        </Stack>
      </Box>

      <Box
        position="relative"
        rounded="2xl"
        overflow="hidden"
        border="1px"
        borderColor="dark.border"
        aspectRatio={{ base: 4 / 3, lg: 5 / 4 }}
      >
        <Image
          src="/images/juanjoeltiopez.jpg"
          alt="JuanJo El Tío Pez explicando un acuario plantado en una charla"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "30% center" }}
        />
      </Box>
    </Grid>
  </Box>
);

// 2. Misión, junto a la foto del fishroom
const Mission = () => (
  <Section aria-labelledby="mision">
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={{ base: 8, lg: 16 }}
      alignItems="center"
    >
      <Box as="figure" m={0}>
        <Box
          position="relative"
          rounded="2xl"
          overflow="hidden"
          border="1px"
          borderColor="dark.border"
          aspectRatio={800 / 485}
        >
          <Image
            src="/images/fishroom.jpg"
            alt="Fishroom de JuanJo El Tío Pez con varios acuarios plantados"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Text as="figcaption" fontSize="sm" color="dark.textMuted" mt={3}>
          Mi fishroom. Cali, Colombia.
        </Text>
      </Box>

      <Box>
        <Eyebrow>Mi misión</Eyebrow>
        <Heading as="h2" id="mision" fontSize={{ base: "2xl", md: "4xl" }} color="white" mt={2}>
          Promover una acuariofilia responsable
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="dark.text" lineHeight="tall" mt={5}>
          En JuanJo El Tío Pez vivimos y respiramos acuariofilia. Nos llena de felicidad cuando
          nuestros videos ayudan a que tus acuarios luzcan mejor o a que disfrutes más este hobby,
          ya sea que estés armando tu primer acuario o cuidando un plantado lleno de vida.
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="dark.text" lineHeight="tall" mt={4}>
          Desde que nació este proyecto, la misión siempre ha sido la misma:{" "}
          <Text as="span" fontWeight="bold" color="accent.cyan">
            promover una acuariofilia responsable
          </Text>
          . Queremos construir la mejor comunidad acuarista, donde el amor por la vida sea lo
          primero.
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="dark.text" lineHeight="tall" mt={4}>
          Estoy en el hobby desde 2020 y he llevado mis acuarios a concursos internacionales de
          paisajismo acuático:
        </Text>
        <UnorderedList mt={3} spacing={1.5} color="dark.textSecondary">
          {mainAuthor.contests.map(c => (
            <ListItem key={c.name}>
              {c.name} {c.year}: puesto {c.rank}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Grid>
  </Section>
);

// 3. Qué encontrarás: foto a un lado, temas al otro
const Topics = () => (
  <Section aria-labelledby="que-encontraras">
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }}
      gap={{ base: 8, lg: 12 }}
      alignItems="start"
    >
      <Box position={{ lg: "sticky" }} top={{ lg: 24 }}>
        <Eyebrow>El contenido</Eyebrow>
        <Heading
          as="h2"
          id="que-encontraras"
          fontSize={{ base: "2xl", md: "4xl" }}
          color="white"
          mt={2}
        >
          ¿Qué encontrarás aquí?
        </Heading>
        <Box
          position="relative"
          rounded="2xl"
          overflow="hidden"
          border="1px"
          borderColor="dark.border"
          aspectRatio={4 / 3}
          mt={6}
          display={{ base: "none", lg: "block" }}
        >
          <Image
            src="/images/mantenimientos.jpg"
            alt="Poda de plantas en un acuario plantado durante el mantenimiento"
            fill
            sizes="35vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {TOPICS.map(topic => (
          <HStack
            key={topic.title}
            align="start"
            spacing={4}
            bg="dark.surface"
            border="1px"
            borderColor="dark.border"
            rounded="xl"
            p={5}
          >
            <IconBadge icon={topic.icon} />
            <Box>
              <Heading as="h3" fontSize="md" color="white" fontFamily="body" fontWeight="700">
                {topic.title}
              </Heading>
              <Text color="dark.textSecondary" fontSize="sm" mt={1.5} lineHeight="tall">
                {topic.description}
              </Text>
            </Box>
          </HStack>
        ))}
      </SimpleGrid>
    </Grid>
  </Section>
);

export default function SobreMiView() {
  return (
    <Container maxW="container.xl" pb={{ base: 16, md: 24 }}>
      <Hero />
      <Mission />
      <Topics />
      <AsesoriaBand trackingId="sobre_mi_asesoria" />
    </Container>
  );
}
