"use client";

import { Input, InputGroup, InputRightAddon, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { MAX_LITERS } from "./useTankSelection";
import Chip from "./Chip";

const LITER_PRESETS = [20, 40, 60, 100, 200];

// Litros del acuario: campo numérico y tamaños comunes de un toque
export default function LitersInput({ liters, onChange, labelledBy }) {
  return (
    <Stack direction="row" wrap="wrap" spacing={3} align="center">
      <InputGroup w="150px">
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX_LITERS}
          value={liters}
          onChange={e => onChange(e.target.value)}
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
            <Chip isSelected={Number(liters) === preset} onClick={() => onChange(String(preset))}>
              {preset} L
            </Chip>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
}
