"use client";

import { useState } from "react";
import { Box, Button, ButtonGroup, Flex, Input, Text } from "@chakra-ui/react";
import { trackElegir } from "@/lib/gtm";
import { UNITS, VOLUME_PRESETS, tankInUnit, toLiters } from "@/lib/tankUnits";
import Chip from "@/components/compatibilidad/Chip";
import LitersCalculator from "@/components/compatibilidad/LitersCalculator";
import { StepNav } from "@/components/compatibilidad/ToolSteps";
import { MAX_LITERS, useAdvisorQuery } from "./useAdvisorQuery";

// Pregunta 1: el tamaño del acuario. Campo numérico, botones de unidad, tamaños comunes de un
// toque y la calculadora de litros de Armonía Acuática. Lo escrito vive aquí hasta que la
// persona sigue; ahí se guarda en la URL, siempre en litros.
// onNext: pasar a la siguiente pregunta · labelledBy: id del título de la pregunta
export default function TankStep({ onNext, labelledBy }) {
  const { liters, unit, lang, copy, update } = useAdvisorQuery();
  const { ui, questions } = copy;
  const units = ui.units;
  // null: todavía no escribe nada y el campo muestra lo que hay en la URL
  const [text, setText] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const shown = text ?? (liters ? String(tankInUnit(liters, unit)) : "");
  const value = Number(shown);
  const isValid = value > 0 && toLiters(value, unit) <= MAX_LITERS;

  // Cambiar de unidad conserva el número escrito (60 L → 60 gal), igual que en Armonía
  const changeUnit = next => {
    if (next === unit) return;
    setText(shown);
    update({ unit: next, liters: shown && isValid ? toLiters(value, next) : liters });
    trackElegir("unidad", { unidad: next });
  };

  const goNext = (newLiters, origen) => {
    update({ liters: newLiters });
    trackElegir("litros", { litros: Math.round(newLiters), unidad: unit, origen });
    onNext();
  };

  // Enter en el campo (el formulario) o el botón Siguiente
  const submit = event => {
    event?.preventDefault();
    if (!isValid) return setShowMissing(true);
    goNext(toLiters(value, unit), "campo");
  };

  return (
    <Box as="form" onSubmit={submit} noValidate>
      <Flex gap={3} align="stretch" maxW="640px">
        <Input
          type="number"
          inputMode="decimal"
          min={1}
          max={tankInUnit(MAX_LITERS, unit)}
          step="any"
          value={shown}
          onChange={e => {
            setText(e.target.value);
            setShowMissing(false);
          }}
          placeholder={unit === "gal" ? "20" : "60"}
          aria-labelledby={labelledBy}
          aria-describedby={showMissing ? "elegir-litros-pista" : undefined}
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
      {showMissing && (
        <Text
          id="elegir-litros-pista"
          role="alert"
          fontSize="sm"
          fontWeight="600"
          color="accent.sand"
          mt={2}
        >
          {questions.tank.missing(units[unit].name)}
        </Text>
      )}

      {/* En el celular, cinco columnas iguales: caben en una línea en litros y en galones */}
      <Box
        display={{ base: "grid", md: "flex" }}
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        flexWrap="wrap"
        gap={2}
        mt={4}
      >
        {VOLUME_PRESETS[unit].map(preset => (
          <Chip
            key={preset}
            isSelected={value === preset}
            onClick={() => {
              setText(String(preset));
              goNext(toLiters(preset, unit), "boton");
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
        onClick={() => {
          trackElegir("abrir_calculadora");
          setIsCalculating(true);
        }}
      >
        {questions.tank.calculator(units[unit].name)}
      </Button>
      {/* La calculadora toma el idioma de la URL al montarse: con key se vuelve a montar si
          cambia el idioma */}
      <LitersCalculator
        key={lang}
        isOpen={isCalculating}
        unit={unit}
        onClose={() => setIsCalculating(false)}
        onUse={calculated => {
          setIsCalculating(false);
          setText(String(tankInUnit(calculated, unit)));
          goNext(calculated, "calculadora");
        }}
      />

      {/* Sin litros el botón no se apaga: dice qué falta, como en Armonía */}
      <StepNav nextLabel={ui.next} onNext={() => submit()} />
    </Box>
  );
}
