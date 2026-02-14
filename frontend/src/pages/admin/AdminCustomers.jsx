import React, { useState, useEffect } from 'react';
import { orderAdminApi } from '../../services/api';

// Derive unique customers from orders (backend may not have a dedicated user list for non-admin)
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAdminApi
      .getList({ limit: 500 })
      .then((r) => {
        const orders = r.orders || [];
        const byEmail = {};
        orders.forEach((o) => {
          const email = o.user?.email || 'guest';
          if (!byEmail[email]) {
            byEmail[email] = {
              name: o.user?.name || 'Guest',
              email,
              orderCount: 0,
              totalSpent: 0,
            };
          }
          byEmail[email].orderCount += 1;
          byEmail[email].totalSpent += o.total || 0;
        });
        setCustomers(Object.values(byEmail));
      })
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-6">Customers</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-400">No customer data yet (from orders).</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gpsfdk-gold/20 text-gray-400 text-sm">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Orders</th>
                <th className="py-2">Total spent</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {customers.map((c, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2">{c.name}</td>
                  <td className="py-2">{c.email}</td>
                  <td className="py-2">{c.orderCount}</td>
                  <td className="py-2">₹{c.totalSpent?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
