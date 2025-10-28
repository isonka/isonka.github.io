import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import '../styles/EquipmentProduct.css';

export const EquipmentLadderBarrel: React.FC = () => {
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
        title="Ladder Barrel - PT Studio 7 Amsterdam"
        description="Professional Pilates Ladder Barrel for sale. Perfect for stretching, spinal extension, and core strengthening. Studio-quality equipment in Amsterdam."
        keywords="Ladder Barrel for sale, Pilates barrel, spine corrector, professional Pilates equipment, Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/equipment/ladder-barrel"
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <img src="/assets/images/ladder_barrel.jpg" alt="Ladder Barrel" className="main-image" />
          </div>
          <div className="product-info">
            <h1>Ladder Barrel</h1>
            <div className="product-price-highlight">
              <span className="product-price">€2,000<sup>*</sup></span>
              <span className="product-price-note">(incl. BTW & delivery)</span>
            </div>
            <p className="product-short-desc">
              The Ladder Barrel is a classic Pilates apparatus designed to support a wide variety of stretching, 
              strengthening, and flexibility exercises.
            </p>
            <ul className="product-features">
              <li>Solid wood construction</li>
              <li>Adjustable barrel position with ladder</li>
              <li>Smooth curved barrel surface</li>
              <li>Non-slip rungs</li>
              <li>Comfortable upholstery</li>
              <li>Heavy-duty construction</li>
              <li>Dimensions: 90 x 75 x 90 cm</li>
              <li>Weight: approx. 40 kg</li>
            </ul>
            <div className="product-cta">
              <a href="#product-contact" className="btn">Contact for Order</a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <div className="product-desc">
              The Ladder Barrel is essential for spinal extension work and deep stretching. Its unique design supports 
              the body in a way that promotes proper alignment while performing challenging exercises. Excellent for 
              rehabilitation, flexibility training, and core strengthening.
            </div>
            <ul className="product-specs">
              <li><strong>Frame:</strong> Solid wood construction</li>
              <li><strong>Barrel:</strong> Smooth curved surface with padding</li>
              <li><strong>Ladder:</strong> Adjustable position, non-slip rungs</li>
              <li><strong>Upholstery:</strong> Professional-grade, easy to clean</li>
              <li><strong>Dimensions:</strong> 90 x 75 x 90 cm</li>
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
                The Ladder Barrel is delivered assembled and ready to use. No installation required.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">What space is needed?</button>
              <div className="faq-answer">
                The Ladder Barrel requires approximately 1.5m x 1.5m of floor space for safe use.
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

