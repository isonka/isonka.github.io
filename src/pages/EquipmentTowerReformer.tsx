import { SEOHead } from '../components/SEOHead';
import { EquipmentFAQ } from '../components/EquipmentFAQ';
import { EquipmentContact } from '../components/EquipmentContact';
import '../styles/EquipmentProduct.css';

export const EquipmentTowerReformer: React.FC = () => {
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
      question: 'What ceiling height is required?',
      answer: 'We recommend a minimum ceiling height of 220cm for comfortable use of the tower features.'
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
        title="Tower Reformer - PT Studio 7 Amsterdam"
        description="Professional-grade Tower Reformer combining reformer and tower for expanded exercise options. Studio-quality Pilates equipment available in Amsterdam."
        keywords="Tower Reformer for sale, Pilates tower, professional Pilates equipment, reformer with tower, Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/equipment/tower-reformer"
      />

      <main className="product-detail-main">
        <section className="product-hero">
          <div className="product-gallery">
            <img 
              src="/assets/images/tower_reformer.jpg" 
              alt="Tower Reformer Pilates Equipment" 
              className="main-image" 
              width="800" 
              height="600" 
              loading="eager" 
              decoding="async" 
            />
          </div>
          <div className="product-info">
            <h1>Tower Reformer</h1>
            <div className="product-price-highlight">
              <span className="product-price">€4,000<sup>*</sup></span>
              <span className="product-price-note">(incl. BTW & delivery)</span>
            </div>
            <p className="product-short-desc">
              Professional-grade reformer with integrated tower for expanded exercise options and versatility.
            </p>
            <ul className="product-features">
              <li>Solid beech wood frame</li>
              <li>Integrated tower with overhead bars</li>
              <li>Adjustable footbar and headrest</li>
              <li>Smooth-gliding carriage with precision wheels</li>
              <li>Extended spring system for vertical resistance</li>
              <li>Complete set of springs, straps, and cables</li>
              <li>Comfortable, easy-to-clean upholstery</li>
              <li>Includes jump board and box</li>
              <li>Dimensions: 240 x 69 x 200 cm (with tower)</li>
              <li>Weight: approx. 150 kg</li>
            </ul>
            <div className="product-cta">
              <a href="#product-contact" className="btn">Contact for Order</a>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-desc-specs">
            <div className="product-desc">
              The Tower Reformer combines the functionality of a classic reformer with the versatility of a tower, 
              offering the widest range of Pilates exercises in one unit. Perfect for studios looking to maximize space efficiency 
              while providing comprehensive training options.
            </div>
            <ul className="product-specs">
              <li><strong>Frame:</strong> Solid beech wood</li>
              <li><strong>Tower:</strong> Integrated vertical frame with overhead bars</li>
              <li><strong>Carriage:</strong> High-quality, smooth-glide system</li>
              <li><strong>Springs:</strong> Full reformer set plus tower springs</li>
              <li><strong>Cables:</strong> Professional-grade tower cables</li>
              <li><strong>Dimensions:</strong> 240 x 69 x 200 cm</li>
              <li><strong>Accessories:</strong> Box, jump board, straps, push-through bar</li>
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
