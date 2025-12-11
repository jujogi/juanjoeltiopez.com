"use client";

import { useState, useEffect } from "react";
import { Box, VStack, HStack, Text, Heading, Icon, Divider } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";

// Hook personalizado para animar el contador
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = currentTime => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function más suave (easeOutExpo) - como en apps modernas
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Asegurar que llegue al número exacto al final
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return count;
};

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
          <Text fontSize="lg" fontWeight="bold" color="white">
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
      link: "https://www.instagram.com/juanjoeltiopez",
    },
  };

  const totalFollowers = socialStats.tiktok.followers + socialStats.instagram.followers;
  const animatedTotal = useCountUp(totalFollowers, 2500);

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
        <Divider borderColor="dark.border" />

        <Box w="full">
          <Text fontSize="sm" color="dark.textSecondary" mb={2}>
            Total de seguidores
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="accent.cyan">
            {animatedTotal.toLocaleString("es-ES")}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
