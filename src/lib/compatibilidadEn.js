// Armonía Acuática en inglés: los textos de la página y de la herramienta cuando la persona
// elige "English". Tiene las mismas llaves que compatibilidadData.js y speciesShops.js.
// Las especies en inglés están en speciesDataEn.js y los avisos en compatibilityMessages.js.
// El resto del sitio, los metadatos y lo que ve Google siguen en español.

import {
  litersCalculator as litersCalculatorEs,
  starterCombos as starterCombosEs,
} from "./compatibilidadData";

const COMBO_LABELS = {
  "Betta + gambitas": "Betta + shrimp",
  "Neones + Corydoras": "Neons + Corydoras",
  "Guppys + platys": "Guppies + platies",
};

export const armoniaEn = {
  compatibilidad: {
    name: "Armonía Acuática",
    tagline: "Fish and shrimp compatibility",
    lead: "Choose the species you'd like to keep in your tank, tell us how many liters it holds and let's see if they can live together: water parameters, space and temperament.",
  },

  litersCalculator: {
    ...litersCalculatorEs,
    toggle: unit => `Don't know how many ${unit} your tank holds?`,
    title: unit => `Let's work out your tank's ${unit}`,
    help: "Measure your tank from the outside with a tape measure, in centimeters.",
    fields: [
      { key: "length", label: "Length", placeholder: "60" },
      { key: "width", label: "Width", placeholder: "30" },
      { key: "height", label: "Height", placeholder: "35" },
    ],
    discountLabel: "Subtract rocks, driftwood and substrate",
    decorLabel: "How much space do they take?",
    decorHelp:
      "Yes, your tank isn't just water: rocks, driftwood and substrate take away a few liters. If you have little decoration, leave it at 10%; in an aquascape with lots of rocks it can be 30% or more.",
    empty: unit => `Type in the three measurements and we'll tell you how many ${unit} it holds.`,
    result: "Your tank holds about",
    resultDetail: (total, percent) => `${total} in total, minus ${percent}% for decoration.`,
    resultTotal: "Without subtracting decoration.",
    tooBig: max => `For now the tool goes up to ${max}.`,
    use: volume => `Use ${volume}`,
  },

  // labelEs: el nombre del combo en Analytics, igual en los dos idiomas
  starterCombos: starterCombosEs.map(combo => ({
    ...combo,
    label: COMBO_LABELS[combo.label] || combo.label,
    labelEs: combo.label,
  })),

  checksExplained: [
    {
      title: "Water parameters",
      text: "We compare each species' temperature, pH and GH and show you the range they share. If there's no value that works for all of them, they're not compatible.",
    },
    {
      title: "Tank size",
      text: "We check each species' minimum tank size and, as a guide, the rule of 1 liter for every centimeter of adult fish. Shrimp don't count toward that rule. It's only a reference: the more liters you have, the better!",
    },
    {
      title: "Temperament",
      text: "Fin nippers with long-finned fish, big fish that eat small ones, and territorial fish like the betta, which attacks long-tailed fish and may chase very colorful ones.",
    },
    {
      title: "Schools and shrimp",
      text: "Schooling fish need to live in a group to feel calm. And if you want shrimp, we'll check how safe they and their babies will be.",
    },
  ],

  faq: [
    {
      q: "How do I know if two fish are compatible?",
      a: "They need to share, to some extent, temperature, pH and GH, fit in the same tank and have a similar temperament. If one nips fins, is territorial or can fit the other in its mouth, they're not compatible even if their parameters are similar.",
    },
    {
      q: "Which fish can live with shrimp?",
      a: "Small, peaceful fish are the safe bet, like pygmy corydoras and otocinclus. Tetras and rasboras leave the adults alone, but the babies will always be at risk. Big fish like angelfish, rams or discus will always see them as premium food.",
    },
    {
      q: "Can a betta live with other fish?",
      a: "It depends a lot on each betta's temperament. The best tank mates are peaceful, low-key fish, like corydoras or otocinclus. Avoid other bettas, especially males, and long-finned or long-tailed fish like guppies.",
    },
    {
      q: "Can I keep Neocaridina and Caridina shrimp together?",
      a: "We don't recommend it. Neocaridinas need a pH of 6.5 to 7.5 and a GH of 6 to 8; Caridinas, on the other hand, prefer very soft water. Neocaridinas can adapt to those parameters, but not the other way around. It's a risk that isn't worth taking.",
    },
    {
      q: "Can Sulawesi shrimp live with other shrimp?",
      a: "No. This species needs a temperature of 27 to 30 °C and a pH of 7.5 to 8.5. No fish or shrimp can adapt to that range.",
    },
  ],

  whereToBuy: {
    heading: name => `Where to buy ${name}?`,
    sponsored: "Partner shops",
    shopsInvite: name => `Do you have a shop that sells ${name}?`,
    shopsInviteCta: "Contact me to be listed here",
  },

  ui: {
    languageSwitch: "¿Hablas español? Ver en español",
    units: {
      label: "Tank unit",
      l: { short: "L", name: "liters" },
      gal: { short: "gal", name: "gallons" },
    },
    home: "Home",
    faqTitle: "Frequently asked questions",
    howItWorks: {
      eyebrow: "How does it work?",
      title: "What we check for you",
      disclaimerTitle: "It's only a reference",
      disclaimer:
        "We built this tool with information available online and with our own experience, but that doesn't mean it works in every case: each fish has its own temperament and every tank is different. Always watch your animals and have a plan B in case you need to separate them.",
    },
    tool: {
      added: name => `Done! You added ${name}`,
      linkCopied: "Link copied! Share it with anyone you like",
      litersStep: unit => `How many ${unit} does your tank hold?`,
      needsLiters: unit => `Tell us your tank's ${unit} to fine-tune the results`,
      speciesStep: "Choose the species you want to keep",
      lockedHint: unit => `First, tell us how many ${unit} your tank holds.`,
      speciesCount: (fish, shrimp) =>
        `For now we have ${fish} fish and ${shrimp} shrimp in our database.`,
      resultStep: "Can they live together?",
      copyLink: "Copy link",
      reset: "Start over",
      yourTank: volume => (volume ? `Your ${volume} tank` : "Your tank"),
      photosNote:
        "Photos from Wikimedia Commons: each one's author and license are in its profile.",
      placeholderLocked: unit =>
        `Once you tell us how many ${unit} your tank holds, you'll see each species' profile here and whether they can live together.`,
      placeholderEmpty:
        "Choose your first species to see its water parameters. Then add another one and we'll tell you if they can live together.",
      startersLabel: "Not sure where to start? Try one of these:",
    },
    levels: {
      ok: { title: "Yes, they can live together", label: "Compatible" },
      caution: { title: "They can live together, but with care", label: "With care" },
      bad: { title: "We don't recommend it", label: "Not recommended" },
    },
    result: {
      addAnother: "Add another species to compare them",
      temperature: "Temperature",
      noMatch: "No overlap",
      minTank: "Minimum tank",
      comparing: "Species you're comparing",
      singleNeeds: "What it needs:",
      sharedWater: "The water that works for all of them:",
      stocking: "Tank stocking",
      stockingFits: (needed, tank) => `Needs at least ${needed} of your ${tank}`,
      stockingOver: (needed, tank) => `Needs ${needed} and you have ${tank}`,
      remove: name => `Remove ${name}`,
    },
    card: {
      showDetails: "See profile",
      hideDetails: "Hide profile",
      min: n => `Minimum ${n}`,
      less: name => `Fewer ${name}`,
      more: name => `More ${name}`,
      guide: "Read the full guide (in Spanish)",
      photo: "Photo:",
      viaCommons: " · via Wikimedia Commons",
    },
    search: {
      label: "Search for a species",
      placeholder: "Search: neon, ram, shrimp…",
      clear: "Clear the search",
      listLabel: "Species",
      noResults: "We don't have that species yet.",
      allChosen: "You've already chosen every species.",
    },
    liters: {
      placeholder: { l: "E.g. 60", gal: "E.g. 20" },
      close: "Close",
    },
  },
};
