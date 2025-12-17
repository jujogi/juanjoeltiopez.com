"use client";

import { use, useState, useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  Badge,
  Divider,
  Button,
  Grid,
  GridItem,
  VStack,
  HStack,
  Skeleton,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { getProductBySlug, getAllProducts } from "@/lib/shopData";
import { formatPrice } from "@/lib/priceUtils";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import RelatedVideosWidget from "@/components/RelatedVideosWidget";
import { trackCtaClick } from "@/lib/gtm";

const ProductSkeleton = () => (
  <Container maxW={"container.xl"} py={12}>
    <Skeleton height="40px" width="150px" mb={6} />

    <Grid templateColumns={{ base: "1fr", lg: "7fr 3fr" }} gap={12}>
      <GridItem>
        <Stack spacing={6}>
          <Skeleton height="48px" width="80%" />
          <HStack spacing={4}>
            <Skeleton height="24px" width="100px" />
            <Skeleton height="24px" width="120px" />
          </HStack>

          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
            <Skeleton height="530px" rounded="lg" />
            <Stack spacing={4}>
              <Skeleton height="60px" rounded="lg" />
              <Skeleton height="120px" rounded="lg" />
              <Skeleton height="48px" rounded="lg" />
            </Stack>
          </Grid>

          <Divider borderColor="dark.border" />
          <Skeleton height="600px" rounded="lg" />
        </Stack>
      </GridItem>

      <GridItem>
        <VStack spacing={6} align="stretch">
          <Skeleton height="200px" rounded="lg" />
          <Skeleton height="200px" rounded="lg" />
        </VStack>
      </GridItem>
    </Grid>
  </Container>
);

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const product = getProductBySlug(slug);
  const allProducts = getAllProducts();

  // Simular carga del backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [slug]);

  // Reset image loaded state when slug changes
  useEffect(() => {
    setImageLoaded(false);
    setMainImage(0);
    setSelectedVariant(0);
  }, [slug]);

  // Obtener productos relacionados (con categorías en común, excluyendo el actual)
  const relatedProducts = allProducts
    .filter(p => {
      if (p.id === product?.id) return false;
      // Verificar si comparten al menos una categoría
      return product?.categories?.some(cat =>
        p.categories?.some(pCat => pCat.label === cat.label)
      );
    })
    .slice(0, 3);

  if (!product) {
    return (
      <Container maxW={"container.xl"} py={12}>
        <Heading>Producto no encontrado</Heading>
        <Button as={NextLink} href="/tienda" mt={4} leftIcon={<ArrowBackIcon />}>
          Volver a la tienda
        </Button>
      </Container>
    );
  }

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <ProductSkeleton />;
  }

  // Obtener la variante actual
  const currentVariant = product.variants?.[selectedVariant] || product.variants?.[0];
  const isInStock = currentVariant?.stock === "in_stock";
  const isLowStock = currentVariant?.stock === "low_stock";

  const handleComprarClick = () => {
    trackCtaClick(`comprar_producto_${product.slug}`);
  };

  const handleContactarClick = () => {
    trackCtaClick(`contactar_producto_${product.slug}`);
  };

  return (
    <Container maxW={"container.xl"} py={12}>
      <Button
        as={NextLink}
        href="/tienda"
        variant={"ghost"}
        leftIcon={<ArrowBackIcon />}
        mb={6}
      >
        Volver a la tienda
      </Button>

      <Grid templateColumns={{ base: "1fr", lg: "7fr 3fr" }} gap={12}>
        <GridItem>
          <Stack spacing={6}>
            {/* Product Header */}
            <Box>
              <HStack spacing={2} mb={3} flexWrap="wrap">
                {product.categories?.map((category, index) => (
                  <Badge key={index} colorScheme={category.color || "cyan"}>
                    {category.label}
                  </Badge>
                ))}
                {product.brand && (
                  <Badge variant="outline" colorScheme="gray">
                    {product.brand}
                  </Badge>
                )}
                {isLowStock && (
                  <Badge colorScheme="orange">Pocas unidades</Badge>
                )}
                {!isInStock && <Badge colorScheme="red">Agotado</Badge>}
              </HStack>

              <Heading fontSize={"4xl"} mb={4} color="white">
                {product.name}
              </Heading>

              <Text color="dark.textSecondary" fontSize="lg">
                {product.excerpt}
              </Text>
            </Box>

            {/* Product Images */}
            <Box>
              <Box
                h={"400px"}
                bg={"dark.border"}
                rounded={"lg"}
                position={"relative"}
                overflow={"hidden"}
                mb={4}
              >
                {!imageLoaded && (
                  <Skeleton h="full" w="full" position="absolute" top={0} left={0} />
                )}
                <Image
                  src={product.images[mainImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1280px) 100vw, 800px"
                  style={{
                    objectFit: "cover",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </Box>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <SimpleGrid columns={product.images.length} spacing={2}>
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      h="80px"
                      bg="dark.border"
                      rounded="md"
                      position="relative"
                      overflow="hidden"
                      cursor="pointer"
                      border="2px"
                      borderColor={
                        mainImage === index ? "accent.cyan" : "transparent"
                      }
                      onClick={() => {
                        setMainImage(index);
                        setImageLoaded(false);
                      }}
                      transition="all 0.2s"
                      _hover={{ borderColor: "accent.cyan" }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        sizes="100px"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              {/* Image Disclaimer */}
              <Box
                mt={3}
                p={3}
                bg="dark.bgAlt"
                rounded="md"
                border="1px"
                borderColor="dark.border"
              >
                <Text fontSize="xs" color="dark.textSecondary" lineHeight="tall">
                  <strong>Crédito de imágenes:</strong> Las fotografías mostradas son propiedad de {product.brand || "la marca fabricante"} y
                  se utilizan con fines informativos.
                </Text>
              </Box>
            </Box>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <Box
                bg="dark.surface"
                p={6}
                rounded="lg"
                border="1px"
                borderColor="dark.border"
              >
                <Heading size="md" mb={4} color="white">
                  Características principales
                </Heading>
                <List spacing={2}>
                  {product.features.map((feature, index) => (
                    <ListItem key={index} color="dark.text">
                      <ListIcon as={CheckCircleIcon} color="accent.cyan" />
                      {feature}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            <Divider borderColor="dark.border" />

            {/* Product Description */}
            <Box
              className="product-content"
              color="dark.text"
              sx={{
                "& h1": {
                  fontSize: "3xl",
                  fontWeight: "bold",
                  mb: 4,
                  mt: 8,
                  color: "white",
                },
                "& h2": {
                  fontSize: "2xl",
                  fontWeight: "bold",
                  mb: 3,
                  mt: 6,
                  color: "accent.cyan",
                },
                "& h3": {
                  fontSize: "xl",
                  fontWeight: "semibold",
                  mb: 2,
                  mt: 4,
                  color: "white",
                },
                "& p": {
                  mb: 4,
                  lineHeight: "tall",
                  color: "dark.text",
                },
                "& ul, & ol": {
                  mb: 4,
                  pl: 6,
                },
                "& li": {
                  mb: 2,
                  color: "dark.text",
                },
                "& strong": {
                  fontWeight: "bold",
                  color: "accent.cyan",
                },
                "& code": {
                  bg: "dark.surface",
                  px: 2,
                  py: 1,
                  rounded: "md",
                  fontSize: "sm",
                  color: "accent.cyan",
                },
              }}
            >
              <ReactMarkdown>{product.content}</ReactMarkdown>
            </Box>

            <Divider borderColor="dark.border" />

            {/* CTA */}
            <Box
              bg="dark.surface"
              p={6}
              rounded={"lg"}
              border="1px"
              borderColor="dark.border"
            >
              <Heading size={"md"} mb={2} color="white">
                ¿Interesado en este producto?
              </Heading>
              <Text mb={4} color="dark.textSecondary">
                Contáctame para consultar disponibilidad, realizar tu pedido o
                resolver cualquier duda sobre este producto.
              </Text>
              <Button
                as="a"
                href="https://ig.me/m/juanjoeltiopez"
                target="_blank"
                rel="noopener noreferrer"
                bg="accent.cyan"
                color="white"
                _hover={{ bg: "accent.cyanHover" }}
                onClick={handleContactarClick}
              >
                Contactar por Instagram
              </Button>
            </Box>
          </Stack>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <VStack
            spacing={6}
            position={{ base: "relative", lg: "sticky" }}
            top={4}
            align="stretch"
          >
            {/* Price Card */}
            <Box
              bg="dark.surface"
              p={6}
              rounded="lg"
              border="1px"
              borderColor="dark.border"
            >
              <VStack align="stretch" spacing={4}>
                {/* Variant Selector */}
                {product.variants && product.variants.length > 1 && (
                  <Box>
                    <Text fontSize="sm" color="dark.textSecondary" mb={2}>
                      Presentación
                    </Text>
                    <VStack spacing={2} align="stretch">
                      {product.variants.map((variant, index) => (
                        <Box
                          key={variant.id}
                          p={3}
                          rounded="md"
                          border="2px"
                          borderColor={
                            selectedVariant === index ? "accent.cyan" : "dark.border"
                          }
                          cursor="pointer"
                          transition="all 0.2s"
                          _hover={{
                            borderColor: "accent.cyan",
                            bg: "dark.bgAlt",
                          }}
                          onClick={() => setSelectedVariant(index)}
                        >
                          <HStack justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color={selectedVariant === index ? "accent.cyan" : "white"}
                              >
                                {variant.name}
                              </Text>
                              {variant.stock !== "in_stock" && (
                                <Text fontSize="xs" color="red.400">
                                  {variant.stock === "low_stock" ? "Pocas unidades" : "Agotado"}
                                </Text>
                              )}
                            </VStack>
                            <Text
                              fontSize="md"
                              fontWeight="bold"
                              color={selectedVariant === index ? "accent.cyan" : "white"}
                            >
                              {formatPrice(variant.price, variant.currency)}
                            </Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}

                {product.variants && product.variants.length === 1 && (
                  <Box>
                    <Text fontSize="sm" color="dark.textSecondary" mb={1}>
                      Precio
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color="accent.cyan">
                      {formatPrice(currentVariant.price, currentVariant.currency)}
                    </Text>
                  </Box>
                )}

                <Divider borderColor="dark.border" />

                {/* Specifications */}
                {currentVariant?.specifications && (
                  <VStack align="stretch" spacing={2}>
                    {Object.entries(currentVariant.specifications).map(
                      ([key, value]) => (
                        <HStack key={key} justify="space-between" fontSize="sm">
                          <Text color="dark.textSecondary" textTransform="capitalize">
                            {key}:
                          </Text>
                          <Text color="white" fontWeight="medium">
                            {value}
                          </Text>
                        </HStack>
                      )
                    )}
                  </VStack>
                )}

                <Button
                  as="a"
                  href={isInStock ? "https://ig.me/m/juanjoeltiopez" : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  bg="accent.cyan"
                  color="white"
                  _hover={{ bg: "accent.cyanHover" }}
                  isDisabled={!isInStock}
                  w="full"
                  onClick={handleComprarClick}
                >
                  {isInStock ? "¡Quiero comprarlo!" : "Agotado"}
                </Button>

                {isInStock && (
                  <Text fontSize="xs" color="dark.textSecondary" textAlign="center">
                    Contáctame para consultar disponibilidad y entrega
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Related Videos */}
            {product.videoIds && product.videoIds.length > 0 && (
              <RelatedVideosWidget videoIds={product.videoIds} />
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <Box
                bg="dark.surface"
                p={6}
                rounded="lg"
                border="1px"
                borderColor="dark.border"
              >
                <Heading size="sm" mb={4} color="white">
                  Productos relacionados
                </Heading>
                <VStack spacing={3} align="stretch">
                  {relatedProducts.map(relatedProduct => (
                    <Box
                      key={relatedProduct.id}
                      as={NextLink}
                      href={`/tienda/${relatedProduct.slug}`}
                      display="block"
                      p={3}
                      rounded="md"
                      border="1px"
                      borderColor="dark.border"
                      transition="all 0.2s"
                      _hover={{
                        borderColor: "accent.cyan",
                        bg: "dark.bg",
                      }}
                    >
                      <HStack spacing={3}>
                        <Box
                          w="60px"
                          h="60px"
                          bg="dark.border"
                          rounded="md"
                          position="relative"
                          overflow="hidden"
                          flexShrink={0}
                        >
                          <Image
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            fill
                            sizes="60px"
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <VStack align="start" spacing={1} flex={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="white"
                            noOfLines={2}
                          >
                            {relatedProduct.name}
                          </Text>
                          <Text fontSize="sm" fontWeight="bold" color="accent.cyan">
                            {relatedProduct.variants?.[0]
                              ? formatPrice(relatedProduct.variants[0].price, relatedProduct.variants[0].currency)
                              : "N/A"
                            }
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
