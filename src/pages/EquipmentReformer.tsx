import { SEOHead } from '../components/SEOHead';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import '../styles/EquipmentProduct.css';

export const EquipmentReformer: React.FC = () => {
  const customFAQ = [
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
      question: 'Can I try the Reformer before buying?',
      answer: 'Yes! You are welcome to visit our Amsterdam studio to try the Reformer and get expert advice.'
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

  return (
    <>
      <SEOHead
        title="Pilates Reformer - PT Studio 7 Amsterdam"
        description="Professional-grade Pilates Reformer for sale. Solid beech wood frame, smooth-gliding carriage, complete with accessories. Studio-quality equipment available in Amsterdam."
        keywords="Pilates Reformer for sale, professional Pilates equipment, reformer Amsterdam, studio equipment, Pilates apparatus"
        canonical="https://www.ptstudio7amsterdam.nl/equipment/reformer"
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <img src="/assets/images/reformer.jpg" alt="Pilates Reformer" className="main-image" />
          </div>
          <div className="product-info">
            <h1>Pilates Reformer</h1>
            <div className="product-price-highlight">
              <span className="product-price">€3,500<sup>*</sup></span>
              <span className="product-price-note">(incl. BTW & delivery)</span>
            </div>
            <p className="product-short-desc">
              The classic Pilates Reformer for all levels. Smooth, silent, and built for a lifetime of movement.
            </p>
            <ul className="product-features">
              <li>Solid beech wood frame</li>
              <li>Adjustable footbar and headrest</li>
              <li>Smooth-gliding carriage with precision wheels</li>
              <li>Complete set of springs and straps</li>
              <li>Comfortable, easy-to-clean upholstery</li>
              <li>Includes jump board and box for added versatility</li>
              <li>Dimensions: 240 x 69 x 35 cm</li>
              <li>Weight: approx. 125 kg</li>
            </ul>
            <div className="product-cta">
              <a href="#product-contact" className="btn">Contact for Order</a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <div className="product-desc">
              The Pilates Reformer is the most popular piece of Pilates equipment, ideal for both group classes and private sessions. 
              It offers a wide range of exercises for strength, flexibility, and rehabilitation. Built from premium materials for durability and comfort.
            </div>
            <ul className="product-specs">
              <li><strong>Frame:</strong> Solid beech wood</li>
              <li><strong>Carriage:</strong> High-quality, smooth-glide system</li>
              <li><strong>Footbar:</strong> Adjustable, multiple positions</li>
              <li><strong>Headrest:</strong> Adjustable, padded</li>
              <li><strong>Upholstery:</strong> Comfortable, easy to clean</li>
              <li><strong>Springs:</strong> Full set included</li>
              <li><strong>Straps:</strong> Durable, adjustable</li>
              <li><strong>Dimensions:</strong> 240 x 69 x 35 cm</li>
              <li><strong>Accessories:</strong> Box, jump board, straps</li>
              <li><strong>Warranty:</strong> 2 years on frame and moving parts</li>
              <li><strong>Delivery:</strong> Available within the Netherlands</li>
            </ul>
          </div>
        </section>

        <EquipmentFAQ items={customFAQ} />
        <EquipmentContact />
      </main>
    </>
  );
};

