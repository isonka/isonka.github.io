export function TrackArt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="200 60 700 700"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        d="M216 760A684 684 0 0 1 900 76L900 138A622 622 0 0 0 278 760Z"
        fill="var(--gold)"
      />
      <g fill="none" stroke="#cfc6b6" strokeWidth="1.5">
        <path d="M650 760A250 250 0 0 1 900 510" />
        <path d="M588 760A312 312 0 0 1 900 448" />
        <path d="M526 760A374 374 0 0 1 900 386" />
        <path d="M464 760A436 436 0 0 1 900 324" />
        <path d="M402 760A498 498 0 0 1 900 262" />
        <path d="M340 760A560 560 0 0 1 900 200" />
        <path d="M278 760A622 622 0 0 1 900 138" />
      </g>
      <g
        fontFamily="Poppins, sans-serif"
        fontWeight="300"
        fontSize="30"
        textAnchor="middle"
        fill="#9a9387"
      >
        <text x="679" y="599">
          1
        </text>
        <text x="630" y="561">
          2
        </text>
        <text x="581" y="523">
          3
        </text>
        <text x="532" y="484">
          4
        </text>
        <text x="483" y="446">
          5
        </text>
        <text x="434" y="408">
          6
        </text>
        <text x="385" y="370" fill="var(--ink)" fontWeight="500">
          7
        </text>
      </g>
    </svg>
  );
}
