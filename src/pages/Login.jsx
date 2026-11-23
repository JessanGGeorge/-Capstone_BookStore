import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Fields.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function Login() {
  const { login, loginGuest } = useStore();
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(form.email) || form.password.length < 4) {
      setError('Enter a valid email and a password of at least 4 characters.');
      return;
    }
    login(form.email.split('@')[0], form.email);
    navigate(from, { replace: true });
  };

  const guest = () => { loginGuest(); navigate('/', { replace: true }); };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 text-xl font-semibold">📖 Book Worm</h1>
        <p className="mb-5 text-sm text-muted">Sign in to browse your order history and get recommendations.</p>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Input id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
          <Input id="password" label="Password" type="password" autoComplete="current-password" value={form.password} onChange={set('password')} />
          {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
        </div>
        <Button variant="secondary" className="w-full" onClick={guest}>Continue as Guest</Button>
      </Card>
    </div>
  );
}
