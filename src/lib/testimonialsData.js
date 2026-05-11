// Datos de testimonios de clientes
export const testimonials = [
    {
    id: "1",
    name: "David Echeverri",
    location: "Manizales, Colombia",
    text: "Quería agradecerte por la asesoría, fue de gran ayuda para comprender y planificar mi nuevo proyecto high tech. Excelente servicio y muy recomendado.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    location: "Bogotá, Colombia",
    text: "Esta asesoría fue exactamente lo que necesitaba. Tenía un problema de algas persistente que no lograba resolver y en una sola sesión me dio un plan claro y detallado. En dos semanas mi acuario estaba completamente recuperado.",
    rating: 5,
  },
  {
    id: "3",
    name: "Andrés Martínez",
    location: "Cali, Colombia",
    text: "Super recomendado. La asesoría fue muy profesional y personalizada. Juan me guió paso a paso en el montaje de mi primer acuario plantado y el resultado está superando mis expectativas.",
    rating: 5,
  },
  {
    id: "4",
    name: "Sebastian Cuervo",
    location: "Bogotá, Colombia",
    text: "En esta asesoría pude entender qué le hacía falta a mi acuario y a mis peces para estar sanos. Ahora tengo un acuario en equilibrio que cada día disfruto más.",
    rating: 5,
  },
    {
    id: "5",
    name: "Carlos Vargas",
    location: "Bogotá, Colombia",
    text: "Quería agradecerte de corazón por toda la asesoría con mi primer aquascaping. Gracias por compartir tus datos, estar tan pendiente en cada momento y estar siempre disponible para resolver mis dudas. Sin tu ayuda no habría quedado igual. ¡Un gran abrazo!",
    rating: 5,
  },
];

export function getAllTestimonials() {
  return [...testimonials];
}

export function getTestimonialById(id) {
  return testimonials.find((testimonial) => testimonial.id === id);
}
