"use client";

import { useEffect } from "react";
import {
  Box,
  Flex,
  Container,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackCtaClick } from "@/lib/gtm";

const LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Armonía Acuática", href: "/armonia-acuatica" },
  { name: "Sobre mí", href: "/sobre-mi" },
];

const CTA = { name: "Asesorías personalizadas", href: "/asesoria" };

const NavLink = ({ href, children, isActive, isMobile, onClick }) => (
  <Link
    as={NextLink}
    href={href}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
    position="relative"
    px={isMobile ? 2 : 3}
    py={isMobile ? 3 : 2}
    fontSize={isMobile ? "lg" : "sm"}
    fontWeight={isMobile ? "600" : "500"}
    color={isActive ? "white" : "dark.textSecondary"}
    borderBottom={isMobile ? "1px" : undefined}
    borderColor="dark.border"
    _hover={{ textDecoration: "none", color: "white" }}
    _after={
      isMobile
        ? undefined
        : {
            content: '""',
            position: "absolute",
            left: 3,
            right: 3,
            bottom: "-1px",
            h: "2px",
            rounded: "full",
            bg: "accent.cyan",
            transform: isActive ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.2s ease",
          }
    }
  >
    {children}
  </Link>
);

const CtaButton = ({ onClick, ...props }) => (
  <Button
    as={NextLink}
    href={CTA.href}
    size="sm"
    onClick={() => {
      trackCtaClick("nav_asesoria");
      onClick?.();
    }}
    {...props}
  >
    {CTA.name}
  </Button>
);

export default function Navigation() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const pathname = usePathname();

  // Cierra el menú móvil al cambiar de página o con Escape
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const isActiveLink = href => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="rgba(6, 23, 31, 0.85)"
      backdropFilter="saturate(160%) blur(12px)"
      borderBottom="1px"
      borderColor="dark.border"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between" gap={4}>
          <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }} aria-label="Inicio">
            <Box position="relative" h="40px" w="180px">
              <Image
                src="/images/juanjoeltiopez.svg"
                alt="JuanJo El Tío Pez"
                fill
                sizes="180px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </Box>
          </Link>

          {/* Escritorio */}
          <HStack spacing={6} display={{ base: "none", lg: "flex" }}>
            <HStack as="nav" aria-label="Principal" spacing={1}>
              {LINKS.map(link => (
                <NavLink key={link.href} href={link.href} isActive={isActiveLink(link.href)}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
            <CtaButton />
          </HStack>

          {/* Móvil */}
          <HStack spacing={2} display={{ base: "flex", lg: "none" }}>
            <CtaButton display={{ base: "none", md: "inline-flex" }} />
            <IconButton
              icon={isOpen ? <CloseIcon boxSize={3.5} /> : <HamburgerIcon boxSize={5} />}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
              onClick={onToggle}
              variant="ghost"
              color="white"
            />
          </HStack>
        </Flex>
      </Container>

      {isOpen && (
        <Box
          id="menu-movil"
          display={{ lg: "none" }}
          borderTop="1px"
          borderColor="dark.border"
          bg="dark.bg"
          maxH={`calc(100dvh - 64px)`}
          overflowY="auto"
        >
          <Container maxW="container.xl" py={4}>
            <Stack as="nav" aria-label="Principal" spacing={0}>
              {LINKS.map(link => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActiveLink(link.href)}
                  isMobile
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>
            <CtaButton size="lg" w="full" mt={6} onClick={onClose} />
          </Container>
        </Box>
      )}
    </Box>
  );
}
