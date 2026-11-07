"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import NextLink from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/categories";
import { socialProfiles, totalFollowers, formatFollowers, SITE_NAME } from "@/lib/siteConfig";

const SOCIAL_ICONS = { tiktok: FaTiktok, instagram: FaInstagram };

const SITE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Asesorías", href: "/asesoria" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Términos y condiciones", href: "/terminos" },
];

const FooterHeading = ({ children }) => (
  <Heading
    as="h2"
    fontFamily="body"
    fontSize="xs"
    fontWeight="700"
    textTransform="uppercase"
    letterSpacing="0.12em"
    color="dark.textMuted"
    mb={4}
  >
    {children}
  </Heading>
);

const FooterLink = ({ href, children, isExternal }) => (
  <Link
    as={isExternal ? undefined : NextLink}
    href={href}
    isExternal={isExternal}
    fontSize="sm"
    color="dark.textSecondary"
    _hover={{ color: "accent.cyan" }}
  >
    {children}
  </Link>
);

export default function Footer() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="dark.bgAlt"
      borderTop="1px"
      borderColor="dark.border"
      mt={{ base: 20, md: 28 }}
    >
      <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 10, lg: 12 }}>
          <Box>
            <Box position="relative" h="40px" w="180px" mb={4}>
              <Image
                src="/images/juanjoeltiopez.svg"
                alt={SITE_NAME}
                fill
                sizes="180px"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </Box>
            <Text fontSize="sm" color="dark.textSecondary" lineHeight="tall" maxW="34ch" mb={5}>
              Acuariofilia responsable en Colombia: guías prácticas, videos y asesorías para que tu
              acuario no solo sobreviva, sino que viva bien.
            </Text>
            <HStack spacing={3}>
              {Object.entries(socialProfiles).map(([key, profile]) => (
                <Link
                  key={key}
                  href={profile.url}
                  isExternal
                  aria-label={`${SITE_NAME} en ${profile.label}`}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  w={10}
                  h={10}
                  rounded="full"
                  border="1px"
                  borderColor="dark.border"
                  color="dark.text"
                  _hover={{ borderColor: "accent.cyan", color: "accent.cyan" }}
                >
                  <Icon as={SOCIAL_ICONS[key]} />
                </Link>
              ))}
              <Text fontSize="xs" color="dark.textMuted" pl={1}>
                +{formatFollowers(totalFollowers)} seguidores
              </Text>
            </HStack>
          </Box>

          <Box as="nav" aria-label="Temas">
            <FooterHeading>Temas</FooterHeading>
            <VStack align="start" spacing={2.5}>
              {categories.map(c => (
                <FooterLink key={c.slug} href={c.href}>
                  {c.name}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          <Box as="nav" aria-label="Sitio">
            <FooterHeading>Sitio</FooterHeading>
            <VStack align="start" spacing={2.5}>
              {SITE_LINKS.map(l => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          <Box>
            <FooterHeading>Contacto</FooterHeading>
            <VStack align="start" spacing={2.5}>
              <FooterLink href="https://ig.me/m/juanjoeltiopez" isExternal>
                Escríbeme por Instagram
              </FooterLink>
              <FooterLink href="/asesoria">Agenda una asesoría personalizada</FooterLink>
            </VStack>
          </Box>
        </SimpleGrid>

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          spacing={3}
          mt={{ base: 12, md: 16 }}
          pt={6}
          borderTop="1px"
          borderColor="dark.border"
          fontSize="xs"
          color="dark.textMuted"
        >
          <Text>
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
