import { useEffect, useRef, useState } from 'react';
import { getPhoto } from './api';

// A library photo. The API needs the login's proof header, which an <img src> can't send, so the photo is fetched and
// shown from a blob: address (allowed for images only in the page's CSP). Loaded when it comes near the screen, a few at
// a time; the browser keeps each one (the API marks them private for 30 days), so a repeat view asks the API nothing.

const MAX_AT_ONCE = 4;
let running = 0;
const waiting: (() => void)[] = [];

const acquire = () => {
  if (running < MAX_AT_ONCE) {
    running++;
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => waiting.push(resolve));
};

const release = () => {
  const next = waiting.shift();
  if (next) next(); // the slot passes on
  else running--;
};

export function MovementPhoto({ fileId, alt, className }: { fileId: string | null; alt: string; className: string }) {
  const slot = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const element = slot.current;
    if (!fileId || !element) return;
    const controller = new AbortController();
    let objectUrl: string | null = null;

    const load = async () => {
      await acquire();
      try {
        if (controller.signal.aborted) return;
        const blob = await getPhoto(fileId, controller.signal);
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } catch {
        // No photo: the empty slot stays, and the text of the page is unaffected
      } finally {
        release();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        void load();
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId]);

  return (
    <div ref={slot} className={`trainee-photo ${className}`}>
      {url && <img src={url} alt={alt} />}
    </div>
  );
}
