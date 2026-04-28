import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import { equipmentProducts } from '../data/equipment';
import '../styles/EquipmentProduct.css';

export const EquipmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const product = equipmentProducts.find(p => p.slug === slug);

  if (!product) {
    return <Navigate to="/equipment" replace />;
  }

  const hasGallery = product.images.length > 1;
  const currentImage = product.images[activeImage] || product.images[0];
  const numericPrice = product.price.replace(/[^\d.,]/g, '').replace(',', '');
  const productUrl = `https://www.pt7.nl/equipment/${product.slug}`;
  const workoutByEquipment: Record<string, { to: string; label: string }> = {
    reformer: { to: '/workouts/reformer-pilates', label: 'Try Reformer Pilates classes' },
    'tower-reformer': { to: '/workouts/reformer-pilates', label: 'Try Tower/Reformer-style classes' },
    cadillac: { to: '/workouts/reformer-pilates', label: 'Try equipment-based Pilates classes' },
    'wunda-chair': { to: '/workouts/reformer-pilates', label: 'Try Pilates classes using this equipment family' },
    'ladder-barrel': { to: '/workouts/reformer-pilates', label: 'Try mobility-focused Pilates classes' },
  };
  const relatedWorkout = workoutByEquipment[product.slug];

  return (
    <>
      <SEOHead
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
        canonical={`https://www.pt7.nl/equipment/${product.slug}`}
      />
      <StructuredData
        type="Product"
        data={{
          product: {
            name: product.name,
            description: product.description,
            image: product.images.map((img) => `https://www.pt7.nl${img.src}`),
            sku: `PT7-${product.slug.toUpperCase()}`,
            brand: 'PT Studio 7',
            url: productUrl,
            price: numericPrice,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            category: 'Pilates Equipment',
            additionalProperty: [
              { name: 'Warranty', value: '2 years' },
              { name: 'Delivery', value: '3-8 weeks in the Netherlands' },
            ],
          },
        }}
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
                    className={`gallery-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-price-highlight">
              <span className="product-price">{product.price}</span>
            </div>
            <p className="product-short-desc">{product.shortDesc}</p>
            <ul className="product-features">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="product-cta">
              <a href="#product-contact" className="btn">Contact for Order</a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <div className="product-desc">{product.description}</div>
            <ul className="product-specs">
              {product.specs.map((s, i) => (
                <li key={i}><strong>{s.label}:</strong> {s.value}</li>
              ))}
            </ul>
          </div>
        </section>

        {relatedWorkout && (
          <section className="product-details">
            <div className="product-desc-specs">
              <div className="product-desc">
                Want to experience this equipment before buying? <a href={relatedWorkout.to}>{relatedWorkout.label}</a> at our Amsterdam studio.
              </div>
            </div>
          </section>
        )}

        <EquipmentFAQ items={product.faq} />
        <EquipmentContact />
      </main>
    </>
  );
};
