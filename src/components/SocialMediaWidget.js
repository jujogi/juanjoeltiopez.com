"use client";

import { Box, VStack, HStack, Text, Heading, Icon, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const SocialPlatform = ({ icon, platform, followers, color, link }) => {
  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      p={4}
      bg="dark.bgAlt"
      rounded="md"
      border="1px"
      borderColor="dark.border"
      _hover={{
        borderColor: color,
        transform: "translateY(-2px)",
        transition: "all 0.3s",
      }}
      transition="all 0.3s"
      cursor="pointer"
      w="full"
    >
      <HStack spacing={3} w="full">
        <Box
          p={2}
          bg={color}
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} color="white" boxSize={5} />
        </Box>
        <VStack align="start" spacing={0} flex="1">
          <Text fontSize="xs" color="dark.textSecondary">
            {platform}
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white" suppressHydrationWarning>
            {followers.toLocaleString("es-ES")}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default function SocialMediaWidget() {
  // Estos valores pueden ser actualizados manualmente o conectados a APIs más adelante
  const socialStats = {
    tiktok: {
      followers: 88487,
      link: "https://www.tiktok.com/@juanjoeltiopez",
    },
    instagram: {
      followers: 25725,
      link: "https://ig.me/m/juanjoeltiopez",
    },
  };

  const totalFollowers = socialStats.tiktok.followers + socialStats.instagram.followers;

  return (
    <Box bg="dark.surface" rounded="lg" p={6} border="1px" borderColor="dark.border" w="full">
      <VStack align="start" spacing={4} w="full">
        <Heading fontSize="xl" color="white">
          Síguenos en redes sociales
        </Heading>

        <VStack spacing={3} w="full">
          <SocialPlatform
            icon={FaTiktok}
            platform="TikTok"
            followers={socialStats.tiktok.followers}
            color="#000000"
            link={socialStats.tiktok.link}
          />

          <SocialPlatform
            icon={FaInstagram}
            platform="Instagram"
            followers={socialStats.instagram.followers}
            color="#E1306C"
            link={socialStats.instagram.link}
          />
        </VStack>

        {/* Total de seguidores */}
        <Box
          w="full"
          p={4}
          bgGradient="linear(to-r, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))"
          rounded="md"
          border="1px"
          borderColor="accent.cyan"
        >
          <Stat>
            <StatLabel color="dark.textSecondary" fontSize="sm">
              Total de seguidores
            </StatLabel>
            <StatNumber
              fontSize="3xl"
              fontWeight="bold"
              bgGradient="linear(to-r, accent.cyan, accent.blue)"
              bgClip="text"
            >
              {totalFollowers.toLocaleString("es-ES")}
            </StatNumber>
          </Stat>
        </Box>
      </VStack>
    </Box>
  );
}
