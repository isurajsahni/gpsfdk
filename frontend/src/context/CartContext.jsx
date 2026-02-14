import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

// Cart item: { productId, name, price, quantity, material, frame, size, image }
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gpsfdk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const save = useCallback((newItems) => {
    setItems(newItems);
    localStorage.setItem('gpsfdk_cart', JSON.stringify(newItems));
  }, []);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.material === item.material &&
          i.frame === item.frame &&
          i.size === item.size
      );
      let next;
      if (existing >= 0) {
        next = [...prev];
        next[existing].quantity += item.quantity || 1;
      } else {
        next = [...prev, { ...item, quantity: item.quantity || 1 }];
      }
      localStorage.setItem('gpsfdk_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((index, delta) => {
    setItems((prev) => {
      const next = [...prev];
      next[index].quantity = Math.max(0, next[index].quantity + delta);
      const filtered = next.filter((i) => i.quantity > 0);
      localStorage.setItem('gpsfdk_cart', JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  const removeItem = useCallback((index) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem('gpsfdk_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('gpsfdk_cart');
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const value = {
    items,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
