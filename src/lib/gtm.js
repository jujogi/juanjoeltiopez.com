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
