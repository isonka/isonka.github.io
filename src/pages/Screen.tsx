import { SEOHead } from '../components/SEOHead';
import '../styles/Screen.css';

const OFFERS = [
  { pack: 5, free: 1 },
  { pack: 10, free: 2 },
  { pack: 20, free: 4 },
] as const;

export const Screen = () => {
  return (
    <>
      <SEOHead
        title="PT7"
        description="PT7 studio display."
        keywords="PT7"
        canonical="https://www.pt7.nl/screen/"
        robots="noindex, nofollow"
        ogTitle="PT7"
        ogDescription="PT7 studio display."
      />
      <div className="screen-display">
        <header className="screen-top">
          <p className="screen-brand">
            PT<span>7</span>
          </p>
          <p className="screen-kicker">Black Friday</p>
        </header>

        <h1 className="screen-display-title">Free classes</h1>

        <ul className="screen-offers">
          {OFFERS.map((offer) => (
            <li key={offer.pack}>
              <span className="screen-pack">{offer.pack}</span>
              <span className="screen-plus">+{offer.free}</span>
              <span className="screen-free">free</span>
            </li>
          ))}
        </ul>

        <div className="screen-rail" aria-hidden="true">
          <span className="screen-carriage" />
        </div>

        <p className="screen-scope">Group · Private · Couple</p>
        <p className="screen-scope-nl">Groep · Privé · Duo · dezelfde prijs</p>
      </div>
    </>
  );
};
