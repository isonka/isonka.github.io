import { memo, useEffect, useRef } from 'react';

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
    const el = ref.current;
    if (!el || mounted.current) return;
    el.innerHTML = html;
    mounted.current = true;
  }, [html]);

  return <div ref={ref} className={className} />;
});
