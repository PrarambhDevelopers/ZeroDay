import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) { // 👈 Only check after loading is complete
      if (!user || !token) {
        alert("You are not logged in. Please log in first.");
        navigate('/hackwars_login'); // ✅ Your login page
      }
    }
  }, [user, token, loading, navigate]);

  // While loading, don't render anything
  if (loading) return null;

  return user && token ? children : null;
}
