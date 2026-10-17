import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BASE_URL } from '../data/business';
import { equipmentFor } from '../data/localized';
import { homePath } from '../i18n/locale';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import '../styles/Equipment.css';

const CARD_COPY = {
  reformer: 'reformer',
  'tower-reformer': 'towerReformer',
  cadillac: 'cadillac',
  'wunda-chair': 'wundaChair',
  'ladder-barrel': 'ladderBarrel',
} as const;

export const Equipment= () => {
  const { t } = useTranslation('equipment');
  const page = useLocalizedPage('/equipment/');
  const { href, isNl } = page;
  const navigate = useNavigate();
  const equipmentProducts = equipmentFor(page.locale);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(homePath(page.locale));
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const equipment = equipmentProducts.map((p) => {
    const copyKey = CARD_COPY[p.slug as keyof typeof CARD_COPY];
    return {
      name: p.name,
      image: p.images[0].src,
      description: copyKey ? t(`cards.${copyKey}`) : p.shortDesc,
      link: href(`/equipment/${p.slug}/`),
      tag: p.slug === 'reformer' ? t('cards.mostPopular') : undefined,
    };
  });

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: t('seo.listName'),
            itemListElement: equipmentProducts.map((product) => ({
              name: product.name,
              url: `${BASE_URL}${href(`/equipment/${product.slug}/`)}`,
              image: `${BASE_URL}${product.images[0].src}`,
            })),
          },
        }}
      />

      <div className="equipment-page">
        <header className="equipment-hero">
          <p className="kicker">{t('hero.kicker')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="equipment-hero-line">{t('hero.line')}</p>
        </header>

        <section className="equipment-dealer" aria-labelledby="equipment-dealer-heading">
          <h2 id="equipment-dealer-heading">{t('dealer.title')}</h2>
          <p>{t('dealer.text')}</p>
          {isNl ? null : <p lang="nl">{t('dealer.dutchNote')}</p>}
          <p>
            <a
              href={`mailto:info@pt7.nl?subject=${encodeURIComponent(t('dealer.quoteSubject'))}`}
              className="btn-gold"
            >
              {t('dealer.quoteButton')}
            </a>
          </p>
        </section>

        <div className="equipment-intent-notice">
          <p>
            <strong>{t('intent.lead')}</strong> {t('intent.text')}{' '}
            <Link to={href('/reformer-pilates-amsterdam/')}>{t('intent.bookReformer')}</Link>
            {' · '}
            <Link to={href('/schedule/')}>{t('intent.schedule')}</Link>
          </p>
        </div>

        <div className="equipment-content">
          <ul className="equipment-list">
            {equipment.map((item) => (
              <li key={item.name} className="equipment-item">
                <Link to={item.link} className="equipment-link">
                  <div className="equipment-media">
                    <img
                      src={item.image}
                      alt={t('cards.imageAlt', { name: item.name })}
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {item.tag ? <span className="equipment-note">{item.tag}</span> : null}
                  <h2 className="equipment-title">{item.name}</h2>
                  <p className="equipment-desc">{item.description}</p>
                  <span className="prose-link equipment-more">{t('cards.learnMore')}</span>
                </Link>
                <a
                  className="equipment-quote-btn"
                  href={`mailto:info@pt7.nl?subject=${encodeURIComponent(t('cards.quoteSubject', { name: item.name }))}&body=${encodeURIComponent(t('cards.quoteBody', { name: item.name }))}`}
                >
                  {t('cards.quote')}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <section className="cta-band equipment-cta-band">
          <h2>{t('help.title')}</h2>
          <p>{t('help.text')}</p>
          <div className="equipment-cta-actions">
            <a href="#contact" onClick={handleContactClick} className="btn-gold">
              {t('help.contact')}
            </a>
            <Link to={href('/reformer-pilates-amsterdam/')} className="btn-ghost">
              {t('help.book')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
