import { Link, useParams } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import BookCover from '../components/books/BookCover.jsx';
import { canCancel, formatINR, useStore } from '../context/StoreContext.jsx';
import { getBook } from '../data/books.js';

export default function Confirmation() {
  const { orderId } = useParams();
  const { orders, cancelOrder } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) return <p className="py-12 text-center text-muted">Order not found. <Link className="text-blue-400 underline" to="/">Home</Link></p>;

  const cancelled = order.status === 'Cancelled';

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="text-center">
        <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${cancelled ? 'bg-red-600/20 text-red-400' : 'bg-green-600/20 text-green-400'}`}>
          {cancelled ? '✕' : '✓'}
        </div>
        <h1 className="text-base font-semibold">
          {cancelled ? 'Order Cancelled' : 'Your purchase of the following reads is successful'}
        </h1>
        <p className="mt-1 text-sm text-muted">Order <b className="text-white">{order.id}</b> · {formatINR(order.total)}</p>

        <ul className="mt-5 grid gap-4 text-left sm:grid-cols-2">
          {order.items.map((i) => {
            const book = getBook(i.id);
            if (!book) return null;
            return (
              <li key={i.id} className="flex gap-3">
                <div className="w-24 shrink-0 sm:w-28"><BookCover book={book} /></div>
                <div className="flex min-w-0 flex-1 flex-col text-xs">
                  <p className="text-sm font-medium">{book.title}</p>
                  <p className="text-muted">
                    by <Link to={`/writers#${encodeURIComponent(book.author)}`} className="text-blue-400 underline">{book.author}</Link>
                  </p>
                  <p className="mt-1 line-clamp-2 text-muted">{book.description}</p>
                  <p className="mt-2">{book.format}</p>
                  <p className="text-blue-400 underline">{book.tags.join(', ')}</p>
                  <p className="mt-auto pt-2 text-base font-bold">
                    {formatINR(book.price)}{i.qty > 1 && <span className="ml-1 text-xs font-normal text-muted">× {i.qty}</span>}
                  </p>
                  <p className="text-[11px] text-muted">Delivery by <b className="text-white">{book.delivery}</b></p>
                </div>
              </li>
            );
          })}
        </ul>

        {!cancelled && (
          <p className="mt-5 text-xs text-muted">
            {canCancel(order) ? 'You can cancel this order within 48 hours of purchase.' : 'The 48 hour cancellation window has passed.'}
          </p>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button to="/">Continue your Shopping</Button>
          <Button to="/orders" variant="secondary">My Orders</Button>
          {canCancel(order) && <Button variant="danger" onClick={() => cancelOrder(order.id)}>Cancel Order</Button>}
        </div>
      </Card>
    </div>
  );
}
