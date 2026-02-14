import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAdminApi, productAdminApi } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, products: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      orderAdminApi.getList({ limit: 5 }),
      orderAdminApi.getList({ status: 'pending', limit: 1 }).then((r) => ({ pending: r.total })),
      productAdminApi.getAll({ limit: 1 }).then((r) => ({ total: r.total })),
    ]).then(([ordersRes, pendingRes, productsRes]) => {
      setRecentOrders(ordersRes.orders || []);
      setStats({
        orders: ordersRes.total || 0,
        products: productsRes.total || 0,
        pendingOrders: pendingRes.pending || 0,
      });
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-gpsfdk-gold/20 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl text-white font-semibold">{stats.orders}</p>
        </div>
        <div className="bg-white/5 border border-gpsfdk-gold/20 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Pending Orders</p>
          <p className="text-2xl text-gpsfdk-orange font-semibold">{stats.pendingOrders}</p>
          <Link to="/admin/orders?status=pending" className="text-gpsfdk-orange text-sm hover:underline">
            View →
          </Link>
        </div>
        <div className="bg-white/5 border border-gpsfdk-gold/20 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Products</p>
          <p className="text-2xl text-white font-semibold">{stats.products}</p>
          <Link to="/admin/products" className="text-gpsfdk-orange text-sm hover:underline">
            Manage →
          </Link>
        </div>
      </div>
      <div>
        <h2 className="text-lg text-white font-medium mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gpsfdk-gold/20 text-gray-400 text-sm">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Status</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody className="text-white">
                {recentOrders.map((o) => (
                  <tr key={o._id} className="border-b border-white/5">
                    <td className="py-2">{o.orderId}</td>
                    <td className="py-2">{o.user?.name || o.user?.email || '—'}</td>
                    <td className="py-2">₹{o.total}</td>
                    <td className="py-2 capitalize">{o.status}</td>
                    <td className="py-2">
                      <Link to={`/admin/orders?highlight=${o._id}`} className="text-gpsfdk-orange hover:underline text-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
