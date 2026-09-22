import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "traditional-gold-necklace",
    name: "Traditional Gold Necklace",
    price: 599,
    category: "necklaces",
    image: "/images/products/traditional-gold-necklace.jpg",
    description:
      "Beautiful 1 gram gold necklace with traditional temple design. Perfect for festivals and celebrations.",
    inStock: true,
  },
  {
    id: "kundan-choker-necklace",
    name: "Kundan Choker Necklace",
    price: 799,
    category: "necklaces",
    image: "/images/products/kundan-choker-necklace.jpg",
    description:
      "Exquisite kundan work choker necklace with intricate stone settings.",
    inStock: true,
  },
  {
    id: "temple-jhumka-earrings",
    name: "Temple Jhumka Earrings",
    price: 399,
    category: "earrings",
    image: "/images/products/temple-jhumka-earrings.jpg",
    description:
      "Classic temple-style jhumka earrings with delicate bell drops.",
    inStock: true,
  },
  {
    id: "chandbali-earrings",
    name: "Chandbali Earrings",
    price: 499,
    category: "earrings",
    image: "/images/products/chandbali-earrings.jpg",
    description:
      "Elegant crescent-shaped chandbali earrings with pearl accents.",
    inStock: true,
  },
  {
    id: "gold-kada-bangles",
    name: "Gold Kada Bangles (Set of 2)",
    price: 699,
    category: "bangles",
    image: "/images/products/gold-kada-bangles.jpg",
    description: "Heavy gold-plated kada bangles with carved floral motifs.",
    inStock: true,
  },
  {
    id: "stone-bangles-set",
    name: "Stone Bangles Set (Set of 4)",
    price: 899,
    category: "bangles",
    image: "/images/products/stone-bangles-set.jpg",
    description:
      "Set of 4 bangles with multicolor stone settings and gold plating.",
    inStock: true,
  },
  {
    id: "thali-chain-gold",
    name: "Thali Chain Gold",
    price: 499,
    category: "chains",
    image: "/images/products/thali-chain-gold.jpg",
    description: "Traditional thali chain in 1 gram gold with secure clasp.",
    inStock: true,
  },
  {
    id: "black-beads-chain",
    name: "Black Beads Mangalsutra Chain",
    price: 599,
    category: "chains",
    image: "/images/products/black-beads-chain.jpg",
    description:
      "Classic black beads mangalsutra chain with gold pendant holder.",
    inStock: true,
  },
  {
    id: "peacock-ring",
    name: "Peacock Design Ring",
    price: 299,
    category: "rings",
    image: "/images/products/peacock-ring.jpg",
    description:
      "Adjustable peacock design ring with green and blue stone work.",
    inStock: true,
  },
  {
    id: "lakshmi-ring",
    name: "Lakshmi Coin Ring",
    price: 349,
    category: "rings",
    image: "/images/products/lakshmi-ring.jpg",
    description:
      "Traditional Lakshmi coin ring in gold finish, adjustable size.",
    inStock: true,
  },
  {
    id: "ruby-pendant",
    name: "Ruby Stone Pendant",
    price: 449,
    category: "pendants",
    image: "/images/products/ruby-pendant.jpg",
    description:
      "Stunning ruby stone pendant with gold frame and matching bail.",
    inStock: true,
  },
  {
    id: "lakshmi-pendant",
    name: "Lakshmi Pendant",
    price: 399,
    category: "pendants",
    image: "/images/products/lakshmi-pendant.jpg",
    description: "Traditional Lakshmi pendant with detailed temple work.",
    inStock: true,
  },
  {
    id: "long-haram-gold",
    name: "Long Haram Gold Set",
    price: 1499,
    category: "harams",
    image: "/images/products/long-haram-gold.jpg",
    description:
      "Grand long haram with matching earrings. Perfect for weddings.",
    inStock: true,
  },
  {
    id: "chandraharam",
    name: "Chandraharam Chain",
    price: 999,
    category: "harams",
    image: "/images/products/chandraharam.jpg",
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
