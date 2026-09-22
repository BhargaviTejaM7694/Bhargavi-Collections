# Bhargavi Collections — E-Commerce Catalogue Website

## Overview
Multi-page catalogue website for Bhargavi Collections, a 1 gram imitation jewellery store. Customers browse categories, view products, and place orders via form with payment screenshot upload. Orders are emailed to the owner.

## Client Details
- **Name**: Bhargavi Collections
- **Email**: Prasannau.dwh@gmail.com
- **Phone**: +91 8978777800

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Product Data**: Static JSON files (no database)
- **Email**: EmailJS (client-side, free tier)
- **File Upload**: Cloudinary (free tier, 25GB storage)
- **Hosting**: Vercel (free tier)

## Pages

### 1. Home (`/`)
- **Header**: Sticky top nav — logo centered, nav links (Home, Shop, About, Contact), search icon, cart/order icon. Modeled after ramyanagendra.com.
- **Hero Section**: Full-width banner with brand name "Bhargavi Collections", tagline "1 GRAM JEWELLERY", background image of jewellery.
- **Shop by Collections**: Horizontal row of circular thumbnail images linking to categories — Necklaces, Earrings, Bangles, Chains, Rings, Pendants, Harams.
- **Featured Products**: Grid of highlighted products with image, name, price.
- **Footer**: Contact info, social links, copyright.

### 2. Category Page (`/collections/[category]`)
- Grid layout of products filtered by category.
- Each card: product image, name, price, "View Details" link.
- Breadcrumb navigation.

### 3. Product Detail (`/products/[id]`)
- Large product image(s).
- Name, price, description, category.
- "Order Now" button linking to order form with item pre-selected.

### 4. Order Page (`/order`)
- Form fields (all required):
  - Name
  - Gmail ID (validated as email)
  - Phone (validated as Indian mobile)
  - Delivery Address: Address Line 1, Address Line 2, City, State, Pincode
  - Item selection (dropdown or from URL param)
  - Payment Screenshot (file upload to Cloudinary)
- "Send Order" button disabled until all fields valid.
- On submit: sends email to prasannau.dwh@gmail.com with all form data, selected item links, and payment screenshot URL.

### 5. About (`/about`)
- Store description, owner info, mission.

### 6. Contact (`/contact`)
- Phone, email, address, social links.
- Delivery area information.

## Data Model (JSON)

### `data/categories.json`
```json
[
  { "id": "necklaces", "name": "Necklaces", "image": "/images/categories/necklaces.jpg" },
  ...
]
```

### `data/products.json`
```json
[
  {
    "id": "gold-necklace-001",
    "name": "Traditional Gold Necklace",
    "price": 599,
    "category": "necklaces",
    "image": "/images/products/gold-necklace-001.jpg",
    "description": "Beautiful 1 gram gold necklace..."
  },
  ...
]
```

## Email Flow
1. Customer fills order form, uploads payment screenshot to Cloudinary.
2. On submit, EmailJS sends structured email to prasannau.dwh@gmail.com containing:
   - Customer name, email, phone
   - Full delivery address
   - Selected item name, price, and link to product page
   - Payment screenshot Cloudinary URL

## Design Notes
- Color palette: Deep gold (#B8860B), burgundy (#800020), cream (#FFF8DC), dark green (#006400) — traditional Indian jewellery aesthetic.
- Typography: Serif for headings (Playfair Display), sans-serif for body (Inter).
- Mobile-first responsive design.
- Circular category thumbnails matching the reference image style.
