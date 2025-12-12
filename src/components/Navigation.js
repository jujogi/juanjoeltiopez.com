"use client";

import {
  Box,
  Flex,
  Container,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, isActive, comingSoon, onClick }) => {
  if (comingSoon) {
    return (
      <Box
        px={3}
        py={2}
        fontSize="sm"
        fontWeight="500"
        color="dark.textSecondary"
        cursor="not-allowed"
        opacity={0.6}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {children}
        <Badge colorScheme="gray" fontSize="8px" px={1.5} py={0.5}>
          Próximamente
        </Badge>
      </Box>
    );
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      as={NextLink}
      px={3}
      py={2}
      fontSize="sm"
      fontWeight="500"
      color={isActive ? "accent.cyan" : "dark.text"}
      _hover={{
        textDecoration: "none",
        color: "accent.cyan",
      }}
      href={href}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const Links = [
    { name: "Inicio", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Guías", href: "/guias" },
    { name: "Asesorías", href: "/asesoria" },
    { name: "Acerca de", href: "/sobre-mi" },
    { name: "Tienda", href: "#", comingSoon: true },
  ];

  const isActiveLink = href => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <Box bg="dark.bgAlt" borderBottom="1px" borderColor="dark.border">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Logo */}
          <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }} onClick={onClose}>
            <Box position="relative" h="40px" w="180px" suppressHydrationWarning>
              <Image
                src="/images/juanjoeltiopez.svg"
                alt="JuanJo El Tío Pez"
                fill
                sizes="180px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <HStack as={"nav"} spacing={1} display={{ base: "none", lg: "flex" }}>
            {Links.map(link => (
              <NavLink
                key={link.name}
                href={link.href}
                isActive={isActiveLink(link.href)}
                comingSoon={link.comingSoon}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>

          {/* Mobile menu button */}
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
        </Flex>

        {/* Mobile Navigation */}
        {isOpen && (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={2}>
              {Links.map(link => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isActive={isActiveLink(link.href)}
                  comingSoon={link.comingSoon}
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
