import { sendGaPageView } from './consentTracking';

type DataLayerItem = Record<string, unknown> | unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayerItem[];
  }
}

if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

export const trackBookNowClick = (location: string) => {
  trackEvent('book_now_click', {
    button_location: location,
    event_category: 'engagement',
    event_label: 'Book Now Button',
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    event_category: 'navigation',
  });
  sendGaPageView(pagePath, pageTitle);
};

export const trackScheduleVisit = () => {
  trackEvent('view_schedule', {
    event_category: 'engagement',
    event_label: 'Schedule Page View',
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: 'Phone Number Clicked',
    contact_method: 'phone',
  });
};

export const trackEmailClick = () => {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: 'Email Clicked',
    contact_method: 'email',
  });
};

export const trackPricingView = () => {
  trackEvent('view_pricing', {
    event_category: 'engagement',
    event_label: 'Pricing Page View',
  });
};

export const trackBlogPostView = (postTitle: string, postSlug: string) => {
  trackEvent('view_blog_post', {
    event_category: 'content',
    event_label: postTitle,
    blog_post_slug: postSlug,
  });
};

export const trackBlogPostRead = (postTitle: string, readTime: number) => {
  trackEvent('blog_post_read', {
    event_category: 'content_engagement',
    event_label: postTitle,
    read_time_seconds: readTime,
  });
};

export const trackEquipmentView = (equipmentType: string) => {
  trackEvent('view_equipment', {
    event_category: 'engagement',
    event_label: `Equipment: ${equipmentType}`,
    equipment_type: equipmentType,
  });
};

export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    event_category: 'media',
    event_label: videoName,
    video_name: videoName,
  });
};

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formName,
    form_name: formName,
  });
};

export const trackScrollDepth = (percentage: number, pagePath: string) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}% scrolled`,
    page_path: pagePath,
    scroll_percentage: percentage,
  });
};

export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('outbound_link_click', {
    event_category: 'engagement',
    event_label: linkText,
    outbound_url: url,
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'social_media',
    event_label: platform,
    social_platform: platform,
  });
};

export const trackBookingConfirmation = () => {
  trackEvent('booking_confirmed', {
    event_category: 'conversion',
    event_label: 'Booking Completed',
    value: 1,
  });
};

export const trackNavClick = (menuItem: string) => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: menuItem,
    menu_item: menuItem,
  });
};

export const trackAcademyEnrollClick = (
  paymentType: 'full' | 'installments',
  course: 'reformer' | 'mat' = 'reformer',
  location: string = 'academy_page',
) => {
  trackEvent('academy_enroll_click', {
    event_category: 'conversion',
    event_label: `${course}_${paymentType}`,
    payment_type: paymentType,
    course,
    button_location: location,
    value: paymentType === 'full' ? 2000 : 667,
    currency: 'EUR',
  });
};

export const trackAcademyInquiryClick = (
  course: 'reformer' | 'mat' = 'reformer',
  method: 'email' | 'phone' = 'email',
  location: string = 'academy_page',
) => {
  trackEvent('academy_inquiry_click', {
    event_category: 'conversion',
    event_label: `${course}_${method}`,
    course,
    contact_method: method,
    button_location: location,
  });
};
