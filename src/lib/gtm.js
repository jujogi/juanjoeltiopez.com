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
 *   especie, total_especies, litros, cantidad, origen, combo, tienda, busqueda, idioma, unidad,
 *   pais, ciudad, paso
 *
 * Acciones: paso (paso: 1 o 2, al que fue) ·
 * litros (origen: boton, campo, deslizador o calculadora; unidad: l o gal; `litros` va siempre
 * en litros, aunque la persona escriba galones) · unidad (unidad: l o gal, a la que cambió) ·
 * abrir_calculadora ·
 * agregar_especie · quitar_especie (origen: resultado o ficha) · cantidad · combo ·
 * copiar_enlace · compartir (el menú de compartir del celular; solo si se compartió) ·
 * empezar_de_nuevo · ver_ficha · guia ·
 * tienda (tienda, pais: código ISO como CO, ciudad) · contacto_tienda ·
 * busqueda_sin_resultado · idioma (idioma: es o en, al que cambió)
 *
 * `especie` y `combo` van siempre en español, aunque la herramienta esté en inglés.
 *
 * @param {string} action - La acción, sin el prefijo
 * @param {object} params - Detalle del evento (textos de máximo 100 caracteres)
 */
export const trackArmonia = (action, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `armonia_${action}`, params);
  }
};

/**
 * Eventos de "Ayúdame a elegir" (/ayudame-a-elegir). Todos se llaman `elegir_<acción>`.
 * Parámetros nuevos para registrar como dimensiones personalizadas: pregunta, respuesta,
 * opcion, total_propuestas, desde, nuevas, exp, agua y meta (los demás ya existen para Armonía
 * Acuática). La banda de invitación (ElegirBand) usa trackCtaClick: home_elegir,
 * articulo_elegir o armonia_elegir.
 *
 * Acciones: paso (paso: 1 a 4, o 5 los resultados) · respuesta (pregunta: exp, agua o meta;
 * respuesta: la clave de la opción) · litros (litros, unidad, origen: campo, boton o
 * calculadora) · unidad · abrir_calculadora · resultado (total_propuestas; exp, agua y meta:
 * las claves de las respuestas) ·
 * ver_otras (desde: la primera opción que pasa a verse, 1 o 4; nuevas: true si ya se habían
 * visto todas y salen propuestas nuevas; total_propuestas) ·
 * abrir_armonia (opcion: 1 a 6; combo: los nombres en español) ·
 * empezar_de_nuevo · idioma
 *
 * @param {string} action - La acción, sin el prefijo
 * @param {object} params - Detalle del evento (textos de máximo 100 caracteres)
 */
export const trackElegir = (action, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `elegir_${action}`, params);
  }
};
