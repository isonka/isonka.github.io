import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { equipmentProducts } from '../data/equipment';
import '../styles/Equipment.css';

const equipmentMeta: Record<string, { description: string; tag?: string }> = {
  reformer: {
    description:
      'The quintessential Pilates apparatus featuring a sliding carriage, springs, and straps for full-body conditioning.',
    tag: 'Most popular',
  },
  'tower-reformer': {
    description:
      'Combines the reformer with a tower for added vertical spring resistance and exercise variety.',
  },
  cadillac: {
    description:
      'Versatile equipment with overhead bars and springs for advanced stretching and strength work.',
  },
  'wunda-chair': {
    description:
      'Compact yet powerful equipment for balance, strength, and functional movement training.',
  },
  'ladder-barrel': {
    description:
      'Available for purchase for home or studio use. Sold by PT Studio 7; not used in our client trainings.',
  },
};

export const Equipment: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const equipment = equipmentProducts.map((p) => ({
    name: p.name,
    image: p.images[0].src,
    description: equipmentMeta[p.slug]?.description || p.shortDesc,
    link: `/equipment/${p.slug}/`,
    tag: equipmentMeta[p.slug]?.tag,
  }));

  return (
    <>
      <SEOHead
        title="Buy Pilates Equipment for Sale | Amsterdam | PT Studio 7"
        description="Pilates equipment for sale in Amsterdam and the Netherlands: Reformer, Tower Reformer, Cadillac, Wunda Chair, and Ladder Barrel. Specs, 2-year warranty, 3-8 week delivery. This page is for purchasing apparatus, not class bookings."
        keywords="buy pilates equipment amsterdam, pilates reformer for sale, pilates reformer kopen nederland, pilates equipment for sale netherlands, buy reformer amsterdam, cadillac pilates for sale"
        canonical="https://www.pt7.nl/equipment/"
        ogTitle="Buy Pilates Equipment for Sale | PT Studio 7 Amsterdam"
        ogDescription="Transactional catalog: professional Reformers and classical apparatus for home or studio purchase, not class bookings."
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: 'Pilates Equipment for Sale',
            itemListElement: equipmentProducts.map((product) => ({
              name: product.name,
              url: `https://www.pt7.nl/equipment/${product.slug}/`,
              image: `https://www.pt7.nl${product.images[0].src}`,
            })),
          },
        }}
      />

      <div className="equipment-page">
        <header className="equipment-hero">
          <p className="kicker">Equipment</p>
          <h1>Buy Pilates Equipment for Sale in Amsterdam</h1>
          <p className="equipment-hero-line">
            Professional Reformers and classical apparatus for home or studio purchase: specs, warranty, and delivery in the Netherlands. Not a class booking page.
          </p>
          </p>
        </header>

        <div className="equipment-intent-notice">
          <p>
            <strong>Looking for Pilates classes?</strong> This section is for buying equipment.{' '}
            <Link to="/reformer-pilates-amsterdam/">Book Reformer Pilates classes in Amsterdam</Link>
            {' · '}
            <Link to="/schedule/">View class schedule</Link>
          </p>
        </div>

        <div className="equipment-content">
          <ul className="equipment-list">
            {equipment.map((item) => (
              <li key={item.name} className="equipment-item">
                <Link to={item.link} className="equipment-link">
                  <div className="equipment-media">
                    <img
                      src={item.image}
                      alt={`${item.name} Pilates Equipment`}
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {item.tag ? <span className="equipment-note">{item.tag}</span> : null}
                  <h2 className="equipment-title">{item.name}</h2>
                  <p className="equipment-desc">{item.description}</p>
                  <span className="prose-link equipment-more">Learn more</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <section className="cta-band equipment-cta-band">
          <h2>Need help choosing?</h2>
          <p>
            Compare models, review specs, and request an order for home or studio use. We can advise based on your space and goals.
          </p>
          <div className="equipment-cta-actions">
            <a href="#contact" onClick={handleContactClick} className="btn-gold">
              Contact for Order
            </a>
            <Link to="/reformer-pilates-amsterdam/" className="btn-ghost">
              Book Pilates Classes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
