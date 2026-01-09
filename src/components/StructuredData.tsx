import { useEffect } from 'react';

interface Review {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Person' | 'FAQPage' | 'BreadcrumbList';
  data?: {
    reviews?: Review[];
    person?: {
      name: string;
      jobTitle: string;
      image: string;
      description: string;
      worksFor: string;
    };
    faqs?: { question: string; answer: string }[];
    breadcrumbs?: { name: string; url: string }[];
  };
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    let schema: object | null = null;

    if (type === 'LocalBusiness' && data?.reviews) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.ptstudio7amsterdam.nl/#localbusiness',
        name: 'PT Studio 7 Amsterdam',
        image: 'https://www.ptstudio7amsterdam.nl/assets/images/studio.jpg',
        url: 'https://www.ptstudio7amsterdam.nl',
        telephone: '+31-20-3038377',
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ruysdaelstraat 35-A',
          addressLocality: 'Amsterdam',
          postalCode: '1071 XA',
          addressCountry: 'NL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 52.3572909,
          longitude: 4.8762577,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '21:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: data.reviews.length.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        review: data.reviews.map((review) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.ratingValue.toString(),
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: review.reviewBody,
        })),
      };
    }

    if (type === 'Person' && data?.person) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.person.name,
        jobTitle: data.person.jobTitle,
        image: `https://www.ptstudio7amsterdam.nl${data.person.image}`,
        description: data.person.description,
        worksFor: {
          '@type': 'LocalBusiness',
          name: data.person.worksFor,
          url: 'https://www.ptstudio7amsterdam.nl',
        },
        knowsAbout: ['Pilates', 'Reformer Pilates', 'Fitness Training', 'Strength Training'],
      };
    }

    if (type === 'FAQPage' && data?.faqs) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
    }

    if (type === 'BreadcrumbList' && data?.breadcrumbs) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      };
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [type, data]);

  return null;
};

