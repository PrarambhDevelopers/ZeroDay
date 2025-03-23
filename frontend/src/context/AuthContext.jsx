import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { user: null, token: null };
    case 'UPDATE_USER':
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  // ✅ On first load, fetch from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      dispatch({ type: 'LOGIN', payload: { user: savedUser, token: savedToken } });
    }
    setLoading(false);
  }, []);

  // ✅ Whenever user or token changes, update localStorage automatically!
  useEffect(() => {
    if (state.user && state.token) {
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [state.user, state.token]);

  // ✅ Login function
  const login = (user, token) => {
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  // ✅ Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // ✅ Update user function
  const updateUser = (user) => {
    dispatch({ type: 'UPDATE_USER', payload: { user } });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
