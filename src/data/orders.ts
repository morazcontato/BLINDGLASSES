/**
 * ============================================
 * BLIND - Sistema de Pedidos
 * ============================================
 * Tipos e estrutura de dados para gerenciamento de pedidos.
 * Armazenamento: localStorage (migrar para Supabase no futuro)
 *
 * INTEGRACOES FUTURAS:
 * - Supabase: migrar storage para banco real
 * - Shopify / WooCommerce: webhooks de pedidos
 * - Mercado Livre / Shopee / TikTok Shop: sync de pedidos
 * - WhatsApp API: notificacoes
 * - Telegram Bot: notificacoes
 * ============================================
 */

export type OrderOrigin = "site" | "shopee" | "mercado-livre" | "tiktok-shop" | "manual";

export type OrderStatus =
  | "novo"
  | "aguardando-checkout"
  | "checkout-feito"
  | "aguardando-rastreio"
  | "enviado"
  | "entregue"
  | "cancelado"
  | "problema-fornecedor";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  novo: "Novo pedido recebido",
  "aguardando-checkout": "Aguardando checkout no fornecedor",
  "checkout-feito": "Checkout feito",
  "aguardando-rastreio": "Aguardando codigo de rastreio",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
  "problema-fornecedor": "Problema com fornecedor",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  novo: "bg-blue-100 text-blue-700",
  "aguardando-checkout": "bg-yellow-100 text-yellow-700",
  "checkout-feito": "bg-indigo-100 text-indigo-700",
  "aguardando-rastreio": "bg-orange-100 text-orange-700",
  enviado: "bg-purple-100 text-purple-700",
  entregue: "bg-green-100 text-green-700",
  cancelado: "bg-red-100 text-red-700",
  "problema-fornecedor": "bg-red-100 text-red-700",
};

export const ORDER_ORIGIN_LABELS: Record<OrderOrigin, string> = {
  site: "Site BLIND",
  shopee: "Shopee",
  "mercado-livre": "Mercado Livre",
  "tiktok-shop": "TikTok Shop",
  manual: "Manual",
};

export interface OrderAddress {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderTracking {
  code: string;
  carrier: string;
  estimatedDelivery: string;
  notes: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  origin: OrderOrigin;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;

  // Cliente
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: OrderAddress;

  // Produto
  productId: string;
  productName: string;
  productVariant: string;
  quantity: number;

  // Financeiro
  customerPaid: number;
  supplierCost: number;
  estimatedProfit: number;

  // Fornecedor
  supplierLink: string;
  supplierCheckoutDone: boolean;
  supplierCheckoutDate: string;

  // Rastreio
  tracking: OrderTracking | null;

  // Observacoes
  notes: string;
}

export interface Supplier {
  id: string;
  productName: string;
  sku: string;
  supplierLink: string;
  baseCost: number;
  estimatedDays: number;
  packagingNotes: string;
  acceptsDropshipping: boolean;
  defaultMessage: string;
}

// --- Storage helpers (localStorage, migrar para Supabase depois) ---

const ORDERS_KEY = "blind_orders";
const SUPPLIERS_KEY = "blind_suppliers";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): Order | null {
  return getOrders().find((o) => o.id === id) ?? null;
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function updateOrder(id: string, updates: Partial<Order>) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return;
  orders[idx] = { ...orders[idx], ...updates, updatedAt: new Date().toISOString() };
  saveOrders(orders);
}

export function deleteOrder(id: string) {
  const orders = getOrders().filter((o) => o.id !== id);
  saveOrders(orders);
}

export function getSuppliers(): Supplier[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(SUPPLIERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveSuppliers(suppliers: Supplier[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUPPLIERS_KEY, JSON.stringify(suppliers));
}

export function addSupplier(supplier: Supplier) {
  const suppliers = getSuppliers();
  suppliers.push(supplier);
  saveSuppliers(suppliers);
}

export function updateSupplier(id: string, updates: Partial<Supplier>) {
  const suppliers = getSuppliers();
  const idx = suppliers.findIndex((s) => s.id === id);
  if (idx === -1) return;
  suppliers[idx] = { ...suppliers[idx], ...updates };
  saveSuppliers(suppliers);
}

export function deleteSupplier(id: string) {
  const suppliers = getSuppliers().filter((s) => s.id !== id);
  saveSuppliers(suppliers);
}

// --- Utilidades ---

export function generateOrderNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const r = Math.floor(Math.random() * 9000 + 1000);
  return `BL${y}${m}${d}-${r}`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function formatAddress(addr: OrderAddress): string {
  const parts = [
    `${addr.street}, ${addr.number}`,
    addr.complement,
    addr.neighborhood,
    `${addr.city} - ${addr.state}`,
    `CEP: ${addr.zipCode}`,
    addr.country || "Brasil",
  ].filter(Boolean);
  return parts.join("\n");
}

export function generateSupplierMessage(supplier: Supplier, order: Order): string {
  const base =
    supplier.defaultMessage ||
    "Ola, tudo bem? Fiz um pedido de oculos para envio direto ao cliente final. Por favor, enviar sem nota fiscal com valor, sem etiqueta da loja de voces e com embalagem bem protegida. Endereco de envio abaixo:";

  return `${base}\n\n${formatAddress(order.customerAddress)}\n\nProduto: ${order.productName}\nVariacao: ${order.productVariant}\nQuantidade: ${order.quantity}`;
}
