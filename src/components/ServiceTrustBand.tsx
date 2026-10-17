import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ServiceTrustBandProps = {
  imageSrc: string;
  imageAlt: string;
  priceAnchor: string;
  testimonial: string;
  testimonialAuthor: string;
  ctaTo?: string;
  ctaLabel?: string;
  layout?: 'band' | 'proof';
  imageWidth?: number;
  imageHeight?: number;
};

/** Shared image + price + testimonial block for SEO landers (P2-12). */
export function ServiceTrustBand({
  imageSrc,
  imageAlt,
  priceAnchor,
  testimonial,
  testimonialAuthor,
  ctaTo = '/pricing/',
  ctaLabel,
  layout = 'band',
  imageWidth = 1200,
  imageHeight = 800,
}: ServiceTrustBandProps) {
  const { t } = useTranslation('common');

  return (
    <section
      className={layout === 'proof' ? 'service-trust service-trust--proof' : 'service-trust'}
      aria-label={t('trustBand.aria')}
    >
      <div className="service-trust-media">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="service-trust-copy">
        <p className="service-trust-price">{priceAnchor}</p>
        <blockquote className="service-trust-quote">
          <p>{testimonial}</p>
          <cite>{testimonialAuthor}</cite>
        </blockquote>
        <Link to={ctaTo} className="service-trust-link">
          {ctaLabel ?? t('trustBand.viewPricing')}
        </Link>
      </div>
    </section>
  );
}
