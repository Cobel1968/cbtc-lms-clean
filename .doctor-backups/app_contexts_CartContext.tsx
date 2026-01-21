'use client';
import React, { createContext, useContext, useState as use_state, useEffect as use_effect } from 'react';

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
  isMounted: boolean; // Added for hydration safety
}

const cart_context = createContext<cart_context_type | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, set_cart] = use_state<cart_item[]>([]);
  const [isMounted, set_is_mounted] = use_state(false);

  // 1. Initial Mount: Load data from localStorage
  use_effect(() => {
    set_is_mounted(true);
    const saved_cart = localStorage.getItem('cobel_cart');
    if (saved_cart) {
      try {
        set_cart(JSON.parse(saved_cart));
      } catch (e) {
        console.error("Cobel Engine: Failed to parse cart data", e);
      }
    }
  }, []);

  // 2. Sync: Update localStorage whenever the cart changes
  use_effect(() => {
    if (isMounted) {
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
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}