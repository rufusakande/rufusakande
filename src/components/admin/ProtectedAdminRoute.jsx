import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

export function ProtectedAdminRoute({ isAdmin, loading, children }) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <Loader size={40} className="animate-spin" style={{ color: '#3c44e9' }} />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
