import type { Assessment, TheoryAttempt } from './api';
import { dayText } from './logbookText';
import { theoryHref } from './route';
import { s } from './strings';

// Parts of the overview: what the trainee must do now, the theory exam's status and the exercise assessment results.

const running = (attempts: TheoryAttempt[]) => attempts.find((a) => a.status !== 'submitted');

export function ToDo({ attempts }: { attempts: TheoryAttempt[] }) {
  const exam = running(attempts);
  if (!exam) return null;
  return (
    <section className="trainee-card trainee-card-done">
      <h3>{s.overview.toDo}</h3>
      <a className="trainee-todo" href={theoryHref(exam._id)}>
        <span className="trainee-entry-main">{exam.status === 'open' ? s.overview.theoryReady : s.overview.theoryInProgress}</span>
        <span className="trainee-entry-meta">{s.overview.theoryReadyMeta}</span>
      </a>
    </section>
  );
}

/** The running attempt, else the passed one, else the latest (the API sends the newest first). */
function theoryStatus(attempts: TheoryAttempt[]) {
  const open = running(attempts);
  if (open) return { attempt: open, text: open.status === 'open' ? s.overview.statusReady : s.overview.statusInProgress, passed: false };
  const passed = attempts.find((a) => a.passed);
  if (passed) return { attempt: passed, text: s.overview.statusPassedScore(passed.score ?? 0), passed: true };
  return { attempt: attempts[0], text: s.overview.exams.notPassed, passed: false };
}

export function TheoryRow({ attempts }: { attempts: TheoryAttempt[] }) {
  if (attempts.length === 0) return null;
  const { attempt, text, passed } = theoryStatus(attempts);
  return (
    <a className="trainee-theory-row" href={theoryHref(attempt._id)}>
      <span className="trainee-series-text">
        <span className="trainee-entry-main">{s.overview.theoryExam}</span>
        <span className="trainee-entry-meta">{s.overview.theoryMeta}</span>
      </span>
      <span className={`trainee-badge ${passed ? 'passed' : 'not-passed'}`}>{text}</span>
    </a>
  );
}

export function AssessmentResults({ list }: { list: Assessment[] }) {
  if (list.length === 0) return null;
  return (
    <section className="trainee-card">
      <h3>{s.assessment.title}</h3>
      <ul className="trainee-entries">
        {list.map((a) => {
          const work = a.items.filter((i) => i.performing === 'needs_work' || i.teaching === 'needs_work');
          return (
            <li key={a._id} className="trainee-assessment">
              <div className="trainee-entry">
                <div>
                  <span className="trainee-entry-main">{dayText(a.date)}</span>
                  <span className="trainee-entry-meta">{a.assessorName || s.assessment.leadTrainer}</span>
                </div>
                <span className={`trainee-badge ${a.passed ? 'passed' : 'not-passed'}`}>{a.passed ? s.overview.exams.passed : s.overview.exams.notPassed}</span>
              </div>
              {a.feedback && <p className="trainee-comments">{a.feedback}</p>}
              {work.length > 0 && (
                <div>
                  <p className="trainee-table-title">{s.assessment.toWorkOn}</p>
                  <ul className="trainee-work">
                    {work.map((i) => (
                      <li key={i.movement}>
                        {i.label}: {[i.performing === 'needs_work' && s.assessment.performing, i.teaching === 'needs_work' && s.assessment.teaching].filter(Boolean).join(s.assessment.and)}
                        {i.note && ` — ${i.note}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
