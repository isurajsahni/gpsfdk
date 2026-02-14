import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../services/api';

function AddressForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', isDefault: false });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.addAddress(form);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/5 rounded-lg space-y-3 max-w-md">
      <input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
      <input placeholder="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
      <input placeholder="Address line 1" value={form.addressLine1} onChange={(e) => setForm((f) => ({ ...f, addressLine1: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
      <input placeholder="Address line 2" value={form.addressLine2} onChange={(e) => setForm((f) => ({ ...f, addressLine2: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" />
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
        <input placeholder="State" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
      </div>
      <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))} className="w-full bg-white/10 border rounded px-3 py-2 text-white" required />
      <label className="flex items-center gap-2 text-gray-400"><input type="checkbox" checked={form.isDefault} onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))} /> Default address</label>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="bg-gpsfdk-orange text-white py-2 px-4 rounded">Save</button>
        <button type="button" onClick={onCancel} className="text-gray-400">Cancel</button>
      </div>
    </form>
  );
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
  }, [user]);

  useEffect(() => {
    if (tab === 'addresses') {
      userApi.getAddresses().then((r) => setAddresses(r.addresses || [])).catch(() => setAddresses([]));
    }
    if (tab === 'orders') {
      userApi.getMyOrders().then((r) => setOrders(r.orders || [])).catch(() => setOrders([]));
    }
  }, [tab]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await userApi.updateProfile({ name, phone });
      updateUser({ name, phone });
      setMessage('Profile updated');
    } catch (err) {
      setMessage(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <section className="min-h-[80vh] bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-gpsfdk-gold font-semibold mb-8">My Account</h1>
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gpsfdk-gold/30 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                tab === t.id
                  ? 'bg-gpsfdk-orange text-white'
                  : 'text-gray-400 hover:text-gpsfdk-orange'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
            {message && (
              <p className={`text-sm ${message.includes('updated') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input type="text" value={user?.email || ''} readOnly className="w-full bg-white/5 border border-gpsfdk-gold/20 rounded-lg px-4 py-3 text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
            >
              Save
            </button>
          </form>
        )}

        {tab === 'addresses' && (
          <div>
            <button
              type="button"
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="inline-block bg-gpsfdk-orange text-white py-2 px-4 rounded-lg mb-4 hover:bg-gpsfdk-green"
            >
              {showAddAddress ? 'Cancel' : 'Add Address'}
            </button>
            {showAddAddress && (
              <AddressForm
                onSuccess={() => { setShowAddAddress(false); userApi.getAddresses().then((r) => setAddresses(r.addresses || [])); }}
                onCancel={() => setShowAddAddress(false)}
              />
            )}
            {addresses.length === 0 && !showAddAddress ? (
              <p className="text-gray-400">No addresses. Add one above or at checkout.</p>
            ) : (
              <ul className="space-y-4">
                {addresses.map((a) => (
                  <li key={a._id} className="bg-white/5 border border-gpsfdk-gold/20 rounded-lg p-4 text-gray-300">
                    <p className="font-medium text-white">{a.name} · {a.phone}</p>
                    <p>{a.addressLine1}, {a.addressLine2} {a.city}, {a.state} - {a.pincode}</p>
                    {a.isDefault && <span className="text-gpsfdk-orange text-sm">Default</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              orders.map((o) => (
                <Link
                  key={o._id}
                  to={`/orders/${o._id}`}
                  className="block bg-white/5 border border-gpsfdk-gold/20 rounded-lg p-4 hover:border-gpsfdk-orange/50 transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gpsfdk-gold font-medium">{o.orderId}</span>
                    <span className="text-gray-400 capitalize">{o.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">₹{o.total} · {o.items?.length || 0} items</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
