import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-black py-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl text-gpsfdk-gold font-semibold mb-6 text-center">
          Forgot Password
        </h1>
        {sent ? (
          <p className="text-gray-300 text-center">
            If an account exists for this email, you will receive a reset link.
          </p>
        ) : (
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
        <p className="text-gray-400 text-center mt-4">
          <Link to="/login" className="text-gpsfdk-orange hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
}
