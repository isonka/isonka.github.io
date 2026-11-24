import { dropProofIfSent, keepProof, readProof } from './proof';

// The PT7 Academy API, for the trainee pages (academy.pt7.nl). The pages and the API share one address: Firebase
// Hosting sends /api/** to the API, and `npm run dev` forwards /api to a local API (vite.config.ts). A login is an
// HttpOnly cookie (`__session`) the browser sends by itself, which this code never sees, plus a proof it sends as a
// header (proof.ts). Every answer is { success, data } or { success: false, error }.

export class ApiError extends Error {
  readonly status: number;
  /** The API's error code or message (e.g. InvalidCredentials), or 'Unavailable' when the API could not be reached. */
  readonly code: string;

  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

type Body = { success?: boolean; data?: unknown; error?: unknown; message?: unknown };

async function call<T>(method: 'GET' | 'POST' | 'PATCH' | 'PUT', path: string, body?: unknown, proof: string | null = readProof()): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (proof !== null) headers['X-Session-Proof'] = proof;
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'Unavailable');
  }
  const json = (await res.json().catch(() => null)) as Body | null;
  if (!json) throw new ApiError(res.status, 'Unavailable'); // not the API (e.g. a host without /api)
  if (!res.ok || json.success === false) {
    const code = typeof json.error === 'string' ? json.error : typeof json.message === 'string' ? json.message : 'Error';
    throw new ApiError(res.status, code);
  }
  return json.data as T;
}

export const apiGet = <T>(path: string) => call<T>('GET', path);
export const apiPost = <T>(path: string, body: unknown = {}) => call<T>('POST', path, body);

export interface SessionHandlers {
  onEnded: () => void;
  onPasswordRequired: () => void;
}

/** True when the error was about the login itself (ended, or a password change is due) and has been handled. */
export function handleSessionError(err: unknown, handlers: SessionHandlers): boolean {
  if (!(err instanceof ApiError)) return false;
  if (err.status === 401) {
    handlers.onEnded();
    return true;
  }
  if (err.code === 'Password change required') {
    handlers.onPasswordRequired();
    return true;
  }
  return false;
}

// --- Shapes the trainee pages use (as the API answers them) ---

export interface SiteUser {
  name: string;
  email: string;
  role: string;
  mustChangePassword: boolean;
}

export interface Requirement {
  key: string;
  label: string;
  met: boolean;
  detail: string;
}

export interface CertificateStatus {
  requirements: Requirement[];
  certificate: { number: string; credential: string; issuedAt?: string } | null;
}

export interface MyExam {
  _id: string;
  examDate: string;
  overallScore: number;
  rubricName: string;
  attempt: number;
  passed: boolean;
}

export type EntryStatus = 'pending' | 'approved' | 'rejected';
export type ItemStatus = EntryStatus | 'none';
export type HourField = 'startTime' | 'apparatus' | 'sessionType' | 'clientName';

export interface LogCategory {
  key: string;
  name: string;
  required: number;
  fields: HourField[];
  staffOnly: boolean;
  approved: number;
  pending: number;
}

export interface LogEntry {
  _id: string;
  kind: 'hours' | 'homework' | 'exercise';
  category?: string;
  homework?: string;
  movement: string | null;
  mode?: 'performing' | 'teaching';
  date: string; // yyyy-MM-dd
  startTime?: string;
  hours?: number;
  apparatus?: string;
  sessionType?: 'PT' | 'Group';
  clientName?: string;
  notes: string;
  status: EntryStatus;
  signedByName?: string;
  rejectionReason?: string;
  recording: string | null;
}

export interface Logbook {
  programme: { name: string; institution: string; qttName: string; totalHours: number };
  trainee: {
    name: string;
    courseStart: string | null;
    courseEnd: string | null;
    studioAccess: { until: string | null; daysLeft: number | null };
  };
  summary: {
    categories: LogCategory[];
    countedHours: number;
    totalRequired: number;
    pendingCount: number;
    homework: { key: string; name: string; status: ItemStatus }[];
    exercises: {
      movement: { _id: string; level: number; number: number; name: string };
      performing: ItemStatus;
      teaching: ItemStatus;
    }[];
  };
  entries: LogEntry[];
}

export interface MovementSummary {
  slug: string;
  level: number;
  number: number;
  name: string;
  variationCount: number;
  coverPhotoId: string | null;
}

export interface MovementDetail {
  slug: string;
  level: number;
  number: number;
  name: string;
  setup: string;
  regression: string;
  progression: string;
  modification: string;
  contraindication: string;
  variations: { name: string; howToPerform: string }[];
  photos: { fileId: string; caption: string }[];
}

export interface TheoryAttempt {
  _id: string;
  attempt: number;
  status: 'open' | 'in_progress' | 'submitted';
  name: string;
  questionCount: number;
  timeLimitMinutes: number;
  passMark: number;
  deadline: string | null;
  score: number | null;
  correctCount: number | null;
  passed: boolean | null;
}

/** Questions only while the exam runs, and never the correct answers (the API's rule). */
export interface TheoryView extends TheoryAttempt {
  questions: { text: string; options: string[]; answer: number | null }[];
}

export interface Assessment {
  _id: string;
  date: string; // yyyy-MM-dd
  assessorName: string;
  feedback: string;
  passed: boolean | null;
  items: {
    movement: string;
    label: string;
    performing: 'passed' | 'needs_work' | null;
    teaching: 'passed' | 'needs_work' | null;
    note: string;
  }[];
}

export type ReportCell = string | number;
export interface ReportTable {
  title: string;
  head: ReportCell[];
  rows: ReportCell[][];
}

export interface MyRecording {
  _id: string;
  title: string;
  recordedAt: string;
  durationMinutes: number | null; // null while Drive is still processing the video
  creditHours: number;
  canWatch: boolean; // the video is shared with their Google account
  playerUrl: string | null;
  reflection: (LogEntry & { reflection: { cues: string; modifications: string; corrections: string } | null }) | null;
}

export interface MyRecordings {
  active: boolean; // within their observation year
  hasStartDate: boolean;
  until: string | null; // when their year ends
  watchAs: string | null; // the Google account videos are shared with
  recordings: MyRecording[];
}

export interface ExamReport {
  _id: string;
  examDate: string;
  rubricName: string;
  courseLevel: string;
  overallScore: number;
  passMark: number;
  passed: boolean;
  attempt: number;
  report: {
    summary: ReportTable; // rows: [section, weight, score]; the last row is the overall score
    sections: { title: string; tables: ReportTable[]; comments: string }[];
    finalComments: string;
  };
}

// --- Sign-in (/api/site-auth) and the own password (/api/account/password) ---

/** Only a real "nobody is signed in" drops the proof: an error or a 429 says nothing about the login. */
export async function getSession(): Promise<{ user: SiteUser } | null> {
  const sent = readProof();
  const session = await call<{ user: SiteUser } | null>('GET', '/site-auth/session', undefined, sent);
  if (session === null) dropProofIfSent(sent);
  return session;
}

export async function signIn(email: string, password: string): Promise<{ user: SiteUser }> {
  const { user, proof } = await apiPost<{ user: SiteUser; proof: string }>('/site-auth/login', { email, password });
  keepProof(proof);
  return { user };
}

export async function signOut(): Promise<void> {
  const sent = readProof();
  await call<void>('POST', '/site-auth/logout', {}, sent);
  dropProofIfSent(sent);
}

/** The API ends every other login and returns a new proof for this one. */
export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const { proof } = await apiPost<{ proof: string }>('/account/password', { currentPassword, newPassword });
  keepProof(proof);
}

// --- The trainee's own data ---

/** null when the login isn't linked to a trainee record yet. */
export const getCertificate = () => apiGet<CertificateStatus | null>('/certificate/mine');
export const getExams = () => apiGet<{ linked: boolean; exams: MyExam[] }>('/exams/mine');
export const getLogbook = () => apiGet<Logbook>('/logbook/mine');
export const createEntry = (body: Record<string, unknown>) => apiPost<LogEntry>('/logbook/entries', body);
export const updateEntry = (id: string, body: Record<string, unknown>) =>
  call<LogEntry>('PATCH', `/logbook/entries/${encodeURIComponent(id)}`, body);

export const getMovements = () => apiGet<MovementSummary[]>('/movements');
export const getMovement = (slug: string) => apiGet<MovementDetail>(`/movements/${encodeURIComponent(slug)}`);

/** A library photo, with the login's proof. Only a JPEG from the API is accepted. */
export async function getPhoto(fileId: string, signal: AbortSignal): Promise<Blob> {
  const proof = readProof();
  const res = await fetch(`/api/movement-photos/${encodeURIComponent(fileId)}`, {
    credentials: 'same-origin',
    headers: proof === null ? {} : { 'X-Session-Proof': proof },
    signal,
  });
  if (!res.ok) throw new ApiError(res.status, 'Photo');
  const blob = await res.blob();
  if (blob.type !== 'image/jpeg') throw new ApiError(res.status, 'Photo');
  return blob;
}

export const getTheoryAttempts = () => apiGet<TheoryAttempt[]>('/theory/mine');
const attemptPath = (id: string) => `/theory/attempts/${encodeURIComponent(id)}`;
export const getTheoryAttempt = (id: string) => apiGet<TheoryView>(attemptPath(id));
export const startTheory = (id: string) => apiPost<TheoryView>(`${attemptPath(id)}/start`);
export const submitTheory = (id: string) => apiPost<TheoryView>(`${attemptPath(id)}/submit`);
export const saveTheoryAnswer = (id: string, index: number, answer: number) => call<void>('PUT', `${attemptPath(id)}/answer`, { index, answer });
export const getAssessments = () => apiGet<Assessment[]>('/assessments/mine');
export const getExamReport = (id: string) => apiGet<ExamReport>(`/exams/${encodeURIComponent(id)}/report`);
export const getRecordings = () => apiGet<MyRecordings>('/recordings/mine');
const reflectionPath = (id: string) => `/recordings/${encodeURIComponent(id)}/reflection`;
export const sendReflection = (id: string, body: Record<string, unknown>) => apiPost<LogEntry>(reflectionPath(id), body);
export const updateReflection = (id: string, body: Record<string, unknown>) => call<LogEntry>('PUT', reflectionPath(id), body);

/** Sent with a new entry: if the answer gets lost and the trainee tries again, the API keeps one copy. */
export function newClientRef(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return `w${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}`;
}
