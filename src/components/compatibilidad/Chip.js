"use client";

import { Button } from "@chakra-ui/react";

// Botón tipo píldora: opción elegible (litros sugeridos, combinaciones de ejemplo)
export default function Chip({ isSelected, children, ...props }) {
  return (
    <Button
      size="sm"
      variant="unstyled"
      display="inline-flex"
      px={4}
      border="1px"
      borderColor={isSelected ? "accent.cyan" : "dark.border"}
      bg={isSelected ? "accent.cyan" : "dark.surface"}
      color={isSelected ? "water.950" : "dark.text"}
      _hover={{ borderColor: "accent.cyan" }}
      aria-pressed={isSelected}
      {...props}
    >
      {children}
    </Button>
  );
}
