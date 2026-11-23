export default function Rating({ value = 0, onChange, size = 'text-base' }) {
  return (
    <div className={`inline-flex items-center ${size}`} role={onChange ? 'radiogroup' : 'img'} aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        const star = (
          <span className={filled ? 'text-yellow-400' : 'text-muted'}>{filled ? '★' : '☆'}</span>
        );
        return onChange ? (
          <button key={n} type="button" onClick={() => onChange(n)} aria-label={`${n} stars`} className="px-0.5">
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}
