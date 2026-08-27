declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export const trackFBPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ViewPage', {
      page_name: pageName,
      page_url: window.location.href
    });
  }
};

export const trackFBBookingClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Class Booking',
      content_category: 'Booking'
    });
  }
};

export const trackFBViewPricing = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Pricing Page',
      content_category: 'Pricing'
    });
  }
};

export const trackFBPhoneClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'phone'
    });
  }
};

export const trackFBEmailClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'email'
    });
  }
};

export const trackFBWhatsAppClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'whatsapp'
    });
  }
};

export const trackFBViewTrainer = (trainerName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ViewTrainer', {
      trainer_name: trainerName
    });
  }
};

export const trackFBViewWorkout = (workoutType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: workoutType,
      content_category: 'Workout'
    });
  }
};

export const trackFBLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};

export const trackFBPurchase = (value: number, packageType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: 'EUR',
      content_name: packageType,
      content_type: 'product'
    });
  }
};
