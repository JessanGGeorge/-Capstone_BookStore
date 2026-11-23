import BookCard from '../components/books/BookCard.jsx';
import Button from '../components/ui/Button.jsx';
import { getBook } from '../data/books.js';
import { useStore } from '../context/StoreContext.jsx';

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(getBook).filter(Boolean);

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-muted">Nothing here yet.</p>
          <Button to="/">Browse books</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((b) => <BookCard key={b.id} book={b} showActions />)}
        </div>
      )}
    </div>
  );
}
