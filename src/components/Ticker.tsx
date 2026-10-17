import { useTranslation } from 'react-i18next';
import '../styles/Ticker.css';

export const Ticker = () => {
  const { t } = useTranslation('common');

  return (
    <div className="ticker" role="status">
      <div className="ticker-inner">
        <span>{t('ticker.disciplines')}</span>
        <span>{t('ticker.venue')}</span>
        <span>{t('ticker.intro')}</span>
      </div>
    </div>
  );
};
