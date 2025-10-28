import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface EquipmentFAQProps {
  items?: FAQItem[];
}

const defaultFAQItems: FAQItem[] = [
  {
    question: 'How can I order this equipment?',
    answer: 'You can contact us directly via email or phone to place your order or request more information about our Pilates equipment.'
  },
  {
    question: 'What does the price include?*',
    answer: 'The listed price includes VAT (BTW) and delivery to your door within the Netherlands. Installation is not included. For other locations or special delivery needs, please contact us.'
  },
  {
    question: 'Is installation included?',
    answer: 'We do not arrange installation, but the equipment is delivered with clear instructions and can be assembled by two people.'
  },
  {
    question: 'What is the delivery time and method?',
    answer: 'Delivery time is typically 3-8 weeks depending on stock and your location. Delivery can be arranged to your door throughout the Netherlands.'
  },
  {
    question: 'Is there a warranty?',
    answer: 'All our equipment comes with a 2-year warranty covering manufacturing defects and materials.'
  },
  {
    question: 'Can I return it after purchase?',
    answer: 'Returns are not possible for this product after purchase, as each product is made to order.'
  }
];

export const EquipmentFAQ: React.FC<EquipmentFAQProps> = ({ items = defaultFAQItems }) => {
  useEffect(() => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    const handleClick = function(this: HTMLElement) {
      const answer = this.nextElementSibling as HTMLElement;
      const isActive = this.classList.contains('active');
      
      // Close all FAQs
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const ans = q.nextElementSibling as HTMLElement;
        if (ans) {
          ans.classList.remove('open');
          ans.style.maxHeight = '0';
        }
      });
      
      // Open clicked FAQ if it wasn't active
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
      <h2>Frequently Asked Questions</h2>
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

