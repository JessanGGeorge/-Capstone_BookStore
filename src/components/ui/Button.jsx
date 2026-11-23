import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-brand hover:bg-brand-hover text-white',
  secondary: 'bg-surface-2 hover:bg-line text-white',
  ghost: 'bg-transparent hover:bg-surface-2 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
};

export default function Button({
  variant = 'primary', size = 'md', to, className = '', children, ...rest
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
