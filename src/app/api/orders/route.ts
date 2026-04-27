import { NextResponse } from "next/server";

/**
 * ============================================
 * BLIND - API de Pedidos
 * ============================================
 * Endpoint REST para integracao futura com:
 * - Shopify webhooks
 * - WooCommerce webhooks
 * - Mercado Livre API
 * - Shopee API
 * - TikTok Shop API
 *
 * Atualmente os pedidos sao gerenciados via localStorage no admin.
 * Esta API serve como ponto de entrada para integracao externa.
 *
 * Exemplo de uso futuro:
 *   POST /api/orders
 *   Body: { origin: "shopee", customerName: "...", ... }
 * ============================================
 */

export async function GET() {
  return NextResponse.json({
    message: "BLIND Orders API",
    version: "1.0",
    endpoints: {
      "POST /api/orders": "Criar pedido (integracao futura)",
      "POST /api/notify": "Notificar admin sobre novo pedido",
    },
  });
}

export async function POST() {
  // TODO: Receber pedidos de webhooks externos
  // Quando Supabase estiver configurado, salvar diretamente no banco
  // Por enquanto, retorna placeholder
  return NextResponse.json(
    {
      success: false,
      message: "Integracao de pedidos em construcao. Use o painel admin para criar pedidos.",
    },
    { status: 501 }
  );
}
