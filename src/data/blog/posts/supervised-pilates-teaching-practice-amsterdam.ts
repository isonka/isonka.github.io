import type { BlogPost } from '../types.ts';
import { studioStreet } from '../../business.ts';

export const post: BlogPost = {
  id: '20',
  slug: 'supervised-pilates-teaching-practice-amsterdam',
  title: 'How Teaching Practice Is Supervised at PT7 Academy',
  seoTitle: 'Supervised Pilates Teaching Practice | PT7',
  excerpt:
    'At PT7 Academy, 50 hours sit with a master trainer, a lead trainer checks the assessment, and the studio is free for practice for a year. Other Dutch pages often count hours you arrange yourself, and several never name who watches them.',
  content: `
      <p>On the Reformer course at PT7 Academy, supervision means a trainer is responsible while you teach or while you are checked. Logging hours, or watching someone else’s class, counts toward the 300 hours. It is not the same as being watched.</p>

      <h2>How the 300 hours are split</h2>
      <p>The course at ${studioStreet} is:</p>
      <ul>
        <li>85 hours of lecture and theory</li>
        <li>60 hours of observation</li>
        <li>60 hours of self-practice</li>
        <li>40 hours of teaching practice</li>
        <li>40 hours of private or group sessions with a master trainer</li>
        <li>10 hours of assisted teaching with a master trainer</li>
        <li>5 hours of QTT observation of the student teaching, and assessment</li>
      </ul>
      <p>The watched layer is the master-trainer sessions, the assisted teaching, the QTT observation, and the mandatory exercise assessment. A lead trainer reviews that assessment. You perform the Reformer exercises from the course and instruct another person while you are observed. The course lead is <a href="/trainer/elif/">Elif Arzu Ogan</a>. Her name and role are on the <a href="/blog/who-teaches-pilates-instructor-course-amsterdam/">teacher article</a>.</p>
      <p>Observation, self-practice, and teaching practice in the studio are free for one year from the start date. You do not buy a class pack to fill those hours. The first attempt at the theory exam and the first attempt at the practical exam are included in the course fee. The exercise assessment is separate, at €250 including BTW. What else the fee does and does not cover is in <a href="/blog/pilates-instructor-course-fee-what-is-included/">what the course fee covers</a>.</p>

      <h2>What other pages count as practice</h2>
      <p>We used the same public pages as the teacher article. The difference that matters here is where the practice hours happen, and whether a named trainer is attached to them.</p>
      <p>The 8-day intensive in Amsterdam says you get feedback on your teaching during the course and a practical exam on the last day. The studio time included with the fee is six classes for your own practice. The page does not publish a block of hours with a master trainer, and it does not say the studio stays available for teaching practice after the eight days.</p>
      <p>The six-weekend mat course in Utrecht is explicit about hours outside the classroom. After the 12 training days, each student still needs 18 hours of self-practice, 10 hours of observation, and 12 hours of practice teaching. Eight of those teaching hours are with at least two separate clients. Four are a group of eight or more. The page names the teacher of the weekends. It does not say that teacher watches the 12 practice-teaching hours, and it does not include a free year of studio time to complete them.</p>
      <p>The 50-hour course is three weekends in a small group, with the teacher named. It does not publish observation hours, teaching hours with a supervisor, or studio access after the weekends.</p>
      <p>The Amsterdam host studio’s full-apparatus page sets minimums the student completes around the 12 contact days: at least 200 hours of self-training, including training at home and with classmates; at least 100 hours observing mat and apparatus sessions taught by a certified teacher of that method, in any location, with up to half of those hours allowed online; and at least 200 hours of teaching. Teaching classmates is allowed. Teaching family or friends is allowed and is stated as not taking place in the host studio. Teaching your own clients later is also outside that studio. The page says you receive guidance from experienced teachers. It does not name those teachers, and it does not say they observe the 200 teaching hours.</p>
      <p>Full-apparatus enrollment pages in other cities do publish an hour split, including observation and apprentice teaching, and some schedule sign-off sessions before the exam. They also tell students to arrange observation and practice themselves during the week, on the order of a few hours of each. The person who would sign that practice is not named on the enrollment page. A class-pack discount, where a page offers one, is a reduced price for studio time. It is not the same as the hours being free.</p>

      <p>A large number of “teaching hours” on a page can mean hours you teach your friends, at home, with nobody from the course in the room. The question to ask is how many hours you teach while a trainer from that course is watching, where those hours happen, who pays for the studio, and whether the person who taught your weekend is the person who assesses you.</p>

      <p><em>The full pathway is on the <a href="/academy/">Academy page</a>.</em></p>
    `,
  author: 'PT7 Team',
  date: '2026-10-31',
  image: '/assets/images/reformer_1.webp',
  tags: ['PT7 Academy', 'Teacher Training', 'Supervision'],
  metaDescription:
    'PT7 Academy puts 50 hours with a master trainer and keeps the studio free for practice for a year. Other Dutch pages we read count hours students arrange themselves.',
  keywords: [
    'supervised pilates teacher training',
    'pilates teacher training observation hours',
    'pt7 academy 300 hours',
    'teaching practice pilates amsterdam',
    'reformer instructor course supervision',
  ],
  faqs: [
    {
      question: 'How many hours at PT7 Academy are with a master trainer?',
      answer:
        'The 300-hour Reformer course includes 40 hours of private or group sessions with a master trainer, 10 hours of assisted teaching with a master trainer, and 5 hours of QTT observation and assessment. A lead trainer also reviews the mandatory exercise assessment.',
    },
    {
      question: 'Do other Dutch courses include supervised teaching hours?',
      answer:
        'The pages we read rarely publish a watched block like that. One Utrecht mat course names 12 hours of practice teaching that you arrange with your own clients. One Amsterdam full-apparatus host page asks for at least 200 teaching hours, including family and friends, and says those hours are not in the host studio. The teacher who would watch them is not named.',
    },
  ],
};
