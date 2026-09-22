export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  inStock: boolean;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  selectedProduct: string;
  paymentScreenshot: string;
}
