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
  endDate?: string;
  schedule: string;
  locationName: string;
  maxParticipants: number;
}

interface StructuredDataProps {
  type:
    | 'LocalBusiness'
    | 'SportsActivityLocation'
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
      price: string;
      priceCurrency: string;
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

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let schema: object | null = null;
  const baseUrl = 'https://www.pt7.nl';

  if (type === 'LocalBusiness' && data?.reviews) {
    schema = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'SportsActivityLocation'],
      '@id': `${baseUrl}/#localbusiness`,
      name: 'PT Studio 7 Amsterdam',
      image: `${baseUrl}/assets/images/studio.jpg`,
      url: baseUrl,
      telephone: '+31-6-8516-2693',
      priceRange: 'EUR 28-85',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Van Baerlestraat 76C',
        addressLocality: 'Amsterdam',
        postalCode: '1071 BB',
        addressCountry: 'NL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.3572909720188,
        longitude: 4.876257777138345,
      },
      hasMap: 'https://maps.app.goo.gl/wrhyzYbov9eiGQJw5',
      sameAs: [
        'https://www.instagram.com/ptstudio7amsterdam',
        'https://www.facebook.com/ptstudio7',
        'https://classpass.com/studios/pt-studio-7-amsterdam',
        'https://urbansportsclub.com/nl/venues/pt-studio-7-museumplein',
        'https://www.polestarpilates.nl/',
      ],
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
        ratingValue: '4.8',
        reviewCount: '150',
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

  if (type === 'SportsActivityLocation') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'SportsActivityLocation',
      '@id': `${baseUrl}/#sports-activity-location`,
      name: 'PT Studio 7 Amsterdam',
      url: baseUrl,
      description:
        "Boutique Pilates and personal training studio at Museumplein, Amsterdam offering Reformer Pilates, TRX, strength training, private sessions, and small group classes.",
      image: `${baseUrl}/assets/images/studio.jpg`,
      telephone: '+31-6-8516-2693',
      priceRange: 'EUR 28-85',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Van Baerlestraat 76C',
        addressLocality: 'Amsterdam',
        postalCode: '1071 BB',
        addressCountry: 'NL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.3572909720188,
        longitude: 4.876257777138345,
      },
      hasMap: 'https://maps.app.goo.gl/wrhyzYbov9eiGQJw5',
      sport: ['Pilates', 'Reformer Pilates', 'TRX', 'Strength Training', 'Cardio Fitness'],
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
        ratingValue: '4.8',
        reviewCount: '150',
      },
      sameAs: [
        'https://www.instagram.com/ptstudio7amsterdam',
        'https://www.facebook.com/ptstudio7',
        'https://classpass.com/studios/pt-studio-7-amsterdam',
        'https://urbansportsclub.com/nl/venues/pt-studio-7-museumplein',
        'https://www.polestarpilates.nl/',
      ],
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
        '@type': 'SportsActivityLocation',
        '@id': `${baseUrl}/#sports-activity-location`,
        name: 'PT Studio 7 Amsterdam',
        url: baseUrl,
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
        priceCurrency: p.priceCurrency,
        price: p.price,
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
        '@type': 'SportsActivityLocation',
        '@id': `${baseUrl}/#sports-activity-location`,
        name: data.person.worksFor,
        url: baseUrl,
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
        '@id': `${baseUrl}/blog/${bp.slug}`,
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
          url: `${baseUrl}/assets/images/pt7logo.png`,
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

  if (!schema) return null;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

