// Datos del blog - se reemplazará con Strapi más adelante
import bettaContent from "./posts/betta-content.js";
import gambitasContent from "./posts/gambitas-content.js";
import mantenimientoContent from "./posts/mantenimiento-content.js";
import caridinasContent from "./posts/caridinas-content.js";
import plantasContent from "./posts/plantas-content.js";
import paisajismoContent from "./posts/paisajismo-content.js";

export const blogPosts = [
  {
    id: "1",
    title: "¿Tienes un Pez Betta? Todo lo que necesitas saber",
    slug: "cuidado-pez-betta",
    excerpt:
      "Los Betta son peces fascinantes pero necesitan un entorno adecuado para estar bien. ¡Recuerda que no es lo mismo vivir que sobrevivir!",
    content: bettaContent,
    category: "Cuidado de Peces",
    categoryColor: "blue",
    date: "2024-12-01",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/betta-acuario-1.jpg",
    coverImage: "/images/betta-acuario-2.jpg",
    videos: [
      {
        name: "¡Los taninos son tu gran aliado!",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7500378667374234885",
          instagram: "https://www.instagram.com/p/DJNK4hySmWa/",
        },
        emoji: "🍂",
      },
      {
        name: "¿Cómo hacer feliz a tu pez betta?",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7323992168127909126",
          instagram: "https://www.instagram.com/reel/C3ilx6hxN8W/",
        },
        emoji: "😊",
      },
      {
        name: "Acuario para un Pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7391264336372616453",
          instagram: "https://www.instagram.com/reel/C9YUTUayV1B/",
        },
        emoji: "🏠",
      },
      {
        name: "Hojas de Almendro",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7421008955045989638",
          instagram: "https://www.instagram.com/reel/DAjdcHUy2BW/",
        },
        emoji: "🍃",
      },
      {
        name: "Botánicos para mi Pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7451448101975395589",
          instagram: "https://www.instagram.com/reel/DD20edySgdz/",
        },
        emoji: "🌿",
      },
      {
        name: "Peces compatibles con mi Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7451448101975395589",
          instagram: "https://www.instagram.com/reel/C90oSP7y3qt/",
        },
        emoji: "🐠",
      },
      {
        name: "Entrena a tu Pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7310273373672656133",
          instagram: "https://www.instagram.com/reel/C8R99JfRLqq/",
        },
        emoji: "🎯",
      },
    ],
  },
  {
    id: "2",
    title: "Gambitas: Guía para principiantes",
    slug: "gambitas-acuario-cuidados",
    excerpt:
      "Las gambitas de acuario son diminutas criaturas llenas de carácter y ternura que pueden ser un verdadero espectáculo en tu acuario.",
    content: gambitasContent,
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2024-11-28",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/gambitas.jpg",
    coverImage: "/images/gambitas-2.jpg",
    videos: [
      {
        name: "5 consejos para tener gambitas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7548688348898938117",
          instagram: "https://www.instagram.com/p/DOcPwt-Dbh5/",
        },
        emoji: "🤚🏻",
      },
      {
        name: "Alimento premium para gambitas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7551562499561229579",
          instagram: "https://www.instagram.com/p/DOwmhAfDTnk/",
        },
        emoji: "🥒",
      },
      {
        name: "Snacks para consentir a tus camarones",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7556061076845104395",
          instagram: "https://www.instagram.com/p/DPPtDmKjUjW/",
        },
        emoji: "🍭",
      },
      {
        name: "3 tips si quieres o tienes gambitas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7460276736006081798",
          instagram: "https://www.instagram.com/p/DE26dF5yf6J/",
        },
        emoji: "💕",
      },
    ],
  },
  {
    id: "3",
    title: "Así debe ser el mantenimiento de tu acuario",
    slug: "mantenimiento-acuario-rutina",
    excerpt:
      "Mantener un acuario es mucho más que solo alimentar peces. Requiere cuidados regulares para asegurar que el ecosistema acuático funcione de la mejor manera.",
    content: mantenimientoContent,
    category: "Mantenimiento",
    categoryColor: "cyan",
    date: "2024-11-25",
    author: "JuanJo El Tío Pez",
    readTime: "10 min lectura",
    image: "/images/mantenimientos.jpg",
    coverImage: "/images/mantenimientos-2.jpg",
    videos: [
      {
        name: "¡Algas en el acuario!",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7413554785770671366",
          instagram: "https://www.instagram.com/p/C_y_9OjICng/",
        },
        emoji: "🟢",
      },
      {
        name: "Mantenimiento al acuario de mi Pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7406434049314540806",
          instagram: "https://www.instagram.com/p/C-85ZWBMhG7/",
        },
        emoji: "🧹",
      },
      {
        name: "Mantenimiento Acuario Plantado",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7385387755825614086",
          instagram: "https://www.instagram.com/p/C8vhuhzozE4/",
        },
        emoji: "🌿",
      },
    ],
  },
  {
    id: "4",
    title: "Cómo montar un gambario para caridinas",
    slug: "caridinas-gambario-montaje",
    excerpt:
      "Las caridinas son de las especies de gambas más fascinantes, pero requieren cuidados especiales. Aprende cómo montar un gambario ideal para ellas.",
    content: caridinasContent,
    category: "Invertebrados",
    categoryColor: "orange",
    date: "2024-12-09",
    author: "JuanJo El Tío Pez",
    readTime: "15 min lectura",
    image: "/images/gambario.jpg",
    coverImage: "/images/gambario.jpg",
    videos: [
      {
        name: "Montaje Gambario Caridinas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7443245272517315895",
          instagram: "https://www.instagram.com/p/DDAoHjtyKLm/",
        },
        emoji: "🛠️",
      },
      {
        name: "Ciclado Gambario Caridinas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7443987823364967736",
          instagram: "https://www.instagram.com/p/DDGQu9LonFG/",
        },
        emoji: "🔄",
      },
      {
        name: "Microfauna Gambario Caridinas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7446575753346419973",
          instagram: "https://www.instagram.com/p/DDXyJzmS10t/",
        },
        emoji: "🔬",
      },
      {
        name: "Plantando el Gambario de Caridinas",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7449401705462189317",
          instagram: "https://www.instagram.com/p/DDqNDsIR0hK/",
        },
        emoji: "🌱",
      },
      {
        name: "Algas en el Gambario",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7453492287323000069",
          instagram: "https://www.instagram.com/p/DEGlbXpR8e2/",
        },
        emoji: "🟢",
      },
      {
        name: "Primeros inquilinos del Gambario",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7456609825900760325",
          instagram: "https://www.instagram.com/p/DEd5-OzR28N/",
        },
        emoji: "🏠",
      },
      {
        name: "¡Llegaron las Caridinas Pure Line!",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7459086690926284037",
          instagram: "https://www.instagram.com/p/DEu9uyTxusp/",
        },
        emoji: "✨",
      },
      {
        name: "Las gambitas mudan de piel",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7461718410842443014",
          instagram: "https://www.instagram.com/p/DFBPrOGSs2f/",
        },
        emoji: "🦐",
      },
      {
        name: "La evolución de nuestro gambario",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7496676329807662391",
          instagram: "https://www.instagram.com/p/DIzzBdRIb3g/",
        },
        emoji: "✨",
      },
    ],
  },
  {
    id: "5",
    title: "¿Por qué añadir plantas naturales al acuario?",
    slug: "plantas-naturales-acuario",
    excerpt:
      "Si aún decoras tu acuario con plantas de plástico, ¡es momento de hacer un cambio! Descubre por qué las plantas naturales son esenciales.",
    content: plantasContent,
    category: "Plantas",
    categoryColor: "green",
    date: "2024-12-08",
    author: "JuanJo El Tío Pez",
    readTime: "8 min lectura",
    image: "/images/acuario-plantado.jpg",
    coverImage: "/images/acuario-plantado-2.jpg",
    videos: [
      {
        name: "¡No más peceras redondas y decoración artificial",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7398265553439214853",
          instagram: "https://www.instagram.com/p/C-C9mEtx9_P/",
        },
        emoji: "🚫",
      },
      {
        name: "Montando un acuario plantado para un pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7372005401513970949",
          instagram: "",
        },
        emoji: "🏗️",
      },
      {
        name: "Adiós a la decoración artificial en los acuarios",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7345569705115012358",
          instagram: "",
        },
        emoji: "👋",
      },
      {
        name: "Si quieres iniciar con un acuario plantado, las anubias y bucephalandras son la mejor opción",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7363821712422505734",
          instagram: "https://www.instagram.com/p/C72ur6Bo638/",
        },
        emoji: "🌱",
      },
      {
        name: "Acuario para un Pez Betta",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7391264336372616453",
          instagram: "https://www.instagram.com/reel/C9YUTUayV1B/",
        },
        emoji: "🐠",
      },
    ],
  },
  {
    id: "6",
    title: "Paisajismo Acuático: Arte bajo el agua",
    slug: "paisajismo-acuatico-guia",
    excerpt:
      "El paisajismo acuático no es solo una ventana a lo natural, sino una forma de transmitir y sentir el arte. Aprende a crear ecosistemas armoniosos y visualmente deslumbrantes.",
    content: paisajismoContent,
    category: "Aquascaping",
    categoryColor: "purple",
    date: "2024-12-07",
    author: "JuanJo El Tío Pez",
    readTime: "12 min lectura",
    image: "/images/concurso.jpg",
    coverImage: "/images/concurso-2.jpg",
    videos: [
      {
        name: "Mi primer acuario de concurso",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7364582066794679558",
          instagram: "https://www.instagram.com/p/C6guKgAreIl/",
        },
        emoji: "🏆",
      },
      {
        name: "Montando el hardscape de mi acuario de concurso",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7365391668381535494",
          instagram: "https://www.instagram.com/p/C6l0CtDLfB-/",
        },
        emoji: "🪨",
      },
      {
        name: "Detalles de mi acuario de concurso",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7366644664969006341",
          instagram: "https://www.instagram.com/p/C6twZL8Ljm7/",
        },
        emoji: "🔍",
      },
      {
        name: "Ciclado de mi acuario de concurso",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7370911807453580549",
          instagram: "https://www.instagram.com/p/C7LPHSksM_R/",
        },
        emoji: "🔄",
      },
      {
        name: "Los peces de mi acuario de concurso",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7373525933375966470",
          instagram: "https://www.instagram.com/p/C7dT9BwMr_N/",
        },
        emoji: "🐟",
      },
      {
        name: "Mi nuevo acuario de paisajimos acuático",
        url: {
          tiktok: "https://www.tiktok.com/@juanjoeltiopez/video/7565750458711657746",
          instagram: "https://www.instagram.com/p/DQUNtS8jZt7/",
        },
        emoji: "🖼️",
      },
    ],
  },
];

export function getAllPosts() {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostById(id) {
  return blogPosts.find(post => post.id === id);
}
