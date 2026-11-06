import { useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CONSENT_UPDATED_EVENT, getStoredConsent, type Pt7Consent } from '../utils/consentTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/ContactMap.css';
import { studioStreet } from '../data/business';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7239958408204!2d4.8788535!3d52.3573109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6090de92c90df%3A0xe44c5d7c1eae1d19!2sPT%20Studio%207!5e0!3m2!1sen!2snl!4v1732445893649!5m2!1sen!2snl';

const MAPS_APP = 'https://maps.app.goo.gl/wrhyzYbov9eiGQJw5';

type ContactMapProps = {
  embedSrc?: string;
  mapsUrl?: string;
  title?: string;
  kicker?: string;
  address?: string;
};

function googleEmbedAllowed(consent: Pt7Consent | null): boolean {
  return Boolean(consent?.statistics || consent?.marketing);
}

export const ContactMap: FC<ContactMapProps> = ({
  embedSrc = MAP_SRC,
  mapsUrl = MAPS_APP,
  title,
  kicker = 'Museumplein',
  address = studioStreet,
}) => {
  const { t } = useTranslation('common');
  const [ready, setReady] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (isPrerender()) return;

    const sync = () => {
      if (googleEmbedAllowed(getStoredConsent())) setShowMap(true);
    };
    sync();
    setReady(true);
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
  }, []);

  return (
    <div className="contact-map">
      <div className="contact-map-frame">
        {showMap ? (
          <iframe
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title ?? t('contactMap.iframeTitle')}
          />
        ) : (
          <div className="contact-map-consent">
            {ready ? (
              <>
                <p className="contact-map-consent-kicker">{kicker}</p>
                <p className="contact-map-consent-address">{address}</p>
                <p className="contact-map-consent-note">
                  {t('contactMap.consentNote')}
                </p>
                <div className="contact-map-consent-actions">
                  <button type="button" className="contact-map-consent-btn" onClick={() => setShowMap(true)}>
                    {t('contactMap.showMap')}
                  </button>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    {t('contactMap.openMaps')}
                  </a>
                </div>
              </>
            ) : (
              <span className="contact-map-slot" aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      <ul className="contact-map-transit">
        <li>{t('contactMap.tramLine')}</li>
        <li>{t('contactMap.busLine')}</li>
        <li>{t('contactMap.bikeLine')}</li>
      </ul>
    </div>
  );
};
