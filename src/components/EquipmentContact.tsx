export const EquipmentContact: React.FC = () => {
  return (
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
  );
};

