import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

// Los tres niveles de un resultado: mismo ícono y color en el veredicto, en cada razón y en
// las sugerencias del buscador. El ícono cambia de forma, así no depende solo del color.
// Los textos de cada nivel están en `ui.levels` (compatibilidadData.js y compatibilidadEn.js).
export const LEVELS = {
  ok: {
    icon: FaCheckCircle,
    color: "accent.cyan",
  },
  caution: {
    icon: FaExclamationTriangle,
    color: "accent.sand",
  },
  bad: {
    icon: FaTimesCircle,
    color: "red.300",
  },
};
