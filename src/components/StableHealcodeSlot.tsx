import { memo, useEffect, useRef } from 'react';
import { reinitHealcodeWidgets } from '../utils/healcode';
import { isPrerender } from '../utils/prerender';

type StableHealcodeSlotProps = {
  className?: string;
  html: string;
};

export const StableHealcodeSlot = memo(function StableHealcodeSlot({
  className,
  html,
}: StableHealcodeSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    // Injecting during prerender would bake the widget markup into the static
    // HTML, which React then hydrates against an empty div. The widget needs
    // the external MindBody script to do anything anyway.
    if (isPrerender()) return;

    const el = ref.current;
    if (!el || mounted.current) return;
    el.innerHTML = html;
    mounted.current = true;
    reinitHealcodeWidgets();
  }, [html]);

  return <div ref={ref} className={className} />;
});
