import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'Is Reformer Pilates safe during pregnancy?',
    answer: 'Yes — when led by a certified instructor with prenatal expertise. At PT Studio 7, our trainers have specialized training in pregnancy Pilates. All exercises are adapted per trimester and individual needs. We avoid supine positions after 16 weeks and tailor every session to your body\'s changing demands.',
  },
  {
    question: 'How many weeks pregnant can I start?',
    answer: 'You can start pregnancy Pilates at any stage, as long as your midwife or GP has cleared you for exercise. Many clients begin in the first trimester and continue right up to week 38–40. We recommend a private intake session first so we can assess your fitness level and any specific needs.',
  },
  {
    question: 'What is the difference between a private session and a group class during pregnancy?',
    answer: 'During pregnancy we always recommend private sessions. Every pregnancy is different — different posture, different discomforts, different fitness level. In a private session your instructor can give 100% attention, modify every exercise specifically for you, and adjust the program as your pregnancy progresses. Group classes are possible in the second trimester if you already have Pilates experience.',
  },
  {
    question: 'Can I continue Pilates after giving birth?',
    answer: 'Yes, and we highly recommend it. Postnatal Pilates focuses on pelvic floor recovery, diastasis recti (abdominal separation), and rebuilding core strength. We advise waiting at least 6 weeks after a natural birth or 8–12 weeks after a C-section — and always with medical clearance. We offer postnatal private sessions that build up gradually and safely.',
  },
  {
    question: 'Do your instructors have prenatal certification?',
    answer: 'Yes. Our head trainer Elif Arzu Ogan has over 15 years of experience and has guided hundreds of pregnant and postnatal clients. Göknur Dipli also specialises in prenatal and postnatal training. Both are Polestar or Basi certified and have completed additional training in pregnancy and postnatal fitness.',
  },
  {
    question: 'Do I need prior Pilates experience to join pregnancy sessions?',
    answer: 'No prior experience is needed. Complete beginners are very welcome. We start with an intake to understand your background and goals, and then build a safe program from scratch. If you already have Pilates experience we build on that foundation.',
  },
];

export const PregnancyPilates: React.FC = () => {
  useEffect(() => {
    trackPageView('/pregnancy-pilates-amsterdam', 'Pregnancy Pilates Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Pregnancy & Prenatal Pilates Amsterdam | PT Studio 7"
        description="Specialist pregnancy and prenatal Pilates at Museumplein Amsterdam. Private sessions with certified instructors — 15+ years prenatal expertise. Safe, tailored training every trimester."
        keywords="zwangerschap pilates amsterdam, pregnancy pilates amsterdam, prenatale pilates, pilates tijdens zwangerschap, pilates museumplein zwanger, prenatal pilates amsterdam, postnatale pilates amsterdam, zwanger pilates oud-zuid"
        canonical="https://www.pt7.nl/pregnancy-pilates-amsterdam"
        ogTitle="Pregnancy & Prenatal Pilates Amsterdam | PT Studio 7"
        ogDescription="Specialist prenatal Pilates at Museumplein. Private sessions with 15+ years pregnancy expertise. Train safely throughout every trimester."
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs }}
      />
      <Breadcrumbs items={[{ name: 'Pregnancy Pilates Amsterdam', path: '/pregnancy-pilates-amsterdam' }]} />

      <div className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>Pregnancy & Prenatal Pilates Amsterdam</h1>
            <p>
              Begeleide Reformer Pilates voor zwangere vrouwen — veilig, effectief en volledig
              afgestemd op jouw lichaam en trimester. Bij PT Studio 7 op het Museumplein.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">15+ jaar ervaring</span>
              <span className="service-badge">Polestar & Basi gecertificeerd</span>
              <span className="service-badge">Privé sessies</span>
              <span className="service-badge">Museumplein Amsterdam</span>
            </div>
            <Link to="/schedule" className="service-hero-btn">Book a Session</Link>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Pilates tijdens en na de zwangerschap</h2>
            <p>
              Zwanger zijn brengt grote veranderingen met zich mee: je houding verschuift, je bekken
              beweegt, je core staat onder druk. Reformer Pilates is een van de beste bewegingsvormen
              die je kunt doen tijdens de zwangerschap — mits begeleid door een instructor met echte
              prenatale expertise.
            </p>
            <p>
              Bij PT Studio 7 werken we al meer dan 15 jaar met zwangere en postnatale cliënten.
              Hoofdtrainer Elif Arzu Ogan heeft honderden vrouwen begeleid van het eerste trimester
              tot ver na de bevalling — ook bij complicaties zoals symfysiolysis, bekkenpijn of
              diastasis recti. Elk programma wordt volledig op maat gemaakt: geen standaard les,
              maar een sessie die écht aansluit bij waar jij op dat moment staat.
            </p>
            <p>
              De vering van de Reformer geeft precies de juiste ondersteuning en weerstand. We
              werken aan bekkenbodemkracht, rugstabiliteit, houding en ademhaling — allemaal
              essentieel voor een comfortabele zwangerschap en een soepele bevalling. Onze
              instructeurs weten precies welke oefeningen veilig zijn per trimester en welke
              aanpassingen nodig zijn naarmate de zwangerschap vordert.
            </p>
            <p>
              Na de bevalling helpt Pilates je om op een veilige manier terug te komen: pelvic
              floor herstel, het sluiten van een eventuele buiksplijtingeen en het opbouwen van
              functionele kracht — stap voor stap, op jouw tempo.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Waarom kiezen voor PT Studio 7?</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>Echte prenatale expertise</h3>
                <p>Onze instructeurs zijn gespecialiseerd in zwangerschap en postnatal fitness — geen algemene kennis, maar jarenlange praktijkervaring met tientallen gevallen per jaar.</p>
              </div>
              <div className="service-benefit-card">
                <h3>100% op maat</h3>
                <p>Elke sessie wordt aangepast aan jouw trimester, klachten en fitnessniveau. Rugpijn, bekkenpijn of symfysiolysis? Wij passen het programma direct aan.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Privé sessies</h3>
                <p>Tijdens de zwangerschap werken we het liefst in privé sessies, zodat de instructor zich volledig op jou kan richten. Duo-sessies met een vriendin of partner zijn ook mogelijk.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Professionele apparatuur</h3>
                <p>We werken met professionele Reformers, de Tower Reformer en Cadillac — ideaal voor zachte, gecontroleerde bewegingen met de juiste ondersteuning.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Continuïteit</h3>
                <p>Dezelfde instructor begeleidt je van de eerste sessie zwanger tot maanden na de bevalling. Jouw instructeur kent jouw lichaam en geschiedenis.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Centrale locatie</h3>
                <p>Gelegen aan de Van Baerlestraat 76C, pal bij het Museumplein — goed bereikbaar vanuit heel Amsterdam Oud-Zuid, De Pijp en de Rivierenbuurt.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Onze instructeurs</h2>
            <p>Twee van onze instructeurs zijn gespecialiseerd in prenatale en postnatale Pilates:</p>
            <div className="service-trainers-strip">
              <Link to="/trainer/elif" className="service-trainer-card">
                <img src="/assets/images/elif.webp" alt="Elif Arzu Ogan" loading="lazy" width="60" height="60" />
                <div>
                  <h3>Elif Arzu Ogan</h3>
                  <p>Owner & Head Trainer · Polestar Pilates · 15+ jaar zwangerschapservaring</p>
                </div>
              </Link>
              <Link to="/trainer/goknur" className="service-trainer-card">
                <img src="/assets/images/goknur.webp" alt="Göknur Dipli" loading="lazy" width="60" height="60" />
                <div>
                  <h3>Göknur Dipli</h3>
                  <p>Senior Polestar Pilates · Prenatal & postnatal specialist</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Veelgestelde vragen</h2>
            <div className="service-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="service-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta-section">
          <h2>Klaar om te beginnen?</h2>
          <p>
            Boek een privé intake sessie en ontdek hoe Pilates jouw zwangerschap comfortabeler
            maakt — en hoe we je na de bevalling veilig weer sterk maken.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule" className="service-cta-btn-primary">Book a Session</Link>
            <a href="mailto:info@pt7.nl" className="service-cta-btn-secondary">Ask a Question</a>
          </div>
        </section>
      </div>
    </>
  );
};
