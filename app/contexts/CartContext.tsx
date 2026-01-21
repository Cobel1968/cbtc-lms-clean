'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface cart_item {
  id: string;
  name: { en: string; fr: string };
  price_xof: number;
}

interface cart_context_type {
  cart: cart_item[];
  add_to_cart: (item: cart_item) => void;
  remove_from_cart: (id: string) => void;
  clear_cart: () => void;
  total_price: number;
  isMounted: boolean;
}

const cart_context = createContext<cart_context_type | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, set_cart] = useState<cart_item[]>([]);
  const [isMounted, set_is_mounted] = useState(false);

  useEffect(() => {
    set_is_mounted(true);
    if (typeof window !== 'undefined') {
      const saved_cart = localStorage.getItem('cobel_cart');
      if (saved_cart) {
        try {
          set_cart(JSON.parse(saved_cart));
        } catch (e) {
          console.error("Cobel Engine: Failed to parse cart data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('cobel_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const add_to_cart = (item: cart_item) => {
    set_cart((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const remove_from_cart = (id: string) => {
    set_cart((prev) => prev.filter((item) => item.id !== id));
  };

  const clear_cart = () => set_cart([]);

  const total_price = cart.reduce((total, item) => total + item.price_xof, 0);

  return (
    <cart_context.Provider value={{ cart, add_to_cart, remove_from_cart, clear_cart, total_price, isMounted }}>
      {children}
    </cart_context.Provider>
  );
}

export function useCart() {
  const context = useContext(cart_context);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
}