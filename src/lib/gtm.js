/**
 * Google Analytics utilities using gtag format
 */

/**
 * Base function to track click events using gtag
 * @param {string} name - The name/label of the event
 * @param {string} category - The event category (e.g., "Video", "Button", "Blog")
 */
export const trackEvent = (name, category) => {
  if (typeof window !== "undefined" && window.gtag) {
    // Replace white spaces with underscores for cleaner event names
    const eventName = name.replace(/\s+/g, "_");

    window.gtag("event", eventName, {
      event_category: category,
      event_label: eventName,
      page_location: window.location.href,
    });
  }
};

/**
 * Track a CTA (Call To Action) click
 * @param {string} ctaName - The name of the CTA button
 */
export const trackCtaClick = ctaName => {
  trackEvent(ctaName, "Button");
};

/**
 * Track a video click
 * @param {string} videoName - The name of the video
 */
export const trackVideoClick = videoName => {
  trackEvent(videoName, "Video");
};

/**
 * Track a blog post click
 * @param {string} postTitle - The title of the blog post
 */
export const trackBlogClick = postTitle => {
  trackEvent(postTitle, "Blog");
};

/**
 * Eventos de Armonía Acuática (/armonia-acuatica). Todos se llaman `armonia_<acción>` y
 * llevan el detalle en parámetros, para no crear un evento distinto por cada especie.
 * Para ver esos parámetros en los informes de GA4 hay que registrarlos una vez como
 * dimensiones personalizadas (Administrar → Definiciones personalizadas):
 *   especie, total_especies, litros, cantidad, origen, combo, tienda, busqueda
 *
 * Acciones: litros · agregar_especie · quitar_especie · cantidad · combo ·
 * copiar_enlace · empezar_de_nuevo · ver_ficha · guia · tienda · contacto_tienda ·
 * busqueda_sin_resultado
 *
 * @param {string} action - La acción, sin el prefijo
 * @param {object} params - Detalle del evento (textos de máximo 100 caracteres)
 */
export const trackArmonia = (action, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `armonia_${action}`, params);
  }
};
