import { NextRequest, NextResponse } from "next/server";
import { stripe, PRODUCT_PRICES } from "@/lib/stripe";

/**
 * ============================================
 * BLIND - Stripe Checkout API
 * ============================================
 * Cria uma Stripe Checkout Session segura.
 * O preco e validado no backend contra PRODUCT_PRICES.
 * Nunca confia no preco enviado pelo frontend.
 * ============================================
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    // Validar produto
    const productPrice = PRODUCT_PRICES[productId];
    if (!productPrice) {
      console.error(`[Stripe] Produto nao encontrado: ${productId}`);
      return NextResponse.json(
        { error: "Produto nao encontrado" },
        { status: 400 }
      );
    }

    // Validar quantidade
    const qty = Math.max(1, Math.min(10, Math.floor(quantity)));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Criar Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "brl",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: productPrice.name,
              description: "Oculos de sol BLIND - Protecao UV400",
              images: [`${siteUrl}/logo/BLINDLOGO.png`],
            },
            unit_amount: productPrice.priceInCents,
          },
          quantity: qty,
        },
      ],
      success_url: `${siteUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/carrinho`,
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      metadata: {
        productId,
        productName: productPrice.name,
      },
    });

    console.log(`[Stripe] Session criada: ${session.id} | Produto: ${productPrice.name} | Qty: ${qty}`);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[Stripe] Erro ao criar session:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
