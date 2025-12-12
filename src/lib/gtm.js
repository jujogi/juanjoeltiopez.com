/**
 * Google Tag Manager utilities
 */

/**
 * Push an event to the dataLayer
 * @param {string} eventName - The name of the event
 * @param {Object} eventData - Additional data to send with the event
 */
export const pushToDataLayer = (eventName, eventData = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

/**
 * Track a CTA (Call To Action) click
 * @param {string} ctaName - The name of the CTA button
 * @param {string} ctaLocation - The location where the CTA is placed
 */
export const trackCtaClick = (ctaName, ctaLocation) => {
  pushToDataLayer("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

/**
 * Track a page view
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  pushToDataLayer("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track a custom event
 * @param {string} eventName - The name of the custom event
 * @param {Object} eventData - Custom event data
 */
export const trackCustomEvent = (eventName, eventData = {}) => {
  pushToDataLayer(eventName, eventData);
};
