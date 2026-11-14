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
import { starterCombos } from "@/lib/compatibilidadData";
import { useTankSelection } from "./useTankSelection";
import SelectedSpeciesCard from "./SelectedSpeciesCard";
import CompatibilityResult from "./CompatibilityResult";
import SpeciesSearch from "./SpeciesSearch";
import LitersInput from "./LitersInput";
import Chip from "./Chip";

const TOAST_MS = 2500;
const FISH_COUNT = species.filter(s => s.type === "fish").length;
const SHRIMP_COUNT = species.length - FISH_COUNT;

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
  const { liters, selection, setLiters, addSpecies, removeSpecies, setQty, reset } =
    useTankSelection();

  const litersNumber = Number(liters) > 0 ? Number(liters) : null;
  // Los litros son obligatorios para empezar. La excepción es llegar con especies ya elegidas
  // (desde un artículo o un enlace compartido): ahí se muestra el resultado de una vez, sin la
  // revisión del acuario, y se pide completar los litros.
  const isLocked = !litersNumber && selection.length === 0;
  const needsLiters = !litersNumber && selection.length > 0;
  const result = isLocked ? null : checkCompatibility(selection, litersNumber);
  const hasChoices = Boolean(liters) || selection.length > 0;

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
    notify(`¡Listo! Agregaste ${getSpeciesById(id).name}`);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    notify("¡Enlace copiado! Compártelo con quien quieras");
  };

  return (
    <Stack spacing={{ base: 10, md: 12 }}>
      <Box as="section" aria-labelledby="paso-litros">
        <StepHeading step={1} id="paso-litros">
          ¿De cuántos litros es tu acuario?
        </StepHeading>
        <LitersInput liters={liters} onChange={setLiters} labelledBy="paso-litros" />
        {needsLiters && (
          <Text role="status" fontSize="sm" fontWeight="600" color="accent.sand" mt={3}>
            Ya elegimos las especies por ti. Cuéntanos los litros de tu acuario para revisar también
            si caben.
          </Text>
        )}
      </Box>

      <Box as="section" aria-labelledby="paso-especies">
        <StepHeading step={2} id="paso-especies" isDimmed={isLocked}>
          Elige las especies que quieres tener
        </StepHeading>
        <SpeciesSearch
          selectedIds={selection.map(e => e.id)}
          fitById={fitById}
          onAdd={onAdd}
          isDisabled={isLocked}
        />
        <Text fontSize="sm" color="dark.textSecondary" mt={3}>
          {isLocked
            ? "Primero cuéntanos de cuántos litros es tu acuario."
            : `Por ahora tenemos ${FISH_COUNT} peces y ${SHRIMP_COUNT} gambitas en nuestra base de datos.`}
        </Text>
      </Box>

      <Box as="section" aria-labelledby="paso-resultado">
        <Flex justify="space-between" align="start" wrap="wrap" columnGap={4}>
          <StepHeading step={3} id="paso-resultado" isDimmed={isLocked}>
            ¿Pueden vivir juntas?
          </StepHeading>
          <Wrap spacing={2} mb={4}>
            {result && (
              <WrapItem>
                <ActionButton leftIcon={<LinkIcon />} onClick={copyLink}>
                  Copiar enlace
                </ActionButton>
              </WrapItem>
            )}
            {hasChoices && (
              <WrapItem>
                <ActionButton leftIcon={<RepeatIcon />} onClick={reset}>
                  Empezar de nuevo
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
              entries={selection.map(e => ({ species: getSpeciesById(e.id), qty: e.qty }))}
              onRemove={removeSpecies}
            />
            <Box as="section" aria-labelledby="tu-acuario">
              <Heading as="h3" id="tu-acuario" fontSize="lg" color="white" mb={3}>
                {litersNumber ? `Tu acuario de ${litersNumber} L` : "Tu acuario"}
              </Heading>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3} alignItems="start">
                {selection.map(entry => (
                  <SelectedSpeciesCard
                    key={entry.id}
                    species={getSpeciesById(entry.id)}
                    qty={entry.qty}
                    onQtyChange={qty => setQty(entry.id, qty)}
                    onRemove={() => removeSpecies(entry.id)}
                  />
                ))}
              </SimpleGrid>
              <Text fontSize="xs" color="dark.textMuted" mt={3}>
                Fotos de Wikimedia Commons: el autor y la licencia de cada una están en su ficha.
              </Text>
            </Box>
          </Stack>
        ) : (
          <Placeholder>
            <Text>
              {isLocked
                ? "Cuando nos cuentes de cuántos litros es tu acuario, aquí vas a ver la ficha de cada especie y si pueden vivir juntas."
                : "Elige tu primera especie para ver sus parámetros. Después agrega otra y te decimos si pueden vivir juntas."}
            </Text>
            {!isLocked && (
              <>
                <Text fontSize="sm" mt={4} mb={2}>
                  ¿No sabes por dónde empezar? Prueba con una de estas:
                </Text>
                <Wrap spacing={2}>
                  {starterCombos.map(combo => (
                    <WrapItem key={combo.label}>
                      <Chip onClick={() => addSpecies(...combo.ids)}>{combo.label}</Chip>
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
