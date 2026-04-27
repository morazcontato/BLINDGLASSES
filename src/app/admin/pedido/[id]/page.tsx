"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import {
  Order,
  OrderStatus,
  getOrderById,
  updateOrder,
  deleteOrder,
  ORDER_STATUS_LABELS,
  ORDER_ORIGIN_LABELS,
  formatAddress,
} from "@/data/orders";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import SupplierCheckout from "@/components/admin/SupplierCheckout";
import TrackingForm from "@/components/admin/TrackingForm";
import Link from "next/link";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  const loadOrder = useCallback(() => {
    setOrder(getOrderById(id));
  }, [id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (!order) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg mb-4">Pedido nao encontrado</p>
        <Link href="/admin/pedidos" className="text-[#4DA6FF] font-semibold">
          Voltar para pedidos
        </Link>
      </div>
    );
  }

  function handleStatusChange(newStatus: OrderStatus) {
    updateOrder(order!.id, { status: newStatus });
    loadOrder();
  }

  function handleDelete() {
    if (confirm("Tem certeza que deseja excluir este pedido?")) {
      deleteOrder(order!.id);
      router.push("/admin/pedidos");
    }
  }

  const formattedAddress = formatAddress(order.customerAddress);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/pedidos" className="hover:text-[#4DA6FF]">
          Pedidos
        </Link>
        <span>/</span>
        <span className="text-black font-mono">{order.orderNumber}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm text-gray-400">
            {ORDER_ORIGIN_LABELS[order.origin]} |{" "}
            {new Date(order.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Excluir pedido
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Alterar status</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    order.status === status
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          {/* Checkout no fornecedor */}
          <SupplierCheckout order={order} onUpdate={loadOrder} />

          {/* Rastreio */}
          <TrackingForm order={order} onUpdate={loadOrder} />

          {/* Observacoes */}
          {order.notes && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-bold mb-2">Observacoes</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cliente */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Cliente</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.customerName}</p>
              {order.customerPhone && <p className="text-gray-500">{order.customerPhone}</p>}
              {order.customerEmail && <p className="text-gray-500">{order.customerEmail}</p>}
            </div>
          </div>

          {/* Endereco */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Endereco</h3>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
              {formattedAddress}
            </pre>
          </div>

          {/* Produto */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Produto</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.productName}</p>
              {order.productVariant && <p className="text-gray-500">Variacao: {order.productVariant}</p>}
              <p className="text-gray-500">Quantidade: {order.quantity}</p>
            </div>
          </div>

          {/* Financeiro */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-4">Financeiro</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Cliente pagou</span>
                <span className="font-semibold">
                  R$ {order.customerPaid.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Custo fornecedor</span>
                <span className="font-semibold">
                  R$ {order.supplierCost.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <span className="text-gray-500">Lucro estimado</span>
                <span
                  className={`font-bold ${order.estimatedProfit >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  R$ {order.estimatedProfit.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
