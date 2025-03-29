import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
