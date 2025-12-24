"use client";

import { Box, Heading, Text, Button, VStack, HStack, Badge, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/shopData";
import { formatPrice } from "@/lib/priceUtils";
import { trackCtaClick } from "@/lib/gtm";

const ProductCard = ({ product, isPriority = false }) => {
  const defaultVariant = product.variants?.[0];
  const isInStock = defaultVariant?.stock === "in_stock";
  const isLowStock = defaultVariant?.stock === "low_stock";

  const handleProductClick = () => {
    trackCtaClick(`featured_product_${product.slug}`);
  };

  return (
    <Box
      as={NextLink}
      href={`/tienda/${product.slug}`}
      display="block"
      bg="dark.surface"
      rounded="lg"
      overflow="hidden"
      border="1px"
      borderColor="dark.border"
      _hover={{
        borderColor: "accent.cyan",
        transform: "translateY(-4px)",
        boxShadow: "0 8px 16px rgba(0, 255, 255, 0.1)",
      }}
      transition="all 0.3s"
      onClick={handleProductClick}
      h="full"
    >
      {/* Product Image */}
      <Box bg="dark.border" h="180px" position="relative" overflow="hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={isPriority}
        />
        {/* Stock Badge */}
        {(isLowStock || !isInStock) && (
          <Badge
            position="absolute"
            top={2}
            right={2}
            colorScheme={isLowStock ? "orange" : "red"}
            fontSize="9px"
          >
            {isLowStock ? "Pocas unidades" : "Agotado"}
          </Badge>
        )}
      </Box>

      {/* Product Info */}
      <Box p={4}>
        <VStack align="start" spacing={2}>
          {/* Categories */}
          <HStack spacing={1} flexWrap="wrap">
            {product.categories?.slice(0, 2).map((cat, index) => (
              <Badge key={index} colorScheme={cat.color || "cyan"} fontSize="8px">
                {cat.label}
              </Badge>
            ))}
          </HStack>

          {/* Product Name */}
          <Heading size="sm" color="white" noOfLines={2} lineHeight="1.3">
            {product.name}
          </Heading>

          {/* Brand */}
          {product.brand && (
            <Text color="dark.textSecondary" fontSize="xs">
              {product.brand}
            </Text>
          )}

          {/* Price */}
          <Text color="accent.cyan" fontWeight="bold" fontSize="lg">
            {formatPrice(defaultVariant.price, defaultVariant.currency)}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default function FeaturedProducts({ count = 3 }) {
  const allProducts = getAllProducts();
  // Get only in-stock or low-stock products for featured section
  const availableProducts = allProducts.filter(
    product =>
      product.variants?.[0]?.stock === "in_stock" || product.variants?.[0]?.stock === "low_stock"
  );
  const featuredProducts = availableProducts.slice(0, count);

  const handleViewAllClick = () => {
    trackCtaClick("ver_todos_productos_home");
  };

  return (
    <Box
      bg="dark.surface"
      rounded="lg"
      overflow="hidden"
      border="1px"
      borderColor="dark.border"
      p={{ base: 6, md: 8 }}
    >
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="start" mb={2}>
            <VStack align="start" spacing={1}>
              <Badge colorScheme="cyan" fontSize="9px">
                Tienda
              </Badge>
              <Heading size="lg" color="white">
                Productos destacados
              </Heading>
            </VStack>
            <Button
              as={NextLink}
              href="/tienda"
              variant="ghost"
              color="accent.cyan"
              size="sm"
              _hover={{ bg: "dark.bgAlt" }}
              onClick={handleViewAllClick}
            >
              Ver todos →
            </Button>
          </HStack>
          <Text color="dark.textSecondary" fontSize="sm">
            Productos premium que uso y recomiendo. ¡Envíos a todo Colombia! 🇨🇴
          </Text>
        </Box>

        {/* Products Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} isPriority={index < 3} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
