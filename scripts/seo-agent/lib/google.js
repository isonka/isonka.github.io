// Minimal Google API client: service-account JWT auth plus the two reports
// the agent needs. No googleapis dependency.

import crypto from 'crypto';

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
].join(' ');

const b64url = (buf) => Buffer.from(buf).toString('base64url');

let cachedToken = null;

export async function getAccessToken() {
  // Local runs can pass a token directly, e.g.
  // gcloud auth application-default print-access-token
  if (process.env.GOOGLE_ACCESS_TOKEN) return process.env.GOOGLE_ACCESS_TOKEN;
  if (cachedToken && cachedToken.exp > Date.now() + 60000) return cachedToken.token;

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('Set GOOGLE_SERVICE_ACCOUNT_JSON (service account key JSON) or GOOGLE_ACCESS_TOKEN.');
  const sa = JSON.parse(raw);

  const iat = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPES, aud: 'https://oauth2.googleapis.com/token', iat, exp: iat + 3600 }),
  );
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(sa.private_key);
  const assertion = `${header}.${claims}.${b64url(signature)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  cachedToken = { token: json.access_token, exp: Date.now() + json.expires_in * 1000 };
  return cachedToken.token;
}

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await getAccessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${await res.text()}`);
  return res.json();
}

// Search Console: all rows for one day, paginated.
export async function gscQuery(siteUrl, date, dimensions) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const json = await post(url, { startDate: date, endDate: date, dimensions, type: 'web', rowLimit: 25000, startRow });
    const batch = json.rows || [];
    rows.push(...batch);
    if (batch.length < 25000) break;
  }
  return rows.map((r) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d, r.keys[i]])),
    clicks: r.clicks,
    impressions: r.impressions,
    position: r.position,
  }));
}

// GA4: organic-search landing pages per day.
export async function ga4OrganicLandingPages(propertyId, startDate, endDate) {
  const json = await post(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'date' }, { name: 'landingPage' }],
    metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }, { name: 'keyEvents' }],
    dimensionFilter: {
      filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } },
    },
    limit: 100000,
  });
  return (json.rows || []).map((r) => {
    const d = r.dimensionValues[0].value;
    return {
      date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
      landingPage: r.dimensionValues[1].value,
      sessions: Number(r.metricValues[0].value),
      engagedSessions: Number(r.metricValues[1].value),
      keyEvents: Number(r.metricValues[2].value),
    };
  });
}
