// Equipment comes from the PT7 Academy API, written by the build (scripts/site-content.js, not committed)
import equipment from './generated/equipment.en.json' with { type: 'json' };

export interface EquipmentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface EquipmentProduct {
  slug: string;
  name: string;
  /** Apparatus price in EUR. Excludes customs duty, shipping, and VAT (BTW). */
  priceEur: number;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  images: EquipmentImage[];
  shortDesc: string;
  features: string[];
  description: string;
  specs: EquipmentSpec[];
  faq: FAQItem[];
}

export function formatEquipmentPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// In the site's order; shapes checked by the fetch script
export const equipmentProducts = equipment as EquipmentProduct[];
