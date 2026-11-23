export default function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center border-b border-line text-sm">
      <span className="w-8 text-center">{value}</span>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className="px-2 py-1 hover:bg-surface-2"
      >
        −
      </button>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="border-l border-line px-2 py-1 hover:bg-surface-2"
      >
        +
      </button>
    </div>
  );
}
