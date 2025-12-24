// Utilidad para generar URLs de WhatsApp con mensajes predefinidos

const WHATSAPP_NUMBER = "573104350594";

/**
 * Genera un link de WhatsApp con un mensaje predefinido
 * @param {string} message - El mensaje a enviar
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Genera un link de WhatsApp para consultar sobre un producto
 * @param {string} productName - Nombre del producto
 * @param {string} variantName - Nombre de la variante (opcional)
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppProductLink(productName, variantName = null) {
  const variant = variantName ? ` - ${variantName}` : "";
  const message = `Hola! Me interesa este producto: ${productName}${variant}. ¿Está disponible?`;
  return getWhatsAppLink(message);
}

/**
 * Genera un link de WhatsApp para asesoría
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppAsesoriaLink() {
  const message = `Hola! Me interesa una asesoría personalizada. ¿Me puedes dar más información?`;
  return getWhatsAppLink(message);
}
