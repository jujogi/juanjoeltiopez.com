"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

// Los pasos de la herramienta, de a uno en pantalla: arriba el progreso ("Paso 1 de 2" y una
// barra por paso, que también sirve para saltar a un paso ya habilitado) y abajo Atrás y
// Siguiente.

// labels: el nombre de cada paso · step: el actual (1, 2…) · isEnabled(n): si se puede ir
export function StepProgress({ labels, step, isEnabled, onGo, stepOf }) {
  return (
    <Box as="nav" aria-label={stepOf(step, labels.length)} mb={{ base: 6, md: 8 }}>
      <Text fontSize="sm" fontWeight="600" color="dark.textSecondary" mb={3}>
        {stepOf(step, labels.length)}
      </Text>
      <HStack as="ol" listStyleType="none" spacing={2} align="stretch">
        {labels.map((label, i) => {
          const n = i + 1;
          const isCurrent = n === step;
          return (
            <Box as="li" key={label} flex="1" minW={0}>
              <Button
                variant="unstyled"
                display="block"
                w="full"
                h="auto"
                textAlign="left"
                isDisabled={!isEnabled(n)}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => onGo(n)}
                _disabled={{ cursor: "not-allowed" }}
              >
                <Box h={1.5} rounded="full" bg={n <= step ? "accent.cyan" : "dark.border"} />
                <Text
                  mt={2}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight={isCurrent ? "700" : "500"}
                  color={isCurrent ? "white" : "dark.textMuted"}
                  noOfLines={1}
                >
                  {label}
                </Text>
              </Button>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}

// onBack o onNext en null no muestran ese botón
export function StepNav({ backLabel, nextLabel, onBack, onNext }) {
  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap={3} mt={{ base: 8, md: 10 }}>
      {onBack ? (
        <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <Box />
      )}
      {onNext && (
        <Button
          size="lg"
          rightIcon={<ArrowForwardIcon />}
          bg="accent.cyan"
          color="water.950"
          _hover={{ bg: "accent.cyanHover" }}
          whiteSpace="normal"
          h="auto"
          py={3}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      )}
    </Flex>
  );
}
