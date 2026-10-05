"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  selectedItems: Product[];
  addItem: (product: Product, quantity?: number) => void;
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isSelected: (productId: string) => boolean;
  getQuantity: (productId: string) => number;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const STORAGE_KEY = "btc_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const loaded = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = loadCart();
    if (stored.length > 0) {
      setItems(stored);
    }
    loaded.current = true;
  }, []);

  // Save cart to localStorage on every change (skip until load is done)
  useEffect(() => {
    if (loaded.current) {
      saveCart(items);
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const toggleItem = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const isSelected = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getQuantity = (productId: string) => {
    return items.find((item) => item.product.id === productId)?.quantity || 0;
  };

  const clearCart = () => setItems([]);

  const selectedItems = items.map((item) => item.product);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        selectedItems,
        addItem,
        toggleItem,
        removeItem,
        updateQuantity,
        isSelected,
        getQuantity,
        clearCart,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
