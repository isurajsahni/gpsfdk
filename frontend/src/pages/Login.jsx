import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-black py-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl text-gpsfdk-gold font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded">{error}</p>
          )}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gpsfdk-orange"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gpsfdk-orange"
              required
            />
          </div>
          <Link to="/forgot-password" className="text-sm text-gpsfdk-orange hover:underline block">
            Forgot password?
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-gpsfdk-orange hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
