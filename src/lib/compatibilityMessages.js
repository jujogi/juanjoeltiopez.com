// Textos de los avisos de compatibility.js, en español y en inglés. Cada aviso tiene un
// título y un detalle; las funciones reciben los nombres y números que llenan la frase.
// Los títulos son llaves de React: dentro de un mismo resultado no se pueden repetir.
// Los volúmenes llegan ya con su unidad ("60 L" o "16 gal"), desde tankUnits.js.

const es = {
  parameterLabels: { temp: "temperatura", ph: "pH", gh: "GH" },
  noOverlap: {
    title: label => `No comparten ${label}`,
    detail: needs => `${needs}. No hay un valor que les sirva a los dos.`,
  },
  narrowOverlap: {
    title: label => `Margen muy estrecho de ${label}`,
    detail: (needs, single) =>
      `${needs}. Solo coinciden en ${single}: tendrías que mantenerlo muy estable.`,
  },
  barelyShared: {
    title: () => "Casi no comparten parámetros",
    detail: () =>
      "Apenas coinciden en un punto en más de un parámetro. Alguna de las dos va a sobrevivir en vez de vivir bien.",
  },
  shared: {
    title: () => "Comparten parámetros",
    detail: ({ temp, ph, gh }) => `Les sirve la misma agua: ${temp}, pH ${ph} y GH ${gh}.`,
  },
  tankTooSmall: {
    title: name => `El acuario es pequeño para ${name}`,
    detail: (minVolume, tankVolume) =>
      `Necesita mínimo ${minVolume} y tu acuario tiene ${tankVolume}.`,
  },
  overstocked: {
    title: () => "Son muchos peces para ese acuario",
    detail: (stockingVolume, tankVolume) =>
      `Con la regla de 1 litro por centímetro de pez adulto, esa cantidad pide unos ${stockingVolume} y tu acuario tiene ${tankVolume}. Baja la cantidad o piensa en un acuario más grande: entre más grande, mejor.`,
  },
  fits: {
    title: () => "Caben en tu acuario",
    detail: (neededVolume, tankVolume) =>
      `Esa combinación pide mínimo ${neededVolume} y tu acuario tiene ${tankVolume}.`,
  },
  maxCount: {
    title: (max, name) => `Solo ${max} ${name} por acuario`,
    detail: () => "Es territorial: dos machos en el mismo acuario se pelean.",
  },
  unstableGroup: {
    title: (name, from) => `${name}: en solitario o en grupo de ${from} o más`,
    detail: qty =>
      `Pusiste ${qty}. Cuando son pocas, la más fuerte persigue a las demás. Funciona una sola, o un grupo grande en un acuario amplio y muy plantado, donde la agresividad se reparte.`,
  },
  smallGroup: {
    title: (name, min) => `${name}: mejor en grupo de ${min} o más`,
    detail: qty =>
      `Pusiste ${qty}. En grupos pequeños viven estresados y se esconden: no es lo mismo vivir que sobrevivir.`,
  },
  finNipper: {
    title: name => `${name} muerde aletas`,
    detail: others =>
      `Los peces de aletas largas terminan mordidos y estresados. No lo juntes con ${others}.`,
  },
  mates: {
    title: (name, others) => `${name} y ${others} solo se juntan para reproducirse`,
    detail: () =>
      "Fuera de la reproducción, el macho la persigue y la puede lastimar o matar. Cada uno en su acuario.",
  },
  gouramis: {
    title: name => `${name} no tolera a los guramis`,
    detail: others =>
      `Son parientes y los ve como otro macho: se van a pelear. No lo juntes con ${others}.`,
  },
  longFins: {
    title: name => `${name} ataca peces de aletas o colas largas`,
    detail: others =>
      `Los confunde con otro macho por sus aletas y los persigue y ataca. No lo juntes con ${others}.`,
  },
  colorful: {
    title: name => `${name} puede perseguir peces coloridos`,
    detail: (name, others) =>
      `Algunos ${name} ven los colores muy vivos como un rival. Con ${others} funciona mejor en acuarios grandes y con muchas plantas, y solo si tu pez es tranquilo.`,
  },
  temperament: {
    title: name => `Depende del temperamento de tu ${name}`,
    detail: (name, others) =>
      `Con ${others} no hay aletas largas ni colores que lo provoquen, pero cada ${name} tiene su propio temperamento. Obsérvalo los primeros días y ten un plan B por si los persigue.`,
  },
  speciesOnly: {
    title: name => `${name}: mejor en un acuario solo para su especie`,
    detail: (reason, others) => `${reason} No lo juntes con ${others}.`,
  },
  eatsSmallFish: {
    title: (name, prey) => `${name} se puede comer a ${prey}`,
    detail: (sizeCm, underCm) =>
      `De adulto mide unos ${sizeCm} cm: los peces de menos de ${underCm} cm le caben en la boca.`,
  },
  labyrinthRivals: {
    title: () => "Los laberíntidos pueden pelear entre ellos",
    detail: names =>
      `${names} son parientes y se ven como rivales. Solo en acuarios grandes y con muchas plantas que corten la vista.`,
  },
  bottomRivals: {
    title: () => "Estos cíclidos compiten por el fondo",
    detail: (names, minVolume) =>
      `${names} defienden territorio en la misma zona. Necesitas un acuario largo, de ${minVolume} o más, con cuevas y plantas para que cada uno tenga su espacio.`,
  },
  eatShrimp: {
    title: (names, plural) => `${names} se ${plural ? "comen" : "come"} las gambas`,
    detail: (plural, shrimp) =>
      `Las ${plural ? "ven" : "ve"} como alimento, incluso a las adultas. No ${plural ? "los" : "lo"} juntes con ${shrimp}.`,
  },
  eatShrimpFry: {
    title: (names, plural) => `${names} se ${plural ? "pueden" : "puede"} comer las crías`,
    detail: (plural, shrimp) =>
      `Lo más probable es que se ${plural ? "coman" : "coma"} muchas crías de ${shrimp}. Las adultas, en un acuario bien plantado, normalmente logran esconderse: entre más musgos y plantas tengas, mejor.`,
  },
};

const en = {
  parameterLabels: { temp: "temperature", ph: "pH", gh: "GH" },
  noOverlap: {
    title: label => `No ${label} in common`,
    detail: needs => `${needs}. There's no value that works for both.`,
  },
  narrowOverlap: {
    title: label => `Very narrow ${label} range`,
    detail: (needs, single) =>
      `${needs}. They only overlap at ${single}: you'd have to keep it very stable.`,
  },
  barelyShared: {
    title: () => "They barely share any water parameters",
    detail: () =>
      "They overlap at a single point in more than one parameter. One of them will survive instead of living well.",
  },
  shared: {
    title: () => "They share water parameters",
    detail: ({ temp, ph, gh }) => `The same water works for them: ${temp}, pH ${ph} and GH ${gh}.`,
  },
  tankTooSmall: {
    title: name => `The tank is too small for ${name}`,
    detail: (minVolume, tankVolume) =>
      `It needs at least ${minVolume} and your tank has ${tankVolume}.`,
  },
  overstocked: {
    title: () => "Too many fish for that tank",
    detail: (stockingVolume, tankVolume) =>
      `With the rule of 1 liter per centimeter of adult fish, that many fish need about ${stockingVolume} and your tank has ${tankVolume}. Lower the number or think about a bigger tank: the bigger, the better.`,
  },
  fits: {
    title: () => "They fit in your tank",
    detail: (neededVolume, tankVolume) =>
      `That combination needs at least ${neededVolume} and your tank has ${tankVolume}.`,
  },
  maxCount: {
    title: (max, name) => `Only ${max} ${name} per tank`,
    detail: () => "It's territorial: two males in the same tank will fight.",
  },
  unstableGroup: {
    title: (name, from) => `${name}: alone or in a group of ${from} or more`,
    detail: qty =>
      `You chose ${qty}. When there are only a few, the strongest one chases the rest. It works with just one, or with a big group in a roomy, heavily planted tank, where the aggression gets spread out.`,
  },
  smallGroup: {
    title: (name, min) => `${name}: better in a group of ${min} or more`,
    detail: qty =>
      `You chose ${qty}. In small groups they live stressed and hide: living is not the same as surviving.`,
  },
  finNipper: {
    title: name => `${name} nips fins`,
    detail: others => `Long-finned fish end up bitten and stressed. Don't keep it with ${others}.`,
  },
  mates: {
    title: (name, others) => `${name} and ${others} only meet to breed`,
    detail: () =>
      "Outside of breeding, the male chases her and can hurt or even kill her. Keep each one in its own tank.",
  },
  gouramis: {
    title: name => `${name} won't tolerate gouramis`,
    detail: others =>
      `They're relatives and it sees them as another male: they will fight. Don't keep it with ${others}.`,
  },
  longFins: {
    title: name => `${name} attacks long-finned or long-tailed fish`,
    detail: others =>
      `It mistakes them for another male because of their fins, and chases and attacks them. Don't keep it with ${others}.`,
  },
  colorful: {
    title: name => `${name} may chase colorful fish`,
    detail: (_name, others) =>
      `Some of them see very bright colors as a rival. With ${others} it works better in large tanks with lots of plants, and only if your fish is calm.`,
  },
  temperament: {
    title: name => `It depends on your ${name}'s temperament`,
    detail: (_name, others) =>
      `With ${others} there are no long fins or bright colors to provoke it, but each one has its own temperament. Watch it closely for the first few days and have a plan B in case it chases them.`,
  },
  speciesOnly: {
    title: name => `${name}: better in a tank of its own`,
    detail: (reason, others) => `${reason} Don't keep it with ${others}.`,
  },
  eatsSmallFish: {
    title: (name, prey) => `${name} can eat ${prey}`,
    detail: (sizeCm, underCm) =>
      `As an adult it grows to about ${sizeCm} cm: fish under ${underCm} cm fit in its mouth.`,
  },
  labyrinthRivals: {
    title: () => "Labyrinth fish may fight each other",
    detail: names =>
      `${names} are relatives and see each other as rivals. Only in large tanks with lots of plants to break the line of sight.`,
  },
  bottomRivals: {
    title: () => "These cichlids compete for the bottom",
    detail: (names, minVolume) =>
      `${names} defend territory in the same area. You need a long tank, ${minVolume} or more, with caves and plants so each one has its own space.`,
  },
  eatShrimp: {
    title: (names, plural) => `${names} ${plural ? "eat" : "eats"} shrimp`,
    detail: (plural, shrimp) =>
      `${plural ? "They see" : "It sees"} them as food, even the adults. Don't keep ${plural ? "them" : "it"} with ${shrimp}.`,
  },
  eatShrimpFry: {
    title: names => `${names} may eat the baby shrimp`,
    detail: (plural, shrimp) =>
      `${plural ? "They" : "It"} will most likely eat many of the ${shrimp} babies. In a well-planted tank the adults can usually hide: the more moss and plants you have, the better.`,
  },
};

export const compatibilityMessages = { es, en };
