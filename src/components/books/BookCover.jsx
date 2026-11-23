const art = {
  target: (a) => (
    <g fill="none" stroke={a} strokeWidth="5">
      <circle cx="100" cy="150" r="34" /><circle cx="100" cy="150" r="18" /><circle cx="100" cy="150" r="4" fill={a} />
    </g>
  ),
  bulb: (a) => (
    <g>
      <circle cx="100" cy="140" r="22" fill={a} />
      <rect x="92" y="160" width="16" height="10" fill={a} />
      <path d="M50 200 L100 185 L150 200 L100 215 Z" fill="#fff" />
    </g>
  ),
  arrow: (a) => (
    <g fill={a}>
      <path d="M40 240 L110 150 L95 150 L130 100 L165 150 L150 150 L150 240 Z" opacity=".9" />
    </g>
  ),
  moon: (a) => (
    <g>
      <circle cx="100" cy="130" r="30" fill={a} opacity=".9" />
      <path d="M20 240 L50 180 L80 240 Z M80 240 L120 170 L160 240 Z" fill="#000" opacity=".35" />
    </g>
  ),
  stars: (a) => (
    <g fill={a}>
      {[[40, 120], [90, 90], [150, 130], [120, 180], [60, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 5} />
      ))}
      <path d="M70 250 Q100 170 130 250 Z" opacity=".6" />
    </g>
  ),
  rocket: (a) => (
    <g>
      <path d="M100 90 Q125 140 115 190 L85 190 Q75 140 100 90 Z" fill="#fff" />
      <circle cx="100" cy="140" r="9" fill={a} />
      <path d="M85 190 L70 215 L90 200 Z M115 190 L130 215 L110 200 Z" fill={a} />
    </g>
  ),
  arch: (a) => (
    <g>
      <circle cx="100" cy="120" r="9" fill={a} />
      <path d="M72 215 L72 165 A28 28 0 0 1 128 165 L128 215 L112 215 L112 165 A12 12 0 0 0 88 165 L88 215 Z" fill={a} />
    </g>
  ),
  paw: (a) => (
    <g fill={a}>
      <ellipse cx="100" cy="185" rx="26" ry="20" />
      <circle cx="70" cy="150" r="9" /><circle cx="92" cy="135" r="9" />
      <circle cx="116" cy="135" r="9" /><circle cx="138" cy="150" r="9" />
    </g>
  ),
};

/** Generated SVG book cover so the app has no external image dependencies. */
export default function BookCover({ book, className = '' }) {
  const { bg, fg, accent, style } = book.cover;
  return (
    <svg
      viewBox="0 0 200 280"
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
      className={`block h-auto w-full rounded-sm shadow-md ${className}`}
    >
      <rect width="200" height="280" fill={bg} />
      <text x="100" y="45" textAnchor="middle" fill={fg} fontWeight="800" fontSize="17" fontFamily="Impact, 'Arial Black', sans-serif">
        {book.title.toUpperCase().split(' ').reduce((lines, w) => {
          const last = lines[lines.length - 1];
          if (last && (last + ' ' + w).length <= 12) lines[lines.length - 1] = last + ' ' + w;
          else lines.push(w);
          return lines;
        }, []).map((line, i) => (
          <tspan key={i} x="100" dy={i === 0 ? 0 : 20}>{line}</tspan>
        ))}
      </text>
      {art[style](accent)}
      <text x="100" y="262" textAnchor="middle" fill={fg} fontSize="12" fontWeight="700" letterSpacing="1">
        {book.author.toUpperCase()}
      </text>
    </svg>
  );
}
