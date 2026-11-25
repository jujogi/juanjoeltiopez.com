"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { trackElegir } from "@/lib/gtm";
import { suggestTanks } from "@/lib/speciesAdvisor";
import { formatNeeded } from "@/lib/tankUnits";
import { StepNav, StepProgress } from "@/components/compatibilidad/ToolSteps";
import AdvisorResults from "./AdvisorResults";
import OptionStep from "./OptionStep";
import TankStep from "./TankStep";
import { newSeed, useAdvisorQuery } from "./useAdvisorQuery";

// Las preguntas de opciones, en orden, después de la del acuario
const OPTION_KEYS = ["exp", "agua", "meta"];
// Paso 0: el acuario · 1 a 3: las preguntas de opciones · 4: los resultados
const RESULTS = 1 + OPTION_KEYS.length;
const TITLE_ID = "elegir-paso";

// Igual que Armonía Acuática: los pasos de a uno dentro de una tarjeta con borde, con el
// progreso arriba (una barra por paso, que también sirve para volver a uno ya respondido) y
// Atrás y Siguiente abajo. Las respuestas están en la URL; el paso en pantalla vive aquí. Al
// abrir un enlace con todas las respuestas, se ven directo los resultados.
export default function AdvisorWizard() {
  const query = useAdvisorQuery();
  const { liters, unit, lang, copy, update } = query;
  const { questions, ui } = copy;
  const missing = OPTION_KEYS.findIndex(key => !query[key]);
  const firstUnanswered = !liters ? 0 : missing === -1 ? RESULTS : missing + 1;
  const [chosenStep, setChosenStep] = useState(null);
  const step = chosenStep ?? firstUnanswered;
  const toolRef = useRef(null);
  const headingRef = useRef(null);

  // Al cambiar de paso, la tarjeta queda arriba y el título del paso nuevo recibe el foco
  // (lector de pantalla y teclado). Antes de pintar, como en Armonía, para que no se vea el
  // paso nuevo en la posición vieja. No pasa al cargar la página.
  useLayoutEffect(() => {
    if (chosenStep === null) return;
    if (toolRef.current.getBoundingClientRect().top < 0)
      toolRef.current.scrollIntoView({ behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [chosenStep]);

  const goTo = next => {
    setChosenStep(next);
    trackElegir("paso", { paso: next + 1 });
  };

  const choose = (key, value) => {
    update({ [key]: value });
    trackElegir("respuesta", { pregunta: key, respuesta: value });
    goTo(step + 1);
  };

  // En el resumen de los resultados; el agua dice "Agua ácida" y no solo "Ácida"
  const label = (key, value) => {
    const option = questions[key].options.find(o => o.value === value);
    return option?.summary || option?.label;
  };

  const key = OPTION_KEYS[step - 1];

  // En el paso Objetivo se apagan los que no caben en el acuario (Peces grandes con menos de
  // 100 L, por ejemplo), con el tamaño que necesitan
  const disabledGoals = {};
  if (key === "meta" && liters && query.exp && query.agua) {
    for (const { value } of questions.meta.options) {
      const { proposals, reason } = suggestTanks({ ...query, meta: value });
      if (!proposals.length && reason.type === "tank")
        disabledGoals[value] = ui.needsTank(formatNeeded(reason.liters, unit));
    }
  }
  const question = step === 0 ? questions.tank : questions[key];
  const title =
    step === RESULTS
      ? ui.results.title
      : step === 0
        ? question.title(ui.units[unit].name)
        : question.title;

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
      {/* StepProgress cuenta los pasos desde 1 */}
      <StepProgress
        labels={ui.steps}
        step={step + 1}
        isEnabled={n => n - 1 <= firstUnanswered}
        onGo={n => goTo(n - 1)}
        stepOf={ui.stepOf}
      />

      <Box as="section" aria-labelledby={TITLE_ID}>
        <Heading
          as="h2"
          id={TITLE_ID}
          ref={headingRef}
          tabIndex={-1}
          fontSize={{ base: "2xl", md: "3xl" }}
          color="white"
          mb={2}
          _focus={{ outline: "none" }}
        >
          {title}
        </Heading>
        {question?.hint && (
          <Text color="dark.textSecondary" lineHeight="1.6" mb={6}>
            {question.hint}
          </Text>
        )}

        {step === 0 && <TankStep labelledBy={TITLE_ID} onNext={() => goTo(1)} />}

        {key && (
          <>
            <OptionStep
              options={question.options}
              selected={query[key]}
              labelledBy={TITLE_ID}
              onSelect={value => choose(key, value)}
              disabled={disabledGoals}
            />
            {/* Elegir una opción ya pasa al siguiente paso; Siguiente solo aparece si esta
                pregunta ya tiene respuesta (al volver atrás) */}
            <StepNav
              backLabel={ui.back}
              nextLabel={ui.next}
              onBack={() => goTo(step - 1)}
              onNext={query[key] ? () => goTo(step + 1) : null}
            />
          </>
        )}

        {step === RESULTS && (
          <>
            <AdvisorResults
              answers={query}
              lang={lang}
              ui={ui}
              summary={OPTION_KEYS.map(k => label(k, query[k]))}
              onRestart={() => {
                trackElegir("empezar_de_nuevo");
                update({ liters: null, exp: null, agua: null, meta: null });
                goTo(0);
              }}
              onBack={() => goTo(step - 1)}
              onReshuffle={() => update({ seed: newSeed() })}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
