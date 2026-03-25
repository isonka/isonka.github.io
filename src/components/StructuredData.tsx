import { useEffect } from 'react';

interface Review {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

interface BlogPostingData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  keywords: string[];
  slug: string;
}

interface CourseData {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  startDate: string;
  endDate?: string;
  schedule: string;
  locationName: string;
  maxParticipants: number;
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Person' | 'FAQPage' | 'BreadcrumbList' | 'BlogPosting' | 'Course';
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
    blogPosting?: BlogPostingData;
    course?: CourseData;
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
        '@id': 'https://www.pt7.nl/#localbusiness',
        name: 'PT Studio 7 Amsterdam',
        image: 'https://www.pt7.nl/assets/images/studio.jpg',
        url: 'https://www.pt7.nl',
        telephone: '+31-20-3038377',
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Van Baerlestraat 76C',
          addressLocality: 'Amsterdam',
          postalCode: '1071 BB',
          addressCountry: 'NL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 52.3573141,
          longitude: 4.8762787,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
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
        image: `https://www.pt7.nl${data.person.image}`,
        description: data.person.description,
        worksFor: {
          '@type': 'LocalBusiness',
          name: data.person.worksFor,
          url: 'https://www.pt7.nl',
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

    if (type === 'BlogPosting' && data?.blogPosting) {
      const bp = data.blogPosting;
      const baseUrl = 'https://www.pt7.nl';
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${bp.slug}`,
        },
        headline: bp.headline,
        description: bp.description,
        image: bp.image.startsWith('http') ? bp.image : `${baseUrl}${bp.image}`,
        datePublished: bp.datePublished,
        dateModified: bp.dateModified,
        author: {
          '@type': 'Organization',
          name: bp.authorName,
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'PT Studio 7 Amsterdam',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/assets/images/pt7logo.png`,
          },
        },
        keywords: bp.keywords.join(', '),
        inLanguage: 'en',
      };
    }

    if (type === 'Course' && data?.course) {
      const c = data.course;
      const baseUrl = 'https://www.pt7.nl';
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: c.name,
        description: c.description,
        provider: {
          '@type': 'Organization',
          name: 'PT 7 Academy',
          url: baseUrl,
          sameAs: `${baseUrl}/academy`,
        },
        offers: {
          '@type': 'Offer',
          price: c.price,
          priceCurrency: c.priceCurrency,
          availability: 'https://schema.org/LimitedAvailability',
          validFrom: c.startDate,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          courseSchedule: {
            '@type': 'Schedule',
            repeatFrequency: 'P1W',
            byDay: ['Saturday', 'Sunday'],
            startTime: '12:00',
            endTime: '18:00',
          },
          startDate: c.startDate,
          ...(c.endDate && { endDate: c.endDate }),
          location: {
            '@type': 'Place',
            name: c.locationName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Van Baerlestraat 76C',
              addressLocality: 'Amsterdam',
              postalCode: '1071 BB',
              addressCountry: 'NL',
            },
          },
          maximumAttendeeCapacity: c.maxParticipants,
        },
        inLanguage: 'en',
        isAccessibleForFree: false,
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

