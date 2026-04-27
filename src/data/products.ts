export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number | null;
  oldPrice: number | null;
  stock: number;
  tags: string[];
  images: string[];
  variants: string[];
  badge: "novo" | "mais-vendido" | "premium" | "";
  marketplaceLinks: {
    tiktokShop: string;
    shopee: string;
    mercadoLivre: string;
  };
  externalIds: {
    tiktokShopId: string;
    shopeeItemId: string;
    mercadoLivreItemId: string;
  };
}

/**
 * ============================================
 * PRODUTOS BLIND
 * ============================================
 * Para adicionar/editar produtos:
 * 1. Edite os dados abaixo
 * 2. Coloque imagens em public/products/
 * 3. Preencha price quando tiver preco (ex: 149.90)
 * 4. Adicione links de marketplace quando as lojas estiverem ativas
 *
 * INTEGRACOES FUTURAS:
 * - API Shopee: preencher marketplaceLinks.shopee
 * - API Mercado Livre: preencher marketplaceLinks.mercadoLivre
 * - API TikTok Shop: preencher marketplaceLinks.tiktokShop
 * ============================================
 */
export const products: Product[] = [
  {
    id: "1",
    sku: "BLIND-AVI-001",
    name: "BLIND Aviator Classic",
    slug: "blind-aviator-classic",
    category: "aviator",
    description: "O classico que nunca sai de moda. Armacao metalica com lentes escuras.",
    fullDescription: "O modelo Aviator Classic da BLIND traz o design atemporal do aviador com acabamento premium. Lentes com protecao UV400 e armacao em metal leve.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["classico", "metal", "unissex"],
    images: ["/products/aviator-classic.jpg"],
    variants: ["Preto", "Dourado"],
    badge: "mais-vendido",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "2",
    sku: "BLIND-SPT-002",
    name: "BLIND Sport UV",
    slug: "blind-sport-uv",
    category: "esportivo",
    description: "Para quem vive em movimento. Leve, resistente e com protecao total.",
    fullDescription: "O BLIND Sport UV e ideal para atividades ao ar livre. Design esportivo com lentes polarizadas e armacao flexivel.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["esportivo", "polarizado", "unissex"],
    images: ["/products/sport-uv.jpg"],
    variants: ["Preto/Azul", "Preto/Vermelho"],
    badge: "novo",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "3",
    sku: "BLIND-RND-003",
    name: "BLIND Round Vintage",
    slug: "blind-round-vintage",
    category: "redondo",
    description: "Estilo retro com personalidade. Armacao acetato e lentes degrade.",
    fullDescription: "O Round Vintage da BLIND combina o charme retro com materiais modernos. Armacao em acetato de alta qualidade com lentes degrade.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["retro", "acetato", "unissex"],
    images: ["/products/round-vintage.jpg"],
    variants: ["Tartaruga", "Preto"],
    badge: "",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "4",
    sku: "BLIND-SQR-004",
    name: "BLIND Square Bold",
    slug: "blind-square-bold",
    category: "quadrado",
    description: "Linhas retas e atitude. O modelo que impoe presenca.",
    fullDescription: "O Square Bold e para quem quer se destacar. Design quadrado oversized com armacao robusta em acetato premium.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["oversized", "acetato", "unissex"],
    images: ["/products/square-bold.jpg"],
    variants: ["Preto Fosco", "Marrom"],
    badge: "premium",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "5",
    sku: "BLIND-CAT-005",
    name: "BLIND Cat Eye",
    slug: "blind-cat-eye",
    category: "cat-eye",
    description: "Elegancia e sofisticacao. O gatinho moderno da BLIND.",
    fullDescription: "O Cat Eye combina feminilidade e modernidade. Armacao em acetato com detalhes metalicos e lentes com protecao UV400.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["feminino", "acetato", "elegante"],
    images: ["/products/cat-eye.jpg"],
    variants: ["Preto", "Rosa"],
    badge: "novo",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "6",
    sku: "BLIND-WFR-006",
    name: "BLIND Wayfarer Street",
    slug: "blind-wayfarer-street",
    category: "wayfarer",
    description: "O coringa do guarda-roupa. Combina com tudo, o dia inteiro.",
    fullDescription: "O Wayfarer Street e o modelo mais versatil da BLIND. Design classico wayfarer com armacao leve e confortavel para uso diario.",
    price: null,
    oldPrice: null,
    stock: 0,
    tags: ["classico", "versatil", "unissex"],
    images: ["/products/wayfarer-street.jpg"],
    variants: ["Preto", "Azul Fosco"],
    badge: "",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    externalIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
];
