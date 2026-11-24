import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';
import '../styles/Privacy.css';
import { MediumTail } from '../components/MediumTail';
import { ACADEMY_TERMS_PATH, BASE_URL } from '../data/business';

const TITLE = 'Academy Terms & Conditions | PT7 Pilates Amsterdam';
const DESCRIPTION =
  'Terms for PT7 Academy courses: enrollment, payment, 14-day cooling-off period, cancellation and refunds, missed weekends, exams and changes by PT7.';

/** PT7 Academy Terms & Conditions. English only: the course is taught in English. */
export const AcademyTerms = () => {
  useEffect(() => {
    trackPageView(ACADEMY_TERMS_PATH, TITLE);
  }, []);

  const email = <a href="mailto:info@pt7.nl">info@pt7.nl</a>;

  return (
    <>
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        keywords="PT7 Academy terms, pilates instructor course cancellation, pilates teacher training refund policy"
        canonical={`${BASE_URL}${ACADEMY_TERMS_PATH}`}
        ogTitle={TITLE}
        ogDescription={DESCRIPTION}
        htmlLang="en"
        ogLocale="en_US"
      />
      <Breadcrumbs
        items={[
          { name: 'Academy', path: '/academy/' },
          { name: 'Terms & Conditions', path: ACADEMY_TERMS_PATH },
        ]}
      />

      <div className="service-page privacy-page">
        <section className="service-hero is-in">
          <div className="service-hero-content">
            <h1><MediumTail text="PT7 Academy Terms & Conditions" /></h1>
            <p>Last updated September 20, 2026</p>
          </div>
        </section>

        <article className="privacy-prose">
          <p>
            These terms apply to every enrollment in a PT7 Academy course, provided by PT Studio 7 B.V., Van
            Baerlestraat 76C, 1071 BB Amsterdam (KvK 87751038). By enrolling, you accept them.
          </p>

          <h2>1. Enrollment and payment</h2>
          <ul>
            <li>
              On enrollment you pay <strong>€500 + VAT</strong>: a €100 + VAT Administration Fee and a €400 + VAT Deposit. Both are part
              of the course fee, not on top of it: if you pay in full or pay your first installment at enrollment,
              the €500 + VAT is included in that payment.
            </li>
            <li>
              The Administration Fee covers enrollment, intake and your course materials (digital manual and
              academy.pt7.nl access). It is non-refundable, except when you withdraw within the 14-day
              cooling-off period before you have attended a lecture day (section 2).
            </li>
            <li>
              The balance is paid either in full or in installments, as agreed at enrollment.
            </li>
            <li>Your enrollment is final once we confirm it by email.</li>
            <li>If the balance is not paid on time, we may refuse access to the course until it is paid.</li>
          </ul>

          <h2>2. 14-day cooling-off period</h2>
          <p>
            This applies if you enroll as a private person (not as a business) online, by email or by phone. You can
            change your mind within 14 days, without giving a reason. The 14 days start the day after we confirm your
            enrollment by email.
          </p>
          <ul>
            <li>
              <strong>You have not attended a lecture day yet:</strong> you get a full refund of everything you paid,
              including the Administration Fee.
            </li>
            <li>
              <strong>You have attended one or more lecture days:</strong> you pay for the lecture days held plus the
              €100 + VAT Administration Fee, and get the rest back. For example, if you withdraw after 1 of the 8
              lecture days, you pay €250 + VAT for that day plus the Administration Fee: €350 + VAT in total.
            </li>
          </ul>
          <p>
            If the course starts within your 14 days, we ask you at enrollment to confirm that you want to start
            straight away.
          </p>
          <p>
            To withdraw, email {email} before the 14 days are over, with your name, the course and its start date. We
            refund you within 14 days, at no cost to you. After the 14 days, section 3 applies.
          </p>

          <h2>3. Cancellation by the student</h2>
          <p>After the cooling-off period, these terms apply:</p>
          <table className="terms-table">
            <thead>
              <tr>
                <th scope="col">When you cancel</th>
                <th scope="col">What you get back</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30 days or more before the first lecture weekend</td>
                <td>Everything paid, minus the €100 + VAT Administration Fee</td>
              </tr>
              <tr>
                <td>10–29 days before the first lecture weekend</td>
                <td>Everything paid, minus the €500 + VAT (Administration Fee + Deposit)</td>
              </tr>
              <tr>
                <td>Less than 10 days before, or after the course has started</td>
                <td>No refund; the full course fee remains due, whether or not you attend</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              <strong>Credit instead of refund:</strong> any amount you do not get back (except the Administration
              Fee) stays available as credit for another PT7 Academy course starting within 12 months of your original
              start date. One transfer per enrollment.
            </li>
            <li>
              <strong>Medical emergency:</strong> only a medical emergency is considered for a late cancellation, case
              by case, with a doctor’s note. It must be reported before the lecture weekend it concerns.
            </li>
            <li>
              <strong>Removal:</strong> if we remove you from the course for serious misconduct, no refund is given.
            </li>
          </ul>

          <h2>4. Missed lecture weekends</h2>
          <p>
            You are expected to attend all lecture weekends in full. If you cannot attend, you can follow the classes
            through online observation. Not attending is your choice and no fee is charged for it.
          </p>

          <h2>5. Assessment Day, exams and retakes</h2>
          <ul>
            <li>The course fee includes one theory exam and one practical exam.</li>
            <li>
              The Exercise Assessment Day (€250 incl. VAT) can be cancelled free of charge up to 6 weeks before the
              date. Within 6 weeks, or no-show: no refund.
            </li>
            <li>Exam retakes are charged separately, per exam.</li>
            <li>
              Studio use for observation, self practice and teaching practice is valid for 12 months from the course
              start. Unused hours expire.
            </li>
          </ul>

          <h2>6. Changes or cancellation by PT7</h2>
          <ul>
            <li>
              We confirm each course at the latest 2 weeks before the first lecture weekend. Please book travel and
              accommodation only after confirmation, and choose refundable options.
            </li>
            <li>
              We may postpone, combine or reschedule a course or change the educator. You may then accept the new
              dates or transfer for free to another cohort.
            </li>
            <li>If we cancel a course without offering a replacement, you get a full refund of everything paid.</li>
            <li>
              PT7 is not liable for travel, accommodation or other costs caused by changes to schedule, location or
              educator.
            </li>
          </ul>

          <h2>7. How to cancel and contact</h2>
          <ul>
            <li>
              Cancellations and transfers must be requested in writing at {email}. The date we receive your
              email counts.
            </li>
            <li>
              Refunds are paid within 30 days of your written request, to the account you paid from. Bank transfer
              costs are for the student. A withdrawal within the 14-day cooling-off period is refunded within 14 days,
              without costs.
            </li>
          </ul>
          <p>PT Studio 7 B.V. · Van Baerlestraat 76C, 1071 BB Amsterdam · {email} · KvK 87751038</p>
        </article>
      </div>
    </>
  );
};
