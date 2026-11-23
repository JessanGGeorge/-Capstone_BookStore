import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookCover from '../components/books/BookCover.jsx';
import BookCard from '../components/books/BookCard.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Rating from '../components/ui/Rating.jsx';
import { TextArea } from '../components/ui/Fields.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { books, getBook } from '../data/books.js';
import { formatINR, useStore } from '../context/StoreContext.jsx';

export default function BookDetail() {
  const { id } = useParams();
  const book = getBook(id);
  const { addToCart, toggleWishlist, wishlist, orders, user } = useStore();
  const [reviews, setReviews] = useState([
    { name: 'John Smith', text: 'A clear, calming read that actually changed how I approach my day.', rating: 5 },
  ]);
  const [draft, setDraft] = useState({ text: '', rating: 0 });

  if (!book) {
    return <p className="py-12 text-center text-muted">Book not found. <Link to="/" className="text-blue-400 underline">Back to catalogue</Link></p>;
  }

  // Related: same category first, then fall back to the author's/other books. Also boosted by order history.
  const boughtIds = new Set(orders.flatMap((o) => o.items.map((i) => i.id)));
  const related = books
    .filter((b) => b.id !== book.id)
    .map((b) => ({ b, score: (b.category === book.category ? 2 : 0) + (boughtIds.has(b.id) ? 0 : 1) }))
    .sort((a, c) => c.score - a.score)
    .slice(0, 3)
    .map((x) => x.b);

  const wished = wishlist.includes(book.id);

  const submitReview = () => {
    if (!draft.text.trim() || !draft.rating) return;
    setReviews((r) => [{ name: user?.name || 'Guest', ...draft }, ...r]);
    setDraft({ text: '', rating: 0 });
  };

  return (
    <div>
      <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: book.tags[0] }, { label: book.tags[1] || book.category }]} />

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <div className="grid gap-6 sm:grid-cols-[14rem_1fr]">
            <div className="mx-auto w-48 sm:w-full"><BookCover book={book} /></div>

            <div>
              <h1 className="text-xl font-semibold">{book.title}</h1>
              <p className="text-sm text-muted">by <Link to={`/writers#${encodeURIComponent(book.author)}`} className="text-blue-400 underline">{book.author}</Link></p>
              <p className="mt-2 text-sm text-muted">{book.description}</p>
              <p className="mt-3 text-xs text-muted">Published by: <span className="text-blue-400 underline">{book.publisher}</span></p>
              <p className="mt-2 text-sm">{book.format}</p>
              <p className="text-xs text-blue-400 underline">{book.tags.join(', ')}</p>

              <p className="mt-4 text-2xl font-bold">{formatINR(book.price)}</p>
              <p className="text-xs text-muted">Tentative delivery by <b className="text-white">{book.delivery}</b></p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={() => addToCart(book.id)}>Add to Cart 🛒</Button>
                <Button variant="secondary" onClick={() => toggleWishlist(book.id)} aria-pressed={wished}>
                  {wished ? 'In Wishlist ♥' : 'Add to Wishlist ♡'}
                </Button>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">
                <div><dt className="text-muted">Language</dt><dd className="text-blue-400 underline">{book.language}</dd></div>
                <div><dt className="text-muted">Rating</dt><dd><Rating value={book.rating} size="text-sm" /></dd></div>
                <div><dt className="text-muted">Sells</dt><dd>{book.sold} copies sold</dd></div>
              </dl>
            </div>
          </div>

          <section className="mt-8">
            <SectionHeading>About the writer</SectionHeading>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface-2 text-2xl font-bold">
                {book.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{book.writer.name}</p>
                <p className="text-sm text-muted">{book.writer.bio}</p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <SectionHeading>Reviews</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <TextArea
                  id="review" label={`Leave Your Review (${draft.text.length}/100)`} rows={4} maxLength={100}
                  placeholder="Placeholder text" value={draft.text}
                  onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                />
                <div className="mt-2 flex items-center justify-between">
                  <Rating value={draft.rating} onChange={(n) => setDraft((d) => ({ ...d, rating: n }))} />
                  <Button size="sm" onClick={submitReview}>Submit →</Button>
                </div>
              </div>
              <ul className="space-y-3">
                {reviews.map((r, i) => (
                  <li key={i} className="text-sm">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-muted">{r.text}</p>
                    <Rating value={r.rating} size="text-sm" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside aria-label="Related reads">
          <SectionHeading>Related Reads</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {related.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </aside>
      </div>
    </div>
  );
}
