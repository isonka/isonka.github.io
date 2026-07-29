import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

type WebMCPContextProvider = {
  provideContext: (context: {
    tools: Array<{
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
      execute: (input: unknown) => unknown | Promise<unknown>;
    }>;
  }) => void;
};

const maybeModelContext = (navigator as Navigator & { modelContext?: WebMCPContextProvider }).modelContext;

if (maybeModelContext?.provideContext) {
  maybeModelContext.provideContext({
    tools: [
      {
        name: 'open_schedule',
        description: 'Navigate to the PT Studio 7 schedule page.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: () => {
          window.location.assign('/schedule');
          return { ok: true, navigatedTo: '/schedule' };
        }
      },
      {
        name: 'open_pricing',
        description: 'Navigate to the PT Studio 7 pricing page.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: () => {
          window.location.assign('/pricing');
          return { ok: true, navigatedTo: '/pricing' };
        }
      },
      {
        name: 'get_studio_contact',
        description: 'Return PT Studio 7 contact details.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: () => ({
          phone: '+31 685 162693',
          email: 'info@pt7.nl',
          whatsapp: 'https://wa.me/31685162693',
          address: 'Van Baerlestraat 76C, 1071BB Amsterdam'
        })
      }
    ]
  });
}

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Client-rendered SPA: clear static fallback HTML before mount (avoids Safari hydration blank screen).
rootElement.innerHTML = '';
createRoot(rootElement).render(app);
