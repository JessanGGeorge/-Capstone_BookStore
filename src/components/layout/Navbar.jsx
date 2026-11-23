import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';

/**
 * Reusable navbar. Pass `links` ([{to,label}]) and optional `brand`.
 * Collapses to a hamburger menu below `md`.
 */
export default function Navbar({ brand = 'Book Worm', links = [] }) {
  const [open, setOpen] = useState(false);
  const { cartCount, user, logout } = useStore();
  const navigate = useNavigate();

  const linkCls = ({ isActive }) =>
    `block rounded px-3 py-2 text-sm transition-colors hover:text-white ${isActive ? 'text-white' : 'text-muted'}`;

  const handleAuth = () => {
    if (user) { logout(); navigate('/login'); } else navigate('/login');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4" aria-label="Main">
        <button
          className="rounded p-2 hover:bg-surface-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
        </button>

        <Link to="/" className="text-sm font-bold tracking-wide">📖 {brand}</Link>
        <span className="hidden h-5 w-px bg-line md:block" />

        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.to}><NavLink to={l.to} className={linkCls}>{l.label}</NavLink></li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {user && <span className="hidden text-xs text-muted sm:block">Hi, {user.name}</span>}

          <Link to="/cart" className="relative rounded p-2 hover:bg-surface-2" aria-label={`Cart, ${cartCount} items`}>
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={handleAuth} className="rounded p-2 text-sm hover:bg-surface-2" aria-label={user ? 'Log out' : 'Log in'}>
            {user ? 'Logout' : '👤 Login'}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line px-4 py-2 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkCls} onClick={() => setOpen(false)}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
