import Card from '../ui/Card.jsx';
import { formatINR } from '../../context/StoreContext.jsx';

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between py-1 text-xs ${bold ? 'border-t border-line pt-2 text-sm font-bold' : ''}`}>
    <span className={bold ? '' : 'text-muted'}>{label}</span><span>{value}</span>
  </div>
);

/** Grand-total card. `children` render below the totals (coupon, buttons...). */
export default function OrderSummary({ totals, children }) {
  return (
    <Card as="aside" aria-label="Order summary">
      <h2 className="mb-2 text-sm font-semibold">Grand Total</h2>
      <Row label={`Price (${totals.itemCount} items)`} value={formatINR(totals.subtotal)} />
      <Row label="Tax" value={formatINR(totals.tax)} />
      <Row label="Delivery Charges" value="Free" />
      <Row label="Discount" value={totals.discount ? `−${formatINR(totals.discount)}` : formatINR(0)} />
      <Row label="Total Amount" value={formatINR(totals.total)} bold />
      {children}
    </Card>
  );
}
