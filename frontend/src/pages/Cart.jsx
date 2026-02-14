import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal >= 999 ? 0 : 99;

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] bg-black py-20 px-4 text-center">
        <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-gpsfdk-orange hover:underline">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-gpsfdk-gold font-semibold mb-8">Cart</h1>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={`${item.productId}-${item.size}-${index}`}
              className="flex gap-4 p-4 bg-white/5 border border-gpsfdk-gold/20 rounded-lg"
            >
              <img
                src={item.image || 'https://via.placeholder.com/80'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                <p className="text-gray-400 text-sm">
                  {item.material} · {item.frame} · {item.size}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="w-8 h-8 rounded bg-gpsfdk-gold/30 text-white hover:bg-gpsfdk-orange"
                  >
                    −
                  </button>
                  <span className="text-white w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="w-8 h-8 rounded bg-gpsfdk-gold/30 text-white hover:bg-gpsfdk-orange"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gpsfdk-green font-semibold">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-400 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-white/5 rounded-lg max-w-sm ml-auto">
          <p className="text-gray-400 flex justify-between">
            Subtotal <span className="text-white">₹{subtotal}</span>
          </p>
          <p className="text-gray-400 flex justify-between mt-2">
            Shipping <span className="text-white">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </p>
          <p className="text-gpsfdk-gold font-semibold flex justify-between mt-4 text-lg">
            Total <span>₹{subtotal + shipping}</span>
          </p>
          <Link
            to="/checkout"
            className="block w-full bg-gpsfdk-orange hover:bg-gpsfdk-green text-white text-center font-semibold py-3 rounded-lg mt-4 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
