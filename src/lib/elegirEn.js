// "Ayúdame a elegir" en inglés: las mismas claves de elegirData.js. Escrito por Claude:
// PENDIENTE DE REVISIÓN por JuanJo.
import { questions as questionsEs } from "./elegirData";

// Los valores de las opciones (value) son los de español: viajan en la URL y en Analytics
const translate = (question, texts) => ({
  ...question,
  options: question.options.map((option, i) => ({ ...option, ...texts[i] })),
});

export const elegirEn = {
  elegir: {
    name: "Ayúdame a elegir",
    tagline: "Which fish to keep in your tank",
    lead: "By answering just 4 questions, we choose the fish that suit you best: species that can live together, in the right numbers for the size of your tank.",
  },

  questions: {
    tank: {
      title: unit => `How many ${unit} does your tank hold?`,
      hint: "That's how we work out how many fish fit without overstocking your tank.",
      missing: unit => `Type in your tank's ${unit} to continue.`,
      calculator: unit => `Don't know how many ${unit} your tank holds?`,
    },
    exp: {
      title: "How much experience do you have?",
      ...translate(questionsEs.exp, [
        { label: "I'm just starting", detail: "It's my first tank" },
        { label: "I've had a tank before", detail: "I know how to cycle and do water changes" },
        { label: "I'm experienced", detail: "I've kept demanding species" },
      ]),
    },
    agua: {
      title: "What's your tap water like?",
      hint: "If you have a pH and GH test, measure it. If not, choose “I don't know”.",
      ...translate(questionsEs.agua, [
        { label: "Acidic", summary: "Acidic water", detail: "pH 7.0 or lower and GH 8 or lower" },
        { label: "Alkaline", summary: "Alkaline water", detail: "pH 7.5 or higher and high GH" },
        {
          label: "I don't know",
          summary: "Water not tested",
          detail: "We'll suggest species that adapt to almost anything",
        },
      ]),
    },
    meta: {
      title: "What would you like to keep?",
      ...translate(questionsEs.meta, [
        { label: "A peaceful school", detail: "Lots of small fish swimming together" },
        { label: "A centerpiece fish", detail: "One fish that steals the show, with its school" },
        { label: "Shrimp", detail: "A shrimp tank, with fish that won't eat them" },
        { label: "Big fish", detail: "For tanks of 100 liters or more" },
      ]),
    },
  },

  ui: {
    home: "Inicio",
    tools: "Herramientas",
    languageSwitch: "¿Hablas español? Ver en español",
    steps: ["Tank", "Experience", "Parameters", "Goal", "Results"],
    stepOf: (n, total) => `Step ${n} of ${total}`,
    next: "Next",
    back: "Back",
    needsTank: volume => `Needs a tank of at least ${volume}`,
    units: {
      label: "Tank unit",
      l: { short: "L", name: "liters", button: "Liters" },
      gal: { short: "gal", name: "gallons", button: "Gallons" },
    },
    results: {
      title: "Here are the tanks we suggest",
      option: n => `Option ${n}`,
      restart: "Start over",
      others: "See other options",
      stocking: percent => `Fills ${percent}% of your tank`,
      noStocking: {
        shrimp: "Shrimp take up almost no space",
        snail: "Snails take up almost no space",
        both: "Shrimp and snails take up almost no space",
      },
      water: "Shared water",
      cautions: "Keep in mind",
      credits: { title: "Photo credits", viaCommons: " · via Wikimedia Commons" },
      open: "Check it in Armonía Acuática",
      coldNote:
        "All these species are tropical. If you live in a city where it gets very cold or the temperature changes a lot during the day, consider adding a heater.",
      noResult: {
        tank: volume =>
          `For this we recommend a tank of at least ${volume}. Try another goal or, if your tank is bigger, change the liters.`,
        water:
          "We couldn't find species for this goal with that water. Try another goal or “I don't know”.",
        experience: "This goal needs more experience. Try another goal to start with.",
      },
    },
    roles: {
      cardumen: "School",
      viviparos: "Livebearers",
      fondo: "Bottom",
      limpieza: "Cleanup crew",
      protagonista: "Centerpiece",
      gambas: "Shrimp",
      nano: "Tankmates",
      caracol: "Snails",
      grande: "Centerpiece",
      cardumenGrande: "School",
      fondoGrande: "Bottom",
    },
    faqTitle: "Frequently asked questions",
  },

  howWeChoose: {
    eyebrow: "How do we choose your fish?",
    title: "What we take into account",
    items: [
      {
        title: "Your tank's liters",
        text: "We only suggest species that fit your tank, and we fill it up to 80% using the rule of 1 liter for every centimeter of adult fish. That leaves room so they don't live crowded: the more liters, the better!",
      },
      {
        title: "Your experience",
        text: "If you're just starting, we suggest hardy species that are easy to keep. The most demanding ones, like the German blue ram or Caridina shrimp, are for people who already have experience.",
      },
      {
        title: "Your tap water",
        text: "We choose species that do well with the pH and GH of your water, so you don't have to change it. If you haven't measured it, we suggest the ones that adapt to almost any water.",
      },
      {
        title: "That they can live together",
        text: "Every suggestion goes through the same rules as Armonía Acuática: parameters, space, temperament, schools and shrimp. We never suggest a combination that gets a “no” there.",
      },
    ],
  },

  faq: [
    {
      q: "How many fish can I keep in my tank?",
      a: "We use a rule of thumb: 1 liter for every centimeter of adult fish, with some room to spare so they don't live crowded. Shrimp and snails barely count.",
    },
    {
      q: "How do I know if my tap water is acidic or alkaline?",
      a: "Measure it with a pH and GH test. If the pH is 7.0 or lower and the GH is 8 or lower, it's acidic. If you don't have a test, choose “I don't know” and we'll suggest species that adapt to almost any water.",
    },
    {
      q: "Why isn't my favorite fish suggested?",
      a: "We only suggest species that fit your liters, your water and your experience. If you already have a fish in mind, check it in Armonía Acuática with the ones you want to keep with it.",
    },
  ],
};
