import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

/**
 * Preços validados no backend (em centavos BRL).
 * O frontend NÃO define o preço — sempre validar aqui.
 *
 * Atualizar junto com products.ts ao mudar preços.
 */
export const PRODUCT_PRICES: Record<string, { priceInCents: number; name: string }> = {
  "blind-classic-black": { priceInCents: 9900, name: "BLIND Classic Black" },
  "blind-aviator-gold": { priceInCents: 10900, name: "BLIND Aviator Gold" },
  "blind-retro-round": { priceInCents: 8900, name: "BLIND Retro Round" },
  "blind-bold-square": { priceInCents: 12900, name: "BLIND Bold Square" },
  "blind-sport-vision": { priceInCents: 14900, name: "BLIND Sport Vision" },
};
