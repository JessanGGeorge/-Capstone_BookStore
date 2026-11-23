import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import BookCover from '../components/books/BookCover.jsx';
import { canCancel, formatINR, useStore } from '../context/StoreContext.jsx';
import { getBook } from '../data/books.js';

export default function Orders() {
  const { orders, addToCart, cancelOrder } = useStore();
  const badge = { Delivered: 'bg-green-600/20 text-green-400', Confirmed: 'bg-blue-600/20 text-blue-400', Cancelled: 'bg-red-600/20 text-red-400' };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <h1 className="text-lg font-semibold">My Orders</h1>
      {orders.length === 0 && <p className="text-muted">No orders yet.</p>}
      {orders.map((o) => (
        <Card key={o.id}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-xs text-muted">{new Date(o.placedAt).toLocaleDateString()} · {formatINR(o.total)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${badge[o.status] || ''}`}>{o.status}</span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {o.items.map((i) => {
              const b = getBook(i.id);
              if (!b) return null;
              return (
                <li key={i.id} className="flex gap-3">
                  <div className="w-16 shrink-0"><BookCover book={b} /></div>
                  <div className="text-xs">
                    <p className="text-sm font-medium">{b.title}</p>
                    <p className="text-muted">Qty {i.qty}</p>
                    <Button size="sm" className="mt-2" onClick={() => addToCart(b.id)}>Buy it Again</Button>
                  </div>
                </li>
              );
            })}
          </ul>

          {canCancel(o) && (
            <div className="mt-3 text-right">
              <Button size="sm" variant="danger" onClick={() => cancelOrder(o.id)}>Cancel Order (within 48 hrs)</Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
