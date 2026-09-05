import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AcademyGraduates } from '../components/AcademyGraduates';
import { AcademyInquiry } from '../components/AcademyInquiry';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { AcademyEnrollButtons } from '../components/AcademyEnrollButtons';
import {
  ACADEMY_URL_EN,
  ACADEMY_URL_NL,
  COURSE_TITLE,
  COURSE_TITLE_NL,
  ITTAP_LOGO,
  ITTAP_LOGO_ALT,
  MAT_COURSE_TITLE,
  MAT_COURSE_TITLE_NL,
  PMA_ITTAP_URL,
  PMA_LOGO,
  PMA_LOGO_ALT,
  PMA_NAME,
  PMA_URL,
  curriculumTopics,
  curriculumTopicsNl,
  formatTermSchedule,
  lectureHours,
  lectureHoursNl,
  termSchedule2026,
  termSchedule2027,
  termScheduleWinter2026,
  trainingBreakdown,
} from '../data/academy';
import {
  trackAcademyEnrollClick,
  trackAcademyInquiryClick,
  trackPageView,
} from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { useLocale } from '../i18n/useLocale';
import '../styles/Academy.css';

const academyHreflang = [
  { hreflang: 'en', href: ACADEMY_URL_EN },
  { hreflang: 'nl', href: ACADEMY_URL_NL },
  { hreflang: 'x-default', href: ACADEMY_URL_EN },
];

export const Academy= () => {
  const { t } = useTranslation('academy');
  const locale = useLocale();
  const isNl = locale === 'nl';

  const courseTitle = isNl ? COURSE_TITLE_NL : COURSE_TITLE;
  const matCourseTitle = isNl ? MAT_COURSE_TITLE_NL : MAT_COURSE_TITLE;
  const hours = isNl ? lectureHoursNl : lectureHours;
  const topics = isNl ? curriculumTopicsNl : curriculumTopics;
  const credentialName = t('certification.credentialName');
  const courseUrl = isNl ? ACADEMY_URL_NL : ACADEMY_URL_EN;

  useEffect(() => {
    trackPageView(isNl ? '/academy/nl' : '/academy', t('seo.analyticsTitle'));
    void ensureHealcodeLoaded();
  }, [isNl, t]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const enrollBtn = target.closest('.academy-enroll-btn') as HTMLElement | null;
      if (enrollBtn) {
        const paymentType = enrollBtn.classList.contains('academy-enroll-btn--installments')
          ? 'installments'
          : 'full';
        const course = (enrollBtn.dataset.course as 'reformer' | 'mat' | undefined) ?? 'reformer';
        const location = enrollBtn.dataset.location ?? 'academy_page';
        trackAcademyEnrollClick(paymentType, course, location);
        return;
      }

      const inquiryBtn = target.closest('[data-academy-inquiry]') as HTMLElement | null;
      if (inquiryBtn) {
        const course = (inquiryBtn.dataset.course as 'reformer' | 'mat' | undefined) ?? 'reformer';
        const method = (inquiryBtn.dataset.academyInquiry as 'email' | 'phone' | undefined) ?? 'email';
        const location = inquiryBtn.dataset.location ?? 'academy_page';
        trackAcademyInquiryClick(course, method, location);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const scrollToEnroll = () => {
    const enroll = document.getElementById('academy-enroll');
    if (enroll) {
      const offsetTop = enroll.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToInquiry = () => {
    const inquiry = document.getElementById('academy-inquiry');
    if (inquiry) {
      const offsetTop = inquiry.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const academyFaqs = [
    { question: t('faq.audience.question'), answer: t('faq.audience.answer') },
    {
      question: t('faq.schedule.question'),
      answer: t('faq.schedule.answer', {
        winterSchedule: formatTermSchedule(termScheduleWinter2026, isNl),
        springSchedule: formatTermSchedule(termSchedule2027, isNl),
        hours,
      }),
    },
    {
      question: t('faq.courses.question'),
      answer: t('faq.courses.answer', { courseTitle, matCourseTitle }),
    },
    { question: t('faq.duration.question'), answer: t('faq.duration.answer') },
    { question: t('faq.anatomy.question'), answer: t('faq.anatomy.answer', { courseTitle }) },
    { question: t('faq.accreditation.question'), answer: t('faq.accreditation.answer') },
    { question: t('faq.ittap.question'), answer: t('faq.ittap.answer') },
    { question: t('faq.international.question'), answer: t('faq.international.answer') },
    { question: t('faq.cost.question'), answer: t('faq.cost.answer') },
    { question: t('faq.assessments.question'), answer: t('faq.assessments.answer') },
    { question: t('faq.exerciseAssessment.question'), answer: t('faq.exerciseAssessment.answer') },
  ];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={courseUrl}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={academyHreflang}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${courseTitle} (${t('terms.autumn2026.statusLabel')})`,
            description: t('terms.autumn2026.description'),
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-09-12',
            endDate: '2026-11-08',
            schedule: t('terms.autumn2026.schedule'),
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialName,
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${courseTitle} (Winter 2026/27)`,
            description: t('terms.winter2026.description'),
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-11-21',
            endDate: '2027-01-31',
            schedule: t('terms.winter2026.schedule'),
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialName,
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${courseTitle} (${t('terms.spring2027.statusLabel')})`,
            description: t('terms.spring2027.description'),
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2027-03-13',
            endDate: '2027-05-16',
            schedule: t('terms.spring2027.schedule'),
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialName,
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <section className="academy-courses">
          <div className="academy-container">
            <div className="ittap-accreditation">
              <p className="ittap-accreditation-eyebrow">PT7 Academy · Museumplein, Amsterdam</p>
              <h1 className="academy-page-title">{t('hero.title')}</h1>
              <p className="academy-pma-subtitle">{t('hero.subtitle')}</p>
              {isNl && (
                <p className="academy-lang-note">
                  <strong>{t('hero.languageNote')}</strong>
                </p>
              )}

              <div className="academy-offer-strip" id="academy-offer">
                <div className="academy-offer-facts">
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{t('offer.nextTermLabel')}</span>
                    <span className="academy-offer-value">{t('offer.nextTermValue')}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{t('offer.formatLabel')}</span>
                    <span className="academy-offer-value">{t('offer.formatValue', { hours })}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{t('offer.feeLabel')}</span>
                    <span className="academy-offer-value">{t('offer.feeValue')}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{t('offer.installmentsLabel')}</span>
                    <span className="academy-offer-value">{t('offer.installmentsValue')}</span>
                  </div>
                </div>
                <div className="academy-offer-actions">
                  <AcademyEnrollButtons course="reformer" location="offer_strip" />
                  <button type="button" className="course-btn secondary" onClick={scrollToEnroll}>
                    {t('offer.viewScheduleBtn')}
                  </button>
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="offer_strip"
                    onClick={scrollToInquiry}
                  >
                    {t('offer.inquireBtn')}
                  </button>
                </div>
                <p className="academy-offer-note">{t('offer.note')}</p>
              </div>

              <div className="accreditation-logos">
                <div className="accreditation-logo-cell">
                  <a
                    href={PMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accreditation-logo-link"
                  >
                    <img
                      src={PMA_LOGO}
                      alt={PMA_LOGO_ALT}
                      className="pma-logo"
                      width={300}
                      height={339}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <div className="accreditation-logo-cell">
                  <a
                    href={PMA_ITTAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accreditation-logo-link"
                  >
                    <img
                      src={ITTAP_LOGO}
                      alt={ITTAP_LOGO_ALT}
                      className="ittap-logo"
                      width={394}
                      height={342}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
              <p>
                <Trans
                  ns="academy"
                  i18nKey="intro.p1"
                  values={{ courseTitle, pmaName: PMA_NAME }}
                  components={{
                    strong: <strong />,
                    pma: <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" />,
                  }}
                />
              </p>
              <p>
                <Trans
                  ns="academy"
                  i18nKey="intro.p2"
                  values={{ courseTitle, credentialName }}
                  components={{ strong: <strong /> }}
                />
              </p>
              <p>
                <Trans
                  ns="academy"
                  i18nKey="intro.p3"
                  values={{ matCourseTitle }}
                  components={{ strong: <strong /> }}
                />
              </p>
              <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                {t('intro.ittapLink')}
              </a>
            </div>

            <section className="academy-audience" aria-labelledby="academy-audience-heading">
              <p className="academy-kicker">{t('audience.kicker')}</p>
              <h2 id="academy-audience-heading">{t('audience.heading')}</h2>
              <p>{t('audience.intro')}</p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>{t('audience.careerChangers.title')}</h3>
                  <p>
                    <Trans
                      ns="academy"
                      i18nKey="audience.careerChangers.text"
                      components={{
                        guide: <Link to="/blog/career-change-banker-to-pilates-instructor/" />,
                        elif: <Link to="/trainer/elif/" />,
                      }}
                    />
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>{t('audience.weekendSchedule.title')}</h3>
                  <p>{t('audience.weekendSchedule.text', { hours })}</p>
                </div>
                <div className="benefit-card">
                  <h3>{t('audience.reformerPathway.title')}</h3>
                  <p>{t('audience.reformerPathway.text', { credentialName })}</p>
                </div>
                <div className="benefit-card">
                  <h3>Mat &amp; Trapeze Table</h3>
                  <p>{t('audience.matTrapeze.text', { matCourseTitle })}</p>
                </div>
              </div>
            </section>

            <div className="course-card featured full-width">
              <p className="course-badge">{t('courseCard.enrollingBadge')} · Winter 2026/27</p>
              <h2 className="course-card-title">{courseTitle}</h2>
              <p className="academy-course-accreditation">
                <Trans
                  ns="academy"
                  i18nKey="courseCard.accreditation"
                  values={{ pmaName: PMA_NAME, hours }}
                  components={{ strong: <strong /> }}
                />
              </p>

              <div className="academy-course-section">
                <h3>{t('courseCard.upcomingTermsTitle')}</h3>
                <p>{t('courseCard.upcomingTermsText', { hours })}</p>

                <h4 className="term-schedule-heading">
                  {t('terms.autumn2026.heading')}
                  <span className="term-schedule-status">{t('common.fullyBooked')}</span>
                </h4>
                <div className="term-schedule-grid">
                  {termSchedule2026.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">
                  {t('terms.winter2026.heading')}
                  <span className="term-schedule-status">{t('common.enrolling')}</span>
                </h4>
                <div className="term-schedule-grid">
                  {termScheduleWinter2026.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">{t('terms.spring2027.heading')}</h4>
                <div className="term-schedule-grid">
                  {termSchedule2027.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section" id="academy-enroll">
                <h3>{t('courseCard.feeTitle')}</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">{t('courseCard.standardFeeLabel')}</span>
                    <span className="price-option-amount">{t('courseCard.feeAmount')}</span>
                    <span className="price-option-note">{t('courseCard.feeVatNote')}</span>
                  </div>
                </div>
                <div className="payment-info payment-info--inline">
                  <h4>{t('courseCard.paymentOptionsTitle')}</h4>
                  <p>{t('courseCard.paymentOptionsText')}</p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">{t('courseCard.installmentsLabel')}</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">{t('courseCard.installmentsNote')}</span>
                    </div>
                  </div>
                  <p className="payment-note">{t('courseCard.paymentNote')}</p>
                </div>
                <div className="academy-enroll-action">
                  <div className="academy-enroll-buttons">
                    <AcademyEnrollButtons course="reformer" location="reformer_fee" />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>{t('courseCard.curriculumTitle')}</h3>
                <p>{t('courseCard.curriculumText')}</p>
                <h4>{t('courseCard.coreTopicsLabel')}</h4>
                <div className="knowledge-grid">
                  {topics.map((topic) => (
                    <div key={topic} className="knowledge-item">
                      ✓ {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>{t('assessment.title')}</h3>
                <p>{t('assessment.intro')}</p>
                <ul className="academy-bullet-list">
                  <li>{t('assessment.bulletTheory')}</li>
                  <li>{t('assessment.bulletPractical')}</li>
                  <li>{t('assessment.bulletExercise')}</li>
                </ul>
                <p>{t('assessment.retakeNote')}</p>
                <p>{t('assessment.mandatoryNote')}</p>
              </div>

              <div className="academy-course-section">
                <h3>{t('requirements.title')}</h3>
                <p>{t('requirements.text')}</p>
              </div>

              <div className="academy-course-section">
                <h3>{t('breakdown.title')}</h3>
                <div className="hours-breakdown-grid">
                  {trainingBreakdown.map((item) => (
                    <div key={item.label} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{isNl ? item.hoursNl : item.hours}</span>
                      <span className="hours-breakdown-label">{isNl ? item.labelNl : item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section academy-course-section--certification">
                <h3>{t('certification.title')}</h3>
                <p>{t('certification.intro')}</p>
                <ul className="academy-bullet-list">
                  <li>{t('certification.bulletExams')}</li>
                  <li>{t('certification.bulletHours')}</li>
                  <li>{t('certification.bulletAssessment')}</li>
                </ul>
                <p>
                  <Trans
                    ns="academy"
                    i18nKey="certification.awarded"
                    values={{ credentialName }}
                    components={{ strong: <strong /> }}
                  />
                </p>
              </div>

              <div className="course-cta">
                <div className="course-cta-buttons">
                  <AcademyEnrollButtons course="reformer" location="reformer_cta" />
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="reformer_cta"
                    onClick={scrollToInquiry}
                  >
                    {t('cta.inquireBtn')}
                  </button>
                </div>
                <p className="cta-subtext">{t('cta.replyNote')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">{t('why.kicker')}</p>
            <h2>{t('why.heading')}</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>{t('why.notShortcut.title')}</h3>
                <p>{t('why.notShortcut.text')}</p>
              </div>

              <div className="benefit-card">
                <h3>{t('why.weekendLectures.title')}</h3>
                <p>{t('why.weekendLectures.text', { hours })}</p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>{t('why.pmaProgram.title')}</h3>
                <p>{t('why.pmaProgram.text', { courseTitle, matCourseTitle })}</p>
              </div>

              <div className="benefit-card">
                <h3>{t('why.realStudio.title')}</h3>
                <p>{t('why.realStudio.text')}</p>
              </div>

              <div className="benefit-card">
                <h3>{t('why.assessmentPath.title')}</h3>
                <p>{t('why.assessmentPath.text', { credentialName })}</p>
              </div>

              <div className="benefit-card">
                <h3>{t('why.payment.title')}</h3>
                <p>{t('why.payment.text')}</p>
              </div>
            </div>
          </div>
        </section>

        <AcademyGraduates locale={locale} />

        <AcademyInquiry locale={locale} />

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">FAQ</p>
            <h2>{t('faqSection.heading')}</h2>
            <div className="benefits-grid">
              {academyFaqs.map((faq) => (
                <div key={faq.question} className="benefit-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-cta">
          <div className="academy-container">
            <p className="academy-kicker home-kicker-on-dark">{t('bottomCta.kicker')}</p>
            <h2>{t('bottomCta.heading')}</h2>
            <p>{t('bottomCta.text')}</p>
            <div className="cta-buttons">
              <AcademyEnrollButtons course="reformer" location="bottom_cta" variant="cta" />
              <button
                type="button"
                className="cta-btn secondary"
                data-academy-inquiry="email"
                data-course="reformer"
                data-location="bottom_cta"
                onClick={scrollToInquiry}
              >
                {t('cta.inquireBtn')}
              </button>
              <a
                href="tel:+31685162693"
                className="cta-btn secondary"
                data-academy-inquiry="phone"
                data-course="reformer"
                data-location="bottom_cta"
              >
                {t('bottomCta.call', { phone: '+31 685 162693' })}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
