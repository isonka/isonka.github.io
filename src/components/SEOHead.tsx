import { useEffect } from 'react';
import { withTrailingSlash } from '../utils/urls';

export type HreflangAlternate = {
  hreflang: string;
  href: string;
};

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogLocale?: string;
  ogLocaleAlternates?: string[];
  htmlLang?: string;
  hreflangAlternates?: HreflangAlternate[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/assets/images/pt7logo.png',
  ogLocale = 'en_US',
  ogLocaleAlternates = ['nl_NL'],
  htmlLang = 'en',
  hreflangAlternates,
}) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = htmlLang;

    const baseUrl = 'https://www.pt7.nl';
    const canonicalUrl = withTrailingSlash(canonical);
    const absoluteImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'PT Studio 7');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    updateMetaTag('geo.region', 'NL-NH');
    updateMetaTag('geo.placename', 'Amsterdam');
    updateMetaTag('geo.position', '52.3572909;4.8762577');
    updateMetaTag('ICBM', '52.3572909, 4.8762577');

    updateMetaTag('og:locale', ogLocale, true);
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
    for (const alt of ogLocaleAlternates) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale:alternate');
      meta.setAttribute('content', alt);
      document.head.appendChild(meta);
    }

    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:site_name', 'PT Studio 7 Amsterdam', true);
    updateMetaTag('og:image', absoluteImageUrl, true);
    updateMetaTag('og:image:secure_url', absoluteImageUrl, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', 'PT Studio 7 Amsterdam - Pilates Studio', true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@ptstudio7amsterdam');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', absoluteImageUrl);
    updateMetaTag('twitter:image:alt', 'PT Studio 7 Amsterdam - Pilates Studio');

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (hreflangAlternates?.length) {
      for (const alt of hreflangAlternates) {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = alt.hreflang;
        link.href = withTrailingSlash(alt.href);
        document.head.appendChild(link);
      }
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogLocale,
    ogLocaleAlternates,
    htmlLang,
    hreflangAlternates,
  ]);

  return null;
};
