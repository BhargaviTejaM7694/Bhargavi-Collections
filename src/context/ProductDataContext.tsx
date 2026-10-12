"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getAdminProducts, getAdminCategories } from "@/lib/storage";
import type { Product, Category } from "@/types";

interface ProductData {
  products: Product[];
  categories: Category[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const ProductDataContext = createContext<ProductData>({
  products: [],
  categories: [],
  loading: true,
  refresh: async () => {},
});

const CACHE_TTL = 60_000;
let cachedProducts: Product[] | null = null;
let cachedCategories: Category[] | null = null;
let cacheTime = 0;

export function ProductDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? []);
  const [categories, setCategories] = useState<Category[]>(cachedCategories ?? []);
  const [loading, setLoading] = useState(!cachedProducts);

  const fetchData = useCallback(async () => {
    const now = Date.now();
    if (cachedProducts && cachedCategories && now - cacheTime < CACHE_TTL) {
      setProducts(cachedProducts);
      setCategories(cachedCategories);
      setLoading(false);
      return;
    }

    try {
      const [prods, cats] = await Promise.all([
        getAdminProducts(),
        getAdminCategories(),
      ]);
      cachedProducts = prods;
      cachedCategories = cats;
      cacheTime = Date.now();
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch product data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    cachedProducts = null;
    cachedCategories = null;
    cacheTime = 0;
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ProductDataContext.Provider value={{ products, categories, loading, refresh }}>
      {children}
    </ProductDataContext.Provider>
  );
}

export function useProductData() {
  return useContext(ProductDataContext);
}
