import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import { BASE_URL, studioStreet } from '../data/business';
import { formatEquipmentPrice } from '../data/equipment';
import { equipmentFor } from '../data/localized';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { NotFound } from './NotFound';
import '../styles/EquipmentProduct.css';

/** Poppins draws 7 taller than capitals. Scale it to the cap height of PT. */
function titleWithAlignedPt7(title: string) {
  const parts = title.split('PT7');
  if (parts.length === 1) return title;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? (
        <>
          PT<span className="pt7-digit">7</span>
        </>
      ) : null}
    </span>
  ));
}

export const EquipmentDetail= () => {
  const { t } = useTranslation('equipment');
  const { slug } = useParams<{ slug: string }>();
  const page = useLocalizedPage(`/equipment/${slug}/`);
  const { href } = page;
  const [activeImage, setActiveImage] = useState(0);

  const product = equipmentFor(page.locale).find((p) => p.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const hasGallery = product.images.length > 1;
  const currentImage = product.images[activeImage] || product.images[0];
  const forSaleOnly = product.slug === 'ladder-barrel';
  const inquiryHref = `mailto:info@pt7.nl?subject=${encodeURIComponent(t('cards.quoteSubject', { name: product.name }))}&body=${encodeURIComponent(t('cards.quoteBody', { name: product.name }))}`;
  const visibleFaq = forSaleOnly
    ? product.faq
    : [
        {
          question: t('detail.faqTrainQ', { name: product.name }),
          answer: t('detail.faqTrainA', { name: product.name }),
        },
        {
          question: t('detail.faqSellingQ'),
          answer: t('detail.faqSellingA'),
        },
      ];

  return (
    <>
      <SEOHead
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
        canonical={page.canonical}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData type="FAQPage" data={{ faqs: visibleFaq }} />
      <StructuredData
        type="Product"
        data={{
          product: {
            name: product.name,
            description: product.shortDesc,
            image: product.images.map((img) => `${BASE_URL}${img.src}`),
            sku: product.slug,
            brand: 'Sole Pilates',
            url: page.canonical,
            price: String(product.priceEur),
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: false,
            offerDescription: t('price.note'),
            availability: 'https://schema.org/PreOrder',
            itemCondition: 'https://schema.org/NewCondition',
            category: 'Pilates Equipment',
          },
        }}
      />

      <Breadcrumbs
        items={[
          { name: t('detail.breadcrumb'), path: href('/equipment/') },
          { name: product.name, path: page.path },
        ]}
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <div className="gallery-main-container">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
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
                    aria-label={t('detail.viewImage', { n: String(i + 1) })}
                  >
                    <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <p className="kicker">{forSaleOnly ? t('detail.kickerForSale') : t('detail.kickerStudio')}</p>
            <h1>
              {titleWithAlignedPt7(
                forSaleOnly
                  ? t('detail.titleForSale', { name: product.name })
                  : t('detail.titleStudio', { name: product.name }),
              )}
            </h1>
            <p className="product-price">{formatEquipmentPrice(product.priceEur, page.locale)}</p>
            <p className="product-price-note">{t('price.note')}</p>
            <p className="product-intent-notice">
              {forSaleOnly ? t('detail.noticeForSale') : t('detail.noticeStudio', { studioStreet })}
            </p>
            <p className="product-short-desc">{product.shortDesc}</p>
            <ul className="product-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="product-cta">
              <a href={inquiryHref} className="btn-gold">
                {t('detail.inquire')}
              </a>
              <a href="#product-contact" className="product-cta-secondary">
                {t('detail.contact')}
              </a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <h2 className="product-section-title">{t('detail.details')}</h2>
            <p className="product-desc">{product.description}</p>
            <ul className="product-specs">
              {product.specs.map((s) => (
                <li key={s.label}>
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EquipmentFAQ items={visibleFaq} />
        <EquipmentContact />
      </main>
    </>
  );
};
