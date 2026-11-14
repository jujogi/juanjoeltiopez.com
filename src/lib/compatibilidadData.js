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
  text: "Antes de comprar, revisa si las especies que quieres comparten agua, espacio y temperamento. Ya tenemos {count} peces y gambitas para comparar.",
  features: [
    "Temperatura, pH y GH que les sirven a todas",
    "Litros y ocupación de tu acuario",
    "Temperamento y qué tan seguras están las gambitas",
  ],
  cta: "Probar Armonía Acuática",
  combosLabel: "O empieza con una de estas:",
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
    text: "Revisamos el acuario mínimo de cada especie y, como guía, la regla de 1 litro por cada centímetro de pez adulto. Las gambitas no cuentan en esa regla. Es solo una referencia: ¡entre más litros tengas, mejor!",
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
    q: "¿Puedo juntar Neocaridinas y Caridinas?",
    a: "No te lo recomendamos. Las Neocaridinas necesitan un pH de 6.5 a 7.5 y un GH de 6 a 8; las Caridinas, por su parte prefieren aguas muy blandas. Las neocaridinas adaptarse a esos parámetros pero no al revés. Es un riesgo que no vale la pena correr.",
  },
  {
    q: "¿Las gambas Sulawesi pueden vivir con otras gambitas?",
    a: "No. Esta especie necesita una temperatura de 27 a 30 °C, y un pH de 7.5 a 8.5. Ningún pez o gambita puede adaptarse a ese rango de parámetros.",
  },
];
