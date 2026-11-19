"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { trackArmonia } from "@/lib/gtm";
import { UNITS, VOLUME_PRESETS, tankInUnit, toLiters } from "@/lib/tankUnits";
import { MAX_LITERS } from "./useTankSelection";
import Chip from "./Chip";
import LitersCalculator from "./LitersCalculator";
import { useArmoniaLang } from "./useArmoniaLang";

// Tamaño del acuario: campo numérico con su unidad (un menú dentro del campo: litros o
// galones), tamaños comunes de un toque y, para quien no lo sabe, una calculadora que se abre
// en una ventana.
// size: texto del campo en la unidad elegida · unit: "l" o "gal" · onLitersChange: para
// litros ya calculados (la calculadora), que se guardan tal cual
// Analytics recibe siempre los litros, con la unidad que eligió la persona.
export default function LitersInput({
  size,
  unit,
  onChange,
  onUnitChange,
  onLitersChange,
  labelledBy,
}) {
  const [isCalculating, setIsCalculating] = useState(false);
  const { copy } = useArmoniaLang();
  const units = copy.ui.units;

  const trackSize = (value, origen) =>
    trackArmonia("litros", {
      litros: Math.round(toLiters(Number(value), unit)),
      origen,
      unidad: unit,
    });

  const changeUnit = next => {
    if (next === unit) return;
    onUnitChange(next);
    trackArmonia("unidad", { unidad: next });
  };

  const openCalculator = () => {
    trackArmonia("abrir_calculadora");
    setIsCalculating(true);
  };

  // La calculadora entrega litros: se guardan tal cual y el campo los muestra en su unidad
  const applyCalculated = liters => {
    onLitersChange(liters);
    trackArmonia("litros", { litros: Math.round(liters), origen: "calculadora", unidad: unit });
    setIsCalculating(false);
  };

  return (
    <Box>
      <Stack direction="row" wrap="wrap" spacing={3} align="center">
        <InputGroup w="170px">
          <Input
            type="number"
            inputMode="decimal"
            min={1}
            max={tankInUnit(MAX_LITERS, unit)}
            step="any"
            value={size}
            onChange={e => onChange(e.target.value)}
            // Se registra al salir del campo, no en cada tecla
            onBlur={() => size && trackSize(size, "campo")}
            placeholder={copy.ui.liters.placeholder[unit]}
            aria-labelledby={labelledBy}
            aria-required="true"
            bg="dark.surface"
            borderColor="dark.border"
            color="white"
          />
          {/* Un <select> nativo: en el celular abre el selector del sistema */}
          <InputRightAddon p={0} bg="dark.surfaceRaised" borderColor="dark.border">
            <Select
              value={unit}
              onChange={e => changeUnit(e.target.value)}
              aria-label={units.label}
              variant="unstyled"
              w="auto"
              h="full"
              pl={3}
              fontWeight="600"
              color="dark.text"
              cursor="pointer"
              sx={{ option: { bg: "dark.surfaceRaised", color: "dark.text" } }}
            >
              {UNITS.map(option => (
                <option key={option} value={option}>
                  {units[option].short}
                </option>
              ))}
            </Select>
          </InputRightAddon>
        </InputGroup>
        <Wrap spacing={2}>
          {VOLUME_PRESETS[unit].map(preset => (
            <WrapItem key={preset}>
              <Chip
                isSelected={Number(size) === preset}
                onClick={() => {
                  onChange(String(preset));
                  trackSize(preset, "boton");
                }}
              >
                {preset} {units[unit].short}
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
        {copy.litersCalculator.toggle(units[unit].name)}
      </Button>
      <LitersCalculator
        isOpen={isCalculating}
        unit={unit}
        onClose={() => setIsCalculating(false)}
        onUse={applyCalculated}
      />
    </Box>
  );
}
