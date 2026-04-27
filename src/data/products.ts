export type ProductStatus = "active" | "draft" | "sold_out";

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number | null;
  compareAtPrice: number | null;
  stock: number;
  colors: string[];
  tags: string[];
  images: string[];
  badge: "novo" | "mais-vendido" | "premium" | "";
  status: ProductStatus;
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
 * PRODUTOS BLIND — Catalogo Provisorio
 * ============================================
 * Apenas nome, imagem e descricao por enquanto.
 * Precos, botoes de compra e integracao com marketplace
 * serao adicionados em uma fase futura.
 *
 * Para adicionar imagens reais:
 * 1. Coloque o arquivo em public/products/
 * 2. Atualize o campo images abaixo
 *
 * Para ativar precos: preencha o campo price (ex: 129.90)
 * Para ativar marketplace: preencha marketplaceLinks
 * ============================================
 */
export const products: Product[] = [
  {
    id: "blind-classic-black",
    sku: "BLIND-CLB-001",
    name: "BLIND Classic Black",
    slug: "blind-classic-black",
    category: "wayfarer",
    description: "Oculos de sol estilo wayfarer classico, com design atemporal, armacao preta e visual urbano. Ideal para uso diario, praia, cidade e looks casuais. Protecao UV400.",
    fullDescription: "O BLIND Classic Black traz o estilo wayfarer que nunca sai de moda. Armacao preta solida com acabamento premium, lentes com protecao UV400 e design que combina com qualquer ocasiao. Do escritorio a praia, do casual ao sofisticado — este e o oculos que acompanha voce em todos os momentos.",
    price: 89.90,
    compareAtPrice: 149.90,
    stock: 50,
    colors: ["Preto"],
    tags: ["classico", "wayfarer", "urbano", "unissex"],
    images: ["/products/blind-classic-black.svg"],
    badge: "mais-vendido",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-aviator-gold",
    sku: "BLIND-AVG-002",
    name: "BLIND Aviator Gold",
    slug: "blind-aviator-gold",
    category: "aviator",
    description: "Oculos de sol estilo aviador, com armacao dourada e visual premium. Modelo versatil, inspirado no estilo piloto, ideal para praia, viagens e lifestyle. Protecao UV400.",
    fullDescription: "O BLIND Aviator Gold e o modelo para quem busca sofisticacao e versatilidade. Armacao metalica dourada com lentes escuras, design inspirado no classico aviador. Perfeito para viagens, praia e o dia a dia de quem tem estilo. Protecao UV400 total.",
    price: 129.90,
    compareAtPrice: 199.90,
    stock: 30,
    colors: ["Dourado/Preto", "Dourado/Verde"],
    tags: ["aviador", "metal", "premium", "unissex"],
    images: ["/products/blind-aviator-gold.svg"],
    badge: "premium",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-retro-round",
    sku: "BLIND-RTR-003",
    name: "BLIND Retro Round",
    slug: "blind-retro-round",
    category: "redondo",
    description: "Oculos de sol redondo retro, com estetica vintage e moderna ao mesmo tempo. Ideal para quem busca um visual alternativo, jovem e estiloso. Protecao UV400.",
    fullDescription: "O BLIND Retro Round e para quem tem personalidade. Design redondo com influencia vintage, armacao em acetato de alta qualidade e lentes com protecao UV400. Um modelo que transita entre o classico e o contemporaneo, perfeito para quem quer se destacar.",
    price: 79.90,
    compareAtPrice: 129.90,
    stock: 40,
    colors: ["Tartaruga", "Preto"],
    tags: ["retro", "redondo", "vintage", "unissex"],
    images: ["/products/blind-retro-round.svg"],
    badge: "novo",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-bold-square",
    sku: "BLIND-BLS-004",
    name: "BLIND Bold Square",
    slug: "blind-bold-square",
    category: "quadrado",
    description: "Oculos de sol quadrado oversized, com presenca forte e visual fashion. Modelo com estetica premium, ideal para looks marcantes e lifestyle urbano. Protecao UV400.",
    fullDescription: "O BLIND Bold Square impoe presenca. Design quadrado oversized com armacao robusta em acetato premium, lentes escuras com protecao UV400. Para quem nao tem medo de ser notado. Um modelo que eleva qualquer look para outro nivel.",
    price: 97.90,
    compareAtPrice: 159.90,
    stock: 35,
    colors: ["Preto Fosco", "Marrom"],
    tags: ["oversized", "quadrado", "fashion", "unissex"],
    images: ["/products/blind-bold-square.svg"],
    badge: "",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-sport-vision",
    sku: "BLIND-SPV-005",
    name: "BLIND Sport Vision",
    slug: "blind-sport-vision",
    category: "esportivo",
    description: "Oculos de sol esportivo, com visual dinamico e moderno. Ideal para corrida, bike, praia, atividades ao ar livre e uso casual esportivo. Protecao UV400.",
    fullDescription: "O BLIND Sport Vision e feito para quem vive em movimento. Design esportivo wraparound com armacao leve e resistente, lentes com protecao UV400 e visual moderno. Da trilha a cidade, do treino ao passeio — performance e estilo em um so modelo.",
    price: 97.90,
    compareAtPrice: 149.90,
    stock: 40,
    colors: ["Preto/Azul", "Preto/Vermelho"],
    tags: ["esportivo", "wraparound", "ativo", "unissex"],
    images: ["/products/blind-sport-vision.svg"],
    badge: "novo",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
];
