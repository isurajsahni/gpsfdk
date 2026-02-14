import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-black py-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl text-gpsfdk-gold font-semibold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded">{error}</p>
          )}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gpsfdk-orange"
              required
            />
          </div>
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
            <label className="block text-gray-400 text-sm mb-1">Password (min 6)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gpsfdk-orange"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-gpsfdk-orange hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
