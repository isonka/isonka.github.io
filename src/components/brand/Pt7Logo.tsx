type Pt7LogoProps = {
  variant?: 'day' | 'evening' | 'academy';
  width?: number;
  height?: number;
  className?: string;
  title?: string;
};

const SRC: Record<NonNullable<Pt7LogoProps['variant']>, string> = {
  day: '/brand/logos/pt7-logo.svg',
  evening: '/brand/logos/pt7-logo-on-dark.svg',
  academy: '/brand/logos/pt7-academy-on-dark.svg',
};

export function Pt7Logo({
  variant = 'day',
  width = 86,
  height = 70,
  className,
  title = 'PT7',
}: Pt7LogoProps) {
  return (
    <img
      src={SRC[variant]}
      alt={title}
      width={width}
      height={height}
      className={className}
      decoding="async"
    />
  );
}
