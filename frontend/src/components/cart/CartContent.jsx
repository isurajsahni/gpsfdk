import React from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useCart } from '../../context/CartContext';

export const CartContent = () => {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        <p>Your cart is empty</p>
        <Link to="/products" className="text-gpsfdk-orange hover:underline text-sm mt-2 inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      {items.map((product, index) => (
        <div key={`${product.productId}-${index}`} className="flex items-center justify-between mb-4 gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-start gap-4 flex-1">
            <img
              src={product.image || 'https://via.placeholder.com/80'}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product.material} · {product.frame} · {product.size}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 text-lg font-medium hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-sm font-medium">{product.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 text-lg font-medium hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-800 font-medium">₹{(product.price * product.quantity).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 hover:bg-red-50 rounded transition-colors"
          >
            <RiDeleteBin3Line className="w-5 h-5 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
};
