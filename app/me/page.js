"use client";

import { Container, VStack, Heading, Text, Box, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FiShoppingCart, FiMessageCircle, FiBook } from "react-icons/fi";
import NextLink from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/gtm";

const SocialIcon = ({ icon, link, color, bgColor, platform }) => {
  const handleClick = () => {
    trackEvent(`me_page_${platform}`, "Social_Media");
  };

  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      p={2}
      bg={bgColor}
      rounded="full"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      _hover={{
        transform: "scale(1.1)",
        transition: "all 0.3s",
      }}
      transition="all 0.3s"
      onClick={handleClick}
    >
      <Icon as={icon} color={color} boxSize={4} />
    </Box>
  );
};

const NavCard = ({ title, icon, href, description }) => {
  const handleClick = () => {
    trackEvent(`me_page_${title}`, "Navigation");
  };

  return (
    <Box as={NextLink} href={href} onClick={handleClick}>
      <Box
        p={{ base: 4, md: 5 }}
        bg="dark.surface"
        rounded="xl"
        border="2px"
        borderColor="dark.border"
        _hover={{
          borderColor: "accent.cyan",
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(6, 182, 212, 0.2)",
        }}
        transition="all 0.3s"
        cursor="pointer"
        h="full"
      >
        <VStack spacing={3} align="center">
          <Box
            p={3}
            bg="dark.bgAlt"
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} color="accent.cyan" boxSize={{ base: 6, md: 7 }} />
          </Box>
          <VStack spacing={1}>
            <Heading size="sm" color="white" textAlign="center">
              {title}
            </Heading>
            <Text color="dark.textSecondary" fontSize="xs" textAlign="center">
              {description}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default function MePage() {
  return (
    <Box
      minH="100vh"
      bg="dark.bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Container maxW="container.md">
        <VStack spacing={{ base: 6, md: 8 }} align="center">
          {/* Header Section */}
          <VStack spacing={3} textAlign="center">
            <Box position="relative" h="60px" w="300px">
              <Image
                src="/images/juanjoeltiopez.svg"
                alt="JuanJo El Tío Pez"
                fill
                sizes="300px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Text color="dark.textSecondary" fontSize={{ base: "sm", md: "md" }} maxW="xl">
              Aprende a{" "}
              <Box as="strong" color="accent.cyan">
                cuidar y disfrutar de tu acuario
              </Box>{" "}
              como nunca antes. Encuentra guías, consejos y toda la inspiración para tus proyectos
              acuáticos.
            </Text>
          </VStack>

          {/* Navigation Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} w="full">

                        <NavCard
              title="Blog"
              icon={FiBook}
              href="/blog"
              description="Guías, tutoriales y consejos para tus acuarios"
            />
            <NavCard
              title="Asesorías"
              icon={FiMessageCircle}
              href="/asesoria"
              description="¿Necesitas ayuda? Consultas personalizadas para tu proyecto"
            />
            <NavCard
              title="Tienda"
              icon={FiShoppingCart}
              href="/tienda"
              description="Encuentra productos ✨premium✨ para tu acuario"
            />

          </SimpleGrid>

          {/* Social Media Icons */}
          <HStack spacing={3} alignSelf="flex-end">
            <SocialIcon
              icon={FaTiktok}
              link="https://www.tiktok.com/@juanjoeltiopez"
              color="white"
              bgColor="#000000"
              platform="tiktok"
            />
            <SocialIcon
              icon={FaInstagram}
              link="https://www.instagram.com/juanjoeltiopez/"
              color="white"
              bgColor="#E1306C"
              platform="instagram"
            />
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
