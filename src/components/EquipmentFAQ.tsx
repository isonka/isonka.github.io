import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MediumTail } from './MediumTail';

interface FAQItem {
  question: string;
  answer: string;
  policyHref?: string;
  policyLabel?: string;
}

interface EquipmentFAQProps {
  items: FAQItem[];
}

export const EquipmentFAQ = ({ items }: EquipmentFAQProps) => {
  const { t } = useTranslation('equipment');

  return (
    <section className="product-faq" id="returns">
      <h2><MediumTail text={t('faqTitle')} /></h2>
      <div className="faq-list">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>
              {item.answer}
              {item.policyHref ? (
                <>
                  {' '}
                  <Link className="prose-link" to={item.policyHref}>{item.policyLabel}</Link>
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
