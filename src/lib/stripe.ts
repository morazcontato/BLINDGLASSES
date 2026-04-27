import Stripe from "stripe";

/**
 * ============================================
 * BLIND - Stripe Server-Side
 * ============================================
 * Instancia do Stripe para uso APENAS no backend (API routes).
 * A STRIPE_SECRET_KEY nunca e exposta no frontend.
 * ============================================
 */

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

/**
 * Lista interna de precos validados no backend.
 * O preco vindo do frontend NAO e confiavel.
 * Sempre validar contra esta lista antes de criar a session.
 *
 * Para adicionar/editar precos:
 * 1. Atualize esta lista
 * 2. Atualize o campo price em src/data/products.ts (para exibicao)
 */
/**
 * PRICING STRATEGY:
 * - Custo total = produto + frete (~R$23-33)
 * - Multiplicador: 3x a 4x
 * - Margem minima: 200%
 * - Precos quebrados para conversao
 * - 20%+ embutido para cupons
 * - Ancora de valor (compareAtPrice no products.ts)
 */
export const PRODUCT_PRICES: Record<string, { priceInCents: number; name: string }> = {
  "blind-classic-black": { priceInCents: 8990, name: "BLIND Classic Black" },
  "blind-aviator-gold": { priceInCents: 12990, name: "BLIND Aviator Gold" },
  "blind-retro-round": { priceInCents: 7990, name: "BLIND Retro Round" },
  "blind-bold-square": { priceInCents: 9790, name: "BLIND Bold Square" },
  "blind-sport-vision": { priceInCents: 9790, name: "BLIND Sport Vision" },
};
