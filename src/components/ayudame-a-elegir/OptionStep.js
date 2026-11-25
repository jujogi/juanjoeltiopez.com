"use client";

import { Button, SimpleGrid, Text } from "@chakra-ui/react";

// Una pregunta de opciones (experiencia, agua, meta): tarjetas grandes con su explicación.
// Elegir una ya pasa a la siguiente pregunta.
// options: [{ value, label, detail }] · selected: el value elegido · onSelect(value)
// disabled: { [value]: texto } con las opciones apagadas y por qué (en lugar de su detalle)
export default function OptionStep({ options, selected, onSelect, labelledBy, disabled = {} }) {
  return (
    <SimpleGrid
      role="group"
      aria-labelledby={labelledBy}
      columns={{ base: 1, md: options.length === 4 ? 2 : Math.min(options.length, 3) }}
      spacing={3}
    >
      {options.map(option => {
        const isSelected = option.value === selected;
        const disabledNote = disabled[option.value];
        return (
          <Button
            key={option.value}
            variant="unstyled"
            display="flex"
            flexDirection="column"
            alignItems="start"
            h="auto"
            minH={20}
            p={{ base: 4, md: 5 }}
            textAlign="left"
            whiteSpace="normal"
            bg={isSelected ? "dark.surfaceRaised" : "dark.surface"}
            border="1px"
            borderColor={isSelected ? "accent.cyan" : "dark.border"}
            rounded="xl"
            // El borde verde al pasar el mouse solo en computador: en el celular el "hover" se
            // queda pegado después de tocar, y la opción del paso siguiente que cae en el mismo
            // lugar parece elegida
            sx={{
              "@media (hover: hover)": {
                "&:hover:not(:disabled)": { borderColor: "accent.cyan" },
              },
            }}
            isDisabled={Boolean(disabledNote)}
            _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
            aria-pressed={isSelected}
            onClick={() => onSelect(option.value)}
          >
            <Text as="span" fontSize="lg" fontWeight="700" color="white">
              {option.label}
            </Text>
            <Text
              as="span"
              mt={1}
              fontSize="sm"
              fontWeight={disabledNote ? "600" : "400"}
              color={disabledNote ? "accent.sand" : "dark.textSecondary"}
            >
              {disabledNote || option.detail}
            </Text>
          </Button>
        );
      })}
    </SimpleGrid>
  );
}
