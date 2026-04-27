export type ProductStatus = "active" | "draft" | "sold_out";

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  bullets: string[];
  price: number | null;
  compareAtPrice: number | null;
  cost: number;
  stock: number;
  colors: string[];
  tags: string[];
  images: string[];
  thumbnail: string;
  badge: "novo" | "mais-vendido" | "premium" | "";
  status: ProductStatus;
  supplier: string;
  supplierUrl: string;
  marketplaceLinks: {
    tiktokShop: string;
    shopee: string;
    mercadoLivre: string;
  };
  marketplaceIds: {
    tiktokShopId: string;
    shopeeItemId: string;
    mercadoLivreItemId: string;
  };
}

/**
 * ============================================
 * PRODUTOS BLIND
 * ============================================
 * Catálogo com dados de fornecedor, preços otimizados
 * e imagens organizadas.
 *
 * Imagens:
 * - Principal: public/products/sunglasses/{slug}.webp
 * - Thumbnail: public/products/sunglasses/thumbs/{slug}-thumb.webp
 *
 * Para trocar imagens:
 * 1. Coloque o arquivo em public/products/sunglasses/
 * 2. Gere thumb com max 500px em thumbs/
 * 3. Formato .webp, qualidade 72-82
 * ============================================
 */
export const products: Product[] = [
  {
    id: "blind-classic-black",
    sku: "BLIND-CLB-001",
    name: "BLIND Classic Black",
    slug: "blind-classic-black",
    category: "wayfarer",
    type: "Wayfarer",
    description: "Óculos de sol com design atemporal, proteção UV400 e visual premium para uso diário.",
    fullDescription: "O BLIND Classic Black traz o estilo wayfarer que nunca sai de moda. Armação preta sólida com acabamento premium, lentes com proteção UV400 e design que combina com qualquer ocasião. Do escritório à praia, do casual ao sofisticado — este é o óculos que acompanha você em todos os momentos.",
    bullets: ["Proteção UV400", "Design clássico", "Estrutura leve", "Estilo premium"],
    price: 99.00,
    compareAtPrice: 149.90,
    cost: 28,
    stock: 50,
    colors: ["Preto"],
    tags: ["clássico", "wayfarer", "urbano", "unissex"],
    images: ["/products/sunglasses/blind-classic-black.webp"],
    thumbnail: "/products/sunglasses/thumbs/blind-classic-black-thumb.webp",
    badge: "mais-vendido",
    status: "active",
    supplier: "KINGSEVEN",
    supplierUrl: "https://pt.aliexpress.com/item/1005001626089803.html",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-aviator-gold",
    sku: "BLIND-AVG-002",
    name: "BLIND Aviator Gold",
    slug: "blind-aviator-gold",
    category: "aviator",
    type: "Aviador",
    description: "Óculos aviador com acabamento elegante, lentes com proteção UV400 e presença marcante.",
    fullDescription: "O BLIND Aviator Gold é o modelo para quem busca sofisticação e versatilidade. Armação metálica dourada com lentes escuras, design inspirado no clássico aviador. Perfeito para viagens, praia e o dia a dia de quem tem estilo. Proteção UV400 total.",
    bullets: ["Proteção UV400", "Estilo aviador", "Acabamento premium", "Visual sofisticado"],
    price: 109.00,
    compareAtPrice: 199.90,
    cost: 32,
    stock: 30,
    colors: ["Dourado/Preto", "Dourado/Verde"],
    tags: ["aviador", "metal", "premium", "unissex"],
    images: ["/products/sunglasses/blind-aviator-gold.webp"],
    thumbnail: "/products/sunglasses/thumbs/blind-aviator-gold-thumb.webp",
    badge: "premium",
    status: "active",
    supplier: "VEITHDIA",
    supplierUrl: "https://pt.aliexpress.com/item/32856986768.html",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-retro-round",
    sku: "BLIND-RTR-003",
    name: "BLIND Retro Round",
    slug: "blind-retro-round",
    category: "redondo",
    type: "Retrô redondo",
    description: "Modelo redondo retrô com estética moderna, leve e versátil.",
    fullDescription: "O BLIND Retro Round é para quem tem personalidade. Design redondo com influência vintage, armação em acetato de alta qualidade e lentes com proteção UV400. Um modelo que transita entre o clássico e o contemporâneo, perfeito para quem quer se destacar.",
    bullets: ["Proteção UV400", "Design retrô", "Leve e confortável", "Visual moderno"],
    price: 89.00,
    compareAtPrice: 129.90,
    cost: 25,
    stock: 40,
    colors: ["Tartaruga", "Preto"],
    tags: ["retrô", "redondo", "vintage", "unissex"],
    images: ["/products/sunglasses/blind-retro-round.webp"],
    thumbnail: "/products/sunglasses/thumbs/blind-retro-round-thumb.webp",
    badge: "novo",
    status: "active",
    supplier: "BARCUR",
    supplierUrl: "https://pt.aliexpress.com/item/4000212352383.html",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-bold-square",
    sku: "BLIND-BLS-004",
    name: "BLIND Bold Square",
    slug: "blind-bold-square",
    category: "quadrado",
    type: "Quadrado grande",
    description: "Óculos quadrado grande com presença forte, ideal para um visual urbano e premium.",
    fullDescription: "O BLIND Bold Square impõe presença. Design quadrado oversized com armação robusta em acetato premium, lentes escuras com proteção UV400. Para quem não tem medo de ser notado. Um modelo que eleva qualquer look para outro nível.",
    bullets: ["Proteção UV400", "Formato quadrado", "Visual marcante", "Alta percepção de valor"],
    price: 129.00,
    compareAtPrice: 199.90,
    cost: 35,
    stock: 35,
    colors: ["Preto Fosco", "Marrom"],
    tags: ["oversized", "quadrado", "fashion", "unissex"],
    images: ["/products/sunglasses/blind-bold-square.webp"],
    thumbnail: "/products/sunglasses/thumbs/blind-bold-square-thumb.webp",
    badge: "",
    status: "active",
    supplier: "VEITHDIA",
    supplierUrl: "https://pt.aliexpress.com/item/1005004932112195.html",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-sport-vision",
    sku: "BLIND-SPV-005",
    name: "BLIND Sport Vision",
    slug: "blind-sport-vision",
    category: "esportivo",
    type: "Esportivo",
    description: "Óculos esportivo com design moderno, proteção UV400 e pegada performance.",
    fullDescription: "O BLIND Sport Vision é feito para quem vive em movimento. Design esportivo wraparound com armação leve e resistente, lentes com proteção UV400 e visual moderno. Da trilha à cidade, do treino ao passeio — performance e estilo em um só modelo.",
    bullets: ["Proteção UV400", "Modelo esportivo", "Design aerodinâmico", "Ideal para uso externo"],
    price: 149.00,
    compareAtPrice: 249.90,
    cost: 42,
    stock: 40,
    colors: ["Preto/Azul", "Preto/Vermelho"],
    tags: ["esportivo", "wraparound", "ativo", "unissex"],
    images: ["/products/sunglasses/blind-sport-vision.webp"],
    thumbnail: "/products/sunglasses/thumbs/blind-sport-vision-thumb.webp",
    badge: "novo",
    status: "active",
    supplier: "KINGSEVEN",
    supplierUrl: "https://pt.aliexpress.com/item/1005001807428145.html",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
];
