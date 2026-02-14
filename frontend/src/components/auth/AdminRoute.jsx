import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-gpsfdk-gold animate-pulse">Loading...</div>
      </div>
    );
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}
