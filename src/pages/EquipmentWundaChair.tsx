import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import '../styles/EquipmentProduct.css';

export const EquipmentWundaChair: React.FC = () => {
  useEffect(() => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const handleClick = function(this: HTMLElement) {
      const answer = this.nextElementSibling as HTMLElement;
      const isActive = this.classList.contains('active');
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const ans = q.nextElementSibling as HTMLElement;
        if (ans) { ans.classList.remove('open'); ans.style.maxHeight = '0'; }
      });
      if (!isActive && answer) {
        this.classList.add('active');
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 50 + 'px';
      }
    };
    faqQuestions.forEach(btn => btn.addEventListener('click', handleClick as EventListener));
    return () => { faqQuestions.forEach(btn => btn.removeEventListener('click', handleClick as EventListener)); };
  }, []);

  return (
    <>
      <SEOHead
        title="Wunda Chair - PT Studio 7 Amsterdam"
        description="Professional Pilates Wunda Chair for sale. Versatile equipment for challenging workouts in compact space. Studio-grade quality available in Amsterdam."
        keywords="Wunda Chair for sale, Pilates chair, professional Pilates equipment, compact Pilates, Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/equipment/wunda-chair"
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <img src="/assets/images/wunda_chair.jpg" alt="Wunda Chair" className="main-image" />
          </div>
          <div className="product-info">
            <h1>Wunda Chair</h1>
            <div className="product-price-highlight">
              <span className="product-price">€2,000<sup>*</sup></span>
              <span className="product-price-note">(incl. BTW & delivery)</span>
            </div>
            <p className="product-short-desc">
              The Wunda Chair is a classic Pilates apparatus designed for a wide range of exercises that improve strength, balance, and stability. 
              Its compact design makes it ideal for both home and studio use.
            </p>
            <ul className="product-features">
              <li>Solid wood construction</li>
              <li>Adjustable spring resistance (4 springs)</li>
              <li>Comfortable pedal with non-slip surface</li>
              <li>Split pedal option for unilateral work</li>
              <li>Durable upholstery</li>
              <li>Compact footprint</li>
              <li>Dimensions: 63 x 56 x 63 cm</li>
              <li>Weight: approx. 35 kg</li>
            </ul>
            <div className="product-cta">
              <a href="#product-contact" className="btn">Contact for Order</a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <div className="product-desc">
              The Wunda Chair offers over 75 exercises in a compact design. It's excellent for building strength, 
              improving balance, and developing functional movement patterns. Perfect for studios with limited space 
              or home users seeking a professional-grade apparatus.
            </div>
            <ul className="product-specs">
              <li><strong>Frame:</strong> Solid wood construction</li>
              <li><strong>Springs:</strong> 4 adjustable springs</li>
              <li><strong>Pedal:</strong> Non-slip surface, split option</li>
              <li><strong>Upholstery:</strong> Professional-grade, easy to clean</li>
              <li><strong>Dimensions:</strong> 63 x 56 x 63 cm</li>
              <li><strong>Warranty:</strong> 2 years on frame and moving parts</li>
              <li><strong>Delivery:</strong> Available within the Netherlands</li>
            </ul>
          </div>
        </section>

        <section className="product-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-question">How can I order this equipment?</button>
              <div className="faq-answer">
                You can contact us directly via email or phone to place your order or request more information about our Pilates equipment.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">What does the price include?*</button>
              <div className="faq-answer">
                The listed price includes VAT (BTW) and delivery to your door within the Netherlands. Installation is not included. 
                For other locations or special delivery needs, please contact us.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">Is installation included?</button>
              <div className="faq-answer">
                The Wunda Chair arrives fully assembled and ready to use. No installation required.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">How much space do I need?</button>
              <div className="faq-answer">
                The Wunda Chair has a small footprint (63 x 56 cm). We recommend at least 2m x 2m of space for comfortable use.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">What is the delivery time?</button>
              <div className="faq-answer">
                Delivery time is typically 3-8 weeks depending on stock and your location.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">Is there a warranty?</button>
              <div className="faq-answer">
                All our equipment comes with a 2-year warranty covering manufacturing defects and materials.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">Can I return it after purchase?</button>
              <div className="faq-answer">
                Returns are not possible for this product after purchase, as each product is made to order.
              </div>
            </div>
          </div>
        </section>

        <section id="product-contact" className="product-contact">
          <h2>Contact Us to Order</h2>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#bfa100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
              </div>
              <div className="contact-info">
                <strong>Email:</strong><br/>
                <a href="mailto:info@ptstudio7amsterdam.nl">info@ptstudio7amsterdam.nl</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#bfa100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="contact-info">
                <strong>Phone:</strong><br/>
                <a href="tel:0685162693">06 85 16 26 93</a> | 
                <a href="https://wa.me/31685162693" target="_blank" rel="noopener noreferrer"> WhatsApp</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#bfa100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.05 10.61 8.09 11.38.56.41 1.26.41 1.82 0C13.95 21.61 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 18.54C10.14 18.07 5 13.97 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.97-5.14 7.07-7 9.54zM12 6.5A4.5 4.5 0 0 0 7.5 11c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5A4.5 4.5 0 0 0 12 6.5zm0 7A2.5 2.5 0 1 1 12 9a2.5 2.5 0 0 1 0 5.5z"/>
                </svg>
              </div>
              <div className="contact-info">
                <strong>Visit us:</strong><br/>
                Van Baerlestraat 76C, 1071BB Amsterdam
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

