"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { species } from "@/lib/speciesData";
import SpeciesThumbnail from "./SpeciesThumbnail";
import { LEVELS } from "./levels";

const LISTBOX_ID = "especies-sugeridas";
const optionId = id => `especie-${id}`;

// Compara sin tildes ni mayúsculas: "neon" encuentra "Tetra neón"
const normalize = text => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// 0: una palabra del nombre empieza por el texto ("cor" → Corydoras) · 1: empieza una palabra
// del nombre científico o del grupo · 2: aparece en medio de una palabra · 3: no coincide
const NO_MATCH = 3;
const startsWord = (text, term) =>
  normalize(text)
    .split(/[\s()]+/)
    .some(w => w.startsWith(term));
const matchRank = (s, term) => {
  if (startsWord(s.name, term)) return 0;
  if (startsWord(`${s.scientific} ${s.group}`, term)) return 1;
  return normalize(`${s.name} ${s.scientific}`).includes(term) ? 2 : NO_MATCH;
};

// Buscador con sugerencias (combobox): se escribe, se elige con el mouse o con flechas + Enter
// Cómo encaja la sugerencia con lo que ya hay en el acuario. En el celular solo va el ícono
// (el texto queda para lectores de pantalla) para no quitarle espacio al nombre.
const FitBadge = ({ level }) => (
  <HStack spacing={1.5} ml="auto" flexShrink={0} color={LEVELS[level].color}>
    <Icon as={LEVELS[level].icon} aria-hidden="true" boxSize={3.5} />
    <Text fontSize="xs" fontWeight="600" display={{ base: "none", md: "block" }}>
      {LEVELS[level].label}
    </Text>
    <VisuallyHidden display={{ md: "none" }}>{LEVELS[level].label}</VisuallyHidden>
  </HStack>
);

// fitById: { id: "ok" | "caution" | "bad" } según el acuario actual; vacío si aún no hay especies
export default function SpeciesSearch({ selectedIds, fitById, onAdd, isDisabled }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const term = normalize(query.trim());
  const available = species.filter(s => !selectedIds.includes(s.id));
  // Sin texto se muestran todas por grupo; con texto, primero las que mejor coinciden
  const options = term
    ? available
        .map(s => ({ item: s, rank: matchRank(s, term) }))
        .filter(m => m.rank < NO_MATCH)
        .sort((a, b) => a.rank - b.rank)
        .map(m => m.item)
    : available;
  const active = options[Math.min(activeIndex, options.length - 1)];

  // Con las flechas, la opción activa se mantiene a la vista dentro de la lista
  useEffect(() => {
    if (isOpen && active) {
      document.getElementById(optionId(active.id))?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, active]);

  const add = item => {
    onAdd(item.id);
    setQuery("");
    setActiveIndex(0);
    // Se cierra para que se vea la ficha recién agregada; vuelve a abrir al escribir o hacer clic
    setIsOpen(false);
  };

  const onKeyDown = e => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) return setIsOpen(true);
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex(
        i => (Math.min(i, options.length - 1) + step + options.length) % options.length
      );
    } else if (e.key === "Enter" && isOpen && active) {
      e.preventDefault();
      add(active);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <Box position="relative" maxW="520px">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="dark.textMuted" boxSize={4} />
        </InputLeftElement>
        <Input
          role="combobox"
          isDisabled={isDisabled}
          aria-label="Buscar una especie"
          aria-expanded={isOpen}
          aria-controls={LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={isOpen && active ? optionId(active.id) : undefined}
          autoComplete="off"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Busca: neón, ramirezi, gambitas…"
          fontSize="md"
          bg="dark.surface"
          borderColor="dark.border"
          color="white"
        />
      </InputGroup>

      <Box
        as="ul"
        id={LISTBOX_ID}
        role="listbox"
        aria-label="Especies"
        display={isOpen ? "block" : "none"}
        position="absolute"
        top="calc(100% + 6px)"
        left={0}
        right={0}
        zIndex="dropdown"
        maxH="380px"
        overflowY="auto"
        listStyleType="none"
        bg="dark.surfaceRaised"
        border="1px"
        borderColor="dark.border"
        rounded="xl"
        boxShadow="dark-lg"
        p={2}
        // Evita que el clic le quite el foco al campo y cierre la lista antes de elegir
        onMouseDown={e => e.preventDefault()}
      >
        {options.length === 0 && (
          <Text as="li" role="presentation" px={3} py={3} color="dark.textSecondary" fontSize="sm">
            {term ? "No tenemos esa especie todavía." : "Ya elegiste todas las especies."}
          </Text>
        )}
        {options.map((item, i) => {
          const isActive = item === active;
          const startsGroup = !term && item.group !== options[i - 1]?.group;
          return (
            <Box as="li" key={item.id} role="presentation">
              {startsGroup && (
                <Text
                  px={3}
                  pt={i === 0 ? 1 : 3}
                  pb={1}
                  fontSize="xs"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  color="dark.textMuted"
                >
                  {item.group}
                </Text>
              )}
              <Flex
                id={optionId(item.id)}
                role="option"
                aria-selected={isActive}
                align="center"
                gap={3}
                px={3}
                py={2}
                rounded="lg"
                cursor="pointer"
                bg={isActive ? "dark.surface" : "transparent"}
                onMouseMove={() => setActiveIndex(i)}
                onClick={() => add(item)}
              >
                <SpeciesThumbnail species={item} />
                <Box minW={0}>
                  <Text fontWeight="600" color="white" noOfLines={1}>
                    {item.name}
                  </Text>
                  <Text fontSize="sm" fontStyle="italic" color="dark.textSecondary" noOfLines={1}>
                    {item.scientific}
                  </Text>
                </Box>
                {fitById[item.id] && <FitBadge level={fitById[item.id]} />}
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
