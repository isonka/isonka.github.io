import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
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

  return (
    <>
      <SEOHead
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
        canonical={`https://www.pt7.nl/equipment/${product.slug}`}
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

        <EquipmentFAQ items={product.faq} />
        <EquipmentContact />
      </main>
    </>
  );
};
