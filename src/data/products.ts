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
 * PRODUTOS BLIND
 * ============================================
 * Para adicionar/editar produtos:
 * 1. Edite os dados abaixo
 * 2. Coloque imagens em public/products/
 * 3. Preencha price quando tiver preco (ex: 149.90)
 * 4. Adicione links de marketplace quando as lojas estiverem ativas
 * 5. Mude status para "active" quando pronto para vender
 *
 * STATUS:
 * - "active"   -> visivel no catalogo e na landing
 * - "draft"    -> oculto do catalogo (em preparacao)
 * - "sold_out" -> visivel mas sem botao de compra
 * ============================================
 */
export const products: Product[] = [
  {
    id: "blind-001",
    sku: "BLIND-AVI-001",
    name: "BLIND Aviator Classic",
    slug: "blind-aviator-classic",
    category: "aviator",
    description: "O classico que nunca sai de moda. Armacao metalica com lentes escuras.",
    fullDescription: "O modelo Aviator Classic da BLIND traz o design atemporal do aviador com acabamento premium. Lentes com protecao UV400 e armacao em metal leve. Ideal para quem busca elegancia com versatilidade.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Preto", "Dourado"],
    tags: ["classico", "metal", "unissex"],
    images: ["/products/aviator-classic.jpg"],
    badge: "mais-vendido",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-002",
    sku: "BLIND-SPT-002",
    name: "BLIND Sport UV",
    slug: "blind-sport-uv",
    category: "esportivo",
    description: "Para quem vive em movimento. Leve, resistente e com protecao total.",
    fullDescription: "O BLIND Sport UV e ideal para atividades ao ar livre. Design esportivo com lentes polarizadas e armacao flexivel. Perfeito para esportes e uso diario.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Preto/Azul", "Preto/Vermelho"],
    tags: ["esportivo", "polarizado", "unissex"],
    images: ["/products/sport-uv.jpg"],
    badge: "novo",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-003",
    sku: "BLIND-RND-003",
    name: "BLIND Round Vintage",
    slug: "blind-round-vintage",
    category: "redondo",
    description: "Estilo retro com personalidade. Armacao acetato e lentes degrade.",
    fullDescription: "O Round Vintage da BLIND combina o charme retro com materiais modernos. Armacao em acetato de alta qualidade com lentes degrade. Para quem quer personalidade no visual.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Tartaruga", "Preto"],
    tags: ["retro", "acetato", "unissex"],
    images: ["/products/round-vintage.jpg"],
    badge: "",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-004",
    sku: "BLIND-SQR-004",
    name: "BLIND Square Bold",
    slug: "blind-square-bold",
    category: "quadrado",
    description: "Linhas retas e atitude. O modelo que impoe presenca.",
    fullDescription: "O Square Bold e para quem quer se destacar. Design quadrado oversized com armacao robusta em acetato premium. Presenca garantida.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Preto Fosco", "Marrom"],
    tags: ["oversized", "acetato", "unissex"],
    images: ["/products/square-bold.jpg"],
    badge: "premium",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-005",
    sku: "BLIND-CAT-005",
    name: "BLIND Cat Eye",
    slug: "blind-cat-eye",
    category: "cat-eye",
    description: "Elegancia e sofisticacao. O gatinho moderno da BLIND.",
    fullDescription: "O Cat Eye combina feminilidade e modernidade. Armacao em acetato com detalhes metalicos e lentes com protecao UV400. Sofisticacao para o dia a dia.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Preto", "Rosa"],
    tags: ["feminino", "acetato", "elegante"],
    images: ["/products/cat-eye.jpg"],
    badge: "novo",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
  {
    id: "blind-006",
    sku: "BLIND-WFR-006",
    name: "BLIND Wayfarer Street",
    slug: "blind-wayfarer-street",
    category: "wayfarer",
    description: "O coringa do guarda-roupa. Combina com tudo, o dia inteiro.",
    fullDescription: "O Wayfarer Street e o modelo mais versatil da BLIND. Design classico wayfarer com armacao leve e confortavel para uso diario. Combina com qualquer estilo.",
    price: null,
    compareAtPrice: null,
    stock: 0,
    colors: ["Preto", "Azul Fosco"],
    tags: ["classico", "versatil", "unissex"],
    images: ["/products/wayfarer-street.jpg"],
    badge: "",
    status: "active",
    marketplaceLinks: { tiktokShop: "", shopee: "", mercadoLivre: "" },
    marketplaceIds: { tiktokShopId: "", shopeeItemId: "", mercadoLivreItemId: "" },
  },
];
