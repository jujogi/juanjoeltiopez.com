import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a UTC date string to short format (e.g., "Dec 1, 2024")
 */
export function formatDateShort(dateString) {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}

/**
 * Format a UTC date string to long Spanish format (e.g., "1 de diciembre de 2024")
 */
export function formatDateLong(dateString) {
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

/**
 * Format a UTC date string with year (e.g., "Dec 1, 2024")
 */
export function formatDateWithYear(dateString) {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}
