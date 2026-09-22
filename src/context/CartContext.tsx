"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface CartContextType {
  selectedItems: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isSelected: (productId: string) => boolean;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const toggleItem = (product: Product) => {
    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeItem = (productId: string) => {
    setSelectedItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isSelected = (productId: string) => {
    return selectedItems.some((p) => p.id === productId);
  };

  const clearCart = () => setSelectedItems([]);

  return (
    <CartContext.Provider
      value={{
        selectedItems,
        toggleItem,
        removeItem,
        isSelected,
        clearCart,
        itemCount: selectedItems.length,
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
