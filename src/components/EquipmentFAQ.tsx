import { useTranslation } from 'react-i18next';
import { MediumTail } from './MediumTail';

interface FAQItem {
  question: string;
  answer: string;
}

interface EquipmentFAQProps {
  items: FAQItem[];
}

export const EquipmentFAQ = ({ items }: EquipmentFAQProps) => {
  const { t } = useTranslation('equipment');

  return (
    <section className="product-faq">
      <h2><MediumTail text={t('faqTitle')} /></h2>
      <div className="faq-list">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
