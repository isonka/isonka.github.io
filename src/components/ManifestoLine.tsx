import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';

type ManifestoLineProps = {
  children: ReactNode;
};

function textFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join('');
  }
  return '';
}

type MaskRowProps = {
  text: string;
};

const MaskRow: FC<MaskRowProps> = ({ text }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.width = '100%';
      return;
    }

    let raf = 0;
    let maxProgress = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const start = viewH * 0.85;
      const end = viewH * 0.35;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, progress));
      if (clamped > maxProgress) maxProgress = clamped;
      fill.style.width = `${(maxProgress * 100).toFixed(2)}%`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className="manifesto-line">
      <span className="manifesto-line-content">
        <span className="manifesto-line-ghost">{text}</span>
        <span ref={fillRef} className="manifesto-line-fill" aria-hidden="true">
          <span className="manifesto-line-fill-inner">{text}</span>
        </span>
      </span>
    </span>
  );
};

export const ManifestoLine: FC<ManifestoLineProps> = ({ children }) => {
  const text = textFromChildren(children).replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root || words.length === 0) {
      setLines(text ? [text] : []);
      return;
    }

    const measure = () => {
      const wordEls = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'));
      if (wordEls.length === 0) {
        setLines([text]);
        return;
      }

      const groups: { top: number; words: string[] }[] = [];
      for (const el of wordEls) {
        const top = el.offsetTop;
        const word = el.textContent ?? '';
        const last = groups[groups.length - 1];
        if (!last || Math.abs(last.top - top) > 2) {
          groups.push({ top, words: [word] });
        } else {
          last.words.push(word);
        }
      }
      setLines(groups.map((g) => g.words.join(' ')));
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    if (root.parentElement) ro.observe(root.parentElement);
    return () => ro.disconnect();
  }, [text, words.length]);

  return (
    <span className="manifesto-block">
      <span ref={measureRef} className="manifesto-measure" aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} data-word>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
      {lines?.map((line, i) => (
        <MaskRow key={`${i}-${line}`} text={line} />
      ))}
    </span>
  );
};
