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
  sendGaPageView(pagePath, pageTitle);
};

export const trackScheduleVisit = () => {
  trackEvent('view_schedule', {
    event_category: 'engagement',
    event_label: 'Schedule Page View',
  });
};

export const trackPhoneClick = (location?: string) => {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: 'Phone Number Clicked',
    contact_method: 'phone',
    ...(location ? { button_location: location } : {}),
  });
};

export const trackEmailClick = (location?: string) => {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: 'Email Clicked',
    contact_method: 'email',
    ...(location ? { button_location: location } : {}),
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

export const trackSocialClick = (platform: string, location?: string) => {
  trackEvent('social_click', {
    event_category: 'social_media',
    event_label: platform,
    social_platform: platform,
    ...(location ? { button_location: location } : {}),
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

export const trackAcademyAssessmentClick = (location: string = 'academy_page') => {
  trackEvent('academy_assessment_click', {
    event_category: 'conversion',
    event_label: 'exercise_assessment',
    button_location: location,
    value: 250,
    currency: 'EUR',
  });
};

export const trackChatbotOpen = () => {
  trackEvent('chatbot_open', {
    event_category: 'engagement',
    event_label: 'Chatbot Opened',
  });
};

export const trackChatbotOption = (optionId: string) => {
  trackEvent('chatbot_option', {
    event_category: 'engagement',
    event_label: optionId,
    option_id: optionId,
  });
};

export const trackChatbotNavigate = (destination: 'schedule' | 'equipment' | 'instructors') => {
  trackEvent('chatbot_navigate', {
    event_category: 'engagement',
    event_label: destination,
    destination,
  });
};

const SOCIAL_HOSTS: Record<string, string> = {
  'instagram.com': 'instagram',
  'www.instagram.com': 'instagram',
  'facebook.com': 'facebook',
  'www.facebook.com': 'facebook',
  'linkedin.com': 'linkedin',
  'www.linkedin.com': 'linkedin',
  'wa.me': 'whatsapp',
  'api.whatsapp.com': 'whatsapp',
  'web.whatsapp.com': 'whatsapp',
};

function linkLabel(anchor: HTMLAnchorElement): string {
  return (anchor.getAttribute('aria-label') || anchor.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

function parseLinkUrl(href: string): URL | null {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function isOwnSite(url: URL): boolean {
  return (
    url.origin === window.location.origin ||
    url.hostname === 'www.pt7.nl' ||
    url.hostname === 'pt7.nl'
  );
}

/** Classify a clicked anchor. Callers skip anchors that already emit their own event. */
export function trackAnchorClick(anchor: HTMLAnchorElement) {
  const page = window.location.pathname;
  const label = linkLabel(anchor);
  const widget = anchor.closest('healcode-widget');

  if (widget) {
    const type = widget.getAttribute('data-type') ?? 'widget';
    if (type === 'account-link') {
      trackEvent('mindbody_login_click', {
        event_category: 'engagement',
        event_label: label || 'Mindbody login',
        page_path: page,
      });
      return;
    }
    trackBookNowClick(`healcode:${type}`);
    return;
  }

  if (anchor.closest('.lang-switch')) {
    trackEvent('language_switch', {
      event_category: 'navigation',
      event_label: anchor.getAttribute('hreflang') || label,
      page_path: page,
    });
    return;
  }

  if (anchor.closest('[data-academy-inquiry], .academy-enroll-btn, .academy-assessment-btn')) return;

  const href = anchor.getAttribute('href') ?? '';
  if (!href || href === '#' || href.startsWith('javascript:')) return;

  if (href.startsWith('tel:')) {
    trackPhoneClick(page);
    return;
  }
  if (href.startsWith('mailto:')) {
    trackEmailClick(page);
    return;
  }

  const url = parseLinkUrl(href);
  if (!url) return;

  const social = SOCIAL_HOSTS[url.hostname];
  if (social) {
    trackSocialClick(social, page);
    return;
  }

  if (!isOwnSite(url)) {
    trackOutboundLink(url.href, label || url.hostname);
    return;
  }

  if (url.pathname.includes('/schedule')) {
    const where = page === '/' ? 'home' : page;
    trackBookNowClick(label ? `${where} | ${label}` : where);
    return;
  }

  if (href.startsWith('#') || (url.hash && url.pathname === window.location.pathname)) {
    trackEvent('anchor_click', {
      event_category: 'navigation',
      event_label: url.hash || href,
      page_path: page,
      link_text: label,
    });
    return;
  }

  trackEvent('link_click', {
    event_category: 'navigation',
    event_label: label || url.pathname,
    page_path: page,
    destination: `${url.pathname}${url.search}${url.hash}`,
    link_text: label,
  });
}

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
