"use client";

import { useState } from "react";
import {
  Order,
  updateOrder,
  formatAddress,
  getSuppliers,
  generateSupplierMessage,
} from "@/data/orders";

interface SupplierCheckoutProps {
  order: Order;
  onUpdate: () => void;
}

export default function SupplierCheckout({ order, onUpdate }: SupplierCheckoutProps) {
  const [copied, setCopied] = useState("");
  const suppliers = getSuppliers();
  const supplier = suppliers.find((s) => s.supplierLink === order.supplierLink);

  const formattedAddress = formatAddress(order.customerAddress);
  const supplierMessage = supplier
    ? generateSupplierMessage(supplier, order)
    : `Endereco de envio:\n\n${formattedAddress}\n\nProduto: ${order.productName}\nVariacao: ${order.productVariant}\nQuantidade: ${order.quantity}`;

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  function markCheckoutDone() {
    updateOrder(order.id, {
      supplierCheckoutDone: true,
      supplierCheckoutDate: new Date().toISOString(),
      status: "checkout-feito",
    });
    onUpdate();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-bold mb-4">Comprar no fornecedor</h3>

      <div className="space-y-4">
        {/* Produto */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Produto
          </p>
          <p className="text-sm font-medium">{order.productName}</p>
          {order.productVariant && (
            <p className="text-sm text-gray-500">Variacao: {order.productVariant}</p>
          )}
          <p className="text-sm text-gray-500">Quantidade: {order.quantity}</p>
        </div>

        {/* Link fornecedor */}
        {order.supplierLink && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Link do fornecedor
            </p>
            <a
              href={order.supplierLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Abrir fornecedor
            </a>
          </div>
        )}

        {/* Endereco */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Endereco do cliente
          </p>
          <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap font-sans">
            {formattedAddress}
          </pre>
          <button
            onClick={() => copyToClipboard(formattedAddress, "endereco")}
            className="mt-2 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copied === "endereco" ? "Copiado!" : "Copiar endereco"}
          </button>
        </div>

        {/* Mensagem para fornecedor */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Mensagem para fornecedor
          </p>
          <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap font-sans">
            {supplierMessage}
          </pre>
          <button
            onClick={() => copyToClipboard(supplierMessage, "mensagem")}
            className="mt-2 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copied === "mensagem" ? "Copiado!" : "Copiar mensagem"}
          </button>
        </div>

        {/* Marcar checkout */}
        {!order.supplierCheckoutDone ? (
          <button
            onClick={markCheckoutDone}
            className="w-full px-4 py-3 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
          >
            Marcar checkout como realizado
          </button>
        ) : (
          <div className="bg-green-50 text-green-700 text-sm font-medium p-3 rounded-lg text-center">
            Checkout realizado em{" "}
            {new Date(order.supplierCheckoutDate).toLocaleDateString("pt-BR")}
          </div>
        )}
      </div>
    </div>
  );
}
