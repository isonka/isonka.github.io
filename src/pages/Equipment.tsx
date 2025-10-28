import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Equipment.css';

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
  const equipment = [
    {
      name: 'Reformer',
      image: '/assets/images/reformer.jpg',
      description: 'The quintessential Pilates apparatus featuring a sliding carriage, springs, and straps for full-body conditioning.',
      link: '/equipment/reformer',
      tag: 'Most Popular',
    },
    {
      name: 'Tower Reformer',
      image: '/assets/images/tower_reformer.jpg',
      description: 'Combines the reformer with a tower for added vertical spring resistance and exercise variety.',
      link: '/equipment/tower-reformer',
    },
    {
      name: 'Cadillac',
      image: '/assets/images/cadillac.jpg',
      description: 'Versatile equipment with overhead bars and springs for advanced stretching and strength work.',
      link: '/equipment/cadillac',
    },
    {
      name: 'Wunda Chair',
      image: '/assets/images/wunda_chair.jpg',
      description: 'Compact yet powerful equipment for balance, strength, and functional movement training.',
      link: '/equipment/wunda-chair',
    },
    {
      name: 'Ladder Barrel',
      image: '/assets/images/ladder_barrel.jpg',
      description: 'Perfect for spinal extension, flexibility, and core strengthening exercises.',
      link: '/equipment/ladder-barrel',
    },
  ];

  return (
    <>
      <SEOHead
        title="Professional Pilates Equipment | PT Studio 7 Museumplein Amsterdam"
        description="State-of-the-art Pilates equipment at PT Studio 7 Museumplein: Reformers, Tower Reformer, Cadillac, Wunda Chair, Ladder Barrel. Professional-grade apparatus for sale. Expert trainers. Premium Amsterdam location."
        keywords="Pilates equipment Amsterdam, reformer Pilates Amsterdam, Cadillac Pilates, Wunda Chair, Tower Reformer, Ladder Barrel, professional Pilates apparatus, Pilates equipment for sale Amsterdam, studio equipment Museumplein"
        canonical="https://www.ptstudio7amsterdam.nl/equipment"
        ogTitle="Professional Pilates Equipment | PT Studio 7 Museumplein"
        ogDescription="Experience and purchase professional-grade Pilates equipment. Reformers, Towers, Cadillac, Wunda Chair. Studio-quality apparatus in Amsterdam's premier Museumplein location."
      />

      <div className="equipment-page">
        <div className="equipment-hero">
          <h1>Our Equipment</h1>
          <p>Explore our range of top-quality Pilates equipment, designed to enhance your practice—whether you're a home user or a professional studio, gym, or wellness business. We supply both individuals and businesses with studio-grade equipment and expert support.</p>
        </div>

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
                <img src={item.image} alt={item.name} />
                <div className="equipment-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="equipment-cta">
            <h2>Experience Premium Equipment</h2>
            <p>Book a session and discover the difference professional-grade equipment makes in your training. Or contact us to purchase equipment for your home or studio.</p>
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

