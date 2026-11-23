import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Fields.jsx';
import { paymentMethods } from '../data/books.js';
import { computeTotals, formatINR, useStore } from '../context/StoreContext.jsx';

const FIELDS = {
  'Credit Card': [['number', 'Card Number', 'XXXX-XXXX-XXXX-XXXX', /^\d{16}$/], ['name', 'Name on Card', 'Name', /\S/], ['cvv', 'CVV', 'XXX', /^\d{3}$/], ['exp', 'Date of Expiry', 'MM/YYYY', /^(0[1-9]|1[0-2])\/\d{4}$/]],
  'Debit card': [['number', 'Card Number', 'XXXX-XXXX-XXXX-XXXX', /^\d{16}$/], ['name', 'Name on Card', 'Name', /\S/], ['cvv', 'CVV', 'XXX', /^\d{3}$/], ['exp', 'Date of Expiry', 'MM/YYYY', /^(0[1-9]|1[0-2])\/\d{4}$/]],
  UPI: [['upi', 'UPI ID', 'name@bank', /^[\w.-]+@[\w-]+$/]],
  Wallet: [['wallet', 'Wallet Mobile Number', '10-digit number', /^\d{10}$/]],
};

export default function Payment() {
  const { checkout, placeOrder } = useStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState(paymentMethods[0]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  if (!checkout) return <Navigate to="/cart" replace />;

  const totals = computeTotals(checkout.items, checkout.coupon, checkout.pointsUsed);

  const pay = (e) => {
    e.preventDefault();
    const errs = {};
    FIELDS[method].forEach(([k, , , re]) => {
      const raw = values[k] || '';
      const v = k === 'number' ? raw.replace(/[\s-]/g, '') : raw;
      if (!re.test(v)) errs[k] = 'Invalid';
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const order = placeOrder({
      items: checkout.items, total: totals.total, address: checkout.address,
      paymentMethod: method, pointsUsed: checkout.pointsUsed,
    });
    navigate(`/confirmation/${order.id}`, { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card padded={false} className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
          <h1 className="text-sm font-semibold">Complete Payment</h1>
          <p className="text-sm font-bold">Payable Amount: {formatINR(totals.total)}</p>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div role="tablist" aria-label="Payment method" className="flex overflow-x-auto border-b border-line sm:w-44 sm:flex-col sm:border-b-0 sm:border-r">
            {paymentMethods.map((m) => (
              <button
                key={m} role="tab" aria-selected={method === m}
                onClick={() => { setMethod(m); setErrors({}); }}
                className={`whitespace-nowrap px-4 py-3 text-left text-xs ${
                  method === m ? 'border-b-2 border-brand bg-surface-2 font-semibold sm:border-b-0 sm:border-l-2' : 'text-muted hover:bg-surface-2'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <form onSubmit={pay} className="flex-1 p-5" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS[method].map(([k, label, ph]) => (
                <div key={k} className={FIELDS[method].length === 1 ? 'sm:col-span-2' : ''}>
                  <Input
                    id={k} label={label} placeholder={ph} value={values[k] || ''}
                    onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
                  />
                  {errors[k] && <span className="text-[11px] text-red-400">{errors[k]}</span>}
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="submit">Pay Now 💳</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
