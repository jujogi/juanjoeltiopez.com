"use client";

import { Box, HStack, VStack, Text, Badge, Image as ChakraImage } from "@chakra-ui/react";
import NextLink from "next/link";
import { trackEvent } from "@/lib/gtm";

export default function ProductInlineCard({ product }) {
  const handleClick = () => {
    trackEvent(`blog_inline_product_${product.slug}`, "Product_Click");
  };

  return (
    <Box
      as={NextLink}
      href={`/tienda/${product.slug}`}
      display="flex"
      bg="dark.bgAlt"
      rounded="lg"
      overflow="hidden"
      border="2px"
      borderColor="dark.border"
      my={6}
      _hover={{
        borderColor: "accent.cyan",
        transform: "translateY(-2px)",
      }}
      transition="all 0.3s"
      onClick={handleClick}
    >
      <Box position="relative" minW="120px" maxW="120px" h="auto" bg="dark.border">
        <ChakraImage
          src={product.images[0]}
          alt={product.name}
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>

      <VStack align="start" p={4} spacing={2} flex="1">
        <HStack spacing={1} flexWrap="wrap">
          {product.categories?.slice(0, 2).map((category, index) => (
            <Badge key={index} colorScheme={category.color || "cyan"} fontSize="8px" px={2} py={0.5}>
              {category.label}
            </Badge>
          ))}
        </HStack>

        <Text color="white" fontWeight="bold" fontSize="lg" lineHeight="1.3" noOfLines={2}>
          {product.name}
        </Text>
      </VStack>

      <Box
        bg="accent.cyan"
        w="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{ bg: "accent.cyanHover" }}
        transition="all 0.3s"
      >
        <Text color="white" fontSize="2xl" fontWeight="bold">
          ›
        </Text>
      </Box>
    </Box>
  );
}
