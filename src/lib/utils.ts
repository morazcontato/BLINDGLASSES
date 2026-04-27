import { Product } from "@/data/products";

/**
 * ============================================
 * CONFIGURACAO — Editar aqui
 * ============================================
 */
export const WHATSAPP_NUMBER = "5500000000000"; // Substituir pelo numero real
export const INSTAGRAM_HANDLE = "blind.glasses"; // Substituir pelo @ real

/**
 * ============================================
 * Busca e filtro de produtos
 * ============================================
 */
export function getProductBySlug(products: Product[], slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductBySku(products: Product[], sku: string) {
  return products.find((p) => p.sku === sku) ?? null;
}

export function getProductsByCategory(products: Product[], category: string) {
  return products.filter((p) => p.category === category);
}

export function getProductsByTag(products: Product[], tag: string) {
  return products.filter((p) => p.tags.includes(tag));
}

/**
 * ============================================
 * Links
 * ============================================
 */
export function getWhatsAppLink(product?: Product) {
  const message = product
    ? `Ola! Tenho interesse no modelo ${product.name} (SKU: ${product.sku}). Poderia me enviar mais informacoes?`
    : "Ola! Gostaria de saber mais sobre os oculos BLIND.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getInstagramLink() {
  return `https://instagram.com/${INSTAGRAM_HANDLE}`;
}

/**
 * ============================================
 * Formatacao
 * ============================================
 */
export function formatPrice(value: number | null) {
  if (!value) return "Preco em breve";
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/**
 * ============================================
 * Tracking (preparado para integracao futura)
 * ============================================
 *
 * Meta Pixel:
 *   fbq('track', eventName, data);
 *
 * Google Analytics (gtag):
 *   gtag('event', eventName, data);
 *
 * TikTok Pixel:
 *   ttq.track(eventName, data);
 */
export function trackEvent(eventName: string, data?: Record<string, string>) {
  // Descomentar quando pixels estiverem ativos:
  // if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', eventName, data);
  // if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', eventName, data);
  // if (typeof window !== 'undefined' && (window as any).ttq) (window as any).ttq.track(eventName, data);
  void eventName;
  void data;
}
