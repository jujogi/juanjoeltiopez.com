"use client";

import { Box, Flex, Avatar, Heading, Text, HStack, Button, Link, Icon } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import NextLink from "next/link";
import { mainAuthor, socialProfiles, totalFollowers, formatFollowers } from "@/lib/siteConfig";
import { trackCtaClick } from "@/lib/gtm";

const SOCIAL_ICONS = { tiktok: FaTiktok, instagram: FaInstagram };

// Caja de autor: refuerza la experiencia (E-E-A-T) y lleva a la asesoría
export default function AuthorBox({ post }) {
  if (post.isGuestAuthor) {
    return (
      <Box
        bg="dark.surface"
        border="1px"
        borderColor="dark.border"
        rounded="xl"
        p={{ base: 5, md: 6 }}
      >
        <Flex gap={4} align="center">
          <Avatar name={post.author} bg="accent.cyan" color="water.950" size="lg" />
          <Box>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color="dark.textMuted"
            >
              Autor invitado
            </Text>
            <Heading as="p" fontSize="xl" color="white">
              {post.authorLink ? (
                <Link
                  href={post.authorLink}
                  isExternal
                  color="white"
                  _hover={{ color: "accent.cyan" }}
                >
                  {post.author}
                </Link>
              ) : (
                post.author
              )}
            </Heading>
            <Text fontSize="sm" color="dark.textSecondary" mt={1}>
              Acuarista invitado de nuestra comunidad. ¡Gracias por compartir tu experiencia!
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      p={{ base: 5, md: 7 }}
      position="relative"
      overflow="hidden"
    >
      <Flex
        gap={{ base: 4, md: 6 }}
        direction={{ base: "column", md: "row" }}
        align={{ md: "start" }}
      >
        <Avatar
          src={mainAuthor.image}
          name={mainAuthor.name}
          size="xl"
          border="2px solid"
          borderColor="accent.cyan"
          flexShrink={0}
        />
        <Box flex="1">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="dark.textMuted"
          >
            Escrito por
          </Text>
          <Heading as="p" fontSize="2xl" color="white" mb={2}>
            <Link as={NextLink} href="/sobre-mi" color="white" _hover={{ color: "accent.cyan" }}>
              {mainAuthor.name}
            </Link>
          </Heading>
          <Text color="dark.textSecondary" lineHeight="tall" mb={4}>
            {mainAuthor.shortBio}
          </Text>
          <HStack spacing={4} mb={5} flexWrap="wrap">
            <Text fontSize="sm" color="dark.text" fontWeight="600">
              +{formatFollowers(totalFollowers)} seguidores
            </Text>
            {Object.entries(socialProfiles).map(([key, profile]) => (
              <Link
                key={key}
                href={profile.url}
                isExternal
                fontSize="sm"
                color="dark.textSecondary"
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                _hover={{ color: "accent.cyan" }}
              >
                <Icon as={SOCIAL_ICONS[key]} />
                {profile.label}
              </Link>
            ))}
          </HStack>
          <Button
            as={NextLink}
            href="/asesoria"
            size="md"
            onClick={() => trackCtaClick("author_box_asesoria")}
          >
            Agenda una asesoría personalizada
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
