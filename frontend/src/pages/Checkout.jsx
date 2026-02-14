import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderApi, paymentApi, userApi, couponApi } from '../services/api';

// Load Razorpay script
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '',
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    userApi.getAddresses().then((r) => {
      const addrs = r.addresses || [];
      setAddresses(addrs);
      const defaultAddr = addrs.find((a) => a.isDefault) || addrs[0];
      if (defaultAddr && !useNewAddress) setSelectedAddress(defaultAddr);
    }).catch(() => setAddresses([]));
  }, [user, items.length, navigate, useNewAddress]);

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const r = await couponApi.validate({ code: couponCode, subtotal });
      if (r.success) setDiscount(r.discount || 0);
      else setError(r.message || 'Invalid coupon');
    } catch (e) {
      setError(e.message || 'Invalid coupon');
    }
  };

  const getShippingAddress = () => {
    if (useNewAddress) {
      const { name, phone, addressLine1, addressLine2, city, state, pincode } = addressForm;
      if (!name || !phone || !addressLine1 || !city || !state || !pincode) return null;
      return { name, phone, addressLine1, addressLine2: addressLine2 || '', city, state, pincode };
    }
    if (selectedAddress) {
      return {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2 || '',
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      };
    }
    return null;
  };

  const handlePlaceOrder = async () => {
    const shippingAddress = getShippingAddress();
    if (!shippingAddress) {
      setError('Please add or select a shipping address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        material: i.material,
        frame: i.frame,
        size: i.size,
      }));
      const { order } = await orderApi.create({
        items: orderItems,
        shippingAddress,
        couponCode: couponCode.trim() || undefined,
      });

      await loadRazorpay();
      const { razorpayOrderId, keyId } = await paymentApi.createOrder({
        orderId: order._id,
        amount: order.total,
      });

      const options = {
        key: keyId,
        amount: order.total * 100,
        currency: 'INR',
        name: 'GPSFDK',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            clearCart();
            navigate(`/orders/${order._id}`, { replace: true });
          } catch (e) {
            setError('Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        prefill: { name: user?.name, email: user?.email },
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        setError('Payment failed');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) return null;

  return (
    <section className="min-h-[80vh] bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-6">Checkout</h1>
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 py-2 px-4 rounded">{error}</p>
        )}

        <div className="mb-8">
          <h2 className="text-lg text-white font-medium mb-3">Shipping address</h2>
          <label className="flex items-center gap-2 text-gray-400 mb-3">
            <input
              type="radio"
              checked={!useNewAddress}
              onChange={() => setUseNewAddress(false)}
            />
            Select saved address
          </label>
          <label className="flex items-center gap-2 text-gray-400 mb-3">
            <input
              type="radio"
              checked={useNewAddress}
              onChange={() => setUseNewAddress(true)}
            />
            New address
          </label>

          {!useNewAddress && addresses.length > 0 && (
            <div className="space-y-2">
              {addresses.map((a) => (
                <label key={a._id} className="flex items-start gap-2 p-3 bg-white/5 rounded border border-gpsfdk-gold/20 cursor-pointer">
                  <input
                    type="radio"
                    name="addr"
                    checked={selectedAddress?._id === a._id}
                    onChange={() => setSelectedAddress(a)}
                  />
                  <span className="text-gray-300">
                    {a.name}, {a.phone}<br />
                    {a.addressLine1}, {a.addressLine2} {a.city}, {a.state} - {a.pincode}
                  </span>
                </label>
              ))}
            </div>
          )}

          {useNewAddress && (
            <div className="grid gap-3">
              <input
                placeholder="Name"
                value={addressForm.name}
                onChange={(e) => setAddressForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
              />
              <input
                placeholder="Phone"
                value={addressForm.phone}
                onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
              />
              <input
                placeholder="Address line 1"
                value={addressForm.addressLine1}
                onChange={(e) => setAddressForm((f) => ({ ...f, addressLine1: e.target.value }))}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
              />
              <input
                placeholder="Address line 2 (optional)"
                value={addressForm.addressLine2}
                onChange={(e) => setAddressForm((f) => ({ ...f, addressLine2: e.target.value }))}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="City"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
                />
                <input
                  placeholder="State"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))}
                  className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
                />
              </div>
              <input
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm((f) => ({ ...f, pincode: e.target.value }))}
                className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-lg text-white font-medium mb-2">Coupon</h2>
          <div className="flex gap-2">
            <input
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
            />
            <button
              type="button"
              onClick={validateCoupon}
              className="bg-gpsfdk-gold/30 text-white px-4 py-2 rounded hover:bg-gpsfdk-orange"
            >
              Apply
            </button>
          </div>
          {discount > 0 && <p className="text-green-400 text-sm mt-1">Discount: ₹{discount}</p>}
        </div>

        <div className="p-4 bg-white/5 rounded-lg mb-6">
          <p className="text-gray-400 flex justify-between">Subtotal <span className="text-white">₹{subtotal}</span></p>
          <p className="text-gray-400 flex justify-between">Shipping <span className="text-white">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></p>
          {discount > 0 && <p className="text-gray-400 flex justify-between">Discount <span className="text-green-400">-₹{discount}</span></p>}
          <p className="text-gpsfdk-gold font-semibold flex justify-between mt-2 text-lg">Total <span>₹{total}</span></p>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay ₹${total}`}
        </button>
      </div>
    </section>
  );
}
