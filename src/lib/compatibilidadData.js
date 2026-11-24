// Textos de Armonía Acuática (/armonia-acuatica): se usan en la página, los metadatos,
// los datos estructurados y la invitación de los artículos.
// Las respuestas sobre el Betta y las gambitas repiten los datos de los artículos del blog.

import { getSpeciesById } from "./speciesData";

// Ruta de la herramienta: la usan la página, el sitemap, llms.txt y los enlaces de los artículos
export const COMPATIBILIDAD_PATH = "/armonia-acuatica";

export const compatibilidad = {
  // name: la marca de la herramienta · tagline: lo que la gente busca en Google
  name: "Armonía Acuática",
  tagline: "Compatibilidad de peces y gambitas",
  // Para el <title>, llms.txt y las vistas previas al compartir
  title: "Armonía Acuática: compatibilidad de peces y gambitas",
  lead: "Elige las especies que quisieras tener en tu acuario, cuéntanos de cuántos litros es y veamos si pueden vivir juntas: parámetros, espacio y temperamento.",
};

// Calculadora de litros (LitersCalculator), para quien no sabe de cuántos litros es su acuario.
// Las medidas siempre van en centímetros; el resultado sale en la unidad elegida.
// unit: "litros" o "galones" (ui.units) · los volúmenes llegan ya con su unidad ("60 L")
export const litersCalculator = {
  toggle: unit => `¿No sabes de cuántos ${unit} es tu acuario?`,
  title: unit => `Calculemos los ${unit} de tu acuario`,
  help: "Mide tu acuario por fuera con un metro, en centímetros.",
  fields: [
    { key: "length", label: "Largo", placeholder: "60" },
    { key: "width", label: "Ancho", placeholder: "30" },
    { key: "height", label: "Alto", placeholder: "35" },
  ],
  discountLabel: "Descontar rocas, troncos y sustrato",
  decorLabel: "¿Cuánto ocupan?",
  decorHelp:
    "Sí, tu acuario no solo tiene agua: las rocas, los troncos y sustrato nos quitan algunos litros. Si tienes poca decoración, déjalo en 10%; en un paisajismo con muchas rocas puede ser 30% o más.",
  defaultDecorPercent: 10,
  maxDecorPercent: 60,
  empty: unit => `Escribe las tres medidas y te decimos cuántos ${unit} tiene.`,
  result: "Tu acuario tiene unos",
  resultDetail: (total, percent) => `${total} en total, menos ${percent}% de decoración.`,
  resultTotal: "Sin descontar la decoración.",
  tooBig: max => `Por ahora la herramienta llega hasta ${max}.`,
  use: volume => `Usar ${volume}`,
};

// Bloque que invita a usar la herramienta desde los artículos (ArmoniaBand)
export const armoniaInvite = {
  title: "¿Quieres saber qué peces pueden vivir juntos?",
  text: "Elige tus especies, cuéntanos de cuántos litros es tu acuario y te decimos si pueden vivir juntas: parámetros, espacio y temperamento.",
  cta: "Probar Armonía Acuática",
  // Fotos que se muestran cuando el artículo no tiene especies propias
  defaultIds: ["betta", "tetra-neon", "ramirezi", "neocaridina"],
};

// Bloque de la home (ArmoniaHomeBand). {count} se reemplaza por el número de especies
export const armoniaHome = {
  title: "¿Tus peces pueden vivir juntos?",
  text: "Antes de comprar, revisa si las especies que quieres comparten parámetros, espacio y temperamento. Ya tenemos {count} peces, gambitas y caracoles para comparar.",
  features: [
    "Temperatura, pH y GH que les sirven a todas",
    "Litros y ocupación de tu acuario",
    "Temperamento y qué tan seguras están las gambitas",
  ],
  cta: "Probar Armonía Acuática",
  combosLabel: "O empieza con una de estas especies:",
  // Resultado de ejemplo que se muestra como vista previa (lo calcula la misma herramienta)
  example: {
    liters: 60,
    selection: [
      { id: "betta", qty: 1 },
      { id: "neocaridina", qty: 10 },
    ],
  },
};

// Enlace a la herramienta; con ids, abre con esas especies ya elegidas (cada una en su grupo mínimo)
export const armoniaHref = ids =>
  ids?.length
    ? `${COMPATIBILIDAD_PATH}?p=${ids.map(id => `${id}:${getSpeciesById(id).minGroup}`).join(",")}`
    : COMPATIBILIDAD_PATH;

// Ejemplos de un toque para quien no sabe por dónde empezar (ids de speciesData.js)
export const starterCombos = [
  { label: "Betta + gambitas", ids: ["betta", "neocaridina"] },
  { label: "Neones + Corydoras", ids: ["tetra-neon", "corydoras"] },
  { label: "Guppys + platys", ids: ["guppy", "platy"] },
];

export const checksExplained = [
  {
    title: "Parámetros del agua",
    text: "Comparamos la temperatura, el pH y el GH de cada especie y te mostramos el rango que comparten. Si no hay un valor que les sirva a todas, no son compatibles.",
  },
  {
    title: "Litros del acuario",
    text: "Revisamos el acuario mínimo de cada especie y, como guía, la regla de 1 litro por cada centímetro de pez adulto. Las gambitas y los caracoles no cuentan en esa regla. Es solo una referencia: ¡entre más litros tengas, mejor!",
  },
  {
    title: "Temperamento",
    text: "Mordedores de aletas con peces de aletas largas, peces grandes que se comen a los pequeños y peces territoriales como el Betta, que ataca a los de colas largas y puede perseguir a los muy coloridos.",
  },
  {
    title: "Cardumen y gambitas",
    text: "Los peces de cardumen necesitan convivir en grupo para estar tranquilos. Y si quieres gambitas, vamos a ver qué tan seguras estarán ellas y sus crías.",
  },
];

export const faq = [
  {
    q: "¿Cómo saber si dos peces son compatibles?",
    a: "Tienen que compartir en cierta medida temperatura, pH y GH, caber en el mismo acuario y tener un temperamento parecido. Si uno muerde aletas, es territorial o le cabe el otro en la boca, no son compatibles aunque sus parámetros sean similares.",
  },
  {
    q: "¿Qué peces pueden vivir con gambitas?",
    a: "Vamos a la fija con peces pequeños y pacíficos, como las Corys pigmeas y Otocinclus. Los tetras y rasboras respetan a las adultas, pero las crías siempre estarán en riesgo. Los peces grandes como escalares, ramirezi o discos, las verán siempre como alimento premium.",
  },
  {
    q: "¿Un Betta puede vivir con otros peces?",
    a: "Depende mucho del temperamento de cada Betta. Los mejores compañeros son peces pacíficos y poco llamativos, como Corydoras u Otocinclus. Evita otros Bettas, en especial machos y peces de aletas o colas largas como los guppys.",
  },
  {
    q: "¿Puedo tener una pareja de Bettas?",
    a: "No en el mismo acuario. El macho y la hembra solo se juntan para reproducirse: fuera de eso, el macho la persigue y la puede lastimar o matar. Dos machos tampoco, porque se pelean. Las hembras pueden vivir solas o en grupo de 5 o más, en un acuario grande y bien plantado; con 2 a 4, la más fuerte persigue a las demás.",
  },
  {
    q: "¿Puedo juntar Neocaridinas y Caridinas?",
    a: "No te lo recomendamos. Las Neocaridinas necesitan un pH de 6.5 a 7.5 y un GH de 6 a 8; las Caridinas, por su parte prefieren aguas muy blandas. Las neocaridinas pueden adaptarse a esos parámetros pero no al revés. Es un riesgo que no vale la pena correr.",
  },
  {
    q: "¿Las gambas Sulawesi pueden vivir con otras gambitas?",
    a: "No. Esta especie necesita una temperatura de 27 a 30 °C, y un pH de 7.5 a 8.5. Ningún pez o gambita puede adaptarse a ese rango de parámetros.",
  },
];

// Textos de la herramienta en sí (botones, etiquetas, avisos), por componente. La versión en
// inglés está en compatibilidadEn.js con las mismas llaves.
// unit: el nombre de la unidad ("litros" o "galones") · volume: ya con su unidad ("60 L", "16 gal")
export const ui = {
  // Unidad del acuario: short en el botón, name dentro de las frases
  units: {
    label: "Unidad del acuario",
    // button: los botones de unidad junto al campo · slider: la barra para deslizar
    slider: unit => `Tamaño del acuario en ${unit}`,
    l: { short: "L", name: "litros", button: "Litros" },
    gal: { short: "gal", name: "galones", button: "Galones" },
  },
  // El botón de idioma se lee en el idioma al que lleva
  languageSwitch: "Not familiar with Spanish? See it in English",
  home: "Inicio",
  faqTitle: "Preguntas frecuentes",
  howItWorks: {
    eyebrow: "¿Cómo funciona?",
    title: "Lo que revisamos por ti",
    disclaimerTitle: "Es solo una referencia",
    disclaimer:
      "Armamos esta herramienta con información disponible en internet y con nuestra experiencia, pero eso no significa que funcione en todos los casos: cada pez tiene su propio temperamento y cada acuario es diferente. Observa siempre a tus animales y ten un plan B por si hace falta separarlos.",
  },
  tool: {
    added: name => `¡Listo! Agregaste ${name}`,
    linkCopied: "¡Enlace copiado! Compártelo con quien quieras",
    // Si el navegador no deja copiar: el enlace es el de la barra de direcciones
    linkNotCopied: "No pudimos copiarlo. Copia el enlace de la barra de direcciones",
    // Los pasos: su nombre en la barra de progreso y los botones para moverse entre ellos
    steps: ["Tu acuario", "Especies y resultado"],
    stepOf: (n, total) => `Paso ${n} de ${total}`,
    toSpecies: "Elegir especies",
    toTank: "Cambiar dimensiones del acuario",
    // Igual en litros y en galones: si cambiara con la unidad, en el celular saltaría de línea
    litersStep: "¿De qué tamaño es tu acuario?",
    litersIntro:
      "Escríbelo, mueve la barra o elige uno de los tamaños más comunes. Con eso revisamos si a cada especie le alcanza el espacio.",
    needsLiters: unit => `Indícanos los ${unit} de tu acuario para afinar los resultados`,
    addLiters: unit => `Indicar los ${unit}`,
    // Bajo el campo, si toca "Elegir especies" sin haber escrito el tamaño
    litersRequired: unit => `Escribe los ${unit} de tu acuario para seguir.`,
    speciesStep: "Elige las especies que quieres tener",
    speciesCount: (fish, shrimp, snails) =>
      `Por ahora tenemos ${fish} peces, ${shrimp} gambitas y ${snails} caracoles en nuestra base de datos.`,
    resultStep: "¿Pueden vivir juntas?",
    copyLink: "Copiar enlace",
    // En el celular: abre el menú de compartir del sistema con el enlace y este texto
    share: "Compartir",
    shareText: "Mira si estas especies pueden vivir juntas en el acuario:",
    reset: "Empezar de nuevo",
    yourTank: volume => (volume ? `Tu acuario de ${volume}` : "Tu acuario"),
    photosNote: "Fotos de Wikimedia Commons: el autor y la licencia de cada una están en su ficha.",
    startersLabel: "¿No sabes por dónde empezar? Prueba con una de estas:",
  },
  // Los tres niveles del veredicto: title en el resultado, label en las sugerencias del buscador
  levels: {
    ok: { title: "Sí, pueden vivir juntas", label: "Compatible" },
    caution: { title: "Pueden vivir juntas, pero con cuidado", label: "Con cuidado" },
    bad: { title: "No te lo recomendamos", label: "No recomendado" },
  },
  result: {
    addAnother: "Agrega otra especie para compararlas",
    temperature: "Temperatura",
    noMatch: "No coinciden",
    minTank: "Acuario mínimo",
    // En vez de litros, para los peces de estanque (pondFish)
    pond: "Estanque",
    comparing: "Especies que estás comparando",
    singleNeeds: "Lo que necesita:",
    sharedWater: "El agua que les sirve a todas:",
    // La barra muestra lo que pide la combinación (acuario mínimo o 1 L/cm, lo que sea mayor)
    stocking: "Cuánto de tu acuario se necesita",
    stockingFits: (needed, tank) => `Pide mínimo ${needed} de tus ${tank}`,
    stockingOver: (needed, tank) => `Pide ${needed} y tienes ${tank}`,
    remove: name => `Quitar ${name}`,
    // Botón en los avisos de espacio: lleva al paso del acuario
    changeTank: unit => `Cambiar los ${unit}`,
  },
  card: {
    showDetails: "Ver ficha",
    hideDetails: "Ocultar ficha",
    showDetailsOf: name => `Ver ficha de ${name}`,
    hideDetailsOf: name => `Ocultar ficha de ${name}`,
    min: n => `Mínimo ${n}`,
    less: name => `Menos ${name}`,
    more: name => `Más ${name}`,
    guide: "Lee la guía completa",
    aliases: names => `También le dicen: ${names}`,
    photo: "Foto:",
    viaCommons: " · vía Wikimedia Commons",
  },
  search: {
    label: "Buscar una especie",
    placeholder: "Busca: neón, ramirezi, gambitas…",
    clear: "Borrar la búsqueda",
    listLabel: "Especies",
    noResults: "No tenemos esa especie todavía.",
    alreadyChosen: names => `Ya está en tu acuario: ${names}.`,
    // Buscó un animal que no es pez, gambita ni caracol (ajolote, tortuga…): NOT_FISH en speciesSearch.js
    notFish: "Por ahora solo comparamos peces, gambitas y caracoles.",
    // La especie se encontró por otro de sus nombres (aliases en speciesData.js)
    alias: name => `También: ${name}`,
    allChosen: "Ya elegiste todas las especies.",
  },
  liters: {
    placeholder: { l: "Ej: 60", gal: "Ej: 20" },
    close: "Cerrar",
  },
};
