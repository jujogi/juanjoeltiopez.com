"use client";

import {
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  VStack,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { getAllProducts } from "@/lib/shopData";
import { formatPrice } from "@/lib/priceUtils";
import NextLink from "next/link";
import AsesoriaWidget from "@/components/AsesoriaWidget";

const ProductCard = ({ product }) => {
  // Usar la primera variante para mostrar info básica
  const defaultVariant = product.variants?.[0];
  const isInStock = defaultVariant?.stock === "in_stock";
  const isLowStock = defaultVariant?.stock === "low_stock";

  // Calcular rango de precios si hay múltiples variantes
  const getPrice = () => {
    if (!product.variants || product.variants.length === 0) return null;

    if (product.variants.length === 1) {
      return formatPrice(product.variants[0].price, product.variants[0].currency);
    }

    // Si hay múltiples variantes, retornar solo el precio
    const minPrice = Math.min(...product.variants.map(v => v.price));
    return formatPrice(minPrice, product.variants[0].currency);
  };

  const hasMultipleVariants = product.variants && product.variants.length > 1;

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
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "accent.cyan",
        boxShadow: "0 4px 20px rgba(0, 255, 255, 0.1)",
      }}
    >
      <Box bg="dark.border" h="240px" position="relative" overflow="hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        {!isInStock && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="red"
            fontSize="sm"
          >
            Agotado
          </Badge>
        )}
        {isLowStock && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="orange"
            fontSize="sm"
          >
            Pocas unidades
          </Badge>
        )}
      </Box>

      <VStack align="start" p={6} spacing={3}>
        <HStack spacing={2} flexWrap="wrap">
          {product.categories?.map((category, index) => (
            <Badge key={index} colorScheme={category.color || "cyan"} fontSize="9px" px={2} py={0.5}>
              {category.label}
            </Badge>
          ))}
        </HStack>

        <Heading size="md" color="white" noOfLines={2}>
          {product.name}
        </Heading>

        <Text color="dark.textSecondary" fontSize="sm" noOfLines={2}>
          {product.excerpt}
        </Text>

        <HStack justify="space-between" w="full" pt={2}>
          <Box>
            {hasMultipleVariants && (
              <Text fontSize="xs" color="dark.textSecondary" mb={-1}>
                Desde
              </Text>
            )}
            <Text fontSize="2xl" fontWeight="bold" color="accent.cyan">
              {getPrice()}
            </Text>
          </Box>
          <Button
            size="sm"
            bg="accent.cyan"
            color="white"
            _hover={{ bg: "accent.cyanHover" }}
            isDisabled={!isInStock}
          >
            {isInStock ? "Ver detalles" : "Agotado"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <Container maxW={"container.xl"} py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={12}>
        <GridItem>
          <VStack align="start" spacing={4} mb={8}>
            <Heading fontSize={"4xl"} color="white">
              Tienda
            </Heading>
            <Text color="dark.textSecondary" fontSize={"lg"}>
              Productos premium para tu acuario, ¡infaltables en mi {" "}
              <Box as="strong" color="accent.cyan">
                Fish Room
              </Box>!
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>

          {products.length === 0 && (
            <Box
              bg="dark.surface"
              p={12}
              rounded="lg"
              border="1px"
              borderColor="dark.border"
              textAlign="center"
            >
              <Text color="dark.textSecondary" fontSize="lg">
                Próximamente nuevos productos...
              </Text>
            </Box>
          )}
        </GridItem>

        {/* Sidebar */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <VStack spacing={6} position="sticky" top={4}>


            <Box
              bg="dark.surface"
              p={6}
              rounded="lg"
              border="1px"
              borderColor="dark.border"
            >
              <Heading size="sm" mb={3} color="white">
                💡 ¿Necesitas ayuda?
              </Heading>
              <Text fontSize="sm" color="dark.textSecondary" mb={4}>
                Si tienes dudas sobre qué producto es mejor para tu acuario,
                no dudes en contactarme.
              </Text>
              <Button
                as={NextLink}
                href="/asesoria"
                size="sm"
                w="full"
                bg="accent.cyan"
                color="white"
                _hover={{ bg: "accent.cyanHover" }}
              >
                Solicitar asesoría
              </Button>
            </Box>

                        <AsesoriaWidget />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
