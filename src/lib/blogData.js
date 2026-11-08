// Datos del blog - se reemplazará con Strapi más adelante
import bettaContent from "./posts/betta-content.js";
import gambitasContent from "./posts/gambitas-content.js";
import mantenimientoContent from "./posts/mantenimiento-content.js";
import caridinasContent from "./posts/caridinas-content.js";
import plantasContent from "./posts/plantas-content.js";
import paisajismoContent from "./posts/paisajismo-content.js";
import osmosisContent from "./posts/osmosis-content.js";
import filtroMantenimientoContent from "./posts/filtro-mantenimiento-content.js";

export const blogPosts = [
  {
    id: "1",
    title: "¿Tienes un Pez Betta? Todo lo que necesitas saber",
    slug: "cuidado-pez-betta",
    excerpt:
      "Los Betta son peces fascinantes pero necesitan un entorno adecuado para estar bien. ¡Recuerda que no es lo mismo vivir que sobrevivir!",
    content: bettaContent,
    summary:
      "Un Betta necesita un acuario de mínimo 15 litros (ideal 20 o más), calentador para mantener el agua entre 24 y 28 °C, un filtro de flujo suave y plantas naturales. Dale 2–3 pellets una o dos veces al día, con un día de ayuno a la semana, y cambia el 25–30 % del agua cada semana.",
    category: "Cuidado de Peces",
    categoryColor: "blue",
    date: "2024-12-01T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/betta-acuario-1.jpg",
    coverImage: "/images/betta-acuario-2.jpg",
    level: "Principiante",
    careSheet: {
      species: "Betta splendens",
      items: [
        { key: "volume", label: "Acuario mínimo", value: "15 L (ideal 20+)" },
        { key: "temp", label: "Temperatura", value: "24–28 °C" },
        { key: "ph", label: "pH", value: "6.5–7.5" },
        { key: "hardness", label: "GH / KH", value: "5–15 / 3–8" },
        { key: "food", label: "Alimentación", value: "2–3 pellets, 1–2 veces/día" },
        { key: "lifespan", label: "Esperanza de vida", value: "3–5 años o más" },
      ],
    },
    faq: [
      {
        q: "¿Cuántos litros necesita un pez Betta?",
        a: 'Mínimo 15 litros, idealmente 20 o más. Evita las peceras pequeñas tipo "betteras": un acuario largo le da espacio para nadar, explorar y ejercitarse.',
      },
      {
        q: "¿El Betta necesita calentador?",
        a: "Sí. Es un pez tropical y necesita el agua estable entre 24 y 28 °C. Sin calentador solo sobrevive, no vive bien: la temperatura baja le causa letargo y enfermedades.",
      },
      {
        q: "¿Cuántas veces al día debo alimentar a mi Betta?",
        a: "2–3 pellets, 1–2 veces al día, con un día de ayuno a la semana. Su estómago es casi del tamaño de su ojo, así que la sobrealimentación es el error más común.",
      },
      {
        q: "¿Con qué peces puede vivir un Betta?",
        a: "Con peces de fondo pacíficos como Corydoras u Otocinclus, caracoles y rasboras. Evita otros Bettas, peces de aletas largas como los guppys y peces mordedores de aletas.",
      },
    ],
    videoIds: [
      "betta-taninos",
      "betta-feliz",
      "betta-acuario",
      "betta-hojas-almendro",
      "betta-botanicos",
      "betta-compatibles",
      "betta-entrena",
    ],
  },
  {
    id: "2",
    title: "Gambitas: Guía para principiantes",
    slug: "gambitas-acuario-cuidados",
    excerpt:
      "Las gambitas de acuario son diminutas criaturas llenas de carácter y ternura que pueden ser un verdadero espectáculo en tu acuario.",
    content: gambitasContent,
    summary:
      "Si estás empezando, elige Neocaridinas: son mucho más resistentes que las Caridinas. Necesitan un acuario de al menos 20 litros, agua entre 24 y 26 °C, pH de 6.5 a 7.5 y GH de 6 a 8, un filtro de esponja que no succione las crías y musgos donde refugiarse. Aliméntalas cada 2 días y en muy poca cantidad.",
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2026-06-15T12:00:00Z",
    updated: "2026-11-07T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/gambitas.jpg",
    coverImage: "/images/gambitas-2.jpg",
    level: "Principiante",
    careSheet: {
      species: "Neocaridina davidi",
      items: [
        { key: "volume", label: "Acuario mínimo", value: "20 L" },
        { key: "temp", label: "Temperatura", value: "24–26 °C" },
        { key: "ph", label: "pH", value: "6.5–7.5" },
        { key: "hardness", label: "GH", value: "6–8" },
        { key: "filter", label: "Filtro", value: "Esponja" },
        { key: "water", label: "Cambios de agua", value: "10–20% semanal" },
      ],
    },
    faq: [
      {
        q: "¿Qué gambitas son mejores para principiantes?",
        a: "Las Neocaridinas (Cherry Red, Bloody Mary, Blue Velvet, Yellow Fire): son resistentes, se reproducen con facilidad y toleran un rango de parámetros más amplio que las Caridinas.",
      },
      {
        q: "¿Cuántos litros necesitan las gambitas?",
        a: "Al menos 20 litros. Cuanto más grande sea el acuario, más fácil es mantener los parámetros estables.",
      },
      {
        q: "¿Qué filtro usar en un gambario?",
        a: "Un filtro de esponja: es eficiente biológicamente y no succiona las crías. Si usas un filtro canister o de cascada, cubre la entrada con una malla fina o una esponja de pre-filtro.",
      },
      {
        q: "¿Cada cuánto debo alimentar a mis gambitas?",
        a: "¡A mis gambas las alimento cada 2 días y en muy pequeñas cantidades! Ellas también se alimentan del biofilm y las algas que hay en el acuario, así que no hace falta más.",
      },
    ],
    videoIds: [
      "mantenimiento-gambario-neocaridinas",
      "gambitas-5-consejos",
      "gambitas-alimento-premium",
      "gambitas-snacks",
      "gambitas-3-tips",
    ],
  },
  {
    id: "3",
    title: "Así debe ser el mantenimiento de tu acuario",
    slug: "mantenimiento-acuario-rutina",
    excerpt:
      "Mantener un acuario es mucho más que solo alimentar peces. Requiere cuidados regulares para asegurar que el ecosistema acuático funcione de la mejor manera.",
    content: mantenimientoContent,
    summary:
      "Cambia entre el 20 y el 30 % del agua cada semana, sifoneando el sustrato y tratando el agua de la llave con acondicionador. Lava las esponjas del filtro con agua de la llave y el material biológico con agua del acuario, mide amonio, nitritos, nitratos y pH, y nunca limpies el filtro, el sustrato y el agua el mismo día.",
    category: "Mantenimiento",
    categoryColor: "cyan",
    date: "2024-11-25T12:00:00Z",
    updated: "2026-11-08T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/mantenimientos.jpg",
    coverImage: "/images/mantenimientos-2.jpg",
    faq: [
      {
        q: "¿Cada cuánto debo cambiar el agua del acuario?",
        a: "Cada semana, entre un 20% y 30% del agua. Usa un sifón para aspirar los desechos del sustrato y acondiciona el agua de la llave antes de agregarla, para eliminar cloro, cloraminas y metales pesados.",
      },
      {
        q: "¿Es normal que salgan algas en un acuario recién montado?",
        a: "Sí, es completamente normal en las primeras semanas: las bacterias beneficiosas todavía se están estableciendo. Cuando el ecosistema madura y se equilibra, las algas desaparecen.",
      },
      {
        q: "¿Puedo limpiar el filtro el mismo día del cambio de agua?",
        a: "No es recomendable. Si limpias el filtro, el sustrato y haces un cambio de agua grande el mismo día, puedes eliminar demasiadas bacterias beneficiosas. Separa estas tareas.",
      },
    ],
    videoIds: [
      "mantenimiento-algas",
      "mantenimiento-betta",
      "mantenimiento-plantado",
      "mantenimiento-filtro",
    ],
    relatedPostSlugs: ["mantenimiento-filtro-algas"],
  },
  {
    id: "4",
    title: "Cómo montar un gambario para caridinas",
    slug: "caridinas-gambario-montaje",
    excerpt:
      "Las caridinas son de las especies de gambas más fascinantes, pero requieren cuidados especiales. Aprende cómo montar un gambario ideal para ellas.",
    content: caridinasContent,
    summary:
      "Las caridinas necesitan agua de ósmosis remineralizada con sales para gambas, un GH entre 4 y 6, KH bajo y pH entre 5.5 y 6.5. Para lograrlo, monta el gambario con sustrato activo, sobrefiltración y bacteria powder, y dale tiempo de madurar: no basta con ciclarlo, también necesita biofilm.",
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2024-12-09T12:00:00Z",
    updated: "2026-11-07T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "15 min lectura",
    image: "/images/gambario.jpg",
    coverImage: "/images/gambario.jpg",
    faq: [
      {
        q: "¿Qué parámetros necesitan las caridinas?",
        a: "Un pH entre 5.5 y 6.5, un GH entre 4 y 6 y un KH bajo. Lo mejor es usar agua de ósmosis con sales específicas para gambas, así controlas con exactitud el GH y los TDS.",
      },
      {
        q: "¿Por qué usar sustrato activo en un gambario de caridinas?",
        a: "Porque mantiene el pH ácido que necesitan y amortigua sus cambios. Además libera nutrientes de forma controlada para las plantas y los microorganismos del gambario.",
      },
      {
        q: "¿Basta con ciclar el gambario antes de meter las caridinas?",
        a: "No. Además del ciclo del nitrógeno, el gambario tiene que madurar: desarrollar microorganismos y biofilm, que son su alimento, y ganar estabilidad para resistir fluctuaciones.",
      },
      {
        q: "¿Para qué sirve el bacteria powder?",
        a: "Acelera el establecimiento del ecosistema: ayuda a colonizar el sustrato y el filtro con bacterias nitrificantes y favorece el biofilm, una fuente de alimento esencial para las caridinas.",
      },
    ],
    level: "Avanzado",
    careSheet: {
      species: "Caridina sp. (Crystal Red, Taiwan Bee)",
      items: [
        { key: "ph", label: "pH", value: "5.5–6.5" },
        { key: "hardness", label: "GH", value: "4–6" },
        { key: "hardness", label: "KH", value: "Bajo" },
        { key: "water", label: "Agua", value: "Ósmosis + sales" },
        { key: "substrate", label: "Sustrato", value: "Activo" },
      ],
    },
    videoIds: [
      "caridinas-montaje",
      "caridinas-ciclado",
      "caridinas-microfauna",
      "caridinas-plantando",
      "caridinas-algas",
      "caridinas-primeros-inquilinos",
      "caridinas-pure-line",
      "caridinas-mudan",
      "caridinas-evolucion",
    ],
  },
  {
    id: "5",
    title: "¿Por qué añadir plantas acuáticas al acuario?",
    slug: "plantas-naturales-acuario",
    excerpt:
      "Si aún decoras tu acuario con plantas de plástico, ¡es momento de hacer un cambio! Descubre por qué las plantas naturales son esenciales.",
    content: plantasContent,
    summary:
      "Las plantas naturales oxigenan el agua, absorben nitratos y fosfatos (lo que frena las algas) y dan refugio a peces y gambas; las de plástico no aportan nada. Para empezar necesitas una lámpara LED para acuarios plantados, abono líquido con NPK y plantas fáciles como anubias, helecho de Java o cryptocorynes.",
    category: "Plantas",
    categoryColor: "green",
    date: "2024-12-08T12:00:00Z",
    updated: "2026-11-07T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "8 min lectura",
    image: "/images/acuario-plantado.jpg",
    coverImage: "/images/acuario-plantado-2.jpg",
    faq: [
      {
        q: "¿Son mejores las plantas naturales que las de plástico?",
        a: "Sí. Las naturales producen oxígeno, se alimentan de nitratos y fosfatos (lo que ayuda a evitar algas) y dan refugio a peces y gambas. Las de plástico no aportan nada al ecosistema y sus bordes rígidos pueden dañar las aletas.",
      },
      {
        q: "¿Qué plantas acuáticas son fáciles para principiantes?",
        a: "Las de bajo requerimiento, que crecen con luz moderada y sin CO2 presurizado: Anubias, Bucephalandras, helecho de Java, Cabomba, cola de zorro, Cryptocorynes y Echinodorus.",
      },
      {
        q: "¿Puedo tener plantas naturales con arena o grava?",
        a: "Sí. Si usas un sustrato inerte como arena o grava, compleméntalo con pastillas fertilizantes, que liberan nutrientes directamente en las raíces.",
      },
      {
        q: "¿Cada cuánto debo abonar las plantas del acuario?",
        a: "Una dosis semanal de abono líquido con NPK, después del mantenimiento y siguiendo las instrucciones del fabricante. Empieza abonando menos de lo que dice el frasco.",
      },
    ],
    videoIds: [
      "plantas-no-plastico",
      "plantas-montaje-betta",
      "plantas-adios-artificial",
      "plantas-anubias-bucephalandras",
      "betta-acuario",
    ],
  },
  {
    id: "6",
    title: "Paisajismo acuático: Arte bajo el agua",
    slug: "paisajismo-acuatico-guia",
    excerpt:
      "El paisajismo acuático no es solo una ventana a lo natural, sino una forma de transmitir y sentir el arte. Aprende a crear ecosistemas armoniosos y visualmente deslumbrantes.",
    content: paisajismoContent,
    summary:
      "Un acuario de paisajismo necesita un filtro que mueva al menos 5 veces su volumen por hora, iluminación para plantas y, según las plantas, CO2. Diseña el hardscape con rocas y troncos, cicla el acuario entre 4 y 6 semanas antes de meter peces y, al principio, cambia el 30–50 % del agua 2–3 veces por semana.",
    category: "Paisajismo acuático",
    categoryColor: "purple",
    date: "2024-12-07T12:00:00Z",
    updated: "2026-11-07T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/concurso.jpg",
    coverImage: "/images/concurso-2.jpg",
    faq: [
      {
        q: "¿Qué filtro necesito para un acuario de paisajismo?",
        a: "Uno que mueva al menos 5 veces el volumen del acuario por hora: para un acuario de 100 litros, mínimo 500 litros por hora. Que tenga buen espacio para material biológico.",
      },
      {
        q: "¿Cuánto tarda en ciclar un acuario?",
        a: "Entre 4 y 6 semanas. Puedes añadir unas hojuelas de alimento para generar amonio y bacterias comerciales para acelerar el proceso, midiendo amonio, nitritos y nitratos.",
      },
      {
        q: "¿Qué es el ciclado a oscuras?",
        a: "Ciclar el acuario sin iluminación para limitar el crecimiento de algas en las primeras semanas. Es muy útil con sustrato nutritivo. Al terminar, vuelve a introducir la luz de forma gradual.",
      },
      {
        q: "¿La roca Seiryu sube el pH del acuario?",
        a: "Sí, puede liberar carbonatos que aumentan la dureza y el pH del agua. Tenlo en cuenta si tus plantas o peces necesitan agua blanda.",
      },
    ],
    videoIds: [
      "paisajismo-primer-concurso",
      "paisajismo-hardscape",
      "paisajismo-detalles",
      "paisajismo-ciclado",
      "paisajismo-peces",
      "paisajismo-nuevo",
    ],
  },
  {
    id: "7",
    title: "Agua de ósmosis inversa vs. agua de la llave",
    slug: "osmosis-inversa-vs-agua-de-la-llave",
    excerpt:
      "El tipo de agua que utilizas en tu acuario plantado puede marcar una diferencia enorme. Descubre cuándo usar agua de ósmosis inversa y cuándo el agua de la llave es suficiente.",
    content: osmosisContent,
    summary:
      "El agua de ósmosis inversa elimina hasta el 99 % de las impurezas (0–20 ppm de TDS, 0 °dGH y 0 °dKH) y te da control total de los parámetros, pero hay que remineralizarla para subir el GH. El agua de la llave también puede servir, aunque su calidad depende mucho de la región: conoce tu agua antes de decidir.",
    category: "Agua y Parámetros",
    categoryColor: "blue",
    date: "2025-12-17T12:00:00Z",
    updated: "2026-11-07T12:00:00Z",
    author: "Jesús - Kleiner Fish Aquarium",
    authorLink: "https://www.instagram.com/kleineraquarium/",
    isGuestAuthor: true,
    readTime: "8 min lectura",
    image: "/images/osmosis-grifo.jpg",
    coverImage: "/images/osmosis-grifo.jpg",
    faq: [
      {
        q: "¿El agua de ósmosis sirve sola para el acuario?",
        a: "No. Casi no tiene minerales, así que hay que remineralizarla con productos comerciales o con sales como los sulfatos de calcio y magnesio, para subir el GH a niveles óptimos para las plantas.",
      },
      {
        q: "¿Qué KH es ideal para un acuario plantado?",
        a: "Muchas plantas se desarrollan mejor con un KH bajo, generalmente entre 0 y 3 °dKH. Subir el KH solo tiene sentido en casos específicos, como peces que necesitan agua dura.",
      },
      {
        q: "¿Un KH bajo hace inestable el pH?",
        a: "No, es un mito. En la práctica no existe esa inestabilidad ni un riesgo real cuando la fuente de CO2 es estable.",
      },
      {
        q: "¿Cuándo es mejor usar agua de la llave?",
        a: "Cuando el agua de tu zona es de buena calidad y te ha dado buenos resultados, tienes plantas resistentes o que prefieren aguas duras, o peces que requieren agua dura y alcalina.",
      },
    ],
    videoIds: ["osmosis-filtro"],
  },
  {
    id: "8",
    title: "¿Algas? El problema podría estar en tu filtro",
    slug: "mantenimiento-filtro-algas",
    excerpt:
      "Muchos acuaristas son estrictos con el mantenimiento pero ignoran el filtro. Descubre por qué un filtro saturado es la causa principal de la aparición de algas en tu acuario.",
    content: filtroMantenimientoContent,
    summary:
      "En un filtro de cascada, enjuaga la esponja cada una o dos semanas y el material biológico cada mes; un filtro canister se limpia cada 2 meses. El material biológico siempre se enjuaga con agua del mismo acuario, y nunca el mismo día que el mantenimiento del acuario. Un filtro sucio acumula nitratos y fosfatos que alimentan las algas.",
    category: "Mantenimiento",
    categoryColor: "cyan",
    date: "2026-01-01T12:00:00Z",
    updated: "2026-11-08T12:00:00Z",
    author: "JuanJo El Tío Pez",
    readTime: "8 min lectura",
    image: "/images/mantenimiento-filtro/filtro-cascada.jpg",
    coverImage: "/images/acuarios-paisajismo.jpg",
    faq: [
      {
        q: "¿Cada cuánto se limpia un filtro de cascada?",
        a: "La esponja o prefiltro, cada una o dos semanas. El material biológico puede esperar hasta un mes.",
      },
      {
        q: "¿Cada cuánto se limpia un filtro canister?",
        a: "Cada 2 meses es el tiempo ideal. Aprovecha para limpiar también las mangueras, que acumulan biofilm y suciedad.",
      },
      {
        q: "¿Un filtro sucio puede causar algas?",
        a: "Sí. Un filtro saturado no procesa bien los compuestos orgánicos: los nitratos y fosfatos se acumulan y se convierten en el fertilizante perfecto para algas filamentosas, puntos verdes y alga pincel.",
      },
      {
        q: "¿Con qué agua se lava el material biológico del filtro?",
        a: "Siempre con agua del mismo acuario, para no eliminar las bacterias. Las espumas, en cambio, sí puedes lavarlas con agua de la llave.",
      },
    ],
    videoIds: ["mantenimiento-filtro"],
    relatedPostSlugs: ["mantenimiento-acuario-rutina"],
  },
];

export function getAllPosts() {
  // Create a copy to avoid mutating the original array
  return [...blogPosts].sort((a, b) => {
    // Use string comparison for deterministic sorting
    if (b.date > a.date) return 1;
    if (b.date < a.date) return -1;
    return 0;
  });
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostById(id) {
  return blogPosts.find(post => post.id === id);
}
