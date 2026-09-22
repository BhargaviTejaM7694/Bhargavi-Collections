import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "traditional-gold-necklace",
    name: "Traditional Gold Necklace",
    price: 599,
    category: "necklaces",
    image:
      "https://images.unsplash.com/photo-1724594746613-3676fae25675?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Beautiful 1 gram gold necklace with traditional temple design. Perfect for festivals and celebrations.",
    inStock: true,
  },
  {
    id: "kundan-choker-necklace",
    name: "Kundan Choker Necklace",
    price: 799,
    category: "necklaces",
    image:
      "https://images.unsplash.com/photo-1763145229778-723c84ad3bce?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Exquisite kundan work choker necklace with intricate stone settings.",
    inStock: true,
  },
  {
    id: "temple-jhumka-earrings",
    name: "Temple Jhumka Earrings",
    price: 399,
    category: "earrings",
    image:
      "https://images.unsplash.com/photo-1714733831162-0a6e849141be?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Classic temple-style jhumka earrings with delicate bell drops.",
    inStock: true,
  },
  {
    id: "chandbali-earrings",
    name: "Chandbali Earrings",
    price: 499,
    category: "earrings",
    image:
      "https://images.unsplash.com/photo-1778148046574-c1509f5a40d4?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Elegant crescent-shaped chandbali earrings with pearl accents.",
    inStock: true,
  },
  {
    id: "gold-kada-bangles",
    name: "Gold Kada Bangles (Set of 2)",
    price: 699,
    category: "bangles",
    image:
      "https://images.unsplash.com/photo-1606293926249-ed22e446d476?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description: "Heavy gold-plated kada bangles with carved floral motifs.",
    inStock: true,
  },
  {
    id: "stone-bangles-set",
    name: "Stone Bangles Set (Set of 4)",
    price: 899,
    category: "bangles",
    image:
      "https://images.unsplash.com/photo-1758995116383-f51775896add?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Set of 4 bangles with multicolor stone settings and gold plating.",
    inStock: true,
  },
  {
    id: "thali-chain-gold",
    name: "Thali Chain Gold",
    price: 499,
    category: "chains",
    image:
      "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description: "Traditional thali chain in 1 gram gold with secure clasp.",
    inStock: true,
  },
  {
    id: "black-beads-chain",
    name: "Black Beads Mangalsutra Chain",
    price: 599,
    category: "chains",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Classic black beads mangalsutra chain with gold pendant holder.",
    inStock: true,
  },
  {
    id: "peacock-ring",
    name: "Peacock Design Ring",
    price: 299,
    category: "rings",
    image:
      "https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Adjustable peacock design ring with green and blue stone work.",
    inStock: true,
  },
  {
    id: "lakshmi-ring",
    name: "Lakshmi Coin Ring",
    price: 349,
    category: "rings",
    image:
      "https://images.unsplash.com/photo-1627297704028-9aec233dc96a?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Traditional Lakshmi coin ring in gold finish, adjustable size.",
    inStock: true,
  },
  {
    id: "ruby-pendant",
    name: "Ruby Stone Pendant",
    price: 449,
    category: "pendants",
    image:
      "https://images.unsplash.com/photo-1661877574666-c6574f69fa9d?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Stunning ruby stone pendant with gold frame and matching bail.",
    inStock: true,
  },
  {
    id: "lakshmi-pendant",
    name: "Lakshmi Pendant",
    price: 399,
    category: "pendants",
    image:
      "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description: "Traditional Lakshmi pendant with detailed temple work.",
    inStock: true,
  },
  {
    id: "long-haram-gold",
    name: "Long Haram Gold Set",
    price: 1499,
    category: "harams",
    image:
      "https://images.unsplash.com/photo-1769706039344-7ad8d7ec2442?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Grand long haram with matching earrings. Perfect for weddings.",
    inStock: true,
  },
  {
    id: "chandraharam",
    name: "Chandraharam Chain",
    price: 999,
    category: "harams",
    image:
      "https://images.unsplash.com/photo-1770748146865-cd2c5c147518?w=600&h=600&fit=crop&crop=center&auto=format&q=80",
    description:
      "Multi-layer chandraharam with intricate gold work and stone highlights.",
    inStock: true,
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.inStock).slice(0, 8);
}
