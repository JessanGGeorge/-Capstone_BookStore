/**
 * Generic surface container. Compose it for any "card" in the app
 * (book cards, summaries, forms, reviews...).
 */
export default function Card({ as: Tag = 'div', className = '', padded = true, hoverable = false, children, ...rest }) {
  return (
    <Tag
      className={`rounded-lg border border-line bg-surface ${padded ? 'p-4 sm:p-5' : ''} ${
        hoverable ? 'transition hover:border-brand hover:bg-surface-2' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
