import { Link } from 'react-router-dom';

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
  ctaLabel = 'View pricing',
  layout = 'band',
  imageWidth = 1200,
  imageHeight = 800,
}: ServiceTrustBandProps) {
  return (
    <section
      className={layout === 'proof' ? 'service-trust service-trust--proof' : 'service-trust'}
      aria-label="Trust signals"
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
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
