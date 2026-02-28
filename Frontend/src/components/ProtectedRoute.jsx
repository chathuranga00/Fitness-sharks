import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      console.log('ProtectedRoute - Auth check:', { isAuthenticated, user, requireAdmin });
      
      if (!isAuthenticated) {
        // Not logged in, redirect to login
        console.log('ProtectedRoute - Not authenticated, redirecting to login');
        navigate('/login');
        return;
      }

      if (requireAdmin && user?.userType !== 'admin') {
        // Not an admin, redirect to home
        console.log('ProtectedRoute - Not admin, redirecting to home. User type:', user?.userType);
        navigate('/');
        return;
      }
      
      console.log('ProtectedRoute - Access granted');
    }
  }, [isAuthenticated, user, isLoading, requireAdmin, navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message for non-admin users trying to access admin routes
  if (requireAdmin && user?.userType !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
}