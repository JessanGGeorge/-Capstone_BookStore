import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx';

/** Requires any session (guest or registered). Set `registeredOnly` to block guests. */
export default function RequireAuth({ children, registeredOnly = false }) {
  const { user } = useStore();
  const location = useLocation();
  if (!user || (registeredOnly && user.role !== 'Registered')) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
