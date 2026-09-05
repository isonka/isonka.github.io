import { business, SCHEMA_IDS, BASE_URL } from '../data/business';

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
  articleSection?: string;
}

interface CourseData {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  startDate: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  schedule: string;
  locationName: string;
  maxParticipants?: number;
  url?: string;
  timeRequired?: string;
  educationalCredentialAwarded?: string;
  recognizedByName?: string;
  recognizedByUrl?: string;
}

interface StructuredDataProps {
  type:
    | 'Organization'
    | 'LocalBusiness'
    | 'Service'
    | 'Product'
    | 'ItemList'
    | 'Person'
    | 'FAQPage'
    | 'BreadcrumbList'
    | 'BlogPosting'
    | 'Course';
  data?: {
    reviews?: Review[];
    person?: {
      name: string;
      jobTitle: string;
      image: string;
      description: string;
      worksFor: string;
      knowsAbout?: string[];
      hasCredential?: string[];
      sameAs?: string[];
    };
    faqs?: { question: string; answer: string }[];
    breadcrumbs?: { name: string; url: string }[];
    blogPosting?: BlogPostingData;
    course?: CourseData;
    service?: {
      name: string;
      description: string;
      serviceUrl: string;
      areaServed: string;
      offers: {
        name: string;
        price?: string;
        priceCurrency?: string;
        url?: string;
      }[];
    };
    product?: {
      name: string;
      description: string;
      image: string[];
      sku: string;
      brand: string;
      url: string;
      price?: string;
      priceCurrency?: string;
      availability: string;
      itemCondition?: string;
      category?: string;
      additionalProperty?: { name: string; value: string }[];
    };
    itemList?: {
      name: string;
      itemListElement: {
        name: string;
        url: string;
        image?: string;
      }[];
    };
  };
}

const postalAddress = { '@type': 'PostalAddress', ...business.address };
const geoCoordinates = { '@type': 'GeoCoordinates', ...business.geo };
const openingHoursSpecification = business.openingHours.map((slot) => ({
  '@type': 'OpeningHoursSpecification',
  ...slot,
}));

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  let schema: object | null = null;
  const baseUrl = BASE_URL;

  if (type === 'Organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': SCHEMA_IDS.organization,
      name: business.name,
      alternateName: business.alternateName,
      url: business.url,
      logo: business.logo,
      image: business.images[0],
      description: business.description,
      foundingDate: business.foundingDate,
      address: postalAddress,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: business.telephone,
        email: business.email,
        availableLanguage: business.availableLanguage,
      },
      founder: {
        '@type': 'Person',
        '@id': SCHEMA_IDS.founder,
        name: business.founder.name,
        givenName: business.founder.givenName,
        familyName: business.founder.familyName,
        jobTitle: business.founder.jobTitle,
        description: business.founder.description,
        image: business.founder.image,
        url: business.founder.url,
        knowsAbout: business.founder.knowsAbout,
      },
      sameAs: business.sameAs,
    };
  }

  if (type === 'LocalBusiness' && data?.reviews) {
    schema = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'FitnessCenter', 'HealthAndBeautyBusiness', 'SportsActivityLocation'],
      '@id': SCHEMA_IDS.localBusiness,
      name: business.name,
      alternateName: business.alternateName,
      url: business.url,
      image: business.images,
      description: business.description,
      telephone: business.telephone,
      email: business.email,
      priceRange: business.priceRange,
      parentOrganization: { '@id': SCHEMA_IDS.organization },
      founder: { '@id': SCHEMA_IDS.founder },
      address: postalAddress,
      geo: geoCoordinates,
      hasMap: business.hasMap,
      openingHoursSpecification,
      areaServed: {
        '@type': 'City',
        name: business.areaServed,
      },
      knowsAbout: business.knowsAbout,
      paymentAccepted: business.paymentAccepted,
      currenciesAccepted: business.currenciesAccepted,
      availableLanguage: business.availableLanguage,
      sameAs: business.sameAs,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating.value,
        reviewCount: business.rating.count,
        bestRating: business.rating.best,
        worstRating: business.rating.worst,
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
          bestRating: business.rating.best,
          worstRating: business.rating.worst,
        },
        reviewBody: review.reviewBody,
      })),
    };
  }

  if (type === 'Service' && data?.service) {
    const s = data.service;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${s.serviceUrl}#service`,
      name: s.name,
      description: s.description,
      serviceType: s.name,
      url: s.serviceUrl,
      areaServed: {
        '@type': 'City',
        name: s.areaServed,
      },
      provider: {
        '@type': 'Organization',
        '@id': SCHEMA_IDS.organization,
        name: business.name,
        url: business.url,
      },
      offers: s.offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        ...(offer.price ? { price: offer.price } : {}),
        ...(offer.priceCurrency ? { priceCurrency: offer.priceCurrency } : {}),
        ...(offer.url ? { url: offer.url } : {}),
      })),
    };
  }

  if (type === 'Product' && data?.product) {
    const p = data.product;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${p.url}#product`,
      name: p.name,
      description: p.description,
      image: p.image,
      sku: p.sku,
      category: p.category || 'Pilates Equipment',
      brand: {
        '@type': 'Brand',
        name: p.brand,
      },
      offers: {
        '@type': 'Offer',
        url: p.url,
        ...(p.priceCurrency ? { priceCurrency: p.priceCurrency } : {}),
        ...(p.price ? { price: p.price } : {}),
        availability: p.availability,
        ...(p.itemCondition ? { itemCondition: p.itemCondition } : {}),
        seller: {
          '@type': 'Organization',
          name: 'PT Studio 7 Amsterdam',
          url: baseUrl,
        },
      },
      ...(p.additionalProperty && p.additionalProperty.length > 0
        ? {
            additionalProperty: p.additionalProperty.map((prop) => ({
              '@type': 'PropertyValue',
              name: prop.name,
              value: prop.value,
            })),
          }
        : {}),
    };
  }

  if (type === 'ItemList' && data?.itemList) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: data.itemList.name,
      itemListElement: data.itemList.itemListElement.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: item.name,
          url: item.url,
          ...(item.image ? { image: item.image } : {}),
        },
      })),
    };
  }

  if (type === 'Person' && data?.person) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.person.name,
      jobTitle: data.person.jobTitle,
      image: `${baseUrl}${data.person.image}`,
      description: data.person.description,
      worksFor: {
        '@type': 'Organization',
        '@id': SCHEMA_IDS.organization,
        name: data.person.worksFor,
        url: business.url,
      },
      knowsAbout:
        data.person.knowsAbout && data.person.knowsAbout.length > 0
          ? data.person.knowsAbout
          : ['Pilates', 'Reformer Pilates', 'Fitness Training', 'Strength Training'],
      ...(data.person.sameAs && data.person.sameAs.length > 0 ? { sameAs: data.person.sameAs } : {}),
      ...(data.person.hasCredential && data.person.hasCredential.length > 0
        ? {
            hasCredential: data.person.hasCredential.map((credential) => ({
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'Certification',
              name: credential,
            })),
          }
        : {}),
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
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${bp.slug}/`,
      },
      headline: bp.headline,
      description: bp.description,
      image: bp.image.startsWith('http') ? bp.image : `${baseUrl}${bp.image}`,
      datePublished: bp.datePublished,
      dateModified: bp.dateModified,
      author: {
        '@type': 'Person',
        name: bp.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'PT Studio 7 Amsterdam',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/assets/images/pt7logo.webp`,
        },
      },
      articleSection: bp.articleSection || 'Pilates',
      keywords: bp.keywords.join(', '),
      inLanguage: 'en',
    };
  }

  if (type === 'Course' && data?.course) {
    const c = data.course;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: c.name,
      description: c.description,
      url: c.url ?? `${baseUrl}/academy/`,
      ...(c.timeRequired && { timeRequired: c.timeRequired }),
      ...(c.educationalCredentialAwarded && {
        educationalCredentialAwarded: {
          '@type': 'EducationalOccupationalCredential',
          name: c.educationalCredentialAwarded,
          credentialCategory: 'certificate',
        },
      }),
      ...(c.recognizedByName && {
        recognizedBy: {
          '@type': 'Organization',
          name: c.recognizedByName,
          ...(c.recognizedByUrl && { url: c.recognizedByUrl }),
        },
      }),
      provider: {
        '@type': 'Organization',
        name: 'PT 7 Academy',
        url: baseUrl,
        sameAs: `${baseUrl}/academy/`,
      },
      offers: {
        '@type': 'Offer',
        price: c.price,
        priceCurrency: c.priceCurrency,
        availability: 'https://schema.org/LimitedAvailability',
        validFrom: c.startDate,
        url: c.url ?? `${baseUrl}/academy/`,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: c.name,
        courseMode: 'Onsite',
        courseWorkload: c.timeRequired,
        courseSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P2W',
          byDay: ['Saturday', 'Sunday'],
          startTime: c.startTime ?? '12:00',
          endTime: c.endTime ?? '18:00',
          scheduleTimezone: 'Europe/Amsterdam',
          description: c.schedule,
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
        ...(typeof c.maxParticipants === 'number' && {
          maximumAttendeeCapacity: c.maxParticipants,
        }),
      },
      inLanguage: 'en',
      isAccessibleForFree: false,
    };
  }

  if (!schema) return null;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
};

