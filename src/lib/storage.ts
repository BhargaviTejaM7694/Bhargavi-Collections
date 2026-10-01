import { Category, Order, Product } from "@/types";
import { supabase } from "./supabase";

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return (data || []).map(mapOrderRow);
}

export async function saveOrder(order: Order): Promise<void> {
  const { error } = await supabase.from("orders").insert({
    id: order.id,
    customer_name: order.customerName,
    customer_email: order.customerEmail,
    customer_phone: order.customerPhone,
    address_line1: order.addressLine1,
    address_line2: order.addressLine2 || "",
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    items: order.items,
    total_amount: order.totalAmount,
    payment_screenshot_url: order.paymentScreenshotUrl || "",
    status: order.status,
    created_at: order.createdAt,
  });

  if (error) console.error("Error saving order:", error);
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) console.error("Error updating order status:", error);
}

export async function getAdminProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data || []).map(mapProductRow);
}

export async function addProduct(product: Product): Promise<void> {
  const { error } = await supabase.from("products").insert({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    images: product.images || null,
    description: product.description,
    in_stock: (product.quantity ?? 0) > 0,
    quantity: product.quantity ?? 0,
  });

  if (error) console.error("Error adding product:", error);
}

export async function updateProduct(updated: Product): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({
      name: updated.name,
      price: updated.price,
      category: updated.category,
      image: updated.image,
      images: updated.images || null,
      description: updated.description,
      in_stock: (updated.quantity ?? 0) > 0,
      quantity: updated.quantity ?? 0,
    })
    .eq("id", updated.id);

  if (error) console.error("Error updating product:", error);
}

export async function reduceProductQuantity(items: { id: string; quantity: number }[]): Promise<void> {
  for (const item of items) {
    const { data } = await supabase
      .from("products")
      .select("quantity")
      .eq("id", item.id)
      .single();

    if (data) {
      const newQty = Math.max(0, (data.quantity ?? 0) - item.quantity);
      await supabase
        .from("products")
        .update({ quantity: newQty, in_stock: newQty > 0 })
        .eq("id", item.id);
    }
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) console.error("Error deleting product:", error);
}

export async function getAdminCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    image: row.image,
    description: row.description,
  }));
}

export async function addCategory(cat: Category): Promise<void> {
  const { error } = await supabase.from("categories").insert({
    id: cat.id,
    name: cat.name,
    image: cat.image,
    description: cat.description,
  });

  if (error) console.error("Error adding category:", error);
}

export async function deleteCategory(catId: string): Promise<void> {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", catId);

  if (error) console.error("Error deleting category:", error);
}

export function generateOrderId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BC${dateStr}${rand}`;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrderRow(row: any): Order {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2 || "",
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    items: row.items,
    totalAmount: Number(row.total_amount),
    paymentScreenshotUrl: row.payment_screenshot_url || "",
    status: row.status,
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProductRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    image: row.image,
    images: row.images || undefined,
    description: row.description,
    inStock: row.in_stock,
    quantity: row.quantity ?? 0,
  };
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  const [orders, products] = await Promise.all([getOrders(), getAdminProducts()]);

  const salesCount = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items) {
      salesCount.set(item.id, (salesCount.get(item.id) || 0) + (item.quantity || 1));
    }
  }

  const productMap = new Map(products.map((p) => [p.id, p]));
  const sorted = Array.from(salesCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => productMap.get(id))
    .filter((p): p is Product => !!p);

  return sorted;
}

export async function saveAdminProducts(products: Product[]): Promise<void> {
  for (const p of products) {
    await updateProduct(p);
  }
}

export async function saveAdminCategories(cats: Category[]): Promise<void> {
  for (const c of cats) {
    await supabase
      .from("categories")
      .upsert({ id: c.id, name: c.name, image: c.image, description: c.description });
  }
}
