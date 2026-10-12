"use client";

import { CartProvider } from "@/context/CartContext";
import { ProductDataProvider } from "@/context/ProductDataContext";
import { ReactNode } from "react";
import ScrollToTop from "./ScrollToTop";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductDataProvider>
      <CartProvider>
        <ScrollToTop />
        {children}
      </CartProvider>
    </ProductDataProvider>
  );
}
