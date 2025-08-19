import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MatrixBG from "../components/MatrixBG";

export default function Login() {
  const { dispatch } = useAuth();

  const [ctfId, setCtfId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Add initial loading to prevent white flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150); // Small delay to ensure smooth transition
    
    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://zeroday-7sa4.onrender.com/api/user/login', {
        ctf_id: ctfId,
        password: password
      });

      const { user, token } = response.data;
      if (user && token) {
        // Save in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Update Context
        dispatch({ type: 'LOGIN', payload: { user, token } });

        // Redirect to Dashboard
      
        navigate('/hackwars_dashboard');
      } else {
        setError('Invalid credentials. Please try again!');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your CTF ID and password.');
    }
  };

  // Show loading screen during initial load
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#50ff53] border-r-transparent mb-4"></div>
          <p className="text-[#50ff53] text-xl font-bold">Loading Login...</p>
        </div>
        <div className="absolute inset-0 -z-10">
          <MatrixBG />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg min-h-[87vh] overflow-hidden">
      <h2 className="text-4xl font-bold text-[#50ff53] mb-6 text-center neon-text">
        Welcome Back, Cyber Warrior!
      </h2>
      <p className="text-lg text-gray-300 text-center max-w-xl mb-10 neon-text">
        Ready to hack your way in? Enter your credentials to continue your
        mission.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="ctfId" className="text-[#50ff53] mb-2 font-semibold">
            CTF ID
          </label>
          <input
            type="text"
            id="ctfId"
            name="ctfId"
            placeholder="Zero_101"
            required
            value={ctfId}
            onChange={(e) => setCtfId(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#50ff53]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-[#50ff53] mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="* * * * * * * *"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#50ff53]"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-[#50ff53] text-black font-bold py-3 rounded-xl transition-all active:scale-95 hover:shadow-lg"
        >
          Enter Arena →
        </button>
      </form>

      {/* <p className="mt-6 text-gray-400 text-center text-sm">
        Forgot your password? Reset mission credentials.
      </p> */}
    </div>
  );
}
