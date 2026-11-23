import { useCallback, useEffect, useState } from 'react';
import { ApiError, getExamReport, handleSessionError, type ExamReport, type ReportCell, type ReportTable, type SessionHandlers } from './api';
import { s } from './strings';

// One practical exam as the finished report, read-only: score against the pass mark, score per section, every rating and
// the examiner's comments. The same tables as the app and the PDF.

const cell = (c: ReportCell | undefined) => (c === undefined || c === '' ? '-' : String(c));
const dateText = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function Table({ table }: { table: ReportTable }) {
  // When the first column is named after the table, the second column's header says what was graded
  const subtitle = table.head[0] === table.title ? cell(table.head[1]) : null;
  return (
    <div className="trainee-card">
      <p className="trainee-table-title">{table.title}</p>
      {subtitle && <p className="trainee-entry-meta trainee-tight">{subtitle}</p>}
      <dl className="trainee-rows">
        {table.rows.map(([label, value], i) => (
          <div key={i}>
            <dt>{cell(label)}</dt>
            <dd>{cell(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ExamReportScreen({ id, handlers }: { id: string; handlers: SessionHandlers }) {
  const { onEnded, onPasswordRequired } = handlers;
  const [exam, setExam] = useState<ExamReport | null>(null);
  const [error, setError] = useState<'none' | 'notFound' | 'failed'>('none');

  const load = useCallback(() => {
    setError('none');
    getExamReport(id)
      .then(setExam)
      .catch((err: unknown) => {
        if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
        setError(err instanceof ApiError && (err.status === 404 || err.status === 403) ? 'notFound' : 'failed');
      });
  }, [id, onEnded, onPasswordRequired]);

  useEffect(load, [load]);
  useEffect(() => {
    window.scrollTo(0, 0); // in a block: newer browsers return a promise here, which React would take for a clean-up
  }, []);

  const back = (
    <a className="trainee-back" href="#overview">
      ‹ {s.nav.overview}
    </a>
  );

  if (error === 'notFound') {
    return (
      <div>
        {back}
        <p className="trainee-card">{s.report.notFound}</p>
      </div>
    );
  }
  if (error === 'failed') {
    return (
      <div>
        {back}
        <div className="trainee-card">
          <p>{s.unavailable}</p>
          <button type="button" className="trainee-secondary" onClick={load}>
            {s.retry}
          </button>
        </div>
      </div>
    );
  }
  if (!exam) return <p role="status">{s.loading}</p>;

  const score = Math.round(exam.overallScore);
  const sections = exam.report.summary.rows.slice(0, -1); // the last row is the overall score, shown above

  return (
    <article>
      {back}
      <p className="kicker">{s.report.eyebrow(dateText(exam.examDate))}</p>
      <h3 className="trainee-series-title">{exam.rubricName}</h3>
      <section className="trainee-card">
        <div className="trainee-score-row">
          <strong>{score}</strong>
          <span className="trainee-entry-meta">{s.report.outOf(exam.passMark)}</span>
          <span className={`trainee-badge ${exam.passed ? 'passed' : 'not-passed'}`}>{exam.passed ? s.overview.exams.passed : s.overview.exams.notPassed}</span>
        </div>
        <span className="trainee-progress trainee-progress-mark" aria-hidden="true">
          <span style={{ width: `${Math.min(100, Math.max(0, score))}%` }} />
          <i style={{ left: `${exam.passMark}%` }} />
        </span>
        <p className="trainee-entry-meta trainee-spaced">{[exam.courseLevel, s.overview.exams.attempt(exam.attempt)].filter(Boolean).join(' · ')}</p>
      </section>

      <h3>{s.report.summary}</h3>
      <div className="trainee-card">
        <dl className="trainee-rows">
          {sections.map(([title, weight, value]) => (
            <div key={String(title)}>
              <dt>
                {cell(title)} <span className="trainee-entry-meta">{s.report.weight(cell(weight))}</span>
              </dt>
              <dd>{cell(value)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {exam.report.sections.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          {section.tables.map((table, i) => (
            <Table key={i} table={table} />
          ))}
          {section.comments && (
            <div className="trainee-card">
              <p className="trainee-table-title">{s.report.examinerComments}</p>
              <p className="trainee-comments">{section.comments}</p>
            </div>
          )}
        </section>
      ))}

      {exam.report.finalComments && (
        <section>
          <h3>{s.report.finalComments}</h3>
          <p className="trainee-card trainee-comments">{exam.report.finalComments}</p>
        </section>
      )}
    </article>
  );
}
