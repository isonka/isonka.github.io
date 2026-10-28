import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { homePath, localeHref } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { trackPageView } from '../utils/gtmTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/NotFound.css';

export const NotFound = () => {
  const { t } = useTranslation('notFound');
  const locale = useLocale();
  const location = useLocation();

  useEffect(() => {
    if (isPrerender()) return;
    trackPageView(location.pathname, 'Page not found | PT7 Pilates Amsterdam');
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical="https://www.pt7.nl/"
        robots="noindex, follow"
        omitCanonical
        htmlLang={locale}
        ogLocale={locale === 'nl' ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={locale === 'nl' ? ['en_US'] : ['nl_NL']}
      />

      <section className="not-found">
        <div className="not-found-inner">
          <p className="kicker">404</p>
          <h1>{t('title')}</h1>
          <p className="not-found-lead">{t('lead')}</p>
          <div className="not-found-actions">
            <Link to={homePath(locale)} className="btn-ink">
              {t('home')}
            </Link>
            <Link to={localeHref('/schedule/', locale)} className="btn-gold">
              {t('book')}
            </Link>
            <Link to={localeHref('/pricing/', locale)} className="not-found-ghost">
              {t('pricing')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
