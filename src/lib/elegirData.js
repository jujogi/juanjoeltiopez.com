// Textos de "Ayúdame a elegir" (/ayudame-a-elegir). En inglés: elegirEn.js, con las mismas
// claves. Textos nuevos escritos por Claude: PENDIENTES DE REVISIÓN por JuanJo.

export const ELEGIR_PATH = "/ayudame-a-elegir";

export const elegir = {
  name: "Ayúdame a elegir",
  tagline: "Qué peces poner en tu acuario",
  lead: "Respondiendo solo 4 preguntas, elegimos los peces que más te convengan: especies que pueden vivir juntas, en la cantidad justa para el tamaño de tu acuario.",
};

// Las cuatro preguntas, en orden. Las claves de las opciones (value) viajan en la URL y en
// Analytics: no se cambian. summary: cómo se lee la opción en el resumen de los resultados.
export const questions = {
  tank: {
    title: unit => `¿De cuántos ${unit} es tu acuario?`,
    hint: "Con eso calculamos cuántos peces caben sin sobrepoblar tu acuario.",
    missing: unit => `Escribe los ${unit} de tu acuario para seguir.`,
    calculator: unit => `¿No sabes de cuántos ${unit} es tu acuario?`,
  },
  exp: {
    title: "¿Cuánta experiencia tienes?",
    options: [
      { value: "iniciando", label: "Estoy iniciando", detail: "Es mi primer acuario" },
      { value: "algo", label: "Ya tuve acuario", detail: "Sé ciclar y hacer cambios de agua" },
      { value: "experto", label: "Tengo experiencia", detail: "He tenido especies exigentes" },
    ],
  },
  agua: {
    title: "¿Cómo es tu agua de la llave?",
    hint: "Si tienes un test de pH y GH, mídela. Si no, elige “No sé”.",
    options: [
      {
        value: "blanda",
        label: "Ácida",
        summary: "Agua ácida",
        detail: "pH 7.0 o menos y GH de 8 o menos",
      },
      {
        value: "dura",
        label: "Alcalina",
        summary: "Agua alcalina",
        detail: "pH de 7.5 o más y GH alto",
      },
      {
        value: "nose",
        label: "No sé",
        summary: "Agua sin medir",
        detail: "Te sugerimos especies que se adaptan a casi todo",
      },
    ],
  },
  meta: {
    title: "¿Qué te gustaría tener?",
    options: [
      {
        value: "comunidad",
        label: "Un cardumen tranquilo",
        detail: "Varios peces pequeños nadando juntos",
      },
      {
        value: "protagonista",
        label: "Un pez protagonista",
        detail: "Un pez que se roba las miradas, con su cardumen",
      },
      {
        value: "gambario",
        label: "Gambitas",
        detail: "Un gambario, con peces que no se las coman",
      },
      { value: "grandes", label: "Peces grandes", detail: "Para acuarios de 100 litros o más" },
    ],
  },
};

export const ui = {
  home: "Inicio",
  tools: "Herramientas",
  // El botón de idioma se lee en el idioma al que lleva
  languageSwitch: "Not familiar with Spanish? See it in English",
  // Los pasos en la barra de progreso: cortos, para que quepan los cinco en el celular
  steps: ["Acuario", "Experiencia", "Parámetros", "Objetivo", "Resultado"],
  stepOf: (n, total) => `Paso ${n} de ${total}`,
  next: "Siguiente",
  back: "Atrás",
  // Objetivo apagado porque no cabe en el acuario
  needsTank: volume => `Necesita un acuario de al menos ${volume}`,
  units: {
    label: "Unidad del acuario",
    l: { short: "L", name: "litros", button: "Litros" },
    gal: { short: "gal", name: "galones", button: "Galones" },
  },
  results: {
    title: "Te sugerimos estos acuarios",
    option: n => `Opción ${n}`,
    restart: "Empezar de nuevo",
    others: "Ver otras opciones",
    stocking: percent => `Ocupa el ${percent}% de tu acuario`,
    // Sin peces: el texto nombra solo lo que trae la propuesta (gambitas, caracoles o los dos)
    noStocking: {
      shrimp: "Las gambitas casi no ocupan espacio",
      snail: "Los caracoles casi no ocupan espacio",
      both: "Las gambitas y los caracoles casi no ocupan espacio",
    },
    water: "Agua que comparten",
    cautions: "Ten en cuenta",
    // Los créditos completos de cada foto (autor, licencia y fuente) están en la ficha de la
    // especie en Armonía Acuática, que se abre con el botón de cada propuesta
    credits:
      "Los créditos de las fotos están en la ficha de cada especie en Armonía Acuática. Ábrela con el botón «Revísala en Armonía Acuática».",
    open: "Revísala en Armonía Acuática",
    noResult: {
      tank: volume =>
        `Para esto te recomendamos un acuario de al menos ${volume}. Prueba con otro objetivo o, si tu acuario es más grande, cambia los litros.`,
      water:
        "Con esa agua no encontramos especies para este objetivo. Prueba con otro objetivo o con “No sé”.",
      experience: "Este objetivo pide más experiencia. Prueba con otro objetivo para empezar.",
    },
  },
  // Cómo se llama cada papel (ROLES en advisorSpecies.js) en la tarjeta de la propuesta
  roles: {
    cardumen: "Cardumen",
    viviparos: "Vivíparos",
    fondo: "Fondo",
    limpieza: "Equipo de limpieza",
    protagonista: "Protagonista",
    gambas: "Gambitas",
    nano: "Compañeros",
    caracol: "Caracoles",
    grande: "Protagonista",
    cardumenGrande: "Cardumen",
    fondoGrande: "Fondo",
  },
  faqTitle: "Preguntas frecuentes",
  // Aviso debajo de la herramienta, justo antes de "¿Cómo elegimos tus peces?"
  coldNote:
    "Todas las especies que sugerimos en Ayúdame a elegir son tropicales, así que si vives en una ciudad donde hace mucho frío o la temperatura varía mucho durante el día, considera añadir un calentador.",
};

// "¿Cómo elegimos tus peces?": la sección debajo de la herramienta (texto propio de la página
// para Google). Lo que dice tiene que coincidir con speciesAdvisor.js.
export const howWeChoose = {
  eyebrow: "¿Cómo elegimos tus peces?",
  title: "Lo que tenemos en cuenta",
  items: [
    {
      title: "Los litros de tu acuario",
      text: "Solo sugerimos especies que caben en tu acuario y llenamos hasta el 80% con la regla de 1 litro por cada centímetro de pez adulto. Así queda espacio para que no vivan apretados: ¡entre más litros, mejor!",
    },
    {
      title: "Tu experiencia",
      text: "Si estás iniciando, te sugerimos especies resistentes y fáciles de mantener. Las más exigentes, como el Ramirezi o las Caridinas, las dejamos para quien ya tiene experiencia.",
    },
    {
      title: "Tu agua de la llave",
      text: "Elegimos especies que viven bien con el pH y el GH de tu agua, para que no tengas que cambiarla. Si no la has medido, te sugerimos las que se adaptan a casi cualquier agua.",
    },
    {
      title: "Que puedan vivir juntas",
      text: "Cada propuesta pasa por las mismas reglas de Armonía Acuática: parámetros, espacio, temperamento, cardumen y gambitas. Nunca te sugerimos una combinación que allá dé “no”.",
    },
  ],
};

// Invitación a la herramienta desde la home, los artículos y Armonía Acuática (ElegirBand.js)
export const elegirInvite = {
  title: "¿No sabes qué peces poner en tu acuario?",
  text: "Respondiendo solo 4 preguntas, elegimos los peces que más te convengan: especies que pueden vivir juntas, en la cantidad justa para el tamaño de tu acuario.",
  cta: "Ayúdame a elegir",
  // Fotos de la banda
  ids: ["tetra-neon", "corydoras", "gurami-miel", "amano"],
};

export const faq = [
  {
    q: "¿Cuántos peces puedo tener en mi acuario?",
    a: "Usamos una regla orientativa: 1 litro por cada centímetro de pez adulto, y dejamos un margen para que no vivan apretados. Las gambitas y los caracoles casi no cuentan.",
  },
  {
    q: "¿Cómo sé si mi agua de la llave es ácida o alcalina?",
    a: "Mídela con un test de pH y GH. Si el pH está en 7.0 o menos y el GH en 8 o menos, es ácida. Si no tienes test, elige “No sé” y te sugerimos especies que se adaptan a casi cualquier agua.",
  },
  {
    q: "¿Por qué no me sugieren mi pez favorito?",
    a: "Solo sugerimos especies que encajan con tus litros, tu agua y tu experiencia. Si ya tienes un pez en mente, revísalo en Armonía Acuática con los que quieres juntar.",
  },
];
