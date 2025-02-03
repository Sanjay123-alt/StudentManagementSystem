import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('is_admin');
    if (token && isAdmin) {
      navigate('/courses');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setLoading(false);
      return;
    } else {
      setIsEmailValid(true);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('is_admin', data.is_admin);
        window.location.reload();
      } else {
        toast.error(data.message || "Invalid credentials!");
        setPassword('');
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl bg-white p-16 rounded-lg shadow-2xl">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-10">Login</h2>

      {error && (
        <div className="bg-red-200 text-red-700 p-4 rounded mb-8 text-center font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-8">
          <label className="block text-2xl font-medium text-gray-600 mb-3">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-8 py-5 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
            placeholder="Enter your email"
          />
          {!isEmailValid && <p className="text-sm text-red-500 mt-2">Please enter a valid email.</p>}
        </div>

        <div className="mb-10">
          <label className="block text-2xl font-medium text-gray-600 mb-3">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-8 py-5 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
