import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { orderAdminApi, shippingAdminApi } from '../../services/api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || '';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [updating, setUpdating] = useState(null);

  const load = () => {
    setLoading(true);
    const params = { page, limit: 20 };
    if (statusFilter) params.status = statusFilter;
    orderAdminApi
      .getList(params)
      .then((r) => {
        setOrders(r.orders || []);
        setTotal(r.total || 0);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, statusFilter]);

  const updateStatus = (orderId, status) => {
    setUpdating(orderId);
    orderAdminApi
      .updateStatus(orderId, status)
      .then(load)
      .catch((e) => alert(e.message))
      .finally(() => setUpdating(null));
  };

  const createShipment = (orderId) => {
    if (!window.confirm('Create shipment for this order (Shiprocket)?')) return;
    setUpdating(orderId);
    shippingAdminApi
      .create({ orderId })
      .then((r) => {
        alert(r.trackingId ? `Tracking: ${r.trackingId}` : 'Shipment created');
        load();
      })
      .catch((e) => alert(e.message || 'Shipment failed'))
      .finally(() => setUpdating(null));
  };

  return (
    <div>
      <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-6">Orders</h1>
      <div className="flex gap-2 mb-4 flex-wrap">
        <Link
          to="/admin/orders"
          className={`px-4 py-2 rounded ${!statusFilter ? 'bg-gpsfdk-orange text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}
        >
          All
        </Link>
        {STATUS_OPTIONS.map((s) => (
          <Link
            key={s}
            to={`/admin/orders?status=${s}`}
            className={`px-4 py-2 rounded capitalize ${statusFilter === s ? 'bg-gpsfdk-orange text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}
          >
            {s}
          </Link>
        ))}
      </div>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gpsfdk-gold/20 text-gray-400 text-sm">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Payment</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {orders.map((o) => (
                <tr key={o._id} className="border-b border-white/5">
                  <td className="py-2">{o.orderId}</td>
                  <td className="py-2">
                    {o.user?.name || '—'}<br />
                    <span className="text-gray-400 text-sm">{o.user?.email}</span>
                  </td>
                  <td className="py-2">₹{o.total}</td>
                  <td className="py-2 capitalize">{o.status}</td>
                  <td className="py-2">{o.paymentStatus || '—'}</td>
                  <td className="py-2">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      disabled={updating === o._id}
                      className="bg-white/10 text-white rounded px-2 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {o.paymentStatus === 'paid' && !o.trackingId && o.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => createShipment(o._id)}
                        disabled={updating === o._id}
                        className="ml-2 text-gpsfdk-orange text-sm hover:underline"
                      >
                        Create shipment
                      </button>
                    )}
                    {o.trackingId && <p className="text-xs text-gray-400 mt-1">Track: {o.trackingId}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {total > 20 && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-2 text-gray-400">Page {page}</span>
          <button
            disabled={page * 20 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
