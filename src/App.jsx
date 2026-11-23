import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import RequireAuth from './components/layout/RequireAuth.jsx';
import Login from './pages/Login.jsx';
import Catalogue from './pages/Catalogue.jsx';
import BookDetail from './pages/BookDetail.jsx';
import Cart from './pages/Cart.jsx';
import Payment from './pages/Payment.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Orders from './pages/Orders.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Writers from './pages/Writers.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="/" element={<Catalogue />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation/:orderId" element={<Confirmation />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/writers" element={<Writers />} />
        <Route path="/orders" element={<RequireAuth registeredOnly><Orders /></RequireAuth>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
