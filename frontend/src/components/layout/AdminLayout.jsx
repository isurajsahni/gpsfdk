import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const adminNav = [
  { to: '/admin', end: true, label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/customers', label: 'Customers' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside
        className={`bg-black border-r border-gpsfdk-gold/20 transition-all ${
          sidebarOpen ? 'w-56' : 'w-16'
        }`}
      >
        <div className="p-4 border-b border-gpsfdk-gold/20">
          <Link to="/admin" className="text-gpsfdk-gold font-semibold">
            {sidebarOpen ? 'Admin' : 'A'}
          </Link>
        </div>
        <nav className="p-2">
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block py-2 px-3 rounded mb-1 ${
                  isActive ? 'bg-gpsfdk-orange text-white' : 'text-gray-400 hover:text-gpsfdk-orange'
                }`
              }
            >
              {sidebarOpen ? item.label : item.label.charAt(0)}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Link to="/" className="text-gray-500 hover:text-gpsfdk-orange text-sm">
            ← Store
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
