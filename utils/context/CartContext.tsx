'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. PERSISTENCE: Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cobel_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. SYNC: Save cart to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cobel_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Logic to prevent adding duplicate subscriptions
      const isSubscription = product.type === 'SUBSCRIPTION';
      const alreadyHasSub = prev.some(item => item.type === 'SUBSCRIPTION');
      
      if (isSubscription && alreadyHasSub) {
        // Option: Replace the old sub with the new one, or just return prev
        return prev.map(item => item.type === 'SUBSCRIPTION' ? product : item);
      }
      
      // Prevent duplicate individual products (like specific training modules)
      if (prev.find(item => item.id === product.id)) return prev;

      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // 3. FINANCIAL LOGIC: Calculate totals for the checkout bridge
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
