import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import { equipmentFor } from '../data/localized';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { NotFound } from './NotFound';
import '../styles/EquipmentProduct.css';
import { studioStreet } from '../data/business';

const RELATED_BY_EQUIPMENT = {
  reformer: 'reformer',
  'tower-reformer': 'reformer',
  cadillac: 'equipmentClasses',
  'wunda-chair': 'studioClasses',
} as const;

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
  const relatedKey = RELATED_BY_EQUIPMENT[product.slug as keyof typeof RELATED_BY_EQUIPMENT];
  const relatedWorkout = relatedKey
    ? { to: href('/reformer-pilates-amsterdam/'), label: t(`detail.related.${relatedKey}`) }
    : undefined;
  const forSaleOnly = product.slug === 'ladder-barrel';
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

      <Breadcrumbs
        items={[
          { name: forSaleOnly ? t('detail.breadcrumbForSale') : t('detail.breadcrumbStudio'), path: href('/equipment/') },
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
              {forSaleOnly
                ? t('detail.titleForSale', { name: product.name })
                : t('detail.titleStudio', { name: product.name })}
            </h1>
            <p className="product-intent-notice">
              {forSaleOnly ? t('detail.noticeForSale') : t('detail.noticeStudio', { studioStreet })}
              <Link to={href('/reformer-pilates-amsterdam/')} className="prose-link">
                {t('detail.bookReformer')}
              </Link>
              {' · '}
              <Link to={href('/schedule/')} className="prose-link">
                {t('detail.schedule')}
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
                  {t('detail.contactForOrder')}
                </a>
              ) : (
                <Link to={href('/schedule/')} className="btn-gold">
                  {t('detail.bookClass')}
                </Link>
              )}
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
            {relatedWorkout ? (
              <p className="product-related">
                <Link to={relatedWorkout.to} className="prose-link">
                  {relatedWorkout.label}
                </Link>
                {t('detail.relatedSuffix', { studioStreet })}
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
