import { Link } from 'react-router-dom';
import Card from '../ui/Card.jsx';
import BookCover from './BookCover.jsx';
import Button from '../ui/Button.jsx';
import { formatINR, useStore } from '../../context/StoreContext.jsx';

/**
 * Reusable book card.
 * variant="row"  -> cover left / details right (catalogue grid, related reads)
 * variant="tile" -> stacked cover on top (narrow screens / carousels)
 */
export default function BookCard({ book, variant = 'row', showActions = false }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(book.id);
  const layout = variant === 'row' ? 'flex-row' : 'flex-col';
  const coverW = variant === 'row' ? 'w-24 shrink-0 sm:w-28' : 'w-full';

  return (
    <Card padded={false} hoverable className={`flex gap-3 p-3 ${layout}`}>
      <Link to={`/book/${book.id}`} className={coverW} aria-label={`View ${book.title}`}>
        <BookCover book={book} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col text-xs">
        <Link to={`/book/${book.id}`} className="truncate text-sm font-semibold hover:underline">
          {book.title}
        </Link>
        <p className="text-muted">
          by <Link to={`/writers#${encodeURIComponent(book.author)}`} className="text-blue-400 underline">{book.author}</Link>
        </p>
        <p className="mt-1 line-clamp-2 text-muted">{book.description}</p>
        <p className="mt-2">{book.format}</p>
        <p className="text-blue-400 underline">{book.tags.join(', ')}</p>

        <div className="mt-auto pt-2">
          <p className="text-base font-bold">{formatINR(book.price)}</p>
          <p className="text-[11px] text-muted">Delivery by <b className="text-white">{book.delivery}</b></p>
        </div>

        {showActions && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={() => addToCart(book.id)}>Add to Cart</Button>
            <Button size="sm" variant="secondary" onClick={() => toggleWishlist(book.id)} aria-pressed={wished}>
              {wished ? '♥' : '♡'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
