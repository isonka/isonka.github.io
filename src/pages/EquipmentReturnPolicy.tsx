import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';
import '../styles/Privacy.css';
import { MediumTail } from '../components/MediumTail';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

export const EquipmentReturnPolicy = () => {
  const { t } = useTranslation('equipment');
  const page = useLocalizedPage('/equipment-return-policy/');
  const { href } = page;

  useEffect(() => {
    trackPageView(page.path, t('returns.seoTitle'));
  }, [page.path, t]);

  return (
    <>
      <SEOHead
        title={t('returns.seoTitle')}
        description={t('returns.seoDescription')}
        keywords={t('returns.seoKeywords')}
        canonical={page.canonical}
        ogTitle={t('returns.seoTitle')}
        ogDescription={t('returns.seoDescription')}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <Breadcrumbs
        items={[
          { name: t('detail.breadcrumb'), path: href('/equipment/') },
          { name: t('returns.breadcrumb'), path: page.path },
        ]}
      />

      <div className="service-page privacy-page">
        <section className="service-hero is-in">
          <div className="service-hero-content">
            <h1><MediumTail text={t('returns.pageTitle')} /></h1>
          </div>
        </section>

        <article className="privacy-prose">
          <p>{t('returns.answer')}</p>
          <p>{t('returns.country')}</p>
          <h2>{t('returns.warrantyTitle')}</h2>
          <p>{t('returns.warranty')}</p>
        </article>
      </div>
    </>
  );
};
