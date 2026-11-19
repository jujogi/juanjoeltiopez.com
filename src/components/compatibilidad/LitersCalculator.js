"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { tankVolume } from "@/lib/tankVolume";
import { formatTank } from "@/lib/tankUnits";
import { MAX_LITERS } from "./useTankSelection";
import { useArmoniaLang } from "./useArmoniaLang";

const DECOR_STEP = 5;
// Acepta coma o punto decimal: "30,5" y "30.5"
const toNumber = text => Number(String(text).replace(",", "."));

// Calculadora de litros en una ventana: largo × ancho × alto del agua, menos lo que ocupa la
// decoración. En el celular ocupa toda la pantalla, para que el teclado no la tape.
// Las medidas van siempre en centímetros; el resultado se muestra en la unidad elegida (unit).
// onUse(liters) recibe los litros de agua cuando la persona decide usarlos.
export default function LitersCalculator({ isOpen, unit, onClose, onUse }) {
  const size = useBreakpointValue({ base: "full", md: "md" });
  const { lang, copy: allCopy } = useArmoniaLang();
  const copy = allCopy.litersCalculator;
  const unitName = allCopy.ui.units[unit].name;
  const vol = liters => formatTank(liters, unit);
  const [sizes, setSizes] = useState({ length: "", width: "", height: "" });
  const [decorPercent, setDecorPercent] = useState(copy.defaultDecorPercent);
  // Apagado, se usan todos los litros del acuario, sin descontar la decoración
  const [discountsDecor, setDiscountsDecor] = useState(true);
  const appliedPercent = discountsDecor ? decorPercent : 0;

  const volume = tankVolume({
    length: toNumber(sizes.length),
    width: toNumber(sizes.width),
    height: toNumber(sizes.height),
    decorPercent: appliedPercent,
  });
  const isTooBig = volume && volume.water > MAX_LITERS;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" />
      {/* La ventana se abre fuera de la página: lleva su propio idioma */}
      <ModalContent
        lang={lang}
        bg="dark.surface"
        border="1px"
        borderColor="dark.border"
        color="dark.text"
      >
        <ModalHeader fontFamily="body" fontSize="lg" color="white" pr={12}>
          {copy.title(unitName)}
        </ModalHeader>
        <ModalCloseButton aria-label={allCopy.ui.liters.close} />
        <ModalBody>
          <Text fontSize="sm" color="dark.textSecondary" mb={4}>
            {copy.help}
          </Text>

          <SimpleGrid columns={3} spacing={{ base: 2, md: 3 }}>
            {copy.fields.map(field => (
              <FormControl key={field.key}>
                <FormLabel fontSize="xs" color="dark.textSecondary" mb={1}>
                  {field.label}
                </FormLabel>
                <Input
                  inputMode="decimal"
                  px={3}
                  autoComplete="off"
                  value={sizes[field.key]}
                  onChange={e => setSizes({ ...sizes, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  bg="dark.bgAlt"
                  borderColor="dark.border"
                  color="white"
                />
              </FormControl>
            ))}
          </SimpleGrid>

          <FormControl mt={5} display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel fontSize="sm" color="white" mb={0} mr={3}>
              {copy.discountLabel}
            </FormLabel>
            <Switch
              isChecked={discountsDecor}
              onChange={e => setDiscountsDecor(e.target.checked)}
              sx={{
                ".chakra-switch__track": { bg: "dark.border" },
                ".chakra-switch__track[data-checked]": { bg: "accent.cyan" },
              }}
            />
          </FormControl>
          <Text fontSize="xs" color="dark.textMuted" mt={2}>
            {copy.decorHelp}
          </Text>

          <FormControl
            mt={4}
            isDisabled={!discountsDecor}
            opacity={discountsDecor ? 1 : 0.4}
            transition="opacity 0.2s ease"
          >
            <Flex justify="space-between" align="baseline">
              <FormLabel fontSize="xs" color="dark.textSecondary" mb={1}>
                {copy.decorLabel}
              </FormLabel>
              <Text fontSize="md" fontWeight="700" color="accent.cyan" aria-hidden="true">
                {decorPercent}%
              </Text>
            </Flex>
            <Slider
              min={0}
              max={copy.maxDecorPercent}
              step={DECOR_STEP}
              value={decorPercent}
              isDisabled={!discountsDecor}
              onChange={setDecorPercent}
              getAriaValueText={value => `${value}%`}
              focusThumbOnChange={false}
            >
              <SliderTrack bg="dark.border">
                <SliderFilledTrack bg="accent.cyan" />
              </SliderTrack>
              <SliderThumb boxSize={5} />
            </Slider>
            <Flex justify="space-between" fontSize="xs" color="dark.textMuted">
              <Text>0%</Text>
              <Text>{copy.maxDecorPercent}%</Text>
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter display="block" borderTop="1px" borderColor="dark.border" aria-live="polite">
          {volume ? (
            <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
              <Box>
                <Text fontSize="sm" color="dark.textSecondary">
                  {copy.result}{" "}
                  <Text as="strong" fontSize="xl" color="white">
                    {vol(volume.water)}
                  </Text>
                </Text>
                <Text fontSize="xs" color="dark.textMuted">
                  {isTooBig
                    ? copy.tooBig(vol(MAX_LITERS))
                    : discountsDecor
                      ? copy.resultDetail(vol(volume.total), decorPercent)
                      : copy.resultTotal}
                </Text>
              </Box>
              <Button size="sm" onClick={() => onUse(volume.water)} isDisabled={isTooBig}>
                {copy.use(vol(volume.water))}
              </Button>
            </Flex>
          ) : (
            <Text fontSize="sm" color="dark.textSecondary">
              {copy.empty(unitName)}
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
