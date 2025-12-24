"use client";

import { Box, VStack, HStack, Text, Button, Divider } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "@/lib/priceUtils";

export default function ProductPurchaseCard({
  product,
  selectedVariant,
  setSelectedVariant,
  currentVariant,
  isInStock,
  whatsappLink,
  handleComprarClick,
}) {
  return (
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
                borderColor={selectedVariant === index ? "accent.cyan" : "dark.border"}
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
          {Object.entries(currentVariant.specifications).map(([key, value]) => (
            <HStack key={key} justify="space-between" fontSize="sm">
              <Text color="dark.textSecondary" textTransform="capitalize">
                {key}:
              </Text>
              <Text color="white" fontWeight="medium">
                {value}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}

      <Button
        as="a"
        href={isInStock ? whatsappLink : undefined}
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        bg="#25D366"
        color="white"
        _hover={{ bg: "#20BA5A" }}
        isDisabled={!isInStock}
        w="full"
        onClick={handleComprarClick}
        leftIcon={<FaWhatsapp />}
      >
        {isInStock ? "Comprar por WhatsApp" : "Agotado"}
      </Button>

      {isInStock && (
        <Text fontSize="xs" color="dark.textSecondary" textAlign="center">
          📱 Respuesta rápida • Envíos a toda Colombia
        </Text>
      )}
    </VStack>
  );
}
