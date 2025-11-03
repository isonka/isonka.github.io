import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/assets/images/pt7logo.png',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Ensure absolute URL for images
    const baseUrl = 'https://www.ptstudio7amsterdam.nl';
    const absoluteImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

    // Update or create meta tags
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

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'PT Studio 7');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph tags (Facebook, LinkedIn, etc)
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:site_name', 'PT Studio 7 Amsterdam', true);
    updateMetaTag('og:image', absoluteImageUrl, true);
    updateMetaTag('og:image:secure_url', absoluteImageUrl, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', 'PT Studio 7 Amsterdam - Pilates Studio', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@ptstudio7amsterdam');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', absoluteImageUrl);
    updateMetaTag('twitter:image:alt', 'PT Studio 7 Amsterdam - Pilates Studio');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage]);

  return null; // This component doesn't render anything
};

