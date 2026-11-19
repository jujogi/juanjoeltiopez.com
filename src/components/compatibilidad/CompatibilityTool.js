"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { CheckCircleIcon, LinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { species, getSpeciesById } from "@/lib/speciesData";
import { checkCompatibility, fitWithTank } from "@/lib/compatibility";
import { trackArmonia } from "@/lib/gtm";
import { formatTank } from "@/lib/tankUnits";
import { useTankSelection } from "./useTankSelection";
import { useArmoniaLang } from "./useArmoniaLang";
import SelectedSpeciesCard from "./SelectedSpeciesCard";
import CompatibilityResult from "./CompatibilityResult";
import SpeciesSearch from "./SpeciesSearch";
import LitersInput from "./LitersInput";
import Chip from "./Chip";

const TOAST_MS = 2500;
const countOf = type => species.filter(s => s.type === type).length;
const SPECIES_COUNT = [countOf("fish"), countOf("shrimp"), countOf("snail")];

// Los pasos que todavía no se pueden usar se ven atenuados
const StepHeading = ({ step, id, isDimmed, children }) => (
  <Heading
    as="h2"
    id={id}
    fontSize={{ base: "xl", md: "2xl" }}
    color="white"
    mb={4}
    opacity={isDimmed ? 0.5 : 1}
  >
    <Text as="span" color="accent.cyan" mr={2}>
      {step}.
    </Text>
    {children}
  </Heading>
);

const ToastPill = ({ children }) => (
  <HStack
    role="status"
    bg="dark.surfaceRaised"
    border="1px"
    borderColor="accent.cyan"
    rounded="full"
    px={4}
    py={2.5}
    spacing={2}
    boxShadow="dark-lg"
    w="fit-content"
    mx="auto"
  >
    <CheckCircleIcon color="accent.cyan" />
    <Text fontSize="sm" fontWeight="600" color="white">
      {children}
    </Text>
  </HStack>
);

const ActionButton = props => (
  <Button size="sm" variant="ghost" border="1px" borderColor="dark.border" {...props} />
);

const Placeholder = ({ children }) => (
  <Box
    color="dark.textSecondary"
    bg="dark.surface"
    border="1px"
    borderColor="dark.border"
    rounded="xl"
    p={{ base: 4, md: 6 }}
  >
    {children}
  </Box>
);

export default function CompatibilityTool() {
  const toast = useToast();
  const {
    size,
    unit,
    liters: litersNumber,
    selection,
    setSize,
    setUnit,
    setLiters,
    addSpecies,
    removeSpecies,
    setQty,
    reset,
  } = useTankSelection();
  const { lang, copy } = useArmoniaLang();
  const t = copy.ui.tool;
  const unitName = copy.ui.units[unit].name;

  // Los litros son obligatorios para empezar. La excepción es llegar con especies ya elegidas
  // (desde un artículo o un enlace compartido): ahí se muestra el resultado de una vez, sin la
  // revisión del acuario, y se pide completar los litros.
  const isLocked = !litersNumber && selection.length === 0;
  const needsLiters = !litersNumber && selection.length > 0;
  const result = isLocked ? null : checkCompatibility(selection, litersNumber, lang, unit);
  const hasChoices = Boolean(size) || selection.length > 0;
  const entries = selection.map(e => ({ species: getSpeciesById(e.id, lang), qty: e.qty }));

  // Con especies en el acuario, cada sugerencia del buscador muestra cómo encajaría
  const fitById = useMemo(
    () =>
      isLocked || selection.length === 0
        ? {}
        : Object.fromEntries(species.map(s => [s.id, fitWithTank(selection, litersNumber, s.id)])),
    [isLocked, selection, litersNumber]
  );

  const notify = message =>
    toast({
      duration: TOAST_MS,
      position: "bottom",
      render: () => <ToastPill>{message}</ToastPill>,
    });

  const onAdd = id => {
    addSpecies(id);
    trackArmonia("agregar_especie", {
      especie: getSpeciesById(id).name,
      total_especies: selection.length + 1,
    });
    notify(t.added(getSpeciesById(id, lang).name));
  };

  // origen: "resultado" (la etiqueta del veredicto) o "ficha" (la tarjeta de la especie)
  const onRemove = (id, origen) => {
    removeSpecies(id);
    trackArmonia("quitar_especie", { especie: getSpeciesById(id).name, origen });
  };

  const onQtyChange = (id, qty) => {
    setQty(id, qty);
    trackArmonia("cantidad", { especie: getSpeciesById(id).name, cantidad: qty });
  };

  const onStarterCombo = combo => {
    addSpecies(...combo.ids);
    trackArmonia("combo", { combo: combo.labelEs || combo.label });
  };

  const onReset = () => {
    trackArmonia("empezar_de_nuevo", { total_especies: selection.length });
    reset();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    trackArmonia("copiar_enlace", { total_especies: selection.length });
    notify(t.linkCopied);
  };

  return (
    <Stack spacing={{ base: 10, md: 12 }}>
      <Box as="section" aria-labelledby="paso-litros">
        <StepHeading step={1} id="paso-litros">
          {t.litersStep(unitName)}
        </StepHeading>
        <LitersInput
          size={size}
          unit={unit}
          onChange={setSize}
          onUnitChange={setUnit}
          onLitersChange={setLiters}
          labelledBy="paso-litros"
        />
        {needsLiters && (
          <Text role="status" fontSize="sm" fontWeight="600" color="accent.sand" mt={3}>
            {t.needsLiters(unitName)}
          </Text>
        )}
      </Box>

      <Box as="section" aria-labelledby="paso-especies">
        <StepHeading step={2} id="paso-especies" isDimmed={isLocked}>
          {t.speciesStep}
        </StepHeading>
        <SpeciesSearch
          selectedIds={selection.map(e => e.id)}
          fitById={fitById}
          onAdd={onAdd}
          isDisabled={isLocked}
        />
        <Text fontSize="sm" color="dark.textSecondary" mt={3}>
          {isLocked ? t.lockedHint(unitName) : t.speciesCount(...SPECIES_COUNT)}
        </Text>
      </Box>

      <Box as="section" aria-labelledby="paso-resultado">
        <Flex justify="space-between" align="start" wrap="wrap" columnGap={4}>
          <StepHeading step={3} id="paso-resultado" isDimmed={isLocked}>
            {t.resultStep}
          </StepHeading>
          <Wrap spacing={2} mb={4}>
            {result && (
              <WrapItem>
                <ActionButton leftIcon={<LinkIcon />} onClick={copyLink}>
                  {t.copyLink}
                </ActionButton>
              </WrapItem>
            )}
            {hasChoices && (
              <WrapItem>
                <ActionButton leftIcon={<RepeatIcon />} onClick={onReset}>
                  {t.reset}
                </ActionButton>
              </WrapItem>
            )}
          </Wrap>
        </Flex>
        {result ? (
          <Stack spacing={8}>
            {/* El veredicto va primero: es la respuesta, y queda a la vista al agregar una especie */}
            <CompatibilityResult
              result={result}
              entries={entries}
              unit={unit}
              onRemove={id => onRemove(id, "resultado")}
            />
            <Box as="section" aria-labelledby="tu-acuario">
              <Heading as="h3" id="tu-acuario" fontSize="lg" color="white" mb={3}>
                {t.yourTank(litersNumber && formatTank(litersNumber, unit))}
              </Heading>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3} alignItems="start">
                {selection.map(entry => (
                  <SelectedSpeciesCard
                    key={entry.id}
                    species={getSpeciesById(entry.id, lang)}
                    qty={entry.qty}
                    unit={unit}
                    tankLiters={litersNumber}
                    onQtyChange={qty => onQtyChange(entry.id, qty)}
                    onRemove={() => onRemove(entry.id, "ficha")}
                  />
                ))}
              </SimpleGrid>
              <Text fontSize="xs" color="dark.textMuted" mt={3}>
                {t.photosNote}
              </Text>
            </Box>
          </Stack>
        ) : (
          <Placeholder>
            <Text>{isLocked ? t.placeholderLocked(unitName) : t.placeholderEmpty}</Text>
            {!isLocked && (
              <>
                <Text fontSize="sm" mt={4} mb={2}>
                  {t.startersLabel}
                </Text>
                <Wrap spacing={2}>
                  {copy.starterCombos.map(combo => (
                    <WrapItem key={combo.label}>
                      <Chip onClick={() => onStarterCombo(combo)}>{combo.label}</Chip>
                    </WrapItem>
                  ))}
                </Wrap>
              </>
            )}
          </Placeholder>
        )}
      </Box>
    </Stack>
  );
}
