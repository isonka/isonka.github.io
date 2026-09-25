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
      'Available for purchase for home or studio use. Sold by PT 7; not used in our client trainings.',
  },
};

export const Equipment= () => {
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
        title="Pilates Equipment at PT 7 Amsterdam | In-Studio Apparatus"
        description="Reformer, Tower Reformer, Cadillac, and Wunda Chair used in classes at PT 7, Van Baerlestraat 76C, Museumplein. Book a class at https://www.pt7.nl/schedule/. Ladder Barrel is sold separately and is not used in client sessions."
        keywords="pilates equipment amsterdam, reformer pilates equipment, tower reformer, cadillac pilates amsterdam, pilates apparatus museumplein"
        canonical="https://www.pt7.nl/equipment/"
        ogTitle="Pilates Equipment at PT 7 Amsterdam | In-Studio Apparatus"
        ogDescription="Apparatus used in classes at Museumplein. Book at pt7.nl/schedule/. Ladder Barrel is the only piece sold and not used in sessions."
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: 'Pilates Equipment at PT 7 Amsterdam',
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
          <h1>Pilates Equipment at PT 7 Amsterdam</h1>
          <p className="equipment-hero-line">
            Reformer, Tower, Cadillac, and Chair used in classes at Museumplein. Ladder Barrel is sold separately and is not used in client sessions.
          </p>
        </header>

        <div className="equipment-intent-notice">
          <p>
            <strong>Looking for Pilates classes?</strong> These machines are what we teach on.{' '}
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
                <a
                  className="equipment-quote-btn"
                  href={`mailto:info@pt7.nl?subject=${encodeURIComponent(`Quote request: ${item.name}`)}&body=${encodeURIComponent(`Hi PT 7,\n\nI would like a quote for the ${item.name}.\n\nThanks,`)}`}
                >
                  Request a quote
                </a>
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
