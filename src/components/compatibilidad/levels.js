import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

// Los tres niveles de un resultado: mismo ícono y color en el veredicto, en cada razón y en
// las sugerencias del buscador. El ícono cambia de forma, así no depende solo del color.
export const LEVELS = {
  ok: {
    icon: FaCheckCircle,
    color: "accent.cyan",
    title: "Sí, pueden vivir juntas",
    label: "Compatible",
  },
  caution: {
    icon: FaExclamationTriangle,
    color: "accent.sand",
    title: "Pueden vivir juntas, pero con cuidado",
    label: "Con cuidado",
  },
  bad: {
    icon: FaTimesCircle,
    color: "red.300",
    title: "No te lo recomendamos",
    label: "No recomendado",
  },
};
