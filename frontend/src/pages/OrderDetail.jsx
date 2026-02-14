import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userApi, shippingApi } from '../services/api';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .getOrderById(id)
      .then((r) => {
        setOrder(r.order);
        if (r.order?.trackingId || r.order?._id) {
          return shippingApi.track(r.order.trackingId || r.order._id);
        }
      })
      .then((r) => r && setTracking(r))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-black flex items-center justify-center">
        <div className="text-gpsfdk-gold">Loading...</div>
      </section>
    );
  }
  if (!order) {
    return (
      <section className="min-h-[60vh] bg-black flex items-center justify-center">
        <p className="text-gray-400">Order not found.</p>
        <Link to="/profile" className="text-gpsfdk-orange ml-2">Back to profile</Link>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/profile" className="text-gpsfdk-orange hover:underline mb-6 inline-block">
          ← Back to profile
        </Link>
        <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-2">Order {order.orderId}</h1>
        <p className="text-gray-400 capitalize mb-6">Status: {order.status}</p>

        {order.trackingId && (
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-sm">Tracking ID</p>
            <p className="text-white font-medium">{order.trackingId}</p>
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gpsfdk-orange hover:underline text-sm mt-2 inline-block"
              >
                Track shipment →
              </a>
            )}
          </div>
        )}

        <div className="space-y-4 mb-8">
          {order.items?.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
              <img
                src={item.image || 'https://via.placeholder.com/64'}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">
                  {item.variation?.material} · {item.variation?.frame} · {item.variation?.size} · Qty {item.quantity}
                </p>
                <p className="text-gpsfdk-green">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gpsfdk-gold/20 pt-4">
          <p className="text-gray-400 flex justify-between">
            Subtotal <span className="text-white">₹{order.subtotal}</span>
          </p>
          <p className="text-gray-400 flex justify-between">
            Shipping <span className="text-white">{order.shippingCharge === 0 ? 'Free' : `₹${order.shippingCharge}`}</span>
          </p>
          {order.discount > 0 && (
            <p className="text-gray-400 flex justify-between">
              Discount <span className="text-green-400">-₹{order.discount}</span>
            </p>
          )}
          <p className="text-gpsfdk-gold font-semibold flex justify-between mt-2 text-lg">
            Total <span>₹{order.total}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
