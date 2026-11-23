export default function SectionHeading({ children, action, className = '' }) {
  return (
    <div className={`mb-3 flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-base font-semibold sm:text-lg">{children}</h2>
      {action}
    </div>
  );
}
