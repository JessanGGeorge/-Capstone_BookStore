const field =
  'w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-white placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';

export function Input({ label, id, className = '', ...rest }) {
  return (
    <label htmlFor={id} className={`block ${className}`}>
      {label && <span className="mb-1 block text-xs text-muted">{label}</span>}
      <input id={id} className={field} {...rest} />
    </label>
  );
}

export function Select({ label, id, options, className = '', ...rest }) {
  return (
    <label htmlFor={id} className={`block ${className}`}>
      {label && <span className="mb-1 block text-xs text-muted">{label}</span>}
      <select id={id} className={field} {...rest}>
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value ?? o.label;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </label>
  );
}

export function TextArea({ label, id, className = '', ...rest }) {
  return (
    <label htmlFor={id} className={`block ${className}`}>
      {label && <span className="mb-1 block text-xs text-muted">{label}</span>}
      <textarea id={id} className={`${field} resize-y`} {...rest} />
    </label>
  );
}
