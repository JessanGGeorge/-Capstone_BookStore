/**
 * Reusable category list. Vertical sidebar on lg+, horizontally scrollable chip row on small screens.
 */
export default function CategorySidebar({ categories, active, onSelect }) {
  return (
    <>
      {/* mobile / tablet */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden" role="tablist" aria-label="Categories">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => onSelect(c)}
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
              active === c ? 'border-brand bg-brand text-white' : 'border-line text-muted hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* desktop */}
      <aside className="hidden w-52 shrink-0 lg:block" aria-label="Categories">
        <ul className="sticky top-16 space-y-0.5 text-sm">
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => onSelect(c)}
                aria-current={active === c}
                className={`w-full rounded px-3 py-2 text-left text-xs transition-colors ${
                  active === c ? 'bg-surface-2 text-white' : 'text-muted hover:bg-surface hover:text-white'
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
