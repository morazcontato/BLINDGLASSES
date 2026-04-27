import { NextRequest, NextResponse } from "next/server";

/**
 * ============================================
 * BLIND - API de Notificacao de Pedidos
 * ============================================
 * Envia notificacao quando um novo pedido e criado.
 *
 * Implementacao atual: log no console (placeholder para e-mail)
 *
 * INTEGRACOES FUTURAS:
 *
 * E-mail (Resend, SendGrid, Nodemailer):
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'BLIND <pedidos@blindglasses.com.br>',
 *     to: process.env.ADMIN_EMAIL,
 *     subject: `Novo pedido ${order.orderNumber}`,
 *     html: emailTemplate
 *   });
 *
 * WhatsApp (via API):
 *   await fetch(`https://api.whatsapp.com/...`, { body: message });
 *
 * Telegram Bot:
 *   await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
 *     body: JSON.stringify({ chat_id: CHAT_ID, text: message })
 *   });
 * ============================================
 */

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

    // Log da notificacao (substituir por email real depois)
    console.log("=== NOVO PEDIDO BLIND ===");
    console.log(`Pedido: ${order.orderNumber}`);
    console.log(`Produto: ${order.productName}`);
    console.log(`Valor: R$ ${order.customerPaid?.toFixed(2)}`);
    console.log(`Cliente: ${order.customerName}`);
    console.log(`Fornecedor: ${order.supplierLink}`);
    console.log("========================");

    // Placeholder: montar template de email
    const _emailTemplate = `
      <h2>Novo Pedido BLIND - ${order.orderNumber}</h2>
      <p><strong>Produto:</strong> ${order.productName} ${order.productVariant ? `(${order.productVariant})` : ""}</p>
      <p><strong>Valor:</strong> R$ ${order.customerPaid?.toFixed(2)}</p>
      <p><strong>Cliente:</strong> ${order.customerName}</p>
      <p><strong>Fornecedor:</strong> <a href="${order.supplierLink}">${order.supplierLink}</a></p>
      <p><strong>Endereco:</strong><br>
        ${order.customerAddress?.street}, ${order.customerAddress?.number}<br>
        ${order.customerAddress?.neighborhood}<br>
        ${order.customerAddress?.city} - ${order.customerAddress?.state}<br>
        CEP: ${order.customerAddress?.zipCode}
      </p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/pedido/${order.id}">Abrir pedido no painel</a></p>
    `;

    // TODO: Descomentar quando configurar servico de email:
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL!,
    //   subject: `Novo pedido BLIND - ${order.orderNumber}`,
    //   html: emailTemplate,
    // });

    return NextResponse.json({ success: true, message: "Notificacao enviada" });
  } catch {
    return NextResponse.json({ success: false, message: "Erro ao notificar" }, { status: 500 });
  }
}
