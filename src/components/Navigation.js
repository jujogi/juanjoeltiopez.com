"use client";

import { useEffect, useState } from "react";
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackCtaClick } from "@/lib/gtm";

const LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
  {
    name: "Herramientas",
    children: [
      { name: "Armonía Acuática", href: "/armonia-acuatica" },
      { name: "Ayúdame a elegir", href: "/ayudame-a-elegir" },
    ],
  },
  { name: "Sobre mí", href: "/sobre-mi" },
];

// Raya verde bajo el enlace activo en escritorio
const underline = isActive => ({
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
});

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
    _after={isMobile ? undefined : underline(isActive)}
  >
    {children}
  </Link>
);

// "Herramientas" en escritorio: un menú con las herramientas
const ToolsMenu = ({ name, items, isActiveLink }) => {
  const isActive = items.some(item => isActiveLink(item.href));
  return (
    <Menu placement="bottom-start">
      <MenuButton
        position="relative"
        px={3}
        py={2}
        fontSize="sm"
        fontWeight="500"
        color={isActive ? "white" : "dark.textSecondary"}
        _hover={{ color: "white" }}
        _expanded={{ color: "white" }}
        _after={underline(isActive)}
      >
        {name} <ChevronDownIcon aria-hidden="true" />
      </MenuButton>
      <MenuList bg="dark.surface" borderColor="dark.border" py={2} minW="220px">
        {items.map(item => (
          <MenuItem
            key={item.href}
            as={NextLink}
            href={item.href}
            aria-current={isActiveLink(item.href) ? "page" : undefined}
            bg="transparent"
            color={isActiveLink(item.href) ? "white" : "dark.textSecondary"}
            fontSize="sm"
            fontWeight="500"
            px={4}
            py={2.5}
            _hover={{ bg: "dark.surfaceRaised", color: "white" }}
            _focus={{ bg: "dark.surfaceRaised", color: "white" }}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

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

// "Herramientas" en el celular: un botón que abre y cierra sus enlaces debajo, con sangría.
// Empieza abierto si la página actual es una de las herramientas.
const MobileToolsGroup = ({ name, items, isActiveLink, onNavigate }) => {
  const isActive = items.some(item => isActiveLink(item.href));
  const [isOpen, setIsOpen] = useState(isActive);
  return (
    <Box>
      <Button
        variant="unstyled"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        h="auto"
        px={2}
        py={3}
        rounded="none"
        fontSize="lg"
        fontWeight="600"
        textAlign="left"
        color={isActive ? "white" : "dark.textSecondary"}
        // Abierto, la línea va debajo de sus enlaces y no entre el título y ellos
        borderBottom={isOpen ? "none" : "1px"}
        borderColor="dark.border"
        aria-expanded={isOpen}
        aria-controls="menu-movil-herramientas"
        onClick={() => setIsOpen(open => !open)}
      >
        {name}
        <ChevronDownIcon
          aria-hidden="true"
          boxSize={6}
          transform={isOpen ? "rotate(180deg)" : undefined}
          transition="transform 0.2s"
        />
      </Button>
      {/* Los enlaces van como bloques con sangría, sin línea entre ellos; el activo lleva una
          barra verde a la izquierda */}
      <Collapse in={isOpen} animateOpacity>
        <Box id="menu-movil-herramientas" py={2} borderBottom="1px" borderColor="dark.border">
          {items.map(item => {
            const isCurrent = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                onClick={onNavigate}
                aria-current={isCurrent ? "page" : undefined}
                display="block"
                ml={2}
                pl={4}
                py={2.5}
                fontSize="md"
                fontWeight="600"
                color={isCurrent ? "white" : "dark.textSecondary"}
                borderLeft="2px"
                borderColor={isCurrent ? "accent.cyan" : "dark.border"}
                _hover={{ textDecoration: "none", color: "white" }}
              >
                {item.name}
              </Link>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
};

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
              {LINKS.map(link =>
                link.children ? (
                  <ToolsMenu
                    key={link.name}
                    name={link.name}
                    items={link.children}
                    isActiveLink={isActiveLink}
                  />
                ) : (
                  <NavLink key={link.href} href={link.href} isActive={isActiveLink(link.href)}>
                    {link.name}
                  </NavLink>
                )
              )}
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
              {LINKS.map(link =>
                link.children ? (
                  <MobileToolsGroup
                    key={link.name}
                    name={link.name}
                    items={link.children}
                    isActiveLink={isActiveLink}
                    onNavigate={onClose}
                  />
                ) : (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    isActive={isActiveLink(link.href)}
                    isMobile
                    onClick={onClose}
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </Stack>
            <CtaButton size="lg" w="full" mt={6} onClick={onClose} />
          </Container>
        </Box>
      )}
    </Box>
  );
}
