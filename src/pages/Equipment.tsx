import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { equipmentProducts } from '../data/equipment';
import '../styles/Equipment.css';

const equipmentMeta: Record<string, { description: string; tag?: string }> = {
  'reformer': { description: 'The quintessential Pilates apparatus featuring a sliding carriage, springs, and straps for full-body conditioning.', tag: 'Most Popular' },
  'tower-reformer': { description: 'Combines the reformer with a tower for added vertical spring resistance and exercise variety.' },
  'cadillac': { description: 'Versatile equipment with overhead bars and springs for advanced stretching and strength work.' },
  'wunda-chair': { description: 'Compact yet powerful equipment for balance, strength, and functional movement training.' },
  'ladder-barrel': { description: 'Perfect for spinal extension, flexibility, and core strengthening exercises.' },
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

  const equipment = equipmentProducts.map(p => ({
    name: p.name,
    image: p.images[0].src,
    description: equipmentMeta[p.slug]?.description || p.shortDesc,
    link: `/equipment/${p.slug}`,
    tag: equipmentMeta[p.slug]?.tag,
  }));

  return (
    <>
      <SEOHead
        title="Buy Pilates Equipment Amsterdam | Reformers & More | PT Studio 7"
        description="Buy professional Pilates equipment in Amsterdam: Reformer (€2,200), Tower Reformer, Cadillac, Wunda Chair, and Ladder Barrel. Specs, warranty, and 3-8 week delivery in the Netherlands."
        keywords="buy pilates equipment amsterdam, pilates reformer kopen nederland, pilates equipment for sale netherlands, buy reformer amsterdam, cadillac pilates for sale, tower reformer price"
        canonical="https://www.pt7.nl/equipment"
        ogTitle="Buy Pilates Equipment Amsterdam | PT Studio 7"
        ogDescription="Transactional Pilates equipment catalog: Reformer, Tower Reformer, Cadillac, Wunda Chair, and Ladder Barrel with pricing and ordering support."
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: 'Pilates Equipment for Sale',
            itemListElement: equipmentProducts.map((product) => ({
              name: product.name,
              url: `https://www.pt7.nl/equipment/${product.slug}`,
              image: `https://www.pt7.nl${product.images[0].src}`,
            })),
          },
        }}
      />

      <div className="equipment-page">

        <div className="equipment-content">
          <div className="equipment-grid">
            {equipment.map((item) => (
              <Link 
                key={item.name} 
                to={item.link} 
                className="equipment-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {item.tag && <div className="equipment-tag">{item.tag}</div>}
                <img 
                  src={item.image} 
                  alt={`${item.name} Pilates Equipment`} 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div className="equipment-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="equipment-cta">
            <h2>Pilates Equipment for Sale in Amsterdam</h2>
            <p>Compare equipment models, review specs, and request an order for home or studio use. Need guidance? We can help you choose the right setup based on your space and goals.</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="cta-button">Book a Class</Link>
              <a href="#contact" onClick={handleContactClick} className="cta-button cta-button-secondary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

