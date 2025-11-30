// Facebook Pixel Event Tracking
// Track key user actions for retargeting and conversion optimization

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, any>) => void;
  }
}

// Track when user views a specific page
export const trackFBPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ViewPage', {
      page_name: pageName,
      page_url: window.location.href
    });
  }
};

// Track when user clicks "Book a Class" button
export const trackFBBookingClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Class Booking',
      content_category: 'Booking'
    });
  }
};

// Track when user views pricing page
export const trackFBViewPricing = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Pricing Page',
      content_category: 'Pricing'
    });
  }
};

// Track phone click for call tracking
export const trackFBPhoneClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'phone'
    });
  }
};

// Track email click
export const trackFBEmailClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'email'
    });
  }
};

// Track WhatsApp click
export const trackFBWhatsAppClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: 'whatsapp'
    });
  }
};

// Track when user views trainer profile
export const trackFBViewTrainer = (trainerName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ViewTrainer', {
      trainer_name: trainerName
    });
  }
};

// Track when user views workout details
export const trackFBViewWorkout = (workoutType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: workoutType,
      content_category: 'Workout'
    });
  }
};

// Track lead generation (form submission if you add one later)
export const trackFBLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};

// Track successful booking completion
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

