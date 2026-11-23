import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import QuantityStepper from '../components/ui/QuantityStepper.jsx';
import BookCover from '../components/books/BookCover.jsx';
import OrderSummary from '../components/checkout/OrderSummary.jsx';
import AddressForm, { validateAddress, emptyAddress } from '../components/checkout/AddressForm.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { formatINR, computeTotals, useStore } from '../context/StoreContext.jsx';

export default function Cart() {
  const { cart, setQty, removeFromCart, setCheckout, giftPoints, user } = useStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState({});
  const [coupon, setCoupon] = useState({ input: '', applied: '' });
  const [couponMsg, setCouponMsg] = useState('');
  const [usePoints, setUsePoints] = useState(false);

  const pointsToUse = usePoints ? Math.min(giftPoints, computeTotals(cart, coupon.applied).total) : 0;
  const totals = computeTotals(cart, coupon.applied, pointsToUse);

  const applyCoupon = () => {
    const probe = computeTotals(cart, coupon.input);
    if (probe.couponValue > 0) { setCoupon((c) => ({ ...c, applied: c.input })); setCouponMsg('Coupon applied'); }
    else { setCoupon((c) => ({ ...c, applied: '' })); setCouponMsg('Invalid coupon (try SAVE100)'); }
  };

  const proceed = () => {
    const errs = validateAddress(address);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setCheckout({
      address, items: cart, total: totals.total, coupon: coupon.applied, pointsUsed: pointsToUse,
    });
    navigate('/payment');
  };

  if (!cart.length) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-muted">Your basket is empty.</p>
        <Button to="/">Browse the catalogue</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'Checkout' }]} />
      <h1 className="text-lg font-semibold">Shopping Cart</h1>

      <Card className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {totals.lines.map(({ book, qty }) => (
          <div key={book.id} className="flex gap-3">
            <div className="w-24 shrink-0 sm:w-28"><BookCover book={book} /></div>
            <div className="flex min-w-0 flex-1 flex-col text-xs">
              <p className="text-sm font-medium">{book.title}</p>
              <p className="text-muted">by {book.author}</p>
              <p className="mt-1 text-muted">{book.format}</p>
              <p className="mt-2 text-base font-bold">{formatINR(book.price)}</p>
              <p className="text-[11px] text-muted">Delivery by <b className="text-white">{book.delivery}</b></p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <QuantityStepper value={qty} onChange={(n) => setQty(book.id, n)} />
                <button className="text-red-400 hover:underline" onClick={() => removeFromCart(book.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card>
          <h2 className="mb-3 text-sm font-semibold">Delivery Address</h2>
          <AddressForm value={address} onChange={setAddress} errors={errors} defaultName={user?.name} />
        </Card>

        <OrderSummary totals={totals}>
          <div className="mt-3 flex gap-2">
            <input
              aria-label="Coupon code" placeholder="Apply Coupon" value={coupon.input}
              onChange={(e) => setCoupon((c) => ({ ...c, input: e.target.value }))}
              className="min-w-0 flex-1 border-b border-line bg-transparent px-1 py-1 text-xs placeholder:text-muted focus:border-brand focus:outline-none"
            />
            <Button size="sm" onClick={applyCoupon}>Apply</Button>
          </div>
          {couponMsg && <p className="mt-1 text-[11px] text-muted">{couponMsg}</p>}

          <label className="mt-3 flex items-center gap-2 text-xs">
            <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} />
            Redeem gift points ({giftPoints} available{usePoints ? `, using ${pointsToUse}` : ''})
          </label>

          <Button className="mt-4 w-full" onClick={proceed}>Pay Now 💳</Button>
        </OrderSummary>
      </div>
    </div>
  );
}
