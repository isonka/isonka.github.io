import React from 'react';

interface ProductStructuredDataProps {
  name: string;
  description: string;
  price?: number;
  currency?: string;
  availability?: string;
  image?: string;
  brand?: string;
}

interface BlogStructuredDataProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

interface ContactStructuredDataProps {
  name: string;
  url: string;
  telephone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface EventStructuredDataProps {
  name: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  description?: string;
}

// Generate JSON-LD for product pages
export const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({
  name,
  description,
  price,
  currency = 'EUR',
  availability = 'InStock',
  image,
  brand,
}) => {
  const productData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    description,
    image,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    offers: {
      '@type': 'Offer',
      price: price?.toString(),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
    },
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(productData)}
    </script>
  );
};

// Generate JSON-LD for blog posts
export const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
}) => {
  const blogData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    image,
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(blogData)}
    </script>
  );
};

// Generate JSON-LD for contact pages
export const ContactStructuredData: React.FC<ContactStructuredDataProps> = ({
  name,
  url,
  telephone,
  address,
}) => {
  const contactData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    telephone,
    address: address
      ? {
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.city,
          postalCode: address.postalCode,
          addressCountry: address.country,
        }
      : undefined,
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(contactData)}
    </script>
  );
};

// Generate JSON-LD for events
export const EventStructuredData: React.FC<EventStructuredDataProps> = ({
  name,
  startDate,
  endDate,
  locationName,
  address,
  description,
}) => {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    },
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(eventData)}
    </script>
  );
};