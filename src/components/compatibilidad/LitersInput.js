"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { litersCalculator } from "@/lib/compatibilidadData";
import { trackArmonia } from "@/lib/gtm";
import { MAX_LITERS } from "./useTankSelection";
import Chip from "./Chip";
import LitersCalculator from "./LitersCalculator";

const LITER_PRESETS = [20, 40, 60, 100, 200];

// Litros del acuario: campo numérico, tamaños comunes de un toque y, para quien no los
// sabe, una calculadora que se abre en una ventana
export default function LitersInput({ liters, onChange, labelledBy }) {
  const [isCalculating, setIsCalculating] = useState(false);

  const openCalculator = () => {
    trackArmonia("abrir_calculadora");
    setIsCalculating(true);
  };

  const applyCalculated = value => {
    onChange(String(value));
    trackArmonia("litros", { litros: value, origen: "calculadora" });
    setIsCalculating(false);
  };

  return (
    <Box>
      <Stack direction="row" wrap="wrap" spacing={3} align="center">
        <InputGroup w="150px">
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_LITERS}
            value={liters}
            onChange={e => onChange(e.target.value)}
            // Se registra al salir del campo, no en cada tecla
            onBlur={() =>
              liters && trackArmonia("litros", { litros: Number(liters), origen: "campo" })
            }
            placeholder="Ej: 60"
            aria-labelledby={labelledBy}
            aria-required="true"
            bg="dark.surface"
            borderColor="dark.border"
            color="white"
          />
          <InputRightAddon bg="dark.surfaceRaised" borderColor="dark.border" color="dark.text">
            L
          </InputRightAddon>
        </InputGroup>
        <Wrap spacing={2}>
          {LITER_PRESETS.map(preset => (
            <WrapItem key={preset}>
              <Chip
                isSelected={Number(liters) === preset}
                onClick={() => {
                  onChange(String(preset));
                  trackArmonia("litros", { litros: preset, origen: "boton" });
                }}
              >
                {preset} L
              </Chip>
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
      <Button
        variant="link"
        size="sm"
        mt={3}
        color="accent.cyan"
        fontWeight="600"
        whiteSpace="normal"
        textAlign="left"
        aria-haspopup="dialog"
        onClick={openCalculator}
      >
        {litersCalculator.toggle}
      </Button>
      <LitersCalculator
        isOpen={isCalculating}
        onClose={() => setIsCalculating(false)}
        onUse={applyCalculated}
      />
    </Box>
  );
}
