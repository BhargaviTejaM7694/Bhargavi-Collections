import { Category, Order, Product } from "@/types";
import { products as defaultProducts } from "@/data/products";
import { categories as defaultCategories } from "@/data/categories";
import { sampleOrders } from "@/data/sampleOrders";

const ORDERS_KEY = "bhargavi_orders";
const PRODUCTS_KEY = "bhargavi_admin_products";
const CATEGORIES_KEY = "bhargavi_admin_categories";

export function getOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : sampleOrders;
  } catch {
    return sampleOrders;
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(orderId: string, status: Order["status"]): void {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

export function getAdminProducts(): Product[] {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function saveAdminProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(product: Product): void {
  product.inStock = (product.quantity ?? 0) > 0;
  const products = getAdminProducts();
  products.push(product);
  saveAdminProducts(products);
}

export function updateProduct(updated: Product): void {
  updated.inStock = (updated.quantity ?? 0) > 0;
  const products = getAdminProducts();
  const index = products.findIndex((p) => p.id === updated.id);
  if (index !== -1) {
    products[index] = updated;
    saveAdminProducts(products);
  }
}

export function reduceProductQuantity(items: { id: string; quantity: number }[]): void {
  const products = getAdminProducts();
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.quantity = Math.max(0, (product.quantity ?? 0) - item.quantity);
      product.inStock = product.quantity > 0;
    }
  }
  saveAdminProducts(products);
}

export function deleteProduct(productId: string): void {
  const products = getAdminProducts().filter((p) => p.id !== productId);
  saveAdminProducts(products);
}

export function generateOrderId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BC${dateStr}${rand}`;
}

export function getAdminCategories(): Category[] {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : defaultCategories;
  } catch {
    return defaultCategories;
  }
}

export function saveAdminCategories(cats: Category[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
}

export function addCategory(cat: Category): void {
  const cats = getAdminCategories();
  cats.push(cat);
  saveAdminCategories(cats);
}

export function deleteCategory(catId: string): void {
  const cats = getAdminCategories().filter((c) => c.id !== catId);
  saveAdminCategories(cats);
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
