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
  Stack,
  SimpleGrid,
  Avatar,
  LinkBox,
  LinkOverlay,
  Flex,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getAllPosts } from "@/lib/blogData";
import { getCategories } from "@/lib/categories";
import { getAllTestimonials } from "@/lib/testimonialsData";
import { mainAuthor, totalFollowers, formatFollowers } from "@/lib/siteConfig";
import { trackCtaClick } from "@/lib/gtm";
import PostCard, { FeaturedPostCard } from "@/components/PostCard";
import AsesoriaBand from "@/components/AsesoriaBand";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeading";

// Los videos se eligen al azar: solo en cliente para evitar diferencias de hidratación
const FeaturedVideosWidget = dynamic(() => import("@/components/FeaturedVideosWidget"), {
  ssr: false,
});

// Guía destacada en la home: la primera de esta lista que exista
const FEATURED_SLUGS = ["gambitas-acuario-cuidados", "cuidado-pez-betta"];

const Stat = ({ value, label }) => (
  <Box>
    <Text fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} color="white" lineHeight="1">
      {value}
    </Text>
    <Text fontSize="sm" color="dark.textMuted" mt={1}>
      {label}
    </Text>
  </Box>
);

const Hero = ({ postCount }) => (
  <Box as="section" aria-labelledby="hero-title" pt={{ base: 8, md: 16 }} pb={{ base: 12, md: 20 }}>
    <Container maxW="container.xl">
      <Grid
        templateColumns={{ base: "1fr", lg: "1.05fr 1fr" }}
        gap={{ base: 10, lg: 16 }}
        alignItems="center"
      >
        <GridItem>
          <Eyebrow>Acuariofilia responsable · Colombia</Eyebrow>
          <Heading
            as="h1"
            id="hero-title"
            fontSize={{ base: "4xl", md: "6xl" }}
            lineHeight="1.05"
            color="white"
            mt={4}
            mb={6}
          >
            No es lo mismo{" "}
            <Text as="span" color="accent.cyan" fontStyle="italic">
              vivir
            </Text>{" "}
            que sobrevivir
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="dark.textSecondary"
            lineHeight="1.6"
            maxW="54ch"
            mb={8}
          >
            Tips y guías prácticas sobre peces Betta, gambitas, acuarios plantados y calidad del
            agua. Te comparto lo que me ha funcionado en mis acuarios (y lo que no), explicado
            fácil.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={4} mb={10}>
            <Button
              as={NextLink}
              href="/blog"
              size="lg"
              rightIcon={<ArrowForwardIcon />}
              onClick={() => trackCtaClick("home_hero_guias")}
            >
              Ver las guías
            </Button>
            <Button
              as={NextLink}
              href="/asesoria"
              size="lg"
              variant="outline"
              borderColor="dark.border"
              color="white"
              _hover={{ borderColor: "accent.cyan", color: "accent.cyan" }}
              onClick={() => trackCtaClick("home_hero_asesoria")}
            >
              Asesorías personalizadas
            </Button>
          </Stack>
          <HStack spacing={{ base: 6, md: 10 }} align="start">
            <Stat value={`+${formatFollowers(totalFollowers)}`} label="seguidores en redes" />
            <Stat value={postCount} label="guías publicadas" />
            <Stat value="1 a 1" label="asesorías virtuales" />
          </HStack>
        </GridItem>

        <GridItem position="relative">
          <Box
            position="relative"
            rounded="2xl"
            overflow="hidden"
            border="1px"
            borderColor="dark.border"
            sx={{ aspectRatio: "16 / 11" }}
            boxShadow="0 30px 80px -20px rgba(0, 0, 0, 0.6)"
          >
            <Image
              src="/images/acuarios-paisajismo.jpg"
              alt="Tres acuarios plantados con paisajismo natural montados por JuanJo El Tío Pez"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 600px"
              style={{ objectFit: "cover", objectPosition: "center 80%" }}
            />
          </Box>
          <HStack
            position="absolute"
            left={{ base: 3, md: -6 }}
            bottom={{ base: 3, md: -6 }}
            bg="dark.surface"
            border="1px"
            borderColor="dark.border"
            rounded="xl"
            px={4}
            py={3}
            spacing={3}
            boxShadow="0 12px 30px rgba(0, 0, 0, 0.45)"
          >
            <Avatar src={mainAuthor.image} name={mainAuthor.name} size="sm" />
            <Box>
              <Text fontSize="sm" fontWeight="600" color="white" lineHeight="1.2">
                {mainAuthor.name}
              </Text>
              <Text fontSize="xs" color="dark.textMuted">
                Acuarista y creador de contenido
              </Text>
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </Container>
  </Box>
);

const TopicCard = ({ category }) => (
  <LinkBox
    as="article"
    position="relative"
    rounded="xl"
    overflow="hidden"
    border="1px"
    borderColor="dark.border"
    minH={{ base: "180px", md: "220px" }}
    display="flex"
    alignItems="flex-end"
    transition="border-color 0.2s, transform 0.2s"
    _hover={{ borderColor: "accent.cyan", transform: "translateY(-3px)" }}
    sx={{ "&:hover img": { transform: "scale(1.05)" } }}
  >
    {category.image && (
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
      />
    )}
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-t, rgba(4,20,26,0.97) 25%, rgba(4,20,26,0.6) 65%, rgba(4,20,26,0.15))"
    />
    <Box position="relative" p={5} w="full">
      <Heading as="h3" fontSize="xl" color="white" mb={1}>
        <LinkOverlay as={NextLink} href={category.href}>
          {category.name}
        </LinkOverlay>
      </Heading>
      <Text fontSize="sm" color="dark.textSecondary" noOfLines={2} mb={2}>
        {category.description}
      </Text>
      <Text fontSize="xs" fontWeight="600" color="accent.cyan">
        {category.count} {category.count === 1 ? "guía" : "guías"} →
      </Text>
    </Box>
  </LinkBox>
);

export default function HomeView() {
  const posts = getAllPosts();
  const categories = getCategories();
  const testimonials = getAllTestimonials();

  const featured =
    FEATURED_SLUGS.map(slug => posts.find(p => p.slug === slug)).find(Boolean) || posts[0];
  const recent = posts.filter(p => p.slug !== featured.slug).slice(0, 6);

  return (
    <>
      <Hero postCount={posts.length} />

      <Container maxW="container.xl">
        {/* Temas */}
        <Box as="section" aria-labelledby="temas" mb={{ base: 16, md: 24 }}>
          <SectionHeader eyebrow="Explora por tema" title="¿Qué quieres aprender hoy?" id="temas" />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {categories.map(c => (
              <TopicCard key={c.slug} category={c} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Destacada + recientes */}
        <Box as="section" aria-labelledby="recientes" mb={{ base: 16, md: 24 }}>
          <Box mb={{ base: 10, md: 12 }}>
            <FeaturedPostCard post={featured} headingLevel="h2" />
          </Box>
          <SectionHeader
            eyebrow="Lo más reciente"
            title="Últimas guías"
            id="recientes"
            action={
              <Button
                as={NextLink}
                href="/blog"
                variant="ghost"
                color="accent.cyan"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => trackCtaClick("home_ver_todas")}
              >
                Ver todas las guías
              </Button>
            }
          />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {recent.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Videos */}
        <Box as="section" aria-label="Videos destacados" mb={{ base: 16, md: 24 }}>
          <FeaturedVideosWidget posts={posts} count={6} />
        </Box>

        {/* Asesoría + testimonios */}
        <Box mb={{ base: 12, md: 16 }}>
          <AsesoriaBand trackingId="home_asesoria_band" />
        </Box>
        {testimonials.length > 0 && (
          <Box as="section" aria-label="Testimonios">
            <TestimonialsCarousel testimonials={testimonials} />
          </Box>
        )}
      </Container>
    </>
  );
}
