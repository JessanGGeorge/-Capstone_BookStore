import { useMemo, useState } from 'react';
import CategorySidebar from '../components/layout/CategorySidebar.jsx';
import BookCard from '../components/books/BookCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { Input, Select } from '../components/ui/Fields.jsx';
import { books, categories, languages, formats, priceRanges, sortOptions, shelves } from '../data/books.js';

export default function Catalogue() {
  const [category, setCategory] = useState('All');
  const [filters, setFilters] = useState({ q: '', language: 'All', format: 'All', price: 'All', sort: 'relevance' });
  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const filtered = useMemo(() => {
    const range = priceRanges.find((p) => p.label === filters.price);
    const q = filters.q.trim().toLowerCase();
    let list = books.filter((b) =>
      (category === 'All' || b.category === category) &&
      (filters.language === 'All' || b.language === filters.language) &&
      (filters.format === 'All' || b.format === filters.format) &&
      b.price >= range.min && b.price < range.max &&
      (!q || `${b.title} ${b.author}`.toLowerCase().includes(q))
    );
    if (filters.sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, filters]);

  // Keep shelf grouping only when sorted by relevance; otherwise show a flat sorted list.
  const grouped = filters.sort === 'relevance';

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      <CategorySidebar categories={categories} active={category} onSelect={setCategory} />

      <section className="min-w-0 flex-1" aria-label="Catalogue">
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Input id="q" label="Search you want to read here" placeholder="Search" value={filters.q} onChange={set('q')} className="sm:col-span-2 xl:col-span-1" />
          <Select id="lang" label="Language" options={languages} value={filters.language} onChange={set('language')} />
          <Select id="fmt" label="Format (Paperback, ebook etc)" options={formats} value={filters.format} onChange={set('format')} />
          <Select id="price" label="Price Range" options={priceRanges.map((p) => p.label)} value={filters.price} onChange={set('price')} />
          <Select id="sort" label="Sort by" options={sortOptions} value={filters.sort} onChange={set('sort')} />
        </div>

        {filtered.length === 0 && <p className="py-12 text-center text-muted">No books match your filters.</p>}

        {grouped
          ? shelves.map((shelf) => {
              const items = filtered.filter((b) => b.section === shelf);
              if (!items.length) return null;
              return (
                <div key={shelf} className="mb-8">
                  <SectionHeading>{shelf}</SectionHeading>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((b) => <BookCard key={b.id} book={b} />)}
                  </div>
                </div>
              );
            })
          : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          )}
      </section>
    </div>
  );
}
