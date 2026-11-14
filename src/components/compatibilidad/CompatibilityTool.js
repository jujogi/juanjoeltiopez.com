"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, RepeatIcon } from "@chakra-ui/icons";
import { getSpeciesById } from "@/lib/speciesData";
import { checkCompatibility } from "@/lib/compatibility";
import { useTankSelection, MAX_LITERS } from "./useTankSelection";
import SelectedSpeciesCard from "./SelectedSpeciesCard";
import CompatibilityResult from "./CompatibilityResult";
import SpeciesSearch from "./SpeciesSearch";

const LITER_PRESETS = [20, 40, 60, 100, 200];
const TOAST_MS = 2500;

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

const Chip = ({ isSelected, children, ...props }) => (
  <Button
    size="sm"
    variant="unstyled"
    display="inline-flex"
    px={4}
    border="1px"
    borderColor={isSelected ? "accent.cyan" : "dark.border"}
    bg={isSelected ? "accent.cyan" : "dark.surface"}
    color={isSelected ? "water.950" : "dark.text"}
    _hover={{ borderColor: "accent.cyan" }}
    aria-pressed={isSelected}
    {...props}
  >
    {children}
  </Button>
);

const AddedToast = ({ name }) => (
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
      ¡Listo! Agregaste {name}
    </Text>
  </HStack>
);

const Placeholder = ({ children }) => (
  <Text
    color="dark.textSecondary"
    bg="dark.surface"
    border="1px"
    borderColor="dark.border"
    rounded="xl"
    p={{ base: 4, md: 6 }}
  >
    {children}
  </Text>
);

export default function CompatibilityTool() {
  const toast = useToast();
  const { liters, selection, setLiters, addSpecies, removeSpecies, setQty, reset } =
    useTankSelection();

  const litersNumber = Number(liters) > 0 ? Number(liters) : null;
  // Los litros son obligatorios: sin ellos no se pueden elegir especies ni ver el resultado
  const isLocked = !litersNumber;
  const result = isLocked ? null : checkCompatibility(selection, litersNumber);
  const hasChoices = Boolean(liters) || selection.length > 0;

  const onAdd = id => {
    addSpecies(id);
    toast({
      duration: TOAST_MS,
      position: "bottom",
      render: () => <AddedToast name={getSpeciesById(id).name} />,
    });
  };

  return (
    <Stack spacing={{ base: 10, md: 12 }}>
      <Box as="section" aria-labelledby="paso-litros">
        <StepHeading step={1} id="paso-litros">
          ¿De cuántos litros es tu acuario?
        </StepHeading>
        <Stack direction="row" wrap="wrap" spacing={3} align="center">
          <InputGroup w="150px">
            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_LITERS}
              value={liters}
              onChange={e => setLiters(e.target.value)}
              placeholder="Ej: 60"
              aria-labelledby="paso-litros"
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
                  isSelected={litersNumber === preset}
                  onClick={() => setLiters(String(preset))}
                >
                  {preset} L
                </Chip>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </Box>

      <Box as="section" aria-labelledby="paso-especies">
        <StepHeading step={2} id="paso-especies" isDimmed={isLocked}>
          Elige las especies que quieres tener
        </StepHeading>
        <SpeciesSearch selectedIds={selection.map(e => e.id)} onAdd={onAdd} isDisabled={isLocked} />
        {isLocked && (
          <Text fontSize="sm" color="dark.textSecondary" mt={3}>
            Primero cuéntanos de cuántos litros es tu acuario.
          </Text>
        )}
      </Box>

      <Box as="section" aria-labelledby="paso-resultado">
        <Flex justify="space-between" align="start" wrap="wrap" columnGap={4}>
          <StepHeading step={3} id="paso-resultado" isDimmed={isLocked}>
            ¿Pueden vivir juntas?
          </StepHeading>
          {hasChoices && (
            <Button
              size="sm"
              variant="ghost"
              border="1px"
              borderColor="dark.border"
              leftIcon={<RepeatIcon />}
              onClick={reset}
              mb={4}
            >
              Empezar de nuevo
            </Button>
          )}
        </Flex>
        {result ? (
          <Stack spacing={6}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
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
            <CompatibilityResult result={result} speciesCount={selection.length} />
          </Stack>
        ) : (
          <Placeholder>
            {isLocked
              ? "Cuando nos cuentes de cuántos litros es tu acuario, aquí vas a ver la ficha de cada especie y si pueden vivir juntas."
              : "Elige tu primera especie para ver su ficha y sus parámetros. Después agrega otra y te decimos si pueden vivir juntas."}
          </Placeholder>
        )}
      </Box>
    </Stack>
  );
}
