// GTM Event tracking utility functions

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// Generic GTM event function
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    console.log('GTM Event:', eventName, eventParams);
  }
};

// Specific tracking functions for common events

// Track "Book Now" button clicks
export const trackBookNowClick = (location: string) => {
  trackEvent('book_now_click', {
    button_location: location, // e.g., 'navbar', 'hero', 'pricing_page'
    event_category: 'engagement',
    event_label: 'Book Now Button',
  });
};

// Track page views (for SPA)
export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    event_category: 'navigation',
  });
};

// Track schedule page visit
export const trackScheduleVisit = () => {
  trackEvent('view_schedule', {
    event_category: 'engagement',
    event_label: 'Schedule Page View',
  });
};

// Track phone number clicks
export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: 'Phone Number Clicked',
    contact_method: 'phone',
  });
};

// Track email clicks
export const trackEmailClick = () => {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: 'Email Clicked',
    contact_method: 'email',
  });
};

// Track pricing page visit
export const trackPricingView = () => {
  trackEvent('view_pricing', {
    event_category: 'engagement',
    event_label: 'Pricing Page View',
  });
};

// Track blog post views
export const trackBlogPostView = (postTitle: string, postSlug: string) => {
  trackEvent('view_blog_post', {
    event_category: 'content',
    event_label: postTitle,
    blog_post_slug: postSlug,
  });
};

// Track blog post read time (call when user scrolls to bottom)
export const trackBlogPostRead = (postTitle: string, readTime: number) => {
  trackEvent('blog_post_read', {
    event_category: 'content_engagement',
    event_label: postTitle,
    read_time_seconds: readTime,
  });
};

// Track equipment page views
export const trackEquipmentView = (equipmentType: string) => {
  trackEvent('view_equipment', {
    event_category: 'engagement',
    event_label: `Equipment: ${equipmentType}`,
    equipment_type: equipmentType,
  });
};

// Track video plays (if you add videos)
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    event_category: 'media',
    event_label: videoName,
    video_name: videoName,
  });
};

// Track form submissions (if you add forms)
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formName,
    form_name: formName,
  });
};

// Track scroll depth (25%, 50%, 75%, 100%)
export const trackScrollDepth = (percentage: number, pagePath: string) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}% scrolled`,
    page_path: pagePath,
    scroll_percentage: percentage,
  });
};

// Track outbound link clicks
export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('outbound_link_click', {
    event_category: 'engagement',
    event_label: linkText,
    outbound_url: url,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'social_media',
    event_label: platform,
    social_platform: platform,
  });
};

// Track booking confirmation (Congrats page)
export const trackBookingConfirmation = () => {
  trackEvent('booking_confirmed', {
    event_category: 'conversion',
    event_label: 'Booking Completed',
    value: 1,
  });
};

// Track navigation menu clicks
export const trackNavClick = (menuItem: string) => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: menuItem,
    menu_item: menuItem,
  });
};

