// The PT7 Academy API, for the trainee pages (/academy/trainee/). The site and the API share one address: Firebase
// Hosting sends /api/** to the API, and `npm run dev` forwards /api to a local API (vite.config.ts). The login is an
// HttpOnly cookie (`__session`) the browser sends by itself; this code never sees it.
// Every answer is { success, data } or { success: false, error }.

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

async function call<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: body === undefined ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
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

// --- Sign-in (/api/site-auth) and the own password (/api/account/password) ---

export const getSession = () => apiGet<{ user: SiteUser } | null>('/site-auth/session');
export const signIn = (email: string, password: string) => apiPost<{ user: SiteUser }>('/site-auth/login', { email, password });
export const signOut = () => apiPost<void>('/site-auth/logout');
export const changePassword = (currentPassword: string, newPassword: string) =>
  apiPost<void>('/account/password', { currentPassword, newPassword });

// --- The trainee's own data ---

/** null when the login isn't linked to a trainee record yet. */
export const getCertificate = () => apiGet<CertificateStatus | null>('/certificate/mine');
export const getExams = () => apiGet<{ linked: boolean; exams: MyExam[] }>('/exams/mine');
