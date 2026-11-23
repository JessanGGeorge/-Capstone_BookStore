import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const links = [
  { to: '/', label: 'Catalogue' },
  { to: '/orders', label: 'My Orders' },
  { to: '/wishlist', label: 'My Wishlist' },
  { to: '/writers', label: 'My Writers' },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar links={links} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:py-6">
        <Outlet />
      </main>
      <footer className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Book Worm · E-Bookstore
      </footer>
    </div>
  );
}
