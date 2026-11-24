"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { CheckCircleIcon, LinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaShareAlt } from "react-icons/fa";
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
import { StepNav, StepProgress } from "./ToolSteps";

const TOAST_MS = 2500;
const countOf = type => species.filter(s => s.type === type).length;
const SPECIES_COUNT = [countOf("fish"), countOf("shrimp"), countOf("snail")];
const STEP_IDS = ["paso-litros", "paso-especies"];

// En el celular (pantalla táctil con el menú de compartir del sistema) se comparte directo a
// WhatsApp, Instagram…; en el computador se copia el enlace. En el servidor no se sabe.
const noSubscribe = () => () => {};
const getCanShare = () =>
  typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches;
const getServerCanShare = () => false;

// Copia un texto. navigator.clipboard solo existe en https (y falta en algunos navegadores
// dentro de apps): sin él se copia a la antigua, desde un campo temporal. Devuelve si copió.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    // En iOS select() no basta: hay que marcar el rango
    field.select();
    field.setSelectionRange(0, text.length);
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }
}

// tabIndex -1: al cambiar de paso el foco pasa al título del paso nuevo
const StepHeading = ({ id, headingRef, children }) => (
  <Heading
    as="h2"
    id={id}
    ref={headingRef}
    tabIndex={-1}
    fontSize={{ base: "2xl", md: "3xl" }}
    color="white"
    mb={2}
    _focus={{ outline: "none" }}
  >
    {children}
  </Heading>
);

const StepIntro = ({ children }) => (
  <Text color="dark.textSecondary" lineHeight="1.6" mb={6}>
    {children}
  </Text>
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

// Copiar enlace (o Compartir en el celular) y Empezar de nuevo
const ResultActions = ({ canShare, t, onShare, onCopy, onReset, ...props }) => (
  <Wrap spacing={2} {...props}>
    <WrapItem>
      {canShare ? (
        <ActionButton leftIcon={<Icon as={FaShareAlt} />} onClick={onShare}>
          {t.share}
        </ActionButton>
      ) : (
        <ActionButton leftIcon={<LinkIcon />} onClick={onCopy}>
          {t.copyLink}
        </ActionButton>
      )}
    </WrapItem>
    <WrapItem>
      <ActionButton leftIcon={<RepeatIcon />} onClick={onReset}>
        {t.reset}
      </ActionButton>
    </WrapItem>
  </Wrap>
);

const ActionButton = props => (
  <Button size="sm" variant="ghost" border="1px" borderColor="dark.border" {...props} />
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
  const canShare = useSyncExternalStore(noSubscribe, getCanShare, getServerCanShare);

  // Dos pasos: el acuario, y las especies con su resultado en vivo. El paso lo elige la
  // persona. Mientras no haya elegido, quien llega con especies ya elegidas (desde un artículo
  // o un enlace compartido) va directo al paso 2; si le faltan los litros, el resultado se los
  // pide.
  const [chosenStep, setChosenStep] = useState(null);
  const hasSpecies = selection.length > 0;
  const step = chosenStep ?? (hasSpecies ? 2 : 1);
  const isEnabled = n => n === 1 || Boolean(litersNumber) || hasSpecies;

  const toolRef = useRef(null);
  const litersRef = useRef(null);
  const [askLiters, setAskLiters] = useState(false);
  const headingRef = useRef(null);
  const resultRef = useRef(null);
  const hasNavigated = useRef(false);
  const isArriving = useRef(true);

  // Al cambiar de paso, el paso nuevo queda arriba y su título recibe el foco (lector de
  // pantalla y teclado). Va antes de pintar y sin animación: si no, se alcanza a ver el paso
  // nuevo en la posición vieja y después la página se desliza. No pasa al cargar la página.
  useLayoutEffect(() => {
    if (!hasNavigated.current) return;
    if (toolRef.current.getBoundingClientRect().top < 0)
      toolRef.current.scrollIntoView({ behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // Quien llega con especies ya elegidas (desde la home, un artículo o un enlace compartido) va
  // directo al resultado. Al hidratar, el primer render todavía no tiene la URL: se espera a
  // que lleguen las especies. Solo pasa una vez, al llegar.
  useEffect(() => {
    if (!isArriving.current) return;
    if (!new URLSearchParams(window.location.search).get("p")) {
      isArriving.current = false;
      return;
    }
    if (!hasSpecies) return;
    isArriving.current = false;
    resultRef.current?.scrollIntoView({ behavior: "instant" });
  }, [hasSpecies]);

  const goTo = n => {
    hasNavigated.current = true;
    setChosenStep(n);
    trackArmonia("paso", { paso: n });
  };

  const onToSpecies = () => {
    if (litersNumber || hasSpecies) return goTo(2);
    setAskLiters(true);
    litersRef.current?.focus();
  };

  const result = hasSpecies ? checkCompatibility(selection, litersNumber, lang, unit) : null;
  const entries = selection.map(e => ({ species: getSpeciesById(e.id, lang), qty: e.qty }));

  // Con especies en el acuario, cada sugerencia del buscador muestra cómo encajaría
  const fitById = useMemo(
    () =>
      hasSpecies
        ? Object.fromEntries(species.map(s => [s.id, fitWithTank(selection, litersNumber, s.id)]))
        : {},
    [hasSpecies, selection, litersNumber]
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

  // origen: "resultado" (la etiqueta del veredicto) o "ficha" (la tarjeta)
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

  // Con el tamaño del acuario se queda en el paso de las especies: el resultado desaparece, así
  // que el paso queda arriba y el foco va a su título. Sin tamaño (llegó desde un enlace con
  // especies pero sin litros) vuelve al paso 1, que es lo que falta.
  const onReset = () => {
    trackArmonia("empezar_de_nuevo", { total_especies: selection.length });
    reset();
    if (!litersNumber) return goTo(1);
    // Sin especies, el paso por defecto sería el 1: se fija el 2
    setChosenStep(2);
    if (toolRef.current.getBoundingClientRect().top < 0)
      toolRef.current.scrollIntoView({ behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  };

  const copyLink = async () => {
    if (!(await copyText(window.location.href))) return notify(t.linkNotCopied);
    trackArmonia("copiar_enlace", { total_especies: selection.length });
    notify(t.linkCopied);
  };

  // Si la persona cierra el menú sin compartir, no pasa nada
  const shareLink = async () => {
    try {
      await navigator.share({
        title: copy.compatibilidad.name,
        text: t.shareText,
        url: window.location.href,
      });
      trackArmonia("compartir", { total_especies: selection.length });
    } catch {}
  };

  // El paso 1 muestra el acuario elegido: "Tu acuario · 60 L"
  const stepLabels = t.steps.map((label, i) =>
    i === 0 && litersNumber ? `${label} · ${formatTank(litersNumber, unit)}` : label
  );
  const resultActions = {
    canShare,
    t,
    onShare: shareLink,
    onCopy: copyLink,
    onReset,
  };

  const headingId = STEP_IDS[step - 1];

  return (
    <Box
      ref={toolRef}
      scrollMarginTop="88px"
      bg="dark.bgAlt"
      border="1px"
      borderColor="dark.border"
      rounded="2xl"
      p={{ base: 3, md: 8 }}
    >
      <StepProgress
        labels={stepLabels}
        step={step}
        isEnabled={isEnabled}
        onGo={goTo}
        stepOf={t.stepOf}
      />

      {step === 1 && (
        <Box as="section" aria-labelledby={headingId}>
          <StepHeading id={headingId} headingRef={headingRef}>
            {t.litersStep}
          </StepHeading>
          <StepIntro>{t.litersIntro}</StepIntro>
          <LitersInput
            size={size}
            unit={unit}
            onChange={setSize}
            onUnitChange={setUnit}
            onLitersChange={setLiters}
            labelledBy={headingId}
            inputRef={litersRef}
            hint={askLiters && !litersNumber ? t.litersRequired(unitName) : null}
          />
          {/* Sin litros el botón no se apaga: lleva al campo y dice qué falta */}
          <StepNav nextLabel={t.toSpecies} onNext={onToSpecies} />
        </Box>
      )}

      {step === 2 && (
        <Box as="section" aria-labelledby={headingId}>
          <StepHeading id={headingId} headingRef={headingRef}>
            {t.speciesStep}
          </StepHeading>
          <StepIntro>{t.speciesCount(...SPECIES_COUNT)}</StepIntro>
          <SpeciesSearch selectedIds={selection.map(e => e.id)} fitById={fitById} onAdd={onAdd} />

          {/* El resultado se actualiza en vivo con cada especie que se agrega o se quita */}
          {hasSpecies ? (
            <Box
              as="section"
              aria-labelledby="resultado"
              ref={resultRef}
              scrollMarginTop="88px"
              mt={{ base: 8, md: 10 }}
            >
              <Flex justify="space-between" align="start" wrap="wrap" gap={3} mb={4}>
                <Heading as="h3" id="resultado" fontSize={{ base: "xl", md: "2xl" }} color="white">
                  {t.resultStep}
                </Heading>
                {/* En el celular van debajo del veredicto, para que el veredicto se vea primero */}
                <ResultActions {...resultActions} display={{ base: "none", md: "flex" }} />
              </Flex>
              {!litersNumber && (
                <Flex
                  role="status"
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  gap={3}
                  mb={6}
                  p={4}
                  bg="dark.surface"
                  border="1px"
                  borderColor="accent.sand"
                  rounded="xl"
                >
                  <Text fontSize="sm" fontWeight="600" color="accent.sand">
                    {t.needsLiters(unitName)}
                  </Text>
                  <ActionButton onClick={() => goTo(1)}>{t.addLiters(unitName)}</ActionButton>
                </Flex>
              )}
              <Stack spacing={8}>
                <CompatibilityResult
                  result={result}
                  entries={entries}
                  unit={unit}
                  onRemove={id => onRemove(id, "resultado")}
                  onChangeTank={() => goTo(1)}
                />
                <ResultActions {...resultActions} display={{ base: "flex", md: "none" }} />
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
            </Box>
          ) : (
            <Box mt={6}>
              <Text fontSize="sm" color="dark.textSecondary" mb={3}>
                {t.startersLabel}
              </Text>
              <Wrap spacing={2}>
                {copy.starterCombos.map(combo => (
                  <WrapItem key={combo.label}>
                    <Chip onClick={() => onStarterCombo(combo)}>{combo.label}</Chip>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          )}
          <StepNav backLabel={t.toTank} onBack={() => goTo(1)} />
        </Box>
      )}
    </Box>
  );
}
