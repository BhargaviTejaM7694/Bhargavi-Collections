"use client";

import { CartProvider } from "@/context/CartContext";
import { ReactNode } from "react";
import ScrollToTop from "./ScrollToTop";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ScrollToTop />
      {children}
    </CartProvider>
  );
}
