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
export const PRODUCT_PRICES: Record<string, { priceInCents: number; name: string }> = {
  "blind-classic-black": { priceInCents: 12990, name: "BLIND Classic Black" },
  "blind-aviator-gold": { priceInCents: 14990, name: "BLIND Aviator Gold" },
  "blind-retro-round": { priceInCents: 11990, name: "BLIND Retro Round" },
  "blind-bold-square": { priceInCents: 13990, name: "BLIND Bold Square" },
  "blind-sport-vision": { priceInCents: 12990, name: "BLIND Sport Vision" },
};
