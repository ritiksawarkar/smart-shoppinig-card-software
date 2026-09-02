import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Reusable ProtectedRoute component
 * Restricts access to admin dashboard and future sub-routes for unauthenticated users.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-medium text-slate-500">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login while preserving target location for post-login redirect if needed
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
