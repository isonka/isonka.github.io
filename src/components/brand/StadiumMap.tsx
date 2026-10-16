export function StadiumMap({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 -30 560 390"
      role="img"
      aria-label={ariaLabel}
      className="home-stadium-map"
    >
      <rect
        x="20"
        y="40"
        width="520"
        height="280"
        rx="140"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <rect
        x="60"
        y="80"
        width="440"
        height="200"
        rx="100"
        fill="none"
        stroke="#b8ae9c"
        strokeWidth="1.5"
      />
      <rect
        x="252"
        y="8"
        width="18"
        height="40"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <path
        d="M255 0C254 -8 260 -14 264 -22C264 -14 270 -8 268 0Z"
        fill="var(--gold)"
      />
      <text
        x="261"
        y="68"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="11"
        fill="var(--ink-muted)"
      >
        Marathon Tower
      </text>
      <circle
        cx="62"
        cy="82"
        r="10"
        fill="var(--gold)"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <line
        x1="62"
        y1="82"
        x2="120"
        y2="150"
        stroke="var(--ink)"
        strokeWidth="1"
      />
      <text
        x="128"
        y="158"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fontSize="20"
        fill="var(--ink)"
      >
        PT7 · Unit 15
      </text>
      <text
        x="128"
        y="178"
        fontFamily="Poppins, sans-serif"
        fontSize="12"
        fill="var(--ink-muted)"
      >
        Upper-left corner
      </text>
    </svg>
  );
}
