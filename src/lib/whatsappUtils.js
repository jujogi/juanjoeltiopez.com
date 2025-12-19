// Utilidad para generar URLs de WhatsApp usando la API

/**
 * Llama a la API para obtener un link de WhatsApp
 * @param {Object} params - Parámetros para la API
 * @returns {Promise<string>} URL de WhatsApp
 */
async function fetchWhatsAppLink(params) {
  try {
    const response = await fetch("/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Error al obtener el link de WhatsApp");
    }

    const data = await response.json();
    return data.link;
  } catch (error) {
    console.error("Error al generar link de WhatsApp:", error);
    // Fallback: retornar enlace genérico
    return "https://wa.me/";
  }
}

/**
 * Genera un link de WhatsApp para consultar sobre un producto
 * @param {string} productName - Nombre del producto
 * @param {string} variantName - Nombre de la variante (opcional)
 * @returns {Promise<string>} URL de WhatsApp
 */
export async function getWhatsAppProductLink(productName, variantName = null) {
  return await fetchWhatsAppLink({
    type: "product",
    productName,
    variantName,
  });
}

/**
 * Genera un link de WhatsApp para asesoría
 * @returns {Promise<string>} URL de WhatsApp
 */
export async function getWhatsAppAsesoriaLink() {
  return await fetchWhatsAppLink({
    type: "asesoria",
  });
}

/**
 * Genera un link de WhatsApp con un mensaje personalizado
 * @param {string} message - El mensaje a enviar
 * @returns {Promise<string>} URL de WhatsApp
 */
export async function getWhatsAppLink(message) {
  return await fetchWhatsAppLink({
    type: "general",
    message,
  });
}
