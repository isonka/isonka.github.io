import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import { equipmentProducts } from '../data/equipment';
import { NotFound } from './NotFound';
import '../styles/EquipmentProduct.css';

export const EquipmentDetail= () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const product = equipmentProducts.find((p) => p.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const hasGallery = product.images.length > 1;
  const currentImage = product.images[activeImage] || product.images[0];
  const workoutByEquipment: Record<string, { to: string; label: string }> = {
    reformer: { to: '/reformer-pilates-amsterdam/', label: 'Book Reformer Pilates classes in Amsterdam' },
    'tower-reformer': { to: '/reformer-pilates-amsterdam/', label: 'Book Reformer Pilates classes in Amsterdam' },
    cadillac: { to: '/reformer-pilates-amsterdam/', label: 'Book equipment-based Pilates classes' },
    'wunda-chair': { to: '/reformer-pilates-amsterdam/', label: 'Book Pilates classes at our studio' },
  };
  const relatedWorkout = workoutByEquipment[product.slug];
  const forSaleOnly = product.slug === 'ladder-barrel';
  const visibleFaq = forSaleOnly
    ? product.faq
    : [
        {
          question: `Can I train on the ${product.name} at PT 7?`,
          answer: `${product.name} is used in classes at our Museumplein studio. Small groups are a maximum of 5. Book from the schedule.`,
        },
        {
          question: 'Is this page selling equipment?',
          answer:
            'This page describes apparatus in the studio. The Ladder Barrel is sold separately and is not used in client sessions. Book a class from the schedule.',
        },
      ];

  return (
    <>
      <SEOHead
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
        canonical={`https://www.pt7.nl/equipment/${product.slug}/`}
      />
      <StructuredData type="FAQPage" data={{ faqs: visibleFaq }} />

      <Breadcrumbs
        items={[
          { name: forSaleOnly ? 'Equipment for Sale' : 'Studio Equipment', path: '/equipment/' },
          { name: product.name, path: `/equipment/${product.slug}/` },
        ]}
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <div className="gallery-main-container">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="main-image"
                loading="eager"
                decoding="async"
              />
            </div>
            {hasGallery && (
              <div className="gallery-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={`gallery-thumb${i === activeImage ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <p className="kicker">{forSaleOnly ? 'Equipment for sale' : 'In the studio'}</p>
            <h1>{forSaleOnly ? `${product.name} for sale` : `${product.name} at PT 7 Amsterdam`}</h1>
            <p className="product-intent-notice">
              {forSaleOnly
                ? 'This piece is for purchase and is not used in client sessions. '
                : 'This is apparatus we use in classes at Van Baerlestraat 76C, Museumplein. '}
              <Link to="/reformer-pilates-amsterdam/" className="prose-link">
                Book Reformer Pilates in Amsterdam
              </Link>
              {' · '}
              <Link to="/schedule/" className="prose-link">
                View schedule
              </Link>
            </p>
            <p className="product-short-desc">{product.shortDesc}</p>
            <ul className="product-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="product-cta">
              {forSaleOnly ? (
                <a href="#product-contact" className="btn-gold">
                  Contact for Order
                </a>
              ) : (
                <Link to="/schedule/" className="btn-gold">
                  Book a class
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <h2 className="product-section-title">Details</h2>
            <p className="product-desc">{product.description}</p>
            <ul className="product-specs">
              {product.specs.map((s) => (
                <li key={s.label}>
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.value}</span>
                </li>
              ))}
            </ul>
            {relatedWorkout ? (
              <p className="product-related">
                <Link to={relatedWorkout.to} className="prose-link">
                  {relatedWorkout.label}
                </Link>{' '}
                at Van Baerlestraat 76C, Museumplein.
              </p>
            ) : null}
          </div>
        </section>

        <EquipmentFAQ items={visibleFaq} />
        {forSaleOnly ? <EquipmentContact /> : null}
      </main>
    </>
  );
};
