import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

interface EquipmentFAQProps {
  items: FAQItem[];
}

export const EquipmentFAQ = ({ items }: EquipmentFAQProps) => {
  const { t } = useTranslation('equipment');

  useEffect(() => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    const handleClick = function(this: HTMLElement) {
      const answer = this.nextElementSibling as HTMLElement;
      const isActive = this.classList.contains('active');
      
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const ans = q.nextElementSibling as HTMLElement;
        if (ans) {
          ans.classList.remove('open');
          ans.style.maxHeight = '0';
        }
      });
      
      if (!isActive && answer) {
        this.classList.add('active');
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 50 + 'px';
      }
    };
    
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', handleClick as EventListener);
    });
    
    return () => {
      faqQuestions.forEach(btn => {
        btn.removeEventListener('click', handleClick as EventListener);
      });
    };
  }, []);

  return (
    <section className="product-faq">
      <h2>{t('faqTitle')}</h2>
      <div className="faq-list">
        {items.map((item, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question">{item.question}</button>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

