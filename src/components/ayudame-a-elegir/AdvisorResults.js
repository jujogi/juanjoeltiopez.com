"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { checkCompatibility } from "@/lib/compatibility";
import { COMPATIBILIDAD_PATH } from "@/lib/compatibilidadData";
import { getSpeciesById } from "@/lib/speciesData";
import { suggestTanks } from "@/lib/speciesAdvisor";
import { formatNeeded, formatTank } from "@/lib/tankUnits";
import { trackElegir } from "@/lib/gtm";
import { LEVELS } from "@/components/compatibilidad/levels";
import SpeciesPhoto from "./SpeciesPhoto";

// Las propuestas se ven de a tres; "Ver otras opciones" cambia las tres por las siguientes y,
// al llegar a las últimas, vuelve a las primeras
const PAGE_SIZE = 3;

// Las tarjetas nuevas entran desde la derecha, como al pasar cartas
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to { opacity: 1; transform: none; }
`;

// La propuesta abierta en Armonía Acuática, con el mismo acuario, unidad e idioma
function armoniaLink(selection, liters, unit, lang) {
  const params = [`l=${liters}`, `p=${selection.map(e => `${e.id}:${e.qty}`).join(",")}`];
  if (unit === "gal") params.push("u=gal");
  if (lang === "en") params.push("lang=en");
  return `${COMPATIBILIDAD_PATH}?${params.join("&")}`;
}

// Una propuesta sin peces: "shrimp", "snail" o "both", según lo que traiga
function invertebrates(selection) {
  const types = new Set(selection.map(e => getSpeciesById(e.id).type));
  return types.size > 1 ? "both" : [...types][0];
}

// Una especie de la propuesta: foto con la cantidad encima y, debajo, su papel y su nombre.
// La principal lleva el nombre más grande. isNarrow: tres mosaicos en una fila; en el celular
// el texto se achica para que "Cardumen" o "Corydoras" no se partan a la mitad.
function SpeciesTile({ entry, lang, ui, ratio, isMain = false, isNarrow = false }) {
  const species = getSpeciesById(entry.id, lang);
  return (
    <Box as="li" minW={0} gridColumn={isMain ? "1 / -1" : undefined}>
      <SpeciesPhoto species={species} qty={entry.qty} ratio={ratio} />
      <Text
        mt={2}
        fontSize={isNarrow ? { base: "2xs", md: "xs" } : "xs"}
        fontWeight="700"
        color="accent.cyan"
        textTransform="uppercase"
      >
        {ui.roles[entry.role]}
      </Text>
      <Text
        fontSize={isMain ? "lg" : isNarrow ? { base: "xs", md: "sm" } : "sm"}
        fontWeight="600"
        color="white"
        lineHeight="1.3"
        overflowWrap="break-word"
        hyphens="auto"
      >
        {species.name}
      </Text>
    </Box>
  );
}

function ProposalCard({ n, proposal, liters, unit, lang, ui }) {
  const { selection, stocking } = proposal;
  const [main, ...rest] = selection;
  const result = checkCompatibility(selection, liters, lang, unit);
  const cautions = result.checks.filter(c => c.level === "caution");
  const { shared } = result;
  const caution = LEVELS.caution;

  const open = () =>
    trackElegir("abrir_armonia", {
      opcion: n,
      // Analytics recibe siempre los nombres en español
      combo: selection
        .map(e => getSpeciesById(e.id).name)
        .join(" + ")
        .slice(0, 100),
    });

  return (
    <Flex
      as="article"
      aria-labelledby={`propuesta-${n}`}
      direction="column"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="xl"
      p={{ base: 4, md: 5 }}
    >
      <Heading
        as="h3"
        id={`propuesta-${n}`}
        tabIndex={-1}
        fontSize="xl"
        color="white"
        mb={4}
        _focus={{ outline: "none" }}
      >
        {ui.results.option(n)}
      </Heading>

      {/* La primera especie (la base: el cardumen, el protagonista o las gambitas) va grande, a
          todo el ancho; las demás debajo, en una fila de mosaicos que se reparten el ancho */}
      <SimpleGrid
        as="ul"
        listStyleType="none"
        columns={Math.max(rest.length, 1)}
        spacingX={3}
        spacingY={4}
      >
        <SpeciesTile entry={main} lang={lang} ui={ui} ratio={16 / 9} isMain />
        {rest.map(entry => (
          <SpeciesTile
            key={entry.id}
            entry={entry}
            lang={lang}
            ui={ui}
            ratio={rest.length === 1 ? 16 / 9 : 1}
            isNarrow={rest.length >= 3}
          />
        ))}
      </SimpleGrid>

      <Box mt={5} fontSize="sm" color="dark.textSecondary" lineHeight="1.6">
        <Text>
          {stocking > 0
            ? ui.results.stocking(Math.round(stocking * 100))
            : ui.results.noStocking[invertebrates(selection)]}
        </Text>
        <Text>
          {ui.results.water}: {shared.temp} · pH {shared.ph} · GH {shared.gh}
        </Text>
      </Box>

      {cautions.length > 0 && (
        <Box mt={4}>
          <Text fontSize="sm" fontWeight="700" color="white" mb={2}>
            {ui.results.cautions}
          </Text>
          <VStack as="ul" listStyleType="none" align="stretch" spacing={2}>
            {cautions.map(c => (
              <HStack as="li" key={c.title} align="start" spacing={2}>
                <Icon
                  as={caution.icon}
                  aria-hidden="true"
                  color={caution.color}
                  boxSize={4}
                  mt={0.5}
                />
                <Text fontSize="sm" color="dark.textSecondary" lineHeight="1.5">
                  <Text as="span" fontWeight="600" color="dark.text">
                    {c.title}.
                  </Text>{" "}
                  {c.detail}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {/* Empuja el botón al final para que las tarjetas lo tengan a la misma altura */}
      <Box flex="1" />
      <Button
        as={NextLink}
        href={armoniaLink(selection, liters, unit, lang)}
        variant="outline"
        mt={5}
        whiteSpace="normal"
        // Al pasar a dos líneas (celular), el texto queda centrado y no pegado a la izquierda
        textAlign="center"
        h="auto"
        py={3}
        onClick={open}
      >
        {ui.results.open}
      </Button>
    </Flex>
  );
}

// Los resultados: hasta seis propuestas, de a tres, o por qué no hay ninguna
// answers: { liters, unit, exp, agua, meta, seed } · summary: las respuestas en texto
export default function AdvisorResults({
  answers,
  lang,
  ui,
  summary,
  onRestart,
  onBack,
  onReshuffle,
}) {
  const { liters, unit, exp, agua, meta, seed } = answers;
  const { proposals, reason } = useMemo(
    () => suggestTanks({ liters, exp, agua, meta }, seed),
    [liters, exp, agua, meta, seed]
  );

  useEffect(() => {
    trackElegir("resultado", { total_propuestas: proposals.length, exp, agua, meta });
  }, [proposals, exp, agua, meta]);

  // page: qué tres se ven · turns: cuántas veces se tocó "Ver otras opciones" (para la
  // animación y el foco)
  const [page, setPage] = useState(0);
  const [turns, setTurns] = useState(0);
  const pages = Math.ceil(proposals.length / PAGE_SIZE);
  const first = page * PAGE_SIZE;
  const shown = proposals.slice(first, first + PAGE_SIZE);

  // Al cambiar de tarjetas, el foco va a la primera: el lector de pantalla la lee y, en el
  // celular, la pantalla baja hasta ella
  useEffect(() => {
    if (turns > 0) document.getElementById(`propuesta-${first + 1}`)?.focus();
  }, [turns, first]);

  // Después de las últimas tres, una semilla nueva: otras propuestas, sin fin
  // origen: "arriba" o "abajo", el botón que se tocó
  const showOthers = origen => {
    const isLast = page + 1 >= pages;
    trackElegir("ver_otras", {
      desde: isLast ? 1 : (page + 1) * PAGE_SIZE + 1,
      nuevas: isLast,
      total_propuestas: proposals.length,
      origen,
    });
    if (isLast) onReshuffle();
    setPage(isLast ? 0 : page + 1);
    setTurns(turns + 1);
  };

  const noResult = ui.results.noResult;

  // El mismo botón arriba y debajo de las tarjetas, para no tener que subir después de leerlas
  const othersButton = origen => (
    <Button
      size="sm"
      bg="accent.cyan"
      color="water.950"
      _hover={{ bg: "accent.cyanHover" }}
      leftIcon={<RepeatIcon aria-hidden="true" />}
      onClick={() => showOthers(origen)}
    >
      {ui.results.others}
    </Button>
  );

  return (
    <Box>
      {/* Arriba, lo que cambia las tarjetas (también repetido debajo de ellas); al final, lo
          que saca de los resultados (Atrás y Empezar de nuevo) */}
      <Flex justify="space-between" align="center" wrap="wrap" gap={3} mb={8}>
        <Text fontSize="sm" color="dark.textSecondary">
          {formatTank(liters, unit)} · {summary.join(" · ")}
        </Text>
        {pages > 1 && othersButton("arriba")}
      </Flex>

      {proposals.length > 0 ? (
        <SimpleGrid
          // Con key, la cuadrícula se vuelve a montar y la animación se repite en cada cambio
          key={turns}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={4}
          alignItems="stretch"
          animation={turns > 0 ? `${slideIn} 0.3s ease-out` : undefined}
          sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}
        >
          {shown.map((proposal, i) => (
            <ProposalCard
              key={proposal.selection.map(e => e.id).join(",")}
              n={first + i + 1}
              proposal={proposal}
              liters={liters}
              unit={unit}
              lang={lang}
              ui={ui}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text
          role="status"
          p={{ base: 4, md: 5 }}
          bg="dark.surface"
          border="1px"
          borderColor="accent.sand"
          rounded="xl"
          color="dark.text"
          lineHeight="1.6"
        >
          {reason.type === "tank"
            ? noResult.tank(formatNeeded(reason.liters, unit))
            : noResult[reason.type]}
        </Text>
      )}

      {pages > 1 && (
        <Flex justify="center" mt={6}>
          {othersButton("abajo")}
        </Flex>
      )}

      {/* Los créditos completos (autor, licencia y fuente) están en las fichas de Armonía */}
      {proposals.length > 0 && (
        <Text mt={6} fontSize="xs" color="dark.textMuted">
          {ui.results.credits}
        </Text>
      )}

      <Flex justify="space-between" align="center" wrap="wrap" gap={3} mt={{ base: 8, md: 10 }}>
        <Button variant="ghost" leftIcon={<ArrowBackIcon aria-hidden="true" />} onClick={onBack}>
          {ui.back}
        </Button>
        <Button variant="ghost" onClick={onRestart}>
          {ui.results.restart}
        </Button>
      </Flex>
    </Box>
  );
}
