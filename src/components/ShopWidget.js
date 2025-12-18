"use client";

import { Box, Heading, Text, Button, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaTruck } from "react-icons/fa";
import NextLink from "next/link";
import { trackCtaClick } from "@/lib/gtm";

export default function ShopWidget() {
  const handleShopClick = () => {
    trackCtaClick("ver_tienda_sidebar");
  };

  return (
    <Box
      bg="dark.surface"
      rounded="lg"
      p={6}
      border="2px"
      borderColor="accent.cyan"
      position="relative"
      w="full"
    >
      <VStack align="start" spacing={4}>
        <Box>
          <Heading size="md" color="white" mb={2}>
            🛒 Tienda
          </Heading>
          <Text color="dark.textSecondary" fontSize="sm" lineHeight="tall">
            ¡Descubre alguno de los productos que utilizo y recomiendo para mis acuarios!
          </Text>
        </Box>

        {/* Features */}
        <VStack align="start" spacing={2} w="full">
          <HStack spacing={2}>
            <Icon as={FaCheckCircle} color="accent.cyan" boxSize={4} />
            <Text color="dark.text" fontSize="sm">
              Productos premium para tu acuario
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={FaTruck} color="accent.cyan" boxSize={4} />
            <Text color="dark.text" fontSize="sm">
              Envíos a todo Colombia
            </Text>
          </HStack>
        </VStack>

        {/* CTA Button */}
        <Button
          as={NextLink}
          href="/tienda"
          w="full"
          bg="accent.cyan"
          color="white"
          _hover={{ bg: "accent.cyanHover", transform: "translateY(-2px)" }}
          transition="all 0.3s"
          size="md"
          onClick={handleShopClick}
        >
          Ver tienda
        </Button>
      </VStack>
    </Box>
  );
}
