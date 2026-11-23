import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { getBook, coupons, TAX_RATE, GIFT_POINT_VALUE } from '../data/books.js';

const StoreContext = createContext(null);
const KEY = 'bookworm-state-v1';
const CANCEL_WINDOW_MS = 48 * 60 * 60 * 1000;

const seedOrders = () => [
  {
    id: 'ORD-1001',
    placedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    items: [{ id: 'b4', qty: 1 }, { id: 'b5', qty: 1 }],
    total: 798, status: 'Delivered',
  },
];

const initial = {
  user: null, // { name, email, role: 'Registered' }
  cart: [],
  wishlist: [],
  orders: seedOrders(),
  giftPoints: 120,
  checkout: null, // pending order draft before payment
};

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...initial, ...JSON.parse(raw) } : initial;
  } catch {
    return initial;
  }
};

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const patch = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), []);

  const actions = useMemo(() => ({
    login: (name, email) => patch(() => ({ user: { name, email, role: 'Registered' } })),
    loginGuest: () => patch(() => ({ user: { name: 'Guest', email: '', role: 'Guest' } })),
    logout: () => patch(() => ({ user: null, cart: [], checkout: null })),

    addToCart: (id, qty = 1) => patch((s) => {
      const found = s.cart.find((c) => c.id === id);
      return {
        cart: found
          ? s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c))
          : [...s.cart, { id, qty }],
      };
    }),
    setQty: (id, qty) => patch((s) => ({
      cart: qty <= 0 ? s.cart.filter((c) => c.id !== id) : s.cart.map((c) => (c.id === id ? { ...c, qty } : c)),
    })),
    removeFromCart: (id) => patch((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),

    toggleWishlist: (id) => patch((s) => ({
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    })),

    setCheckout: (checkout) => patch(() => ({ checkout })),

    placeOrder: (summary) => {
      const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        placedAt: Date.now(),
        items: summary.items,
        total: summary.total,
        status: 'Confirmed',
        address: summary.address,
        paymentMethod: summary.paymentMethod,
      };
      patch((s) => ({
        orders: [order, ...s.orders],
        cart: [],
        checkout: null,
        giftPoints: Math.max(0, s.giftPoints - summary.pointsUsed) + Math.floor(summary.total / 100),
      }));
      return order;
    },
    cancelOrder: (id) => patch((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status: 'Cancelled' } : o)),
    })),
  }), [patch]);

  const cartCount = state.cart.reduce((n, c) => n + c.qty, 0);

  const value = { ...state, cartCount, ...actions };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};

export const canCancel = (order) =>
  order.status !== 'Cancelled' && order.status !== 'Delivered' && Date.now() - order.placedAt <= CANCEL_WINDOW_MS;

// Pure pricing helper shared by cart / checkout / payment
export function computeTotals(cart, couponCode = '', pointsToUse = 0) {
  const lines = cart.map((c) => ({ ...c, book: getBook(c.id) })).filter((l) => l.book);
  const subtotal = lines.reduce((n, l) => n + l.book.price * l.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const couponValue = coupons[couponCode.toUpperCase()] || 0;
  const pointsValue = pointsToUse * GIFT_POINT_VALUE;
  const discount = Math.min(subtotal + tax, couponValue + pointsValue);
  const total = subtotal + tax - discount;
  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  return { lines, subtotal, tax, discount, couponValue, pointsValue, total, itemCount };
}

export const formatINR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
