"use client";

import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Slider,
  Text,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { trackArmonia } from "@/lib/gtm";
import { UNITS, VOLUME_PRESETS, tankInUnit, toLiters } from "@/lib/tankUnits";
import { MAX_LITERS } from "./useTankSelection";
import Chip from "./Chip";
import LitersCalculator from "./LitersCalculator";
import { useArmoniaLang } from "./useArmoniaLang";

// Hasta dónde llega la barra en cada unidad (el campo acepta hasta MAX_LITERS) y de a cuánto
// avanza: hasta 500 en las dos unidades. Los acuarios más grandes se escriben en el campo.
const SLIDER = { l: { max: 500, step: 5 }, gal: { max: 500, step: 1 } };

// Tamaño del acuario: campo numérico grande, botones de unidad (litros o galones), una barra
// para deslizar, tamaños comunes de un toque y, para quien no lo sabe, una calculadora que se
// abre en una ventana.
// size: texto del campo en la unidad elegida · unit: "l" o "gal" · onLitersChange: para
// litros ya calculados (la calculadora), que se guardan tal cual · inputRef: el campo, para
// llevar el foco ahí · hint: aviso bajo el campo (qué falta para seguir)
// Analytics recibe siempre los litros, con la unidad que eligió la persona.
export default function LitersInput({
  size,
  unit,
  onChange,
  onUnitChange,
  onLitersChange,
  labelledBy,
  inputRef,
  hint,
}) {
  const [isCalculating, setIsCalculating] = useState(false);
  // Mientras se arrastra la barra, el valor vive aquí y la URL se escribe una sola vez al
  // soltar: Safari y Chrome rompen la página si se reescribe la URL decenas de veces por
  // segundo (history.replaceState tiene un límite)
  const [dragValue, setDragValue] = useState(null);
  const shown = dragValue === null ? size : String(dragValue);
  const { copy } = useArmoniaLang();
  const units = copy.ui.units;
  const slider = SLIDER[unit];

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
    <Box maxW="640px">
      <Flex gap={3} align="stretch">
        <Input
          ref={inputRef}
          type="number"
          inputMode="decimal"
          min={1}
          max={tankInUnit(MAX_LITERS, unit)}
          step="any"
          value={shown}
          onChange={e => onChange(e.target.value)}
          // Se registra al salir del campo, no en cada tecla
          onBlur={() => size && trackSize(size, "campo")}
          placeholder={copy.ui.liters.placeholder[unit]}
          aria-labelledby={labelledBy}
          aria-required="true"
          aria-describedby={hint ? "litros-pista" : undefined}
          flex="1"
          minW={0}
          h={14}
          fontSize="2xl"
          fontWeight="700"
          bg="dark.surface"
          borderColor="dark.border"
          color="white"
          rounded="xl"
        />
        <ButtonGroup
          isAttached
          role="group"
          aria-label={units.label}
          flexShrink={0}
          border="1px"
          borderColor="dark.border"
          rounded="xl"
          overflow="hidden"
        >
          {UNITS.map(option => {
            const isSelected = option === unit;
            return (
              <Button
                key={option}
                h={14}
                px={{ base: 3, md: 5 }}
                rounded="none"
                fontWeight="600"
                bg={isSelected ? "accent.cyan" : "dark.surface"}
                color={isSelected ? "water.950" : "dark.text"}
                _hover={{ bg: isSelected ? "accent.cyanHover" : "dark.surfaceRaised" }}
                aria-pressed={isSelected}
                onClick={() => changeUnit(option)}
              >
                {units[option].button}
              </Button>
            );
          })}
        </ButtonGroup>
      </Flex>
      {hint && (
        <Text
          id="litros-pista"
          role="alert"
          fontSize="sm"
          fontWeight="600"
          color="accent.sand"
          mt={2}
        >
          {hint}
        </Text>
      )}

      {/* Margen a los lados para que la manija no quede pegada al borde: en el celular ahí está
          el gesto de "atrás" */}
      <Box px={3} mt={2} mb={1}>
        <Slider
          aria-label={units.slider(units[unit].name)}
          min={0}
          max={slider.max}
          step={slider.step}
          // Un acuario más grande que la barra la deja al tope; el campo conserva el valor real
          value={Math.min(Number(shown) || 0, slider.max)}
          onChange={value => value > 0 && setDragValue(value)}
          onChangeEnd={value => {
            setDragValue(null);
            if (value <= 0) return;
            onChange(String(value));
            trackSize(value, "deslizador");
          }}
          focusThumbOnChange={false}
          // Más alto para que sea fácil de agarrar con el dedo
          py={4}
        >
          <SliderTrack bg="dark.border" h={1.5} rounded="full">
            <SliderFilledTrack bg="accent.cyan" />
          </SliderTrack>
          <SliderThumb
            boxSize={{ base: 6, md: 5 }}
            bg="accent.cyan"
            borderColor="water.950"
            border="3px"
          />
        </Slider>
      </Box>

      {/* En el celular, cinco columnas iguales: caben en una línea en litros y en galones */}
      <Box
        display={{ base: "grid", md: "flex" }}
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        flexWrap="wrap"
        gap={2}
      >
        {VOLUME_PRESETS[unit].map(preset => (
          <Chip
            key={preset}
            isSelected={Number(size) === preset}
            onClick={() => {
              onChange(String(preset));
              trackSize(preset, "boton");
            }}
            px={{ base: 1, md: 4 }}
            fontSize={{ base: "xs", md: "sm" }}
            justifyContent="center"
          >
            {preset} {units[unit].short}
          </Chip>
        ))}
      </Box>

      <Button
        variant="link"
        size="sm"
        mt={4}
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
